import { DM } from "../models/dmModel.js";
import { Message } from "../models/messageModel.js";
import { getRecipientSocketId, io } from "../socket/socket.js";

async function sendMessage(req, res) {
  try {
    const { recipientId, message } = req.body;
    const senderId = req.user._id;

    let dm = await DM.findOne({
      participants: { $all: [senderId, recipientId] },
    });
    if (!dm) {
      dm = new DM({
        participants: [senderId, recipientId],
        lastMessage: {
          sender: senderId,
          text: message,
        },
      });
      await DM.create(dm);
    }
    const newMessage = new Message({
      dmId: dm._id,
      sender: senderId,
      text: message,
    });
    Promise.all([
      dm.updateOne({
        lastMessage: {
          sender: senderId,
          text: message,
        },
      }),
      newMessage.save(),
    ]);

    const recipientSocketId = getRecipientSocketId(recipientId);
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({ newMessage });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
}

async function getMessages(req, res) {
  const { otherUserId } = req.params;
  const currentUserId = req.user._id;
  try {
    const dm = await DM.findOne({
      participants: { $all: [currentUserId, otherUserId] },
    });
    if (!dm) {
      return res.status(200).json([]);
    }
    const messages = await Message.find({ dmId: dm._id });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
}

async function getDms(req, res) {
  const currentUserId = req.user._id;
  try {
    const dms = await DM.find({ participants: currentUserId }).popoulate({
      path: "participants",
      select: "username profilePic",
    });
    dms.forEach((dm) => {
      dm.participants = dm.participants.filter(
        (participant) => participant._id.toString() !== currentUserId.toString()
      );
    });
    res.status(200).json(dms);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
}

export { sendMessage, getMessages, getDms };
