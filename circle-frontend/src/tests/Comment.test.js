import React from "react";
import { render } from "@testing-library/react";
import Comment from "../components/Comment";

describe("Comment Component", () => {
  const reply = {
    userProfilePic: "example.jpg",
    username: "JohnDoe",
    text: "ThisIsAComment",
  };

  it("displays the username correctly", () => {
    const { getByText } = render(<Comment reply={reply} />);
    expect(getByText(reply.username)).toBeInTheDocument();
  });

  it("displays the comment text correctly", () => {
    const { getByText } = render(<Comment reply={reply} />);
    expect(getByText(reply.text)).toBeInTheDocument();
  });

  it("displays the user profile picture correctly", () => {
    const { getByTestId } = render(<Comment reply={reply} />);
    const avatar = getByTestId("picture");
    expect(avatar).toBeInTheDocument();
  });
});
