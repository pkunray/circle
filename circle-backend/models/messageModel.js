import moogoose from "mongoose";

const messageSchema = new moogoose.Schema(
  {
    dmId: { type: moogoose.Schema.Types.ObjectId, ref: "DM" },
    sender: { type: moogoose.Schema.Types.ObjectId, ref: "User" },
    text: { type: String },
  },
  { timestamps: true }
);

export const Message = moogoose.model("Message", messageSchema);
