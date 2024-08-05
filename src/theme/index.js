// src/theme/index.js
export const colors = {
  primary: {
    light: '#FFF5EE', // Seashell
    main: '#CD853F', // Peru
    dark: '#8B4513', // Saddle Brown
  },
  secondary: {
    light: '#F5DEB3', // Wheat
    main: '#DEB887', // Burlywood
    dark: '#A0522D', // Sienna
  },
  background: {
    default: '#FFF', // Linen
    subtle: '#FFE4C4', // Bisque
    interactive: '#FFDEAD', // Navajo White
    disabled: '#E0E0E0', // Light Grey
  },
  text: {
    primary: '#2F4F4F', // Dark Slate Gray
    secondary: '#8B4513', // Saddle Brown
    disabled: '#D3D3D3', // Light Gray
  },
  border: {
    main: '#CD853F', // Peru
    light: '#F5DEB3', // Wheat
  },
  status: {
    success: '#32CD32', // Lime Green
    error: '#FF6347', // Tomato
    warning: '#FFA500', // Orange
    cancelled: '#FF4500', // OrangeRed
    completed: '#4682B4', // SteelBlue
  },
  highlight: '#CD853F', // Peru
  gradient: {
    overlay: ['#8B4513', 'rgba(255, 245, 238, 0.1)'],
  },
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  h4: {
    fontSize: 20,
    fontWeight: 'bold',
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
  borderRadiusLarge: 12,
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
