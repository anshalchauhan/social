// React
import { useState } from "react";

// UI
import useShowToast from "./useShowToast";

const usePreviewMedia = () => {
  const [imgUrl, setImgUrl] = useState(null);
  const [videoAsset, setVideoAsset] = useState(null);
  const showToast = useShowToast();

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgUrl(reader.result);
      };

      reader.readAsDataURL(file);
    } else if (file && file.type.startsWith("video/")) {
      const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

      if (fileTypes.includes(file.type)) {
        file.url = URL.createObjectURL(file);
        setVideoAsset(file);
      } else {
        showToast(
          "Invalid video type",
          "Please select a correct video file",
          "error"
        );
      }
    } else {
      showToast(
        "Invalid file type",
        "Please select an image/video file",
        "error"
      );
    }
  };

  return { handleMediaChange, imgUrl, setImgUrl, videoAsset, setVideoAsset };
};

export default usePreviewMedia;
