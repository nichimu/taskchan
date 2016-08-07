var express = require('express');
var router = express.Router();
var Post = require('../app/models/mongo')
/* GET home page. */
router.get("/", function(req, res, next) {
  Post.find({}, function(err, posts){
    res.render("index", {
      title: "TodoApp",
      csrf: req.csrfToken(),
      posts: posts
    });
  });
});


router.get("/new", function(req, res, next) {
  res.render("new", {
    title: "タスク追加 | TodoApp",
    csrf: req.csrfToken(),
    errors: req.flash("errors").shift() 
  });
});

router.post("/create", function(req, res, next) {
  var post = new Post();
  post.task = req.body.task;
  post.save(function(err){
    if( err ){
      req.flash("errors", err.errors);
      res.redirect("/new");
    }else{
      res.redirect("/");
    }
  });
});



router.get("/edit/:id", function(req, res, next){
  Post.findById(req.params.id, function(err, post){
    if( err ) return next();
    res.render("edit", {
      title: "タスク編集 | TodoApp",
      csrf: req.csrfToken(),
      post: post,
      errors: req.flash("errors").shift()
    });
  });
});

router.put("/update", function(req, res, next){
  Post.findById(req.body._id, function(err, post){
    if( err ) return next();
    post.task = req.body.task;
    post.save(function(err){
      if( err ){
        req.flash("errors", err.errors);
        res.redirect("/edit/" + req.body._id);
      }else{
        res.redirect("/");
      }
    });
  });
});


router.delete("/destroy", function(req, res, next){
  Post.findById(req.body._id, function(err, post){
    if( err ) return next();
    post.remove();
    res.redirect("/");
  });
});


module.exports = router;
