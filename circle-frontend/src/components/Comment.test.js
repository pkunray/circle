import React from 'react';
import { shallow } from 'enzyme';
import Comment from './Comment';

describe('Comment Component', () => {
    const reply = {
        userProfilePic: 'example.jpg',
        username: 'JohnDoe',
        text: 'This is a comment',
    };

    it('displays the username correctly', () => {
        const wrapper = shallow(<Comment reply={reply} />);
        const usernameText = wrapper.find('Text').first().text();
        expect(usernameText).toEqual(reply.username);
    });

    it('displays the comment text correctly', () => {
        const wrapper = shallow(<Comment reply={reply} />);
        const commentText = wrapper.find('Text').last().text();
        expect(commentText).toEqual(reply.text);
    });

    it('displays the user profile picture correctly', () => {
        const wrapper = shallow(<Comment reply={reply} />);
        const avatarSrc = wrapper.find('Avatar').prop('src');
        expect(avatarSrc).toEqual(reply.userProfilePic);
    });
});
