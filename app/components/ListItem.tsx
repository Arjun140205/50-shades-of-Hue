'use client'


import React, { useState } from "react";
import { getColorName } from "../utils/getColorName";

interface UploadedListItemProps {
  hex: string;
  rgb: string;
}



function rgbToRgba(rgb: string, alpha = 1): string {
  // rgb(255, 255, 255) => rgba(255,255,255,1)
  const match = rgb.match(/\d+/g);
  if (!match) return rgb;
  return `rgba(${match[0]}, ${match[1]}, ${match[2]}, ${alpha})`;
}

function ListItem({ hex, rgb }: UploadedListItemProps) {
  const [copied, setCopied] = useState(false);
  const colorName = getColorName(hex);
  const rgba = rgbToRgba(rgb, 1);

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <li
      className="relative w-full min-h-[120px] flex flex-col md:flex-row items-center md:items-stretch justify-center group cursor-pointer rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 shadow-2xl overflow-hidden"
    >
      {/* Card shadow and floating effect */}
      <div className="absolute inset-0 z-0 rounded-3xl shadow-2xl group-hover:scale-105 group-hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.32)] transition-all duration-300" />
      {/* Card content */}
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center md:items-center justify-between rounded-3xl p-0">
        {/* Artistic color swatch with border and floating accent */}
        <div className="flex flex-col items-center justify-center md:justify-center md:items-center md:w-1/3 py-6 md:py-0">
          <div className="relative flex items-center justify-center">
            <div className="absolute -inset-2 rounded-full bg-white/5 blur-md" />
            <div className="w-20 h-20 rounded-full border-4 border-white/20 shadow-xl" style={{ background: rgb, boxShadow: `0 4px 32px 0 ${rgb}55` }} />
          </div>
        </div>
        {/* Info section */}
        <div className="flex-1 flex flex-col items-center md:items-start justify-center px-5 py-4 gap-2">
          <div className="text-xl font-black text-white tracking-tight capitalize text-center md:text-left drop-shadow-sm mb-1" style={{ letterSpacing: '-0.01em' }}>{colorName}</div>
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 w-full">
            <span className="font-mono text-xs text-neutral-400 select-all">{hex}</span>
            <span className="font-mono text-xs text-neutral-500 select-all">{rgba}</span>
          </div>
        </div>
        {/* Copy button */}
        <div className="flex items-center justify-center md:justify-end md:items-center px-6 py-4 md:py-0 md:px-8">
          <button
            className="p-2 rounded-full bg-neutral-800 hover:bg-primary/80 transition-colors text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => copyToClipboard(hex)}
            title="Copy hex code"
          >
            {copied ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-400 animate-pulse">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity">
                <rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </li>
  );
}

export default ListItem;
