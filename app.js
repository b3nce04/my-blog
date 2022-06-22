import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import BlogPostModel from "./models/BlogPost.js";

const app = express();
const variables = dotenv.config().parsed;
const PORT = variables.PORT || 5000;

app.set("view engine", "pug");
app.use(express.static("public"));

app.listen(PORT, () => {
	mongoose.connect(variables.MONGO_URL);
	console.log(`A szerver elérhető itt: http://localhost:${PORT}/`);
});

app.get("/", (req, res) => {
	res.redirect("/home");
});

app.get("/home", async (req, res) => {
	const posts = await BlogPostModel.find();
	res.render("home", {blogPosts: posts});
});

app.get("/about", (req, res) => {
	res.render("about");
});

app.get("/post", async (req, res, next) => {
	const post = await BlogPostModel.findOne({ postID: req.query.id });
	if (post === null) {
		next();
	}
	res.render("post", {
		pageTitle: post.title,
		post: post,
	});
});

app.get("/contact", (req, res) => {
	res.render("contact");
});

app.post("/contact", (req, res) => {
	res.send(req.params)
})

app.get("*", (req, res) => {
	res.render("404");
});
