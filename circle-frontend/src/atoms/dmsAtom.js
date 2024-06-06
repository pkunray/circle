import { atom } from "recoil";

export const dmsAtom = atom({
  key: "dmsAtom",
  default: [],
});

export const selectedDMAtom = atom({
  key: "selectedDMAtom",
  default: {
    _id: "",
    userId: "",
    username: "",
    userProfilePic: "",
  },
});
