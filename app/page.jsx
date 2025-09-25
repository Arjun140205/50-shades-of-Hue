"use client";

import DisplayImage from "./components/DisplayImage";
import ColorThief from "colorthief";
import { useState } from "react";
import { useCameraUpload } from "./hooks/useCameraUpload";

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [colorPalette, setColorPalette] = useState(null);

  const uploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (event) => {
      const img = new Image();
      img.onload = () => {
        const colorThief = new ColorThief();
        const colorPalette = colorThief.getPalette(img, 10);
        setUploadedImage(event.target.result);
        setColorPalette(colorPalette);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const cameraUpload = useCameraUpload({ onImage: uploadImage });

  return (
    <section className="w-full flex flex-col items-center justify-center min-h-[80vh] pt-10 pb-10 overflow-x-hidden bg-neutral-950">
      {/* Hero Section */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-14 px-4 md:px-14 py-12">
        <div className="flex-1 flex flex-col gap-7 items-start">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-sm">Effortless Color Palette Generation</h1>
          <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl font-medium">Upload an image and instantly get a beautiful, designer-grade palette for your next project. Fast, accurate, and premium; 50 Shades of Hue is your creative color companion.</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            {/* Upload Image Button */}
            <label htmlFor="file" className="inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-bold shadow-lg hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-200 cursor-pointer text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5v-9m0 0L8.25 7.5m3.75-3.75L15.75 7.5M12 7.5v9m0 0l3.75-3.75M12 16.5l-3.75-3.75" />
              </svg>
              Upload Image
              <input type="file" id="file" hidden onChange={uploadImage} />
            </label>
            {/* Take Photo Button */}
            <button
              type="button"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-blue-700 border border-blue-800 text-white font-bold shadow-lg hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-200 cursor-pointer text-lg"
              onClick={cameraUpload.handleCameraClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Take Photo
            </button>
            {/* Hidden input for mobile camera capture */}
            <input type="file" id="cameraInput" accept="image/*" capture="environment" hidden onChange={uploadImage} />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center w-full max-w-xl mx-auto">
          <DisplayImage
            uploadedImage={uploadedImage}
            colorPalette={colorPalette}
          />
        </div>
      </div>
      {/* Camera Modal for desktop */}
      <cameraUpload.CameraModal open={cameraUpload.cameraOpen} onClose={() => cameraUpload.setCameraOpen(false)} onCapture={cameraUpload.handleCapture} />
    </section>
  );
}
