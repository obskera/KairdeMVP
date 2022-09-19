const bcrypt = require("bcrypt");
const crypto = require("crypto");
const iv = crypto.randomBytes(16);
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userName: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    mail: {type: String, default: ''},
    name: {type: String, default: ''},
    title: { type: String, default: '' },
    phone: { type: String, default: '' },
    discord: { type: String, default: '' },
    twitter: { type: String, default: '' },
    linkedIn: { type: String, default: '' },
    facebook: { type: String, default: '' },
    website: { type: String, default: '' },
    github: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    profilePhotoUrl: { type: String, default: '' },
    skills: { type: Array, default: [] },
        // link to kairde id's in array
    kairdes: { type: Array, default: [] }
});

// Password hash + data encryption middleware.

UserSchema.pre("save", function save(next) {
    const user = this;
    //encrypt
    this.mail = encrypt(this.mail, process.env.SECRET_KEY)
    this.name = encrypt(this.name, process.env.SECRET_KEY)
    this.title = encrypt(this.title, process.env.SECRET_KEY)
    this.phone = encrypt(this.phone, process.env.SECRET_KEY)
    this.discord = encrypt(this.discord, process.env.SECRET_KEY)
    this.twitter = encrypt(this.twitter, process.env.SECRET_KEY)
    this.linkedIn = encrypt(this.linkedIn, process.env.SECRET_KEY)
    this.facebook = encrypt(this.facebook, process.env.SECRET_KEY)
    this.website = encrypt(this.website, process.env.SECRET_KEY)
    this.github = encrypt(this.github, process.env.SECRET_KEY)
    this.city = encrypt(this.city, process.env.SECRET_KEY)
    this.state = encrypt(this.state, process.env.SECRET_KEY)
    this.profilePhotoUrl = encrypt(this.profilePhotoUrl, process.env.SECRET_KEY)
    //array may cause issues? Skills isn an array
    this.skills = encrypt(this.skills, process.env.SECRET_KEY)
    this.kairdes = encrypt(this.kairdes, process.env.SECRET_KEY)

  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

//post hook to decrypt on findOne
// UserSchema.post('find', function (document) {
//     if (document !== null) {
//         decrypt(document.title, process.env.SECRET_KEY).then(res => document.title = res);
//         decrypt(document.phone, process.env.SECRET_KEY).then(res => document.phone = res);
//         decrypt(document.discord, process.env.SECRET_KEY).then(res => document.discord = res);
//         decrypt(document.twitter, process.env.SECRET_KEY).then(res => document.twitter = res);
//         decrypt(document.linkedIn, process.env.SECRET_KEY).then(res => document.linkedIn = res);
//         decrypt(document.facebook, process.env.SECRET_KEY).then(res => document.facebook = res);
//         decrypt(document.website, process.env.SECRET_KEY).then(res => document.website = res);
//         decrypt(document.github, process.env.SECRET_KEY).then(res => document.github = res);
//         decrypt(document.city, process.env.SECRET_KEY).then(res => document.city = res);
//         decrypt(document.state, process.env.SECRET_KEY).then(res => document.state = res);
//         decrypt(document.profilePhotoUrl, process.env.SECRET_KEY).then(res => document.profilePhotoUrl = res);
//         decrypt(document.skills, process.env.SECRET_KEY).then(res => document.skills = res);
//         decrypt(document.kairdes, process.env.SECRET_KEY).then(res => document.kairdes = res);

//     }
// });

// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

//methods to encrypt + descrypt
UserSchema.methods.encrypt = function encrypt(text, secretKey) {
    if (!text || text == undefined || text == null || text == '') { return text };
    if (text.startsWith('{"iv":')) { return text };
    const cipher = crypto.createCipheriv('aes-256-ctr', secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return JSON.stringify({
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    });
};
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

UserSchema.methods.decrypt = function decrypt(hash, secretKey) {
    return new Promise((resolve, reject) => {
        try {
            if (!hash || hash == undefined || hash == null || hash == '' || hash == "") {
                return hash
            };
            if (!hash.startsWith('{"iv":')) { return resolve(hash) };
            hash = JSON.parse(hash);
            const decipher = crypto.createDecipheriv('aes-256-ctr', secretKey, Buffer.from(hash.iv, 'hex'));
            const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
            return resolve(decrypted.toString());
        } catch (error) {
            return reject(error)
        }
    })
};

function decrypt(hash, secretKey) {
  return new Promise((resolve, reject) => {
      try {
          if (!hash || hash == undefined || hash == null || hash == '' || hash == "") {
              return hash
          };
          if (!hash.startsWith('{"iv":')) { return resolve(hash) };
          hash = JSON.parse(hash);
          const decipher = crypto.createDecipheriv('aes-256-ctr', secretKey, Buffer.from(hash.iv, 'hex'));
          const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
          return resolve(decrypted.toString());
      } catch (error) {
          return reject(error)
      }
  })
};

module.exports = mongoose.model("User", UserSchema);
