"use client";
import DisplayImage from "./components/DisplayImage";
import ColorThief from "colorthief";
import { useState, useEffect } from "react";
import { useCameraUpload } from "./hooks/useCameraUpload";
import { WebGLShader } from "../components/ui/web-gl-shader";

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [colorPalette, setColorPalette] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Add effect to handle initial loading
  useEffect(() => {
    setIsLoading(false);
  }, []);

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
    <div className="relative w-full overflow-hidden">
      {/* WebGL Background */}
      <div className="fixed inset-0 -top-40 sm:-top-60 z-0">
        <WebGLShader />
      </div>

        {/* Hero Section */}
        <section className="relative w-full flex flex-col items-center z-10">
          {/* Fixed height content area */}
          <div className="min-h-[45vh] w-full flex items-center justify-center pt-24 pb-8">
            <div className="w-full max-w-3xl mx-auto px-6 flex flex-col items-center text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-lg mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                Effortless Color Palette Generation
              </h1>
              <p className="text-lg sm:text-xl text-neutral-300 font-medium max-w-2xl mb-14">
                Upload an image and instantly get a beautiful, designer-grade palette for your next project. Fast, accurate, and premium; 50 Shades of Hue is your creative color companion.
              </p>
            </div>
          </div>

          {/* Button and Display Area - Scrollable Section */}
          <div className="w-full flex-1 flex flex-col items-center pb-32">
            {/* Button Group */}
            <div className="w-full max-w-lg space-y-8">
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {/* Upload Image Button */}
                <label htmlFor="file" className="relative flex-1 group">
                  {/* Outer glow and shadow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-white/5 blur-xl transform group-hover:scale-110 transition-all duration-300" />
                  
                  {/* Main button container */}
                  <div className="relative flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-xl shadow-[0_8px_20px_rgba(0,0,0,0.4),inset_0_2px_8px_rgba(255,255,255,0.4),inset_0_-2px_8px_rgba(0,0,0,0.2)] group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.5),inset_0_2px_12px_rgba(255,255,255,0.4),inset_0_-2px_12px_rgba(0,0,0,0.2)] text-white font-bold cursor-pointer text-lg overflow-hidden transition-all duration-300 group-hover:transform group-hover:scale-[1.02] group-hover:-translate-y-1 group-active:scale-95 group-active:translate-y-1">
                    {/* Light reflection effects */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent opacity-50" />
                    <div className="absolute inset-[-1px] bg-[radial-gradient(circle_at_50%_-20%,white,transparent_70%)] opacity-40" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.5),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Content */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 group-hover:scale-110 transition-transform relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">Upload Image</span>
                    <input type="file" id="file" hidden onChange={uploadImage} />
                  </div>
                </label>

                {/* Take Photo Button */}
                <button
                  type="button"
                  onClick={cameraUpload.handleCameraClick}
                  className="relative flex-1 group"
                >
                  {/* Outer glow and shadow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-400/30 to-blue-600/5 blur-xl transform group-hover:scale-110 transition-all duration-300" />
                  
                  {/* Main button container */}
                  <div className="relative flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-b from-blue-400/20 to-blue-600/5 backdrop-blur-xl shadow-[0_8px_20px_rgba(0,0,0,0.4),inset_0_2px_8px_rgba(59,130,246,0.4),inset_0_-2px_8px_rgba(0,0,0,0.2)] group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.5),inset_0_2px_12px_rgba(59,130,246,0.4),inset_0_-2px_12px_rgba(0,0,0,0.2)] text-white font-bold cursor-pointer text-lg overflow-hidden transition-all duration-300 group-hover:transform group-hover:scale-[1.02] group-hover:-translate-y-1 group-active:scale-95 group-active:translate-y-1">
                    {/* Light reflection effects */}
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-300/40 via-transparent to-transparent opacity-50" />
                    <div className="absolute inset-[-1px] bg-[radial-gradient(circle_at_50%_-20%,rgba(59,130,246,0.8),transparent_70%)] opacity-40" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.5),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Content */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 group-hover:scale-110 transition-transform relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                    <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">Take Photo</span>
                  </div>
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
              <div className="w-full max-w-xl mt-8">
                <div className="relative backdrop-blur-sm bg-black/20 rounded-2xl p-4 shadow-xl">
                  <DisplayImage
                    uploadedImage={uploadedImage}
                    colorPalette={colorPalette}
                  />
                </div>
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
  );
}
