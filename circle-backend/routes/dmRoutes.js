import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  sendMessage,
  getMessages,
  getDms,
} from "../controllers/dmController.js";

const router = express.Router();

router.post("/", protectRoute, sendMessage);
router.get("/dms", protectRoute, getDms);
router.get("/:otherUserId", protectRoute, getMessages);

export default router;
