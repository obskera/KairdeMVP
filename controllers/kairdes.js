const Comment = require("../models/Kairde");

module.exports = {
  createKairde: async (req, res) => {
    try {
      await Kairde.create({
        createdBy: req.user.id,
        public: req.body.public,
        link: req.body.link,
        //encrypt this?
        dataURL: req.body.dataURL, 
        type: req.body.type,
      });
      console.log("Kairde has been added!");
    //   res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  deleteKairde: async (req, res) => {
    try {
      // Find post by id
      let kairde = await kairde.findById({ _id: req.params.id });
      // Delete image from cloudinary
    //   await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await kairde.remove({ _id: req.params.id });
      console.log("Deleted Kairde");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
  getKairdeFeed: async (req, res) => {
    try {
      const posts = await Kairde.find().sort({ createdBy: req.user.id }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getKairde: async (req, res) => {
    try {
      const kairde = await kairde.findById(req.params.id);
    //   const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("post.ejs", { post: kairde, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
};