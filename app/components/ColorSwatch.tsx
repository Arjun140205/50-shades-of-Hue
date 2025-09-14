"use client";

import React, { useState } from 'react';

interface ColorSwatchProps {
  color: {
    hex: string;
    rgb: [number, number, number];
  };
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ color }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color.hex).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const rgbString = `rgb(${color.rgb.join(', ')})`;

  return (
    <div
      className="group relative bg-neutral-800 rounded-xl overflow-hidden transition-transform hover:scale-105"
      onClick={copyToClipboard}
    >
      <div
        className="w-full aspect-square"
        style={{ backgroundColor: color.hex }}
      />
      <div className="p-4">
        <p className="font-mono text-sm text-white mb-1">{color.hex}</p>
        <p className="font-mono text-xs text-neutral-400">{rgbString}</p>
      </div>

      {/* Copy Feedback */}
      <div
        className={`absolute inset-0 bg-black/70 flex items-center justify-center transition-opacity ${
          copied ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="text-white font-medium">Copied!</span>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span className="text-white text-sm font-medium">Click to copy</span>
      </div>
    </div>
  );
};

export default ColorSwatch;