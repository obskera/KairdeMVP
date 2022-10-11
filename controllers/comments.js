const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },

  deleteComment: async (req, res) => {
    console.log('id',req.params.id, 'post', req.body.post)
    try {
     
      let comment = await Comment.findById({ _id: req.params.id });
      await Comment.deleteOne({ _id: req.params.id }).then( function() {
        console.log("Data deleted"); // Success
        res.redirect("/post/"+req.body.post);
    }).catch(function(error){
        console.log(error); // Failure
    });
    } 
    catch (err) {
      console.log(err);
    }
  },
};
