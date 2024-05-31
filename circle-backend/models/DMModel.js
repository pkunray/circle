import mongoose from "mongoose";

const dmSchema = new mongoose.Schema(
  {
    paticipants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lastMessage: {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: String,
    },
  },
  { timestamps: true }
);

export const DM = mongoose.model("DM", dmSchema);
