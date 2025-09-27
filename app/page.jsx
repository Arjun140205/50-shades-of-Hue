"use client";
import DisplayImage from "./components/DisplayImage";
import ColorThief from "colorthief";
import { useState } from "react";
import { useCameraUpload } from "./hooks/useCameraUpload";
import { WebGLShader } from "../components/ui/web-gl-shader";

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
    <>
      <div className="w-full flex-1 relative min-h-[calc(100vh-4rem)]">
        {/* WebGL Background */}
        <div className="fixed inset-0 -top-80">
          <WebGLShader />
        </div>

        {/* Hero Section */}
        <section className="relative w-full flex flex-col items-center pt-16 pb-32 z-10">
          <div className="w-full max-w-3xl mx-auto px-6 flex flex-col items-center text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-lg mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
              Effortless Color Palette Generation
            </h1>
            <p className="text-lg text-neutral-300 font-medium max-w-2xl mb-12">
              Upload an image and instantly get a beautiful, designer-grade palette for your next project. Fast, accurate, and premium; 50 Shades of Hue is your creative color companion.
            </p>

            {/* Button Group */}
            <div className="w-full max-w-lg space-y-8">
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {/* Upload Image Button */}
                <label htmlFor="file" className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold shadow-lg hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-200 cursor-pointer text-lg group hover:bg-white/15">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 group-hover:scale-110 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  Upload Image
                  <input type="file" id="file" hidden onChange={uploadImage} />
                </label>

                {/* Take Photo Button */}
                <button
                  type="button"
                  className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-blue-600/80 backdrop-blur-sm border border-blue-500/30 text-white font-bold shadow-lg hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-200 cursor-pointer text-lg group hover:bg-blue-600"
                  onClick={cameraUpload.handleCameraClick}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 group-hover:scale-110 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                  </svg>
                  Take Photo
                </button>
              </div>

              {/* Helper Text */}
              <p className="text-neutral-400 text-sm">
                Click on the "Upload Image" button to select an image.
              </p>
            </div>

            {/* Hidden input for mobile camera capture */}
            <input type="file" id="cameraInput" accept="image/*" capture="environment" hidden onChange={uploadImage} />

            {/* Display Area */}
            {(uploadedImage || colorPalette) && (
              <div className="w-full max-w-xl mt-12 mb-20">
                <DisplayImage
                  uploadedImage={uploadedImage}
                  colorPalette={colorPalette}
                />
              </div>
            )}
          </div>
        </section>

        {/* Camera Modal for desktop */}
        <cameraUpload.CameraModal 
          open={cameraUpload.cameraOpen} 
          onClose={() => cameraUpload.setCameraOpen(false)} 
          onCapture={cameraUpload.handleCapture} 
        />
      </div>
    </>
  );
}
