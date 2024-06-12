import { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewImg = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const showToast = useShowToast();

    const handleFileChange = async (e, fileType) => {
        let file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (fileType === "image" && file.type.startsWith("image/")) {
                    setImageUrl(reader.result);
                    setVideoUrl(null);
                    showToast("Image Uploaded", "Image file uploaded successfully", "success");
                } else if (fileType === "video" && file.type.startsWith("video/")) {
                    setVideoUrl(reader.result);
                    setImageUrl(null);
                    showToast("Video Uploaded", "Video file uploaded successfully", "success");
                } else {
                    showToast("Invalid file type", "Please select an appropriate file type", "error");
                    setImageUrl(null);
                    setVideoUrl(null);
                }
            };
            reader.readAsDataURL(file);
        } else {
            setImageUrl(null);
            setVideoUrl(null);
        }
    };

    const removeImage = () => {
        handleFileChange(null, true);
    };

    return { handleFileChange, imageUrl, setImageUrl, videoUrl, setVideoUrl };
};

export default usePreviewImg;
