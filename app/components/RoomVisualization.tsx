"use client";

import React from 'react';
import tinycolor from 'tinycolor2';

interface Color {
  hex: string;
  rgb: [number, number, number];
}

interface WallColors {
  left: string;
  right: string;
  center: string;
  trim: string;
  accent: string;
}

interface ColorScheme {
  name: string;
  description: string;
  style: string;
  walls: WallColors;
  moodKeywords: string[];
}

interface RoomVisualizationProps {
  colors: Color[];
}

const generateColorSchemes = (baseColors: Color[]): ColorScheme[] => {
  const schemes: ColorScheme[] = [];
  const primaryColor = tinycolor(baseColors[0].hex);
  
  // Helper function to ensure colors are visually pleasing
  const adjustColor = (color: tinycolor.Instance): tinycolor.Instance => {
    if (color.getBrightness() < 30) return color.lighten(10);
    if (color.getBrightness() > 240) return color.darken(10);
    return color;
  };

  // Helper function to create warmer version of a color
  const warmify = (color: tinycolor.Instance): tinycolor.Instance => {
    return color.spin(5).saturate(5);
  };

  // 1. Monochromatic Elegance
  schemes.push({
    name: "Monochromatic Elegance",
    description: "Sophisticated depth with tonal variations",
    style: "modern",
    moodKeywords: ["sophisticated", "calm", "minimalist"],
    walls: {
      center: primaryColor.toString(),
      left: primaryColor.clone().darken(7).toString(),
      right: primaryColor.clone().lighten(7).toString(),
      trim: primaryColor.clone().darken(15).toString(),
      accent: primaryColor.clone().saturate(10).toString()
    }
  });

  // 2. Complementary Drama
  const complement = primaryColor.complement();
  schemes.push({
    name: "Complementary Drama",
    description: "Bold statement with balanced contrasts",
    style: "contemporary",
    moodKeywords: ["dramatic", "bold", "striking"],
    walls: {
      center: complement.toString(),
      left: adjustColor(primaryColor).toString(),
      right: adjustColor(primaryColor).toString(),
      trim: tinycolor.mix(primaryColor, complement, 50).darken(10).toString(),
      accent: complement.saturate(10).toString()
    }
  });

  // 3. Natural Harmony
  const analogous = primaryColor.analogous(5);
  schemes.push({
    name: "Natural Harmony",
    description: "Peaceful flow inspired by nature",
    style: "organic",
    moodKeywords: ["peaceful", "natural", "balanced"],
    walls: {
      center: analogous[2].toString(),
      left: analogous[1].toString(),
      right: analogous[3].toString(),
      trim: analogous[0].darken(5).toString(),
      accent: analogous[4].saturate(10).toString()
    }
  });

  // 4. Rich Contrast
  if (baseColors.length > 1) {
    const secondaryColor = tinycolor(baseColors[1].hex);
    schemes.push({
      name: "Rich Contrast",
      description: "Dynamic interplay of extracted colors",
      style: "eclectic",
      moodKeywords: ["vibrant", "energetic", "unique"],
      walls: {
        center: adjustColor(secondaryColor).toString(),
        left: adjustColor(primaryColor).toString(),
        right: tinycolor.mix(primaryColor, secondaryColor, 30).toString(),
        trim: tinycolor.mix(primaryColor, secondaryColor, 70).darken(10).toString(),
        accent: secondaryColor.saturate(15).toString()
      }
    });
  }

  // 5. Cozy Warmth
  schemes.push({
    name: "Cozy Warmth",
    description: "Warm and inviting atmosphere",
    style: "traditional",
    moodKeywords: ["warm", "inviting", "comfortable"],
    walls: {
      center: warmify(primaryColor).toString(),
      left: warmify(primaryColor.clone()).darken(5).toString(),
      right: warmify(primaryColor.clone()).lighten(5).toString(),
      trim: warmify(primaryColor.clone()).darken(15).toString(),
      accent: warmify(primaryColor.clone()).saturate(20).toString()
    }
  });

  // 6. Split Complementary
  const splitComplements = primaryColor.splitcomplement();
  schemes.push({
    name: "Creative Energy",
    description: "Balanced yet energetic color story",
    style: "artistic",
    moodKeywords: ["creative", "dynamic", "expressive"],
    walls: {
      center: adjustColor(splitComplements[0]).toString(),
      left: adjustColor(splitComplements[1]).toString(),
      right: adjustColor(splitComplements[2]).toString(),
      trim: tinycolor.mix(splitComplements[1], splitComplements[2], 50).darken(10).toString(),
      accent: primaryColor.saturate(20).toString()
    }
  });

  return schemes;
};

const RoomVisualization: React.FC<RoomVisualizationProps> = ({ colors }) => {
  const [selectedScheme, setSelectedScheme] = React.useState<number>(0);
  const colorSchemes = generateColorSchemes(colors);
  const currentScheme = colorSchemes[selectedScheme];

  return (
    <div className="space-y-6">
      {/* Room Preview */}
      <div className="room-container w-full aspect-[16/9] relative rounded-xl overflow-hidden shadow-2xl">
        <div
          className="room w-full h-full relative"
          style={{
            perspective: '2000px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Center Wall */}
          <div
            className="absolute top-[5%] left-[15%] right-[15%] bottom-[5%] transform-gpu"
            style={{
              backgroundColor: currentScheme.walls.center,
              boxShadow: 'inset 0 0 80px rgba(0,0,0,0.2)',
            }}
          >
            {/* Wall Trim */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-[5%]"
              style={{ 
                backgroundColor: currentScheme.walls.trim,
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
          </div>

          {/* Left Wall */}
          <div
            className="absolute top-[5%] left-0 w-[15%] bottom-[5%] transform-gpu origin-right"
            style={{
              backgroundColor: currentScheme.walls.left,
              transform: 'rotateY(45deg)',
              boxShadow: 'inset -15px 0 30px rgba(0,0,0,0.25)',
            }}
          >
            {/* Wall Trim */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-[5%]"
              style={{ 
                backgroundColor: currentScheme.walls.trim,
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
          </div>

          {/* Right Wall */}
          <div
            className="absolute top-[5%] right-0 w-[15%] bottom-[5%] transform-gpu origin-left"
            style={{
              backgroundColor: currentScheme.walls.right,
              transform: 'rotateY(-45deg)',
              boxShadow: 'inset 15px 0 30px rgba(0,0,0,0.25)',
            }}
          >
            {/* Wall Trim */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-[5%]"
              style={{ 
                backgroundColor: currentScheme.walls.trim,
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
          </div>

          {/* Floor */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[5%]"
            style={{
              background: 'linear-gradient(45deg, #2a2a2a 0%, #3a3a3a 100%)',
            }}
          />

          {/* Ceiling */}
          <div
            className="absolute top-0 left-0 right-0 h-[5%]"
            style={{
              backgroundColor: '#ffffff',
              boxShadow: 'inset 0 -10px 20px rgba(0,0,0,0.1)',
            }}
          />

          {/* Ambient Light Effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, transparent 50%, rgba(0,0,0,0.1) 100%)',
            }}
          />
        </div>
      </div>

      {/* Color Scheme Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {colorSchemes.map((scheme, index) => (
          <button
            key={scheme.name}
            onClick={() => setSelectedScheme(index)}
            className={`p-4 rounded-xl transition-all duration-300 ${
              selectedScheme === index
                ? 'bg-neutral-800 ring-2 ring-blue-500 shadow-lg'
                : 'bg-neutral-900 hover:bg-neutral-800 hover:shadow-md'
            }`}
          >
            <div className="space-y-4">
              {/* Header Section with Title and Style */}
              <div className="space-y-2">
                <h3 className="text-lg text-white font-medium leading-tight">{scheme.name}</h3>
                <span className="inline-block px-3 py-1 bg-neutral-700 rounded-md text-xs font-medium text-neutral-300">
                  {scheme.style}
                </span>
              </div>
              
              {/* Color Swatches */}
              <div className="flex flex-wrap gap-2 p-2 bg-neutral-950/30 rounded-lg">
                {Object.entries(scheme.walls).map(([key, color]) => (
                  <div key={key} className="relative group">
                    <div
                      className="w-10 h-10 rounded-lg shadow-sm ring-1 ring-white/5"
                      style={{ backgroundColor: color }}
                    />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <p className="text-neutral-400 text-sm min-h-[2.5rem]">{scheme.description}</p>

              {/* Keywords */}
              <div className="flex flex-wrap gap-1.5">
                {scheme.moodKeywords.map((keyword) => (
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
  );
};

export default RoomVisualization;