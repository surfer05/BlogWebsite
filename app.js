const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const homeStartingContent =
  "Hey Blogger, what's up. Well , I don' know how your day went, was it good ,great , depressing or just another in your life that felt like nothing. Well, worry not , you have got me. Log down whatever happened today so that , after a month , or a year , you would know , that this wasn't just another day , but was a great day that was just meant to happen as it was. While logging down , you will realise, how great are those small moments , that we tend to ignore all through our day. Those are the moments that make us realize that we do are special. So go ahead , and just type it down. Good Luck :). ";
const aboutContent =
  "Hey blogger , it's a pleasure that you took a detour to this page too. Myself , Surfer_05 , a self-made web developer and a web3 developer. I like to make sites for fun. And try to include whatever necessary can be done to make at least a littel useful. As a note , whenever, you feel like composing a blog , just add 'compose' at the end of the web address , and you will be good to go. Thanks again.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", { useNewUrlParser: true });

const postSchema = {
  title: String,
  content: String,
};
const Post = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {
  Post.find({}, function (err, posts) {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts,
    });
  });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
  });
  post.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;
  Post.findOne({ _id: requestedPostId }, function (err, post) {
    res.render("post", {
      title: post.title,
      content: post.content,
    });
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
