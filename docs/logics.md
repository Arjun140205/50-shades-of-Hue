# Application Logic & Architecture

## 50 Shades of Hue - Technical Flow Documentation

---

## 1. System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT BROWSER                           │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────┐  │
│  │  Next.js    │    │   React     │    │    Tailwind CSS     │  │
│  │  App Router │───▶│  Components │───▶│    Styling Layer    │  │
│  └─────────────┘    └─────────────┘    └─────────────────────┘  │
│         │                  │                                     │
│         ▼                  ▼                                     │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────┐  │
│  │  ColorThief │    │ color-namer │    │   Three.js/WebGL    │  │
│  │  Extraction │    │   Naming    │    │   Visual Effects    │  │
│  └─────────────┘    └─────────────┘    └─────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Color Palette Generation Flow

### Sequence Diagram

```
┌────────┐    ┌──────────┐    ┌────────────┐    ┌───────────────┐
│  User  │    │   Page   │    │ ColorThief │    │ DisplayImage  │
└───┬────┘    └────┬─────┘    └─────┬──────┘    └───────┬───────┘
    │              │                │                    │
    │  Upload      │                │                    │
    │  Image   ────▶                │                    │
    │              │                │                    │
    │              │  FileReader    │                    │
    │              │  readAsDataURL │                    │
    │              │─────────┐      │                    │
    │              │         │      │                    │
    │              │◀────────┘      │                    │
    │              │                │                    │
    │              │  Create Image  │                    │
    │              │  Element       │                    │
    │              │─────────┐      │                    │
    │              │         │      │                    │
    │              │◀────────┘      │                    │
    │              │                │                    │
    │              │  getPalette()  │                    │
    │              │───────────────▶│                    │
    │              │                │                    │
    │              │  RGB Array     │                    │
    │              │◀───────────────│                    │
    │              │                │                    │
    │              │  setState()    │                    │
    │              │───────────────────────────────────▶│
    │              │                │                    │
    │  Display     │                │                    │
    │◀─────────────────────────────────────────────────│
    │              │                │                    │
```

---

## 3. Component Hierarchy

```
RootLayout
├── SplashCursor (WebGL fluid effect)
├── NavBar
├── [Page Content]
│   ├── HomePage
│   │   ├── WebGLShader (animated background)
│   │   └── DisplayImage
│   │       └── ListItem (per color)
│   │
│   ├── Features Index
│   │   └── FeatureCard (×3)
│   │
│   ├── Home Interior Feature
│   │   ├── RoomVisualization
│   │   └── ColorSwatch (×4)
│   │
│   ├── Websites Feature
│   │   └── Website Preview
│   │
│   └── Presentations Feature
│       └── Slide Preview
│
└── Footer
```

---

## 4. State Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         HomePage                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐      ┌──────────────────┐             │
│  │  uploadedImage  │      │   colorPalette   │             │
│  │   (string)      │      │   (number[][])   │             │
│  └────────┬────────┘      └────────┬─────────┘             │
│           │                        │                        │
│           └────────────┬───────────┘                        │
│                        │                                    │
│                        ▼                                    │
│           ┌────────────────────────┐                        │
│           │     DisplayImage       │                        │
│           │   Component Props      │                        │
│           └────────────────────────┘                        │
│                        │                                    │
│                        ▼                                    │
│           ┌────────────────────────┐                        │
│           │   Map to ListItem      │                        │
│           │   (color rendering)    │                        │
│           └────────────────────────┘                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Color Processing Pipeline

```
Image Input
    │
    ▼
┌───────────────────────────────┐
│   FileReader.readAsDataURL()  │
│   Convert image to Base64     │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│   HTMLImageElement.onload     │
│   Wait for image decode       │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│   ColorThief.getPalette()     │
│   Median-cut quantization     │
│   Extract dominant colors     │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│   RGB to HEX Conversion       │
│   Format: #RRGGBB             │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│   color-namer (NTC list)      │
│   HEX → Human Color Name      │
└───────────────┴───────────────┘
```

---

## 6. Room Visualization Algorithm

```
Input: Color[] (4 extracted colors)
    │
    ▼
┌─────────────────────────────────────┐
│   For each color in palette:        │
│   - Lighten using tinycolor2        │
│   - Ensure brightness > 180         │
└───────────────┬─────────────────────┘
                │
                ▼
┌─────────────────────────────────────┐
│   Generate 12 ColorSchemes:         │
│   - Scandinavian White              │
│   - Modern Sage                     │
│   - Warm Terracotta                 │
│   - Coastal Blue                    │
│   - ... (8 more)                    │
└───────────────┬─────────────────────┘
                │
                ▼
┌─────────────────────────────────────┐
│   CSS 3D Transform Rendering:       │
│   - perspective: 1200px             │
│   - rotateY for side walls          │
│   - rotateX for floor/ceiling       │
└─────────────────────────────────────┘
```

---

## 7. WebGL Shader Pipeline

```
┌──────────────────────────────────────────────────────────────┐
│                     WebGLShader Component                     │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────┐    ┌────────────────┐    ┌────────────┐ │
│  │ Vertex Shader  │───▶│Fragment Shader │───▶│  Renderer  │ │
│  │ (position)     │    │ (color waves)  │    │  (loop)    │ │
│  └────────────────┘    └────────────────┘    └────────────┘ │
│                                                              │
│  Uniforms:                                                   │
│  - resolution: [width, height]                               │
│  - time: 0.0 (increments by 0.01 per frame)                 │
│  - xScale: 1.0 (wave frequency)                             │
│  - yScale: 0.5 (wave amplitude)                             │
│  - distortion: 0.05 (chromatic aberration)                  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 8. File Structure

```
palettepro-main/
├── app/
│   ├── page.jsx              # Home page
│   ├── layout.tsx            # Root layout + NavBar + Footer
│   ├── globals.css           # Global styles
│   ├── components/
│   │   ├── DisplayImage.tsx  # Palette display
│   │   ├── ListItem.tsx      # Individual color card
│   │   ├── ColorSwatch.tsx   # Clickable color square
│   │   ├── NavBar.tsx        # Navigation
│   │   ├── CameraModal.tsx   # Desktop camera capture
│   │   ├── RoomVisualization.tsx  # 3D room preview
│   │   ├── SplashCursor.tsx  # WebGL fluid cursor
│   │   └── background.tsx    # Hyperspeed animation
│   ├── features/
│   │   ├── page.tsx          # Features landing
│   │   ├── home-interior/    # Interior design tool
│   │   ├── websites/         # Web palette tool
│   │   └── presentations/    # Slide palette tool
│   ├── hooks/
│   │   └── useCameraUpload.ts
│   └── utils/
│       └── getColorName.ts
├── components/ui/
│   └── web-gl-shader.tsx     # Animated wave background
└── lib/
    └── utils.ts              # Tailwind class merger
```
