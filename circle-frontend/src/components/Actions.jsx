import "./Actions.css";
import React, { useState, useRef } from "react";
import { Box, Button, Flex, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, } from "@chakra-ui/react";
import { DeleteIcon, DownloadIcon } from "@chakra-ui/icons";
import { useRecoilValue } from "recoil";
import { toPng } from "html-to-image";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";
import QRCode from "qrcode.react";

const Actions = ({ post: inipost }) => {
	const user = useRecoilValue(userAtom);

	const { isOpen: isComment, onOpen: isCommentOpen, onClose: isCommentClose } = useDisclosure();
	const { isOpen: isReport, onOpen: isReportOpen, onClose: isReportClose } = useDisclosure();

	const [liked, setLiked] = useState(inipost.likes.includes(user?.id));
	const [post, setPost] = useState(inipost);

	const [comment, setComment] = useState("");
	const [reason, setReason] = useState("");

	const qrRef = useRef();
	const qrCodeRef = useRef();
	const showToast = useShowToast();

	// Liking Function
	const handleLikePost = async () => {
		if (!user) return showToast("Error", "Please login to like the post", "error");
		try {
			const res = await fetch("/api/posts/like/" + post._id, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			if (data.error) return showToast("Error", data.error, "error");

			// Update Like and Unlike Status
			if (!liked) {
				setPost({
					...post, likes: [...post.likes, user._id]
				});
			} else {
				setPost({
					...post, likes: post.likes.filter((id) => id !== user.id)
				});
			}
			setLiked(!liked);
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	}

	// Commenting Function
	const handleCommentPost = async (e) => {
		if (!user) return showToast("Error", "Please login to reply", "error");
		try {
			const res = await fetch("/api/posts/reply/" + post._id, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ text: comment }),
			});
			const data = await res.json();
			if (data.error) return showToast("Error", data.error, "error");
			setPost({ ...post, replies: [...post.replies, data.reply] });
			showToast("Success", "Reply posted successfully", "success");
			isCommentClose();
			setComment("");
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	}

	const handleReportPost = async (e) => {
		if (!user) return showToast("Error", "Please login to report this post", "error");
		try {
			console.log("reported");
		}
		finally {
			isReportClose();
		}
	}

	// Repost Function
	const handleRepostPost = async () => {
		if (!user) return showToast("Error", "Please login to to repost", "error");
		else {
			console.log("reposted");
		}
	}

	// Sharing Function
	const handleSharePost = async () => {
		if (!user) return showToast("Error", "Please login to share the post", "error");
		try {
			await navigator.clipboard.writeText(window.location.href);
			showToast("Success", "Post link copied to clipboard", "success");
		} catch (error) {
			showToast("Error", "Failed to copy the link", "error");
		}
	}

	// QR Functions
	const handleQRPost = async () => {
		if (!user) return showToast("Error", "Please login to create a QR", "error");
		try {
			const qrData = window.location.href;
			setPost({ ...post, qrData });
			showToast("Success", "QR code generated!", "success");
		} catch (error) {
			showToast("Error", "Failed to generate QR code", "error");
		}
	}

	const handleRemoveQR = () => {
		setPost({ ...post, qrData: null });
		showToast("Success", "QR code deleted!", "success");
	}

	const handleDownloadQR = () => {
		if (qrCodeRef.current) {
			toPng(qrCodeRef.current, { pixelRatio: 1 })
				.then((dataUrl) => {
					const link = document.createElement('a');
					link.href = dataUrl;
					link.download = 'generated-qr-code.png';
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
					showToast("Success", "QR code saved!", "success");
				})
				.catch((error) => {
					showToast("Error", "Failed to save QR code", "error");
				});
		}
	}

	return (
		<Flex flexDirection='column'>
			<Flex gap={4} my={4}>
				<div className="action-container">
					<div className="base-actions">

						{/* Liking */}
						<svg
							aria-label='Like'
							color={liked ? "rgb(237, 73, 86)" : ""}
							fill={liked ? "rgb(237, 73, 86)" : "transparent"}
							height='20'
							width='20'
							role='img'
							viewBox='0 0 24 22'
							onClick={handleLikePost}>
							<path
								d='M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z'
								stroke='currentColor'
								strokeWidth='2'
							></path>
						</svg>

						{/* Commenting */}
						<svg
							aria-label='Comment'
							color=''
							fill=''
							height='20'
							width='20'
							role='img'
							viewBox='0 0 24 24'
							onClick={isCommentOpen}>
							<title>Comment</title>
							<path
								d='M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z'
								fill='none'
								stroke='currentColor'
								strokeLinejoin='round'
								strokeWidth='2'
							></path>
						</svg>

						{/* Reposting */}
						<svg
							aria-label='Repost'
							color='currentColor'
							fill='currentColor'
							height='20'
							width='20'
							role='img'
							viewBox='0 0 24 24'
							onClick={handleRepostPost}>
							<title>Repost</title>
							<path
								fill=''
								d='M19.998 9.497a1 1 0 0 0-1 1v4.228a3.274 3.274 0 0 1-3.27 3.27h-5.313l1.791-1.787a1 1 0 0 0-1.412-1.416L7.29 18.287a1.004 1.004 0 0 0-.294.707v.001c0 .023.012.042.013.065a.923.923 0 0 0 .281.643l3.502 3.504a1 1 0 0 0 1.414-1.414l-1.797-1.798h5.318a5.276 5.276 0 0 0 5.27-5.27v-4.228a1 1 0 0 0-1-1Zm-6.41-3.496-1.795 1.795a1 1 0 1 0 1.414 1.414l3.5-3.5a1.003 1.003 0 0 0 0-1.417l-3.5-3.5a1 1 0 0 0-1.414 1.414l1.794 1.794H8.27A5.277 5.277 0 0 0 3 9.271V13.5a1 1 0 0 0 2 0V9.271a3.275 3.275 0 0 1 3.271-3.27Z'
							></path>
						</svg>

						{/* Sharing */}
						<svg
							aria-label='Share'
							color=''
							fill='rgb(243, 245, 247)'
							height='20'
							width='20'
							role='img'
							viewBox='0 0 24 24'
							onClick={handleSharePost}>
							<title>Share</title>
							<line
								fill='none'
								stroke='currentColor'
								strokeLinejoin='round'
								strokeWidth='2'
								x1='22'
								x2='9.218'
								y1='3'
								y2='10.083'
							></line>
							<polygon
								fill='none'
								points='11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334'
								stroke='currentColor'
								strokeLinejoin='round'
								strokeWidth='2'
							></polygon>
						</svg>

						{/* Report */}
						<svg
							width="22"
							height="22"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							onClick={isReportOpen}>
							<title>Report</title>
							<path d="M12 16.99V17M12 7V14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</div>

					<div className="other-actions">
						{/* Generate QR */}
						<svg
							width="23px"
							height="23px"
							viewBox="0 0 23 23"
							xmlns="http://www.w3.org/2000/svg"
							onClick={handleQRPost}>
							<title>QR</title>
							<g fill="currentColor">
								<path fill="none" d="M0 0h24v24H0z" />
								<path d="M16 17v-1h-3v-3h3v2h2v2h-1v2h-2v2h-2v-3h2v-1h1zm5 4h-4v-2h2v-2h2v4zM3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v2h-3v-2zM6 6h2v2H6V6zm0 10h2v2H6v-2zM16 6h2v2h-2V6z" strokeWidth="1" />
							</g>
						</svg>
					</div>
				</div>
			</Flex>

			<Flex gap={2} alignItems={"center"}>
				<Text color={"gray.light"} fontSize='sm'>
					{post.replies.length} replies
				</Text>
				<Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
				<Text color={"gray.light"} fontSize='sm'>
					{post.likes.length} likes
				</Text>
			</Flex>

			{/* Commenting Modal */}
			<Modal isOpen={isComment} onClose={isCommentClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader> Leave a Comment </ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<Input placeholder='your comment'
								value={comment}
								onChange={(e) => setComment(e.target.value)} />
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button onClick={handleCommentPost}>
							Post
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			{/* Reporting Modal */}
			<Modal isOpen={isReport} onClose={isReportClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader> Report this Comment </ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<Input placeholder='report reason'
								value={reason}
								onChange={(e) => setReason(e.target.value)} />
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button onClick={handleReportPost}>
							Send
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			{/* QR Display */}
			{post.qrData && (
				<div className="qr-container" ref={qrRef}>
					<h1 className="qr-header"> Your Generated QR: </h1>
					<div ref={qrCodeRef}>
						<QRCode className="qr-code" value={post.qrData} />
					</div>
					<DeleteIcon className="qr-delete" onClick={handleRemoveQR} />
					<DownloadIcon className="qr-download" onClick={handleDownloadQR} />
				</div>
			)}
		</Flex>
	);
};

export default Actions;