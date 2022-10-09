const passport = require("passport");
const validator = require("validator");
const crypto = require('crypto')
const iv = crypto.randomBytes(16);
const User = require("../models/User");

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("login", {
    title: "Login",
  });
};

exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/profile/contactKairde");
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/profile/contactKairde");
  }
  res.render("signup", {
    title: "Create Account",
  });
};

exports.putUser = async (req, res) => { 

  function encrypt(text, secretKey) {
    if (!text || text == undefined || text == null || text == '') { return text };
    if (text.startsWith('{"iv":')) { return text };
    const cipher = crypto.createCipheriv('aes-256-ctr', secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return JSON.stringify({
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    });
  };

  const filter = {_id: req.params.userID}
  const update = {
    mail: encrypt(req.body.mail, process.env.SECRET_KEY),
    name: encrypt(req.body.name, process.env.SECRET_KEY),
    title: encrypt(req.body.title, process.env.SECRET_KEY),
    phone: encrypt(req.body.phone, process.env.SECRET_KEY),
    discord: encrypt(req.body.discord, process.env.SECRET_KEY),
    twitter: encrypt(req.body.twitter, process.env.SECRET_KEY),
    linkedIn: encrypt(req.body.linkedIn, process.env.SECRET_KEY),
    facebook: encrypt(req.body.facebook, process.env.SECRET_KEY),
    website: encrypt(req.body.website, process.env.SECRET_KEY),
    github: encrypt(req.body.github, process.env.SECRET_KEY),
    city: encrypt(req.body.city, process.env.SECRET_KEY),
    state: encrypt(req.body.state, process.env.SECRET_KEY)
    // skills: req.body.skills
  }

  try {
    let user = await User.findOneAndUpdate(filter, update, {returnOriginal: false});
    console.log("Likes +1");
    res.redirect('/settings');
  } catch (err) {
    console.log(err);
  }

}

exports.postSignup = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    // remove after test
    twitter: '@Test'
  });

  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("../signup");
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/profile/contactKairde");
        });
      });
    }
  );
};
