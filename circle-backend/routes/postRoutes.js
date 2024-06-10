import express from "express";
import { getFeedPosts, getPost, createPost, deletePost, likeUnlikePost, replyToPost, getUserPosts, reportPost } from "../controllers/postController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/feed", protectRoute, getFeedPosts); 
router.get("/user/:username", getUserPosts);
router.get("/:id", getPost);
router.post("/create", protectRoute, createPost);
router.delete("/:id", protectRoute, deletePost);

//Put, we are only updating certain fields not the whole component
router.put("/like/:id", protectRoute, likeUnlikePost);
router.put("/reply/:id", protectRoute, replyToPost);
router.put("/reports/:id", protectRoute, reportPost);

export default router;