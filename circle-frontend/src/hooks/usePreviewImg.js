import { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewImg = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const showToast = useShowToast();

    const handleImageChange = async (e, defaultImage = false) => {
        let file;
        if (defaultImage) {
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

        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            showToast("Invalid file type", "Please select an image file", "error");
            setImageUrl(null);
        }
    };

    const removeImage = () => {
        handleImageChange(null, true);
    };

    return { handleImageChange, imageUrl, setImageUrl, removeImage };
};

export default usePreviewImg;
