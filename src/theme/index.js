// src/theme/index.js

// export const colors = {
//   primary: {
//     light: '#FFF5EE', // Seashell
//     main: '#CD853F', // Peru
//     dark: '#8B4513', // Saddle Brown
//   },
//   secondary: {
//     light: '#F5DEB3', // Wheat
//     main: '#DEB887', // Burlywood
//     dark: '#A0522D', // Sienna
//   },
//   background: {
//     default: '#FFF', // Linen
//     subtle: '#FFE4C4', // Bisque
//     interactive: '#FFDEAD', // Navajo White
//     disabled: '#E0E0E0', // Light Grey
//   },
//   text: {
//     primary: '#2F4F4F', // Dark Slate Gray
//     secondary: '#8B4513', // Saddle Brown
//     disabled: '#D3D3D3', // Light Gray
//     placeholder: '#CD853F',
//   },
//   border: {
//     main: '#CD853F', // Peru
//     light: '#F5DEB3', // Wheat
//   },
//   status: {
//     success: '#32CD32', // Lime Green
//     error: '#FF6347', // Tomato
//     warning: '#FFA500', // Orange
//     cancelled: '#FF4500', // OrangeRed
//     completed: '#4682B4', // SteelBlue
//   },
//   highlight: '#CD853F', // Peru
//   gradient: {
//     overlay: ['#8B4513', 'rgba(255, 245, 238, 0.1)'],
//   },
// };

export const colors = {
  primary: {
    light: '#6d7a71', // Lighter Green
    main: '#2c3c34', // Dark Green
    dark: '#1b241f', // Very Dark Green
  },
  secondary: {
    light: '#8a9d8f', // Soft Green (lighter green shade)
    main: '#4d5a51', // Muted Green
    dark: '#2c3c34', // Dark Green
  },
  tertiary: {
    light: '#b8d8ba', // Light Mint Green
    main: '#8fb593', // Mint Green
    dark: '#67916e', // Dark Mint Green
  },
  background: {
    inputField: '#E0EDE0',
    default: '#F5F5F5', // Off-White (keeping a neutral background)
    subtle: '#6d7a71', // Lighter Green (subtle background with more green)
    interactive: '#4d5a51', // Muted Green (interactive background)
    disabled: '#D3D3D3', // Light Grey (keeping the disabled state light)
  },
  text: {
    light: '#E0EDE0',
    primary: '#1b241f', // Very Dark Green (text primary)
    secondary: '#2c3c34', // Dark Green (text secondary)
    disabled: '#A9A9A9', // Dark Gray (keeping disabled text light for readability)
    placeholder: '#4d5a51', // Muted Green (placeholder text)
  },
  border: {
    main: '#4d5a51', // Muted Green (border main)
    light: '#6d7a71', // Lighter Green (border light)
  },
  status: {
    success: '#32CD32', // Lime Green (unchanged)
    error: '#FF6347', // Tomato (unchanged)
    warning: '#FFA500', // Orange (unchanged)
    cancelled: '#FF4500', // OrangeRed (unchanged)
    completed: '#4682B4', // SteelBlue (unchanged)
  },
  highlight: '#2c3c34', // Dark Green (highlight)
  gradient: {
    overlay: ['#1b241f', 'rgba(109, 122, 113, 0.1)'], // Very Dark Green to Lighter Green
  },

  // Colors for skeleton loading components
  skeleton: {
    primary: '#E0EDE0', // Light Greenish color for the base skeleton
    secondary: '#D3D3D3', // A light grey for accent parts of the skeleton
    shimmer: '#F5F5F5', // Slightly off-white for the shimmer effect
  },
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  h2: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  h3: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  h4: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  body1: {
    fontSize: 16,
    color: colors.text.primary,
  },
  body2: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  subtitle1: {
    fontSize: 18,
    color: colors.text.secondary,
  },
  subtitle2: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  caption: {
    fontSize: 12,
    color: colors.text.secondary,
  },
};

export const spacing = {
  xsmall: 4,
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
  xxlarge: 40,
};

export const shape = {
  borderRadius: 8,
  borderRadiusSmall: 4,
  borderRadiusLarge: 20,
};

const theme = {
  colors,
  typography,
  spacing,
  shape,
  header: {
    style: {
      backgroundColor: colors.background.subtle,
    },
    tintColor: colors.text.primary,
    titleStyle: {
      fontWeight: typography.h3.fontWeight,
      fontSize: typography.h3.fontSize,
    },
  },
};

export default theme;
