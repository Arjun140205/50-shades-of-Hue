"use client";

import { useState } from 'react';
import ColorThief from 'colorthief';
import { useCameraUpload } from '../../hooks/useCameraUpload';
import RoomVisualization from '../../components/RoomVisualization';
import ColorSwatch from '../../components/ColorSwatch';

interface Color {
  hex: string;
  rgb: [number, number, number];
}

export default function HomeInteriorPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [colors, setColors] = useState<Color[]>([]);

  const extractColors = (imageElement: HTMLImageElement) => {
    const colorThief = new ColorThief();
    const palette = colorThief.getPalette(imageElement, 4);
    
    const extractedColors = palette.map(rgb => ({
      rgb: rgb as [number, number, number],
      hex: '#' + rgb.map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('')
    }));
    
    setColors(extractedColors);
  };

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      if (!event.target?.result) return;
      
      const img = new Image();
      img.onload = () => {
        extractColors(img);
        setUploadedImage(event.target?.result as string);
      };
      img.src = event.target.result as string;
    };
    reader.readAsDataURL(file);
  };

  const cameraUpload = useCameraUpload({ onImage: uploadImage });

  return (
    <div className="min-h-screen w-full py-16 px-4 bg-neutral-950">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Room Color Visualization
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Upload a photo of your room to see how different color combinations would look on your walls.
          </p>
        </div>

        {/* Upload Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <label
            htmlFor="file"
            className="inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-bold shadow-lg hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-200 cursor-pointer text-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5v-9m0 0L8.25 7.5m3.75-3.75L15.75 7.5M12 7.5v9m0 0l3.75-3.75M12 16.5l-3.75-3.75"
              />
            </svg>
            Upload Room Photo
            <input type="file" id="file" hidden onChange={uploadImage} accept="image/*" />
          </label>

          <button
            type="button"
            className="inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-blue-700 border border-blue-800 text-white font-bold shadow-lg hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-200 cursor-pointer text-lg"
            onClick={cameraUpload.handleCameraClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Take Photo
          </button>
          <input
            type="file"
            id="cameraInput"
            accept="image/*"
            capture="camera"
            hidden
            onChange={uploadImage}
          />
        </div>

        {/* Content Area */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Original Image */}
          {uploadedImage && (
            <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800">
              <h2 className="text-xl font-bold text-white mb-4">Original Room</h2>
              <img
                src={uploadedImage}
                alt="Uploaded room"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Room Visualization */}
          {colors.length > 0 && (
            <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800">
              <h2 className="text-xl font-bold text-white mb-4">Color Visualization</h2>
              <RoomVisualization colors={colors} />
            </div>
          )}
        </div>

        {/* Color Swatches */}
        {colors.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Extracted Colors</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {colors.map((color, index) => (
                <ColorSwatch key={index} color={color} />
              ))}
            </div>
          </div>
        )}
      </div>

      {cameraUpload.cameraOpen && (
        <cameraUpload.CameraModal
          open={cameraUpload.cameraOpen}
          onClose={() => cameraUpload.setCameraOpen(false)}
          onCapture={cameraUpload.handleCapture}
        />
      )}
    </div>
  );
}