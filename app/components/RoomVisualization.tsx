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
  
  // Get extracted colors
  const color1 = tinycolor(baseColors[0].hex);
  const color2 = baseColors.length > 1 ? tinycolor(baseColors[1].hex) : color1.clone();
  const color3 = baseColors.length > 2 ? tinycolor(baseColors[2].hex) : color1.clone();
  const color4 = baseColors.length > 3 ? tinycolor(baseColors[3].hex) : color2.clone();
  
  // Helper to lighten extracted colors for walls
  const makeWallColor = (color: tinycolor.Instance, amount = 25): string => {
    const lightened = color.clone().lighten(amount);
    // Ensure it's light enough for walls
    if (lightened.getBrightness() < 180) {
      return lightened.lighten(10).toString();
    }
    return lightened.toString();
  };

  // 1. Scandinavian White - Uses extracted color as accent
  schemes.push({
    name: "Scandinavian White",
    description: "Crisp whites with your room's color as accent",
    style: "scandinavian",
    moodKeywords: ["bright", "airy", "minimal"],
    walls: {
      center: '#F7F7F5',
      left: '#EEEEEC',
      right: '#FAFAF8',
      trim: '#FFFFFF',
      accent: makeWallColor(color1, 15)
    }
  });

  // 2. Modern Sage - Uses extracted color blended with sage
  schemes.push({
    name: "Modern Sage",
    description: "Calming sage greens paired with your palette",
    style: "contemporary",
    moodKeywords: ["natural", "fresh", "calming"],
    walls: {
      center: '#B8C5B0',
      left: makeWallColor(color1, 30),
      right: '#C8D5C0',
      trim: '#F5F5F0',
      accent: color1.clone().toString()
    }
  });

  // 3. Warm Terracotta - Uses extracted color as one wall
  schemes.push({
    name: "Warm Terracotta",
    description: "Mediterranean warmth featuring your room's tones",
    style: "mediterranean",
    moodKeywords: ["warm", "earthy", "inviting"],
    walls: {
      center: '#E4B5A0',
      left: makeWallColor(color2, 25),
      right: '#F4C5B0',
      trim: '#FFF8F0',
      accent: color2.clone().toString()
    }
  });

  // 4. Coastal Blue - Uses extracted color as accent
  schemes.push({
    name: "Coastal Blue",
    description: "Ocean-inspired blues with your color accents",
    style: "coastal",
    moodKeywords: ["tranquil", "airy", "refreshing"],
    walls: {
      center: '#C5D5E0',
      left: '#B5C5D0',
      right: makeWallColor(color1, 30),
      trim: '#FFFFFF',
      accent: color1.clone().toString()
    }
  });

  // 5. Soft Greige - Uses extracted color as center wall
  schemes.push({
    name: "Soft Greige",
    description: "Timeless neutrals anchored by your room's color",
    style: "transitional",
    moodKeywords: ["versatile", "timeless", "elegant"],
    walls: {
      center: makeWallColor(color1, 28),
      left: '#C9C0B5',
      right: '#E9E0D5',
      trim: '#FFFFFF',
      accent: color1.clone().toString()
    }
  });

  // 6. Blush & Cream - Uses extracted color as side wall
  schemes.push({
    name: "Blush & Cream",
    description: "Gentle pinks complemented by your palette",
    style: "romantic",
    moodKeywords: ["soft", "elegant", "feminine"],
    walls: {
      center: '#F5E6E8',
      left: makeWallColor(color3, 30),
      right: '#FFF6F8',
      trim: '#FFFFFF',
      accent: color3.clone().toString()
    }
  });

  // 7. Moody Charcoal - Uses extracted color as accent
  schemes.push({
    name: "Moody Charcoal",
    description: "Dramatic grays with bold color accents",
    style: "industrial",
    moodKeywords: ["dramatic", "modern", "bold"],
    walls: {
      center: '#4A5568',
      left: '#3A4558',
      right: '#5A6578',
      trim: '#2D3748',
      accent: color2.clone().saturate(20).toString()
    }
  });

  // 8. Warm Honey - Uses extracted color as center wall
  schemes.push({
    name: "Warm Honey",
    description: "Golden warmth featuring your room's tones",
    style: "traditional",
    moodKeywords: ["rich", "warm", "cozy"],
    walls: {
      center: makeWallColor(color2, 25),
      left: '#D8C5A8',
      right: '#F8E5C8',
      trim: '#FFF8F0',
      accent: color2.clone().toString()
    }
  });

  // 9. Lavender Mist - Uses extracted color as side wall
  schemes.push({
    name: "Lavender Mist",
    description: "Dreamy lavenders with your color harmony",
    style: "contemporary",
    moodKeywords: ["calming", "dreamy", "soft"],
    walls: {
      center: '#D5D0E0',
      left: makeWallColor(color4, 30),
      right: '#E5E0F0',
      trim: '#FFFFFF',
      accent: color4.clone().toString()
    }
  });

  // 10. Earthy Tones - Uses multiple extracted colors
  schemes.push({
    name: "Earthy Tones",
    description: "Natural palette built from your room's colors",
    style: "organic",
    moodKeywords: ["natural", "grounded", "harmonious"],
    walls: {
      center: makeWallColor(color1, 25),
      left: makeWallColor(color2, 28),
      right: makeWallColor(color3, 30),
      trim: '#F5F5F0',
      accent: color1.clone().toString()
    }
  });

  // 11. Navy & Ivory - Uses extracted color as accent
  schemes.push({
    name: "Navy & Ivory",
    description: "Classic navy with your color as statement accent",
    style: "classic",
    moodKeywords: ["timeless", "elegant", "refined"],
    walls: {
      center: '#2C3E50',
      left: '#1C2E40',
      right: '#3C4E60',
      trim: '#FFFEF7',
      accent: color1.clone().saturate(15).toString()
    }
  });

  // 12. Vibrant Mix - Uses all extracted colors
  schemes.push({
    name: "Vibrant Mix",
    description: "Dynamic blend of all your room's colors",
    style: "eclectic",
    moodKeywords: ["vibrant", "unique", "energetic"],
    walls: {
      center: makeWallColor(color1, 25),
      left: makeWallColor(color2, 25),
      right: makeWallColor(color3, 25),
      trim: '#FFFFFF',
      accent: color4.clone().toString()
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
      <div className="room-container w-full aspect-[4/3] sm:aspect-[16/10] relative rounded-xl overflow-hidden shadow-2xl bg-neutral-950">
        <div
          className="room w-full h-full relative"
          style={{
            perspective: '1200px',
            perspectiveOrigin: '50% 45%',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Back Wall (Center) - More realistic depth */}
          <div
            className="absolute transform-gpu"
            style={{
              top: '10%',
              left: '20%',
              width: '60%',
              height: '65%',
              backgroundColor: currentScheme.walls.center,
              transform: 'translateZ(-150px) scale(1.15)',
              boxShadow: 'inset 0 0 100px rgba(0,0,0,0.3), 0 10px 40px rgba(0,0,0,0.4)',
            }}
          >
            {/* Baseboard */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-[8%]"
              style={{ 
                backgroundColor: currentScheme.walls.trim,
                boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.3), 0 -2px 4px rgba(0,0,0,0.2)'
              }}
            />
            {/* Crown Molding */}
            <div 
              className="absolute top-0 left-0 right-0 h-[4%]"
              style={{ 
                backgroundColor: currentScheme.walls.trim,
                boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.2)'
              }}
            />
          </div>

          {/* Left Wall - Enhanced 3D perspective */}
          <div
            className="absolute transform-gpu origin-right"
            style={{
              top: '10%',
              left: '0%',
              width: '25%',
              height: '65%',
              backgroundColor: currentScheme.walls.left,
              transform: 'rotateY(55deg) translateZ(-20px)',
              boxShadow: 'inset -30px 0 60px rgba(0,0,0,0.4)',
            }}
          >
            {/* Baseboard */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-[8%]"
              style={{ 
                backgroundColor: currentScheme.walls.trim,
                boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.3)'
              }}
            />
            {/* Crown Molding */}
            <div 
              className="absolute top-0 left-0 right-0 h-[4%]"
              style={{ 
                backgroundColor: currentScheme.walls.trim,
                boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.2)'
              }}
            />
          </div>

          {/* Right Wall - Enhanced 3D perspective */}
          <div
            className="absolute transform-gpu origin-left"
            style={{
              top: '10%',
              right: '0%',
              width: '25%',
              height: '65%',
              backgroundColor: currentScheme.walls.right,
              transform: 'rotateY(-55deg) translateZ(-20px)',
              boxShadow: 'inset 30px 0 60px rgba(0,0,0,0.4)',
            }}
          >
            {/* Baseboard */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-[8%]"
              style={{ 
                backgroundColor: currentScheme.walls.trim,
                boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.3)'
              }}
            />
            {/* Crown Molding */}
            <div 
              className="absolute top-0 left-0 right-0 h-[4%]"
              style={{ 
                backgroundColor: currentScheme.walls.trim,
                boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.2)'
              }}
            />
          </div>

          {/* Floor - Realistic perspective */}
          <div
            className="absolute transform-gpu origin-top"
            style={{
              bottom: '0%',
              left: '5%',
              right: '5%',
              height: '25%',
              background: 'linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 100%)',
              transform: 'rotateX(75deg) translateZ(-50px)',
              boxShadow: 'inset 0 10px 30px rgba(0,0,0,0.5)',
            }}
          />

          {/* Ceiling - Realistic perspective */}
          <div
            className="absolute transform-gpu origin-bottom"
            style={{
              top: '0%',
              left: '5%',
              right: '5%',
              height: '15%',
              backgroundColor: '#f5f5f5',
              transform: 'rotateX(-75deg) translateZ(-50px)',
              boxShadow: 'inset 0 -10px 30px rgba(0,0,0,0.15)',
            }}
          />

          {/* Accent Decor - Picture Frame on back wall */}
          <div
            className="absolute transform-gpu"
            style={{
              top: '25%',
              left: '42%',
              width: '16%',
              height: '20%',
              backgroundColor: currentScheme.walls.accent,
              transform: 'translateZ(-145px) scale(1.15)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.1)',
              border: `4px solid ${currentScheme.walls.trim}`,
            }}
          />

          {/* Ambient Lighting Effects */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 30%, transparent 30%, rgba(0,0,0,0.2) 100%)',
            }}
          />
          
          {/* Soft vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 100%)',
            }}
          />
        </div>
      </div>

      {/* Color Scheme Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {colorSchemes.map((scheme, index) => (
          <button
            key={scheme.name}
            onClick={() => setSelectedScheme(index)}
            className={`p-3 sm:p-4 rounded-xl transition-all duration-300 text-left ${
              selectedScheme === index
                ? 'bg-neutral-800 ring-2 ring-blue-500 shadow-lg scale-[1.02]'
                : 'bg-neutral-900 hover:bg-neutral-800 hover:shadow-md'
            }`}
          >
            <div className="space-y-3">
              {/* Header Section with Title and Style */}
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg text-white font-medium leading-tight">{scheme.name}</h3>
                <span className="inline-block px-2.5 py-0.5 bg-neutral-700 rounded-md text-xs font-medium text-neutral-300">
                  {scheme.style}
                </span>
              </div>
              
              {/* Color Swatches */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 p-2 bg-neutral-950/30 rounded-lg">
                {Object.entries(scheme.walls).map(([key, color]) => (
                  <div key={key} className="relative group">
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg shadow-sm ring-1 ring-white/5 transition-transform hover:scale-110"
                      style={{ backgroundColor: color }}
                    />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">{scheme.description}</p>

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