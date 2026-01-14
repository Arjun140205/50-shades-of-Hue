# API Documentation

## 50 Shades of Hue - Internal APIs and Interfaces

---

> **Note**: This is a client-side application with no backend API. This document covers internal component interfaces and utility functions.

---

## 1. Color Extraction API

### ColorThief Integration

```typescript
import ColorThief from 'colorthief';

const colorThief = new ColorThief();
const palette: number[][] = colorThief.getPalette(imageElement, colorCount);
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `imageElement` | `HTMLImageElement` | Loaded image element |
| `colorCount` | `number` | Number of colors to extract (2-20) |
| **Returns** | `number[][]` | Array of RGB triplets `[[r, g, b], ...]` |

---

## 2. Color Naming Utility

### `getColorName(hex: string): string`

**Location**: `app/utils/getColorName.ts`

Converts a HEX color code to a human-readable name using the color-namer library.

```typescript
import { getColorName } from '@/app/utils/getColorName';

const name = getColorName('#FF5733'); // Returns: "Red Orange"
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `hex` | `string` | HEX color code (e.g., `#FF5733`) |
| **Returns** | `string` | Color name or original HEX if lookup fails |

---

## 3. Component Interfaces

### Color Interface

```typescript
interface Color {
  hex: string;
  rgb: [number, number, number];
}
```

### DisplayImage Props

```typescript
interface UploadedImageProps {
  uploadedImage: string;  // Base64 data URL
  colorPalette: number[][];  // RGB triplets
}
```

### RoomVisualization Props

```typescript
interface RoomVisualizationProps {
  colors: Color[];  // Extracted color array
}
```

### ColorSwatch Props

```typescript
interface ColorSwatchProps {
  color: {
    hex: string;
    rgb: [number, number, number];
  };
}
```

---

## 4. Custom Hooks

### `useCameraUpload`

**Location**: `app/hooks/useCameraUpload.ts`

Manages camera access for both mobile and desktop.

```typescript
const { cameraOpen, setCameraOpen, handleCameraClick, handleCapture, CameraModal } = 
  useCameraUpload({ onImage: uploadHandler });
```

| Return Property | Type | Description |
|-----------------|------|-------------|
| `cameraOpen` | `boolean` | Modal visibility state |
| `setCameraOpen` | `function` | Toggle modal |
| `handleCameraClick` | `function` | Triggers camera based on device |
| `handleCapture` | `function` | Handles captured file |
| `CameraModal` | `Component` | Dynamic modal component |

---

## 5. Color Scheme Generator

### `generateColorSchemes(baseColors: Color[]): ColorScheme[]`

**Location**: `app/components/RoomVisualization.tsx`

Generates 12 interior design color schemes from extracted colors.

```typescript
interface ColorScheme {
  name: string;
  description: string;
  style: string;
  walls: WallColors;
  moodKeywords: string[];
}
```

---

## 6. Utility Functions

### `cn(...inputs: ClassValue[]): string`

**Location**: `lib/utils.ts`

Merges Tailwind CSS classes with conflict resolution.

```typescript
import { cn } from '@/lib/utils';

const className = cn('bg-red-500', condition && 'bg-blue-500');
```

### `rgbToRgba(rgb: string, alpha: number): string`

**Location**: `app/components/ListItem.tsx`

Converts RGB string to RGBA with specified alpha.

```typescript
rgbToRgba('rgb(255, 128, 64)', 0.5); // Returns: 'rgba(255, 128, 64, 0.5)'
```
