export const GetContrastingColor = (hexColor) => {
  // Ensure hex format is standardized
  if (hexColor.startsWith("#")) {
    hexColor = hexColor.slice(1);
  }

  // Expand shorthand form (e.g., "03F" -> "0033FF")
  if (hexColor.length === 3) {
    hexColor = hexColor
      .split("")
      .map((c) => c + c)
      .join("");
  }

  // Convert hex color to RGB values
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  // Calculate relative luminance of the color
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Check if the color is dark or light
  const isDark = luminance < 128;

  // Return contrasting color
  return isDark ? "#FFFFFF" : "#000000"; // Light for dark colors, dark for light colors
};
