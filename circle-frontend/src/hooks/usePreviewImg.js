import { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewImg = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const showToast = useShowToast();

    const handleFileChange = async (e, fileType) => {
        let file;
        if (fileType != "image" && fileType != "video" && e === null) {
            try {
                const response = await fetch('/user.png');
                const blob = await response.blob();
                file = new File([blob], "user.png", { type: "image/png" });
            } catch (error) {
                showToast("Error", "Failed to load default image", "error");
                console.error("Error loading default image:", error);
                return;
            }
        } else {
            file = e.target.files[0];
        }

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (fileType === "image" && file.type.startsWith("image/")) {
                    setImageUrl(reader.result);
                } else if (fileType === "video" && file.type.startsWith("video/")) {
                    setVideoUrl(reader.result);
                } else {
                    showToast("Invalid file type", `Please select a ${fileType} file`, "error");
                    setImageUrl(null);
                    setVideoUrl(null);
                }
            };
            reader.readAsDataURL(file);
        } else {
            showToast("Invalid file", `Please select a ${fileType} file`, "error");
            setImageUrl(null);
            setVideoUrl(null);
        }
    };

    const removeFile = (fileType) => {
        handleFileChange(null, fileType);
    };

    return { handleFileChange, imageUrl, setImageUrl, videoUrl, setVideoUrl, removeFile };
};

export default usePreviewImg;
