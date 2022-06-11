import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
	postID: Number,
	title: String,
	subTitle: String,
	text: String,
	author: String,
	date: Date,
});

const BlogPostModel = mongoose.model("BlogPost", BlogPostSchema);

export default BlogPostModel;
