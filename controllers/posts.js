const cloudinary = require("../middleware/cloudinary");
const crypto = require("crypto")
const Post = require("../models/Post");
const User = require("../models/User")
const Kairde = require("../models/Kairde")
const Comment = require("../models/Comment");
const { truncate } = require("fs");

module.exports = {
  receiveKairde: async (req, res) => {
    const link = req.body.link
    // const caption = req.body.caption
    // const title = req.body.title
    const userID = req.user.id

       ///new shortlink maker stuff
       class ShortLinker {
        constructor() {}
        poolA = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v' , 'w', 'x', 'y', 'z']
        poolB = this.poolA.map(letter => {
            return letter.toUpperCase()
        })
        link(length) {
            let link = ''
            for (let i = 0; i < length; i++) {
                const rando = Math.ceil(Math.random() * 25)
                // console.log(this.rando)
                let flip = Math.random()
                flip < 0.5 ? link += this.poolA[rando] : link += this.poolB[rando]
            }
            // console.log(link)
            return link
        }
      }
      let shortLink = new ShortLinker()
      //just feed it length of url
      let genLink = await linkGen()
      // let link = 'a'
  
      async function linkGen() {
    //  let gen = 'bh'
        let gen = shortLink.link(4)
        let check = await Post.findOne({link: `${req.user.userName}-${gen}`})
          if (check) { 
            console.log('collision!')
            linkGen()
          } else {
            console.log('unique!')
            const generated = `${req.user.userName}-${gen}`
            return generated
          }
      }

    try {
      const received = await Post.find({link: link})
      console.log(received[0].image)
      await Post.create({
          title: received[0].title,
          image: received[0].image,
          cloudinaryId: received[0].cloudinaryId,
          caption: received[0].caption,
          likes: 0,
          user: userID,
          share: received[0].share,
          //create new link here
          // link: received[0].link,
          link: genLink,
          imported: true
      }).then(() => {
        console.log("Kaired has been added!");
        res.redirect('/feed')
      })
    
    } catch (err) {
      console.log(err);
    }
  },

  getPrivacyTermsPolicies: async (req, res) => {
    res.render('policies.ejs')
  },
  getContactTool: async (req, res) => {
    //decryption function -----change to a module to import
    async function decrypt(hash, secretKey) {
      try {
          if (!hash || hash == undefined || hash == null || hash == '' || hash == "") {
              return hash
          };
          // if (!hash.startsWith('{"iv":')) { return resolve(hash) };
          hash = JSON.parse(hash);
          const decipher = await crypto.createDecipheriv('aes-256-ctr', secretKey, Buffer.from(hash.iv, 'hex'));
          const decrypted = await Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
          return decrypted.toString();
      } catch (error) {
          return error
      }
    };
    //-----//
    try {
      const tool = 'contact'
      const posts = await Post.find({ user: req.user.id });
      // console.log(req.user._id)
      //returns an array, so use x[0].whatever
      const userInfo = await User.find({_id: req.user.id})
      //-=-=-=-=-=-//USE THIS AS MODEL TO DECRYPT ALL DATA//-=-=-=-=-=-=-=-//
      userInfo[0].twitter = await decrypt(userInfo[0].twitter, process.env.SECRET_KEY)
      userInfo[0].mail = await decrypt(userInfo[0].mail, process.env.SECRET_KEY)
      userInfo[0].name = await decrypt(userInfo[0].name, process.env.SECRET_KEY)
      userInfo[0].title = await decrypt(userInfo[0].title, process.env.SECRET_KEY)
      userInfo[0].phone = await decrypt(userInfo[0].phone, process.env.SECRET_KEY)
      userInfo[0].discord = await decrypt(userInfo[0].discord, process.env.SECRET_KEY)
      userInfo[0].linkedIn = await decrypt(userInfo[0].linkedIn, process.env.SECRET_KEY)
      userInfo[0].facebook = await decrypt(userInfo[0].facebook, process.env.SECRET_KEY)
      userInfo[0].website = await decrypt(userInfo[0].website, process.env.SECRET_KEY)
      userInfo[0].github = await decrypt(userInfo[0].github, process.env.SECRET_KEY)
      userInfo[0].city = await decrypt(userInfo[0].city, process.env.SECRET_KEY)
      userInfo[0].state = await decrypt(userInfo[0].state, process.env.SECRET_KEY)

      // console.log('userInfo: ', userInfo[0]._id)
      res.render("toolView.ejs", { tool: tool, posts: posts, user: req.user, userInfo: userInfo[0]});
    } catch (err) {
      console.log(err);
    }
  },
  getBioTool: async (req, res) => {
    //decryption function -----change to a module to import
    async function decrypt(hash, secretKey) {
      try {
          if (!hash || hash == undefined || hash == null || hash == '' || hash == "") {
              return hash
          };
          // if (!hash.startsWith('{"iv":')) { return resolve(hash) };
          hash = JSON.parse(hash);
          const decipher = await crypto.createDecipheriv('aes-256-ctr', secretKey, Buffer.from(hash.iv, 'hex'));
          const decrypted = await Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
          return decrypted.toString();
      } catch (error) {
          return error
      }
    };

    try {
      const tool = 'bio'
      const posts = await Post.find({ user: req.user.id });
      // console.log(req.user._id)
      //returns an array, so use x[0].whatever
      const userInfo = await User.find({_id: req.user.id})
      //-=-=-=-=-=-//USE THIS AS MODEL TO DECRYPT ALL DATA//-=-=-=-=-=-=-=-//
      userInfo[0].twitter = await decrypt(userInfo[0].twitter, process.env.SECRET_KEY)

      // console.log('userInfo: ', userInfo[0]._id)
      res.render("toolView.ejs", { tool: tool, posts: posts, user: req.user, userInfo: userInfo[0]});
    } catch (err) {
      console.log(err);
    }
  },
  getResumeTool: async (req, res) => {
    //decryption function -----change to a module to import
    async function decrypt(hash, secretKey) {
      try {
          if (!hash || hash == undefined || hash == null || hash == '' || hash == "") {
              return hash
          };
          // if (!hash.startsWith('{"iv":')) { return resolve(hash) };
          hash = JSON.parse(hash);
          const decipher = await crypto.createDecipheriv('aes-256-ctr', secretKey, Buffer.from(hash.iv, 'hex'));
          const decrypted = await Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
          return decrypted.toString();
      } catch (error) {
          return error
      }
    };

    try {
      const tool = 'resume'
      const posts = await Post.find({ user: req.user.id });
      // console.log(req.user._id)
      //returns an array, so use x[0].whatever
      const userInfo = await User.find({_id: req.user.id})
      //-=-=-=-=-=-//USE THIS AS MODEL TO DECRYPT ALL DATA//-=-=-=-=-=-=-=-//
      userInfo[0].twitter = await decrypt(userInfo[0].twitter, process.env.SECRET_KEY)

      // console.log('userInfo: ', userInfo[0]._id)
      res.render("toolView.ejs", { tool: tool, posts: posts, user: req.user, userInfo: userInfo[0]});
    } catch (err) {
      console.log(err);
    }
  },

  getMyKairdes: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id }).sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  getProfile: async (req, res) => {
    //decryption function -----change to a module to import
    async function decrypt(hash, secretKey) {
      try {
          if (!hash || hash == undefined || hash == null || hash == '' || hash == "") {
              return hash
          };
          // if (!hash.startsWith('{"iv":')) { return resolve(hash) };
          hash = JSON.parse(hash);
          const decipher = await crypto.createDecipheriv('aes-256-ctr', secretKey, Buffer.from(hash.iv, 'hex'));
          const decrypted = await Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
          return decrypted.toString();
      } catch (error) {
          return error
      }
    };

    try {
      const posts = await Post.find({ user: req.user.id });
      // console.log(req.user._id)
      //returns an array, so use x[0].whatever
      const userInfo = await User.find({_id: req.user.id})
      //-=-=-=-=-=-//USE THIS AS MODEL TO DECRYPT ALL DATA//-=-=-=-=-=-=-=-//
      userInfo[0].twitter = await decrypt(userInfo[0].twitter, process.env.SECRET_KEY)

      // console.log('userInfo: ', userInfo[0]._id)
      res.render("profile.ejs", { posts: posts, user: req.user, userInfo: userInfo[0]});
    } catch (err) {
      console.log(err);
    }
  },

  getSettings: async (req, res) => {
    //decryption function -----change to a module to import
    async function decrypt(hash, secretKey) {
          try {
              if (!hash || hash == undefined || hash == null || hash == '' || hash == "") {
                  return hash
              };
              // if (!hash.startsWith('{"iv":')) { return resolve(hash) };
              hash = JSON.parse(hash);
              const decipher = await crypto.createDecipheriv('aes-256-ctr', secretKey, Buffer.from(hash.iv, 'hex'));
              const decrypted = await Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
              return decrypted.toString();
          } catch (error) {
              return error
          }
    };
    async function decryptStore(store) {
      // let userInfoRaw = await User.find({_id: req.user.id})
      let userInfo = store
      userInfo.mail = await decrypt(store[0].mail, process.env.SECRET_KEY)
      userInfo.name = await decrypt(store[0].name, process.env.SECRET_KEY)
      userInfo.title = await decrypt(store[0].title, process.env.SECRET_KEY)
      userInfo.phone = await decrypt(store[0].phone, process.env.SECRET_KEY)
      userInfo.discord = await decrypt(store[0].discord, process.env.SECRET_KEY)
      userInfo.twitter = await decrypt(store[0].twitter, process.env.SECRET_KEY)
      userInfo.linkedIn = await decrypt(store[0].linkedIn, process.env.SECRET_KEY)
      userInfo.facebook = await decrypt(store[0].facebook, process.env.SECRET_KEY)
      userInfo.website = await decrypt(store[0].website, process.env.SECRET_KEY)
      userInfo.city = await decrypt(store[0].city, process.env.SECRET_KEY)
      userInfo.state = await decrypt(store[0].state, process.env.SECRET_KEY)
      userInfo.github = await decrypt(store[0].github, process.env.SECRET_KEY)
      userInfo.profilePhotoUrl = await decrypt(store[0].profilePhotoUrl, process.env.SECRET_KEY)
      userInfo.skills = await decrypt(store[0].skills, process.env.SECRET_KEY)
      userInfo.kairdes = await decrypt(store[0].kairdes, process.env.SECRET_KEY)
      return userInfo
    }
    
    //-=-=-=-=-=-//USE THIS AS MODEL TO DECRYPT ALL DATA//-=-=-=-=-=-=-=-//
      //[title, phone, discord, twitter, linkedIn, faceBook, website, city, state, github, profilePhotoUrl, skills, kairdes]
    
 
    // try {
    //   const posts = await Post.find({ user: req.user.id });
    //   // console.log(req.user._id)
    //   //returns an array, so use x[0].whatever
    //   const userInfo = await User.find({_id: req.user.id})
    
    //   //-=-=-=-=-=-//USE THIS AS MODEL TO DECRYPT ALL DATA//-=-=-=-=-=-=-=-//
    //   userInfo[0].twitter = await decrypt(userInfo[0].twitter, process.env.SECRET_KEY)

    //   // console.log('userInfo: ', userInfo[0]._id)
    //   res.render("profile.ejs", { posts: posts, user: req.user, userInfo: userInfo[0]});
    // } catch (err) {
    //   console.log(err);
    // }
    let userInfoRaw = await User.find({_id: req.user.id})
    const userStore = await decryptStore(userInfoRaw)
    // console.log(userStore)
    res.render('settings.ejs', {user: req.user, userStore: userStore})
  },

  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("post.ejs", { post: post, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
  //-----//new public view via shortlink -- if post exists and is marked to share//------//
  publicViewKairde: async (req, res) => {
    let post = await Post.findOne({link: req.params.shortLink})
    if (!post || post.share === false) { post = {} }
    if (post.share) {
      console.log('sharing OK')
      res.render('publicView.ejs', {post: post})
    } else {
      console.log('oops')
      res.render('404.ejs')
    }
  },
  ///.end///
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      // console.log(req.body)
      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
        share: req.body.share.value
      });
      console.log("Kaired has been added!");
      res.redirect("/feed");
    } catch (err) {
      console.log(err);
    }
  },

  saveKairde: async (req, res) => {
    ///new shortlink maker stuff
    class ShortLinker {
      constructor() {}
      poolA = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v' , 'w', 'x', 'y', 'z']
      poolB = this.poolA.map(letter => {
          return letter.toUpperCase()
      })
      link(length) {
          let link = ''
          for (let i = 0; i < length; i++) {
              const rando = Math.ceil(Math.random() * 25)
              // console.log(this.rando)
              let flip = Math.random()
              flip < 0.5 ? link += this.poolA[rando] : link += this.poolB[rando]
          }
          // console.log(link)
          return link
      }
    }
    let shortLink = new ShortLinker()
    //just feed it length of url
    let link = await linkGen()
    // let link = 'a'

    async function linkGen() {
  //  let gen = 'bh'
      let gen = shortLink.link(4)
      let check = await Post.findOne({link: `${req.user.userName}-${gen}`})
        if (check) { 
          console.log('collision!')
          linkGen()
        } else {
          console.log('unique!')
          return gen
        }
    }
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.body.dataURL);
      // cloudinary.uploader.upload(req.body.dataURL)
      // .then( result => console.log(result));

      await Post.create({
        title: `${req.user.userName}'s Kairde`,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
        userName: req.user.userName,
        share: req.body.share,
        link: `${req.user.userName}-${link}`
      });
      console.log("Kairde has been added!");
      //change to direct to tool generated, using req.tool etc..
      res.redirect("/feed");
    } catch (err) {
      console.log(err);
    }
  },

  /////////use this for put model
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/feed");
    } catch (err) {
      res.redirect("/feed");
    }
  },
  
};


