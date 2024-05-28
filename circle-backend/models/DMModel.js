import mongoose from "mongoose";

const dmSchema = new mongoose.Schema(
  {
    paticipants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lastMessage: { type: String },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const DM = mongoose.model("DM", dmSchema);
