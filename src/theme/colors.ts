// TODO: write documentation for colors and palette in own markdown file and add links from here

const palette = {
  // Neutrals
  neutral100: "#FFFFFF",   // Pure White
  neutral200: "#F7F7F7",   // Light Gray
  neutral300: "#E1E1E1",   // Medium Light Gray
  neutral400: "#B0B0B0",   // Gray
  neutral500: "#8A8A8A",   // Dark Gray
  neutral600: "#545454",   // Charcoal
  neutral700: "#333333",   // Almost Black
  neutral800: "#1A1A1A",   // Darker Charcoal
  neutral900: "#000000",   // Black

  // Primary Colors
  primary100: "#E0F7FA",  // Light Cyan
  primary200: "#B2EBF2",  // Cyan
  primary300: "#00BCD4",  // Deep Cyan
  primary400: "#0097A7",  // Dark Cyan
  primary500: "#00796B",  // Teal
  primary600: "#004D40",  // Dark Teal

  // Secondary Colors
  secondary100: "#FFF9C4", // Light Yellow
  secondary200: "#FFF176", // Yellow
  secondary300: "#FFD54F", // Mustard
  secondary400: "#FFB300", // Dark Yellow
  secondary500: "#FFA000", // Golden Yellow

  // Accent Colors
  accent100: "#FFAB91",    // Light Coral
  accent200: "#FF8A65",    // Coral
  accent300: "#FF7043",    // Deep Coral
  accent400: "#F4511E",    // Bright Orange
  accent500: "#D84315",    // Dark Orangesdfdsf

  // Status Colors
  angry100: "#FFCCBC",     // Light Red
  angry500: "#E64A19",     // Red

  // Overlays
  overlay20: "rgba(0, 0, 0, 0.2)",  // 20% Black
  overlay50: "rgba(0, 0, 0, 0.5)",  // 50% Black
} as const;


export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.neutral800,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.neutral200,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   *
   */
  errorBackground: palette.angry100,
}
