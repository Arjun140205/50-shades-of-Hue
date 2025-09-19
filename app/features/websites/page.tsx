"use client";

import { useState } from 'react';
import ColorThief from 'colorthief';
import tinycolor from 'tinycolor2';

interface Color {
  hex: string;
  rgb: [number, number, number];
}

interface WebsiteColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  muted: string;
  surface: string;
}

interface WebsiteTheme {
  name: string;
  category: string;
  colors: WebsiteColors;
  description: string;
  keywords: string[];
  gradients?: {
    primary: string;
    accent: string;
  };
  effects?: {
    buttonGlow?: boolean;
    gradientBg?: boolean;
    glassmorphism?: boolean;
  };
}

const PRESET_THEMES: WebsiteTheme[] = [
  {
    name: "Corporate Clean",
    category: "professional",
    description: "Professional and trustworthy design for business websites",
    colors: {
      primary: "#2563EB",
      secondary: "#3B82F6",
      accent: "#60A5FA",
      background: "#FFFFFF",
      text: "#1F2937",
      muted: "#6B7280",
      surface: "#F3F4F6"
    },
    keywords: ["business", "corporate", "professional", "clean"],
    effects: {
      buttonGlow: false,
      gradientBg: false,
      glassmorphism: false
    }
  },
  {
    name: "Tech Edge",
    category: "technological",
    description: "Modern tech aesthetic with neon accents",
    colors: {
      primary: "#00FF9D",
      secondary: "#00B8FF",
      accent: "#7C3AED",
      background: "#0F172A",
      text: "#FFFFFF",
      muted: "#94A3B8",
      surface: "#1E293B"
    },
    keywords: ["tech", "modern", "dark", "neon"],
    gradients: {
      primary: "linear-gradient(135deg, #00FF9D 0%, #00B8FF 100%)",
      accent: "linear-gradient(135deg, #7C3AED 0%, #C026D3 100%)"
    },
    effects: {
      buttonGlow: true,
      gradientBg: true,
      glassmorphism: true
    }
  },
  {
    name: "Minimal Essence",
    category: "subtle",
    description: "Clean minimalist design with soft colors",
    colors: {
      primary: "#6B7280",
      secondary: "#9CA3AF",
      accent: "#D1D5DB",
      background: "#F9FAFB",
      text: "#374151",
      muted: "#9CA3AF",
      surface: "#FFFFFF"
    },
    keywords: ["minimal", "clean", "subtle", "soft"],
    effects: {
      buttonGlow: false,
      gradientBg: false,
      glassmorphism: false
    }
  },
  {
    name: "Animated Vibrancy",
    category: "animatic",
    description: "Bold and energetic with animated elements",
    colors: {
      primary: "#F472B6",
      secondary: "#8B5CF6",
      accent: "#3B82F6",
      background: "#0F172A",
      text: "#FFFFFF",
      muted: "#94A3B8",
      surface: "#1E293B"
    },
    keywords: ["animated", "bold", "vibrant", "energetic"],
    gradients: {
      primary: "linear-gradient(135deg, #F472B6 0%, #8B5CF6 100%)",
      accent: "linear-gradient(135deg, #3B82F6 0%, #2DD4BF 100%)"
    },
    effects: {
      buttonGlow: true,
      gradientBg: true,
      glassmorphism: true
    }
  }
];

export default function WebsitePage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [colors, setColors] = useState<Color[]>([]);
  const [baseColor, setBaseColor] = useState<string>("#3B82F6");
  const [currentTheme, setCurrentTheme] = useState<WebsiteTheme>(PRESET_THEMES[0]);
  const [websiteColors, setWebsiteColors] = useState<WebsiteColors>(PRESET_THEMES[0].colors);

  const extractColors = (imageElement: HTMLImageElement) => {
    const colorThief = new ColorThief();
    const palette = colorThief.getPalette(imageElement, 5);
    
    const extractedColors = palette.map((rgb: number[]) => ({
      rgb: rgb as [number, number, number],
      hex: '#' + rgb.map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('')
    }));

    // Sort colors by brightness
    const sortedColors = extractedColors.sort((a: Color, b: Color) => {
      const colorA = tinycolor(a.hex);
      const colorB = tinycolor(b.hex);
      return colorB.getBrightness() - colorA.getBrightness();
    });

    setColors(sortedColors);
    
    // Apply colors to website
    setWebsiteColors({
      background: sortedColors[0].hex,
      primary: sortedColors[2].hex,
      secondary: sortedColors[3].hex,
      accent: sortedColors[1].hex,
      text: sortedColors[4].hex,
      muted: tinycolor(sortedColors[4].hex).setAlpha(0.6).toString(),
      surface: tinycolor(sortedColors[0].hex).darken(5).toString()
    });
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
            Website Color Schemes
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Generate beautiful color schemes for your website from images or custom colors.
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
                setWebsiteColors({
                  primary: color.toString(),
                  secondary: color.lighten(10).toString(),
                  accent: color.complement().toString(),
                  background: color.lighten(45).toString(),
                  text: color.darken(40).toString(),
                  muted: color.darken(20).setAlpha(0.6).toString(),
                  surface: color.lighten(40).toString()
                });
              }}
              className="w-12 h-8 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Theme Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {PRESET_THEMES.map((theme) => (
            <button
              key={theme.name}
              onClick={() => {
                setCurrentTheme(theme);
                setWebsiteColors(theme.colors);
              }}
              className={`p-4 rounded-xl transition-all duration-300 ${
                currentTheme.name === theme.name
                  ? 'bg-neutral-800 ring-2 ring-blue-500'
                  : 'bg-neutral-900 hover:bg-neutral-800'
              }`}
            >
              <div className="space-y-3">
                <div className="flex gap-2">
                  {Object.values(theme.colors).slice(0, 5).map((color, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full ring-1 ring-white/10"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="text-left">
                  <h3 className="text-white font-medium">{theme.name}</h3>
                  <p className="text-neutral-400 text-sm">{theme.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Website Preview */}
        <div className="bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden mb-12">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">Website Preview</h2>
            
            {/* Preview Container */}
            <div 
              className="rounded-lg overflow-hidden shadow-2xl"
              style={{ 
                backgroundColor: websiteColors.background,
                color: websiteColors.text
              }}
            >
              {/* Navbar */}
              <nav 
                className="px-6 py-4"
                style={{ backgroundColor: websiteColors.surface }}
              >
                <div className="flex items-center justify-between">
                  <div className="font-bold text-lg" style={{ color: websiteColors.primary }}>
                    Brand Logo
                  </div>
                  <div className="flex gap-6">
                    {['Home', 'Features', 'Pricing', 'Contact'].map(link => (
                      <a 
                        key={link} 
                        href="#"
                        className="transition-colors duration-200"
                        style={{ color: websiteColors.muted }}
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              </nav>

              {/* Hero Section */}
              <div 
                className="px-8 py-24"
                style={{
                  background: currentTheme.effects?.gradientBg 
                    ? currentTheme.gradients?.primary 
                    : websiteColors.background
                }}
              >
                <div className="max-w-4xl mx-auto text-center space-y-6">
                  <h1 className="text-5xl font-black">
                    Your Website Title Here
                  </h1>
                  <p className="text-xl" style={{ color: websiteColors.muted }}>
                    A compelling subtitle that explains your value proposition in a clear and engaging way.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button
                      className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                        currentTheme.effects?.buttonGlow ? 'shadow-lg hover:shadow-2xl' : ''
                      }`}
                      style={{
                        background: currentTheme.effects?.gradientBg 
                          ? currentTheme.gradients?.accent 
                          : websiteColors.primary,
                        color: tinycolor.mostReadable(websiteColors.primary, ['#fff', '#000'])?.toString()
                      }}
                    >
                      Primary CTA
                    </button>
                    <button
                      className="px-6 py-3 rounded-lg font-medium border-2 transition-opacity hover:opacity-80"
                      style={{
                        borderColor: websiteColors.secondary,
                        color: websiteColors.secondary
                      }}
                    >
                      Secondary CTA
                    </button>
                  </div>
                </div>
              </div>

              {/* Feature Cards */}
              <div className="px-8 py-16">
                <div className="grid grid-cols-3 gap-6">
                  {[1, 2, 3].map(i => (
                    <div 
                      key={i}
                      className={`p-6 rounded-xl ${
                        currentTheme.effects?.glassmorphism 
                          ? 'backdrop-blur-md bg-white/10' 
                          : ''
                      }`}
                      style={{ 
                        backgroundColor: currentTheme.effects?.glassmorphism 
                          ? 'transparent' 
                          : websiteColors.surface 
                      }}
                    >
                      <div 
                        className="w-12 h-12 rounded-lg mb-4"
                        style={{ backgroundColor: websiteColors.accent }}
                      />
                      <h3 className="text-lg font-bold mb-2">Feature {i}</h3>
                      <p style={{ color: websiteColors.muted }}>
                        A brief description of this amazing feature and its benefits.
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <footer
                className="px-8 py-12"
                style={{ backgroundColor: websiteColors.surface }}
              >
                <div className="flex justify-between items-center">
                  <div className="font-bold" style={{ color: websiteColors.primary }}>
                    Brand Logo
                  </div>
                  <div className="flex gap-6" style={{ color: websiteColors.muted }}>
                    {['Privacy', 'Terms', 'Contact'].map(link => (
                      <a 
                        key={link} 
                        href="#"
                        className="hover:opacity-80 transition-opacity"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>

        {/* Color Controls */}
        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
          <h2 className="text-2xl font-bold text-white mb-6">Color Scheme</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {Object.entries(websiteColors).map(([role, color]) => (
              <div key={role} className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-white capitalize">{role}</span>
                  <input
                    type="color"
                    value={color.startsWith('#') ? color : '#000000'}
                    onChange={(e) => {
                      setWebsiteColors(prev => ({
                        ...prev,
                        [role]: e.target.value
                      }));
                    }}
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