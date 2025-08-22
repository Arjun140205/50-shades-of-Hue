import React, { useRef, useEffect, useState, type MutableRefObject } from "react";

type CameraModalProps = {
  open: boolean;
  onClose: () => void;
  onCapture: (file: File) => void;
};

export default function CameraModal({ open, onClose, onCapture }: CameraModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open && typeof window !== "undefined" && navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((mediaStream) => {
          setStream(mediaStream);
          if (videoRef.current) {
            (videoRef.current as HTMLVideoElement).srcObject = mediaStream;
          }
        })
        .catch(() => setError("Camera access denied or unavailable."));
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleCapture = () => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = (video as HTMLVideoElement).videoWidth;
    canvas.height = (video as HTMLVideoElement).videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "captured.jpg", { type: "image/jpeg" });
          onCapture(file);
        }
      }, "image/jpeg");
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-neutral-900 rounded-2xl shadow-xl p-6 flex flex-col items-center gap-4 relative w-[90vw] max-w-md">
        <button onClick={onClose} className="absolute top-3 right-3 text-white text-2xl">×</button>
        <div className="w-full flex flex-col items-center">
          {error ? (
            <div className="text-red-400 font-semibold">{error}</div>
          ) : (
            <video ref={videoRef} autoPlay playsInline className="rounded-lg w-full h-64 object-cover bg-black" />
          )}
        </div>
        <button
          onClick={handleCapture}
          className="mt-4 px-6 py-3 rounded-lg bg-blue-600 text-white font-bold text-lg shadow hover:bg-blue-700 transition"
        >
          Capture Photo
        </button>
      </div>
    </div>
  );
}
