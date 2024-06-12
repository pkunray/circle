import express from "express";
import { getUserProfile, signupUser, loginUser, logoutUser, followUnfollowUser, updateUser } from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/profile/:query", getUserProfile)
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute, followUnfollowUser);
router.patch("/update/:id", protectRoute, updateUser);

export default router;