import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import { v2 as cloudinary } from "cloudinary";

//Get Pots of Specific User
const getUserPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const following = user.following;
    const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({ createdAt: -1 });
    res.status(200).json(feedPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Get Individual Post
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Post Error:", error.message);
  }
};

//Create New Post
const createPost = async (req, res) => {
  try {
    const { postedBy, text } = req.body;
    let { img } = req.body;
    if (!postedBy || !text) {
      return res.status(400).json({ error: "ID and Text required" });
    }
    const user = await User.findById(postedBy);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: "Unable to create post" });
    }
    const maxLength = 500;
    if (text.length > maxLength) {
      return res.status(400).json({ error: `Character limit: ${maxLength} characters` });
    }
    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;
    }
    const newPost = new Post({ postedBy, text, img });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Create Error:", error.message);
  }
};

//Delete Existing Post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: "Unable to delete post" });
    }
    if (post.img) {
      const imgID = post.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgID);
    }
    await Post.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Delete Error:", error.message);
  }
};

//Like Unlike Existing Post
const likeUnlikePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user._id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const userLikedPost = post.likes.includes(userId);
    if (userLikedPost) {
      // Unlike post
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      return res.status(200).json({ message: "Post unliked" });
    } else {
      // Like post
      post.likes.push(userId);
      await post.save();
      return res.status(200).json({ message: "Post liked" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Like/Unlike Error:", error.message);
  }
};

//Comment Existing Post
const replyToPost = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;
    const userProfilePic = req.user.profilePic;
    const username = req.user.username;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const reply = { userId, text, userProfilePic, username };
    post.replies.push(reply);
    await post.save();
    res.status(200).json({ message: "Reply added", post });
  }
  catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Comment Error:", error.message);
  }
};

//Load Posts by Users in Subscribed Feed
const getFeedPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const following = user.following;
    const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({ createdAt: -1 });
    res.status(200).json(feedPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Feed Error:", error.message);
  }
};

const reportPost = async (req, res) => {
  try {
    const { reason } = req.body;
    const postId = req.params.id;

    if (!reason) {
      return res.status(400).json({ error: "You need to add a reason" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const report = { reason };
    post.reports.push(report);
    await post.save();

    const reportsCount = post.reports.length;
    console.log(reportsCount);
    console.log(report);

    res.status(200).json({ reportsCount, reason: report.reason });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Report Error:", error.message);
  }
};


export { getUserPosts, getFeedPosts, getPost, createPost, deletePost, likeUnlikePost, replyToPost, reportPost };