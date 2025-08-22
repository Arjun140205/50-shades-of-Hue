// Utility to get the closest color name from a hex code
import namer from 'color-namer';

export function getColorName(hex: string): string {
  try {
    const names = namer(hex);
    // Use the 'ntc' list for most common color names
    if (names.ntc && names.ntc.length > 0) {
      return names.ntc[0].name;
    }
    // Fallback to basic if ntc is not available
    if (names.basic && names.basic.length > 0) {
      return names.basic[0].name;
    }
    return hex;
  } catch {
    return hex;
  }
}
