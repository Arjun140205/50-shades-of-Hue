import dynamic from "next/dynamic";
import { useState } from "react";

const CameraModal = dynamic(() => import("../components/CameraModal"), { ssr: false });

type UseCameraUploadProps = {
  onImage: (event: { target: { files: File[] } }) => void;
};

export function useCameraUpload({ onImage }: UseCameraUploadProps) {
  const [cameraOpen, setCameraOpen] = useState(false);

  // Detect if mobile (simple check)
  const isMobile = typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent);

  const handleCameraClick = () => {
    if (isMobile) {
      // On mobile, trigger the file input with capture
      document.getElementById("cameraInput")?.click();
    } else {
      // On desktop, open the camera modal
      setCameraOpen(true);
    }
  };

  const handleCapture = (file: File) => {
    setCameraOpen(false);
    if (file) {
      // Simulate a file input event for uploadImage
      const event = { target: { files: [file] } };
      onImage(event);
    }
  };

  return {
    cameraOpen,
    setCameraOpen,
    handleCameraClick,
    handleCapture,
    CameraModal,
  };
}
