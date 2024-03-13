// React
import { useState } from "react";

// UI
import useShowToast from "./useShowToast";

const usePreviewMedia = () => {
  const showToast = useShowToast();
  const [media, setMedia] = useState(null);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith) {
      file.url = URL.createObjectURL(file);
      setMedia(file);
    } else {
      showToast(
        "Invalid file type",
        "Please select an image/video file",
        "error"
      );
    }
  };

  return {
    handleMediaChange,
    media,
    setMedia,
  };
};

export default usePreviewMedia;
