"use client";

import { useState } from 'react';
import ColorThief from 'colorthief';
import tinycolor from 'tinycolor2';

interface Color {
  hex: string;
  rgb: [number, number, number];
  role: string;
}

interface SlideColors {
  background: string;
  header: string;
  footer: string;
  text: string;
  accent: string;
}

interface PresentationTheme {
  name: string;
  category: string;
  colors: SlideColors;
  description: string;
  keywords: string[];
}

const PRESET_THEMES: PresentationTheme[] = [
  {
    name: "Corporate Blue",
    category: "professional",
    description: "Classic professional look with trustworthy blue tones",
    colors: {
      background: "#FFFFFF",
      header: "#1B4F72",
      footer: "#2874A6",
      text: "#212F3C",
      accent: "#3498DB"
    },
    keywords: ["business", "corporate", "formal", "clean"]
  },
  {
    name: "Tech Noir",
    category: "tech",
    description: "Modern dark theme with vibrant accents",
    colors: {
      background: "#1E1E1E",
      header: "#2D2D2D",
      footer: "#2D2D2D",
      text: "#FFFFFF",
      accent: "#00FF9D"
    },
    keywords: ["modern", "startup", "innovative", "dark"]
  },
  {
    name: "Educational Warmth",
    category: "education",
    description: "Engaging and welcoming academic style",
    colors: {
      background: "#FEF9E7",
      header: "#D35400",
      footer: "#E67E22",
      text: "#34495E",
      accent: "#F39C12"
    },
    keywords: ["school", "learning", "friendly", "warm"]
  },
  {
    name: "Creative Agency",
    category: "creative",
    description: "Bold and artistic with strong contrasts",
    colors: {
      background: "#FFFFFF",
      header: "#8E44AD",
      footer: "#9B59B6",
      text: "#2C3E50",
      accent: "#E74C3C"
    },
    keywords: ["creative", "bold", "artistic", "dynamic"]
  },
  {
    name: "Organizational Clarity",
    category: "organizational",
    description: "Clean and structured for clear communication",
    colors: {
      background: "#F8F9F9",
      header: "#2E86C1",
      footer: "#3498DB",
      text: "#17202A",
      accent: "#27AE60"
    },
    keywords: ["organized", "structured", "clear", "professional"]
  },
  {
    name: "Minimalist Mono",
    category: "professional",
    description: "Elegant black and white with subtle accents",
    colors: {
      background: "#FFFFFF",
      header: "#2C3E50",
      footer: "#34495E",
      text: "#2C3E50",
      accent: "#95A5A6"
    },
    keywords: ["minimal", "elegant", "simple", "refined"]
  },
  {
    name: "Startup Vibrance",
    category: "tech",
    description: "Energetic and modern tech aesthetic",
    colors: {
      background: "#FAFAFA",
      header: "#6C5CE7",
      footer: "#A29BFE",
      text: "#2D3436",
      accent: "#00B894"
    },
    keywords: ["energetic", "modern", "vibrant", "tech"]
  },
  {
    name: "Academic Classic",
    category: "education",
    description: "Traditional academic style with a modern touch",
    colors: {
      background: "#FFFFFF",
      header: "#800000",
      footer: "#8B0000",
      text: "#333333",
      accent: "#C0392B"
    },
    keywords: ["traditional", "academic", "classic", "formal"]
  }
];

export default function PresentationPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [colors, setColors] = useState<Color[]>([]);
  const [baseColor, setBaseColor] = useState<string>("#4A90E2");
  const [slideColors, setSlideColors] = useState<SlideColors>({
    background: "#FFFFFF",
    header: "#4A90E2",
    footer: "#2C3E50",
    text: "#333333",
    accent: "#E74C3C"
  });

  const extractColors = (imageElement: HTMLImageElement) => {
    const colorThief = new ColorThief();
    const palette = colorThief.getPalette(imageElement, 5);
    
    const extractedColors = palette.map((rgb: number[]) => ({
      rgb: rgb as [number, number, number],
      hex: '#' + rgb.map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join(''),
      role: ''
    }));

    // Assign roles based on color properties
    const sortedColors = extractedColors.sort((a: Color, b: Color) => {
      const colorA = tinycolor(a.hex);
      const colorB = tinycolor(b.hex);
      return colorB.getBrightness() - colorA.getBrightness();
    });

    setColors(sortedColors);
    
    // Apply colors to slide
    setSlideColors({
      background: sortedColors[0].hex, // Brightest color for background
      header: sortedColors[1].hex,
      text: sortedColors[4].hex, // Darkest color for text
      footer: sortedColors[3].hex,
      accent: sortedColors[2].hex,
    });
  };

  const handleColorChange = (colorType: keyof SlideColors, value: string) => {
    setSlideColors(prev => ({
      ...prev,
      [colorType]: value
    }));
  };

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement> | { target: { files: File[] } }) => {
    const files = 'files' in event.target ? event.target.files : null;
    const file = files?.[0];
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen w-full py-16 px-4 bg-neutral-950">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Presentation Color Schemes
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Upload an image or choose colors to create a professional presentation color scheme.
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
            Upload Image
            <input type="file" id="file" hidden onChange={uploadImage} accept="image/*" />
          </label>

          <div className="inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-neutral-900 border border-neutral-800 text-white">
            <label htmlFor="baseColor" className="font-bold">
              Base Color:
            </label>
            <input
              type="color"
              id="baseColor"
              value={baseColor}
              onChange={(e) => {
                setBaseColor(e.target.value);
                const color = tinycolor(e.target.value);
                const scheme = {
                  background: color.lighten(45).toString(),
                  header: color.toString(),
                  footer: color.darken(20).toString(),
                  text: color.darken(40).toString(),
                  accent: color.complement().toString()
                };
                setSlideColors(scheme);
              }}
              className="w-12 h-8 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Original Image */}
          {uploadedImage && (
            <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800">
              <h2 className="text-xl font-bold text-white mb-4">Original Image</h2>
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Slide Preview */}
          <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800">
            <h2 className="text-xl font-bold text-white mb-4">Slide Preview</h2>
            <div 
              className="w-full aspect-[16/9] rounded-lg shadow-lg overflow-hidden"
              style={{ backgroundColor: slideColors.background }}
            >
              {/* Header */}
              <div 
                className="w-full h-[15%] px-8 flex items-center"
                style={{ backgroundColor: slideColors.header }}
              >
                <h3 style={{ color: tinycolor.mostReadable(slideColors.header, ['#fff', '#000']).toString() }}>
                  Presentation Title
                </h3>
              </div>

              {/* Content Area */}
              <div className="p-8 h-[70%] flex flex-col gap-4">
                <h4 style={{ color: slideColors.text }}>Section Heading</h4>
                <ul className="space-y-2">
                  <li style={{ color: slideColors.text }}>• Bullet point example</li>
                  <li style={{ color: slideColors.text }}>• With some sample text</li>
                </ul>
                {/* Sample Shape */}
                <div 
                  className="w-24 h-24 rounded-lg mt-auto ml-auto"
                  style={{ backgroundColor: slideColors.accent }}
                />
              </div>

              {/* Footer */}
              <div 
                className="w-full h-[15%] px-8 flex items-center justify-between"
                style={{ backgroundColor: slideColors.footer }}
              >
                <span style={{ color: tinycolor.mostReadable(slideColors.footer, ['#fff', '#000']).toString() }}>
                  Footer Text
                </span>
                <span style={{ color: tinycolor.mostReadable(slideColors.footer, ['#fff', '#000']).toString() }}>
                  Page 1
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Selector */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Presentation Themes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {PRESET_THEMES.map((theme, index) => (
              <button
                key={theme.name}
                onClick={() => setSlideColors(theme.colors)}
                className="p-6 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-all duration-300 text-left"
              >
                <div className="space-y-4">
                  {/* Theme Colors Preview */}
                  <div className="flex gap-2">
                    {Object.values(theme.colors).map((color, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-lg ring-1 ring-white/5"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  
                  {/* Theme Info */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-medium text-white">{theme.name}</h3>
                      <span className="px-2 py-0.5 bg-neutral-800 rounded text-xs text-neutral-400 capitalize">
                        {theme.category}
                      </span>
                    </div>
                    <p className="text-neutral-400 text-sm">{theme.description}</p>
                  </div>

                  {/* Keywords */}
                  <div className="flex flex-wrap gap-1">
                    {theme.keywords.map(keyword => (
                      <span
                        key={keyword}
                        className="px-2 py-0.5 bg-neutral-800 rounded-full text-xs text-neutral-400"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Color Controls */}
        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
          <h2 className="text-2xl font-bold text-white mb-6">Custom Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(slideColors).map(([role, color]) => (
              <div key={role} className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-white capitalize">{role}</span>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => handleColorChange(role as keyof SlideColors, e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                </div>
                <button
                  onClick={() => copyToClipboard(color)}
                  className="w-full p-2 bg-neutral-800 rounded text-neutral-300 text-sm font-mono hover:bg-neutral-700 transition-colors"
                >
                  {color}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}