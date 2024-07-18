const colors = {
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
    default: '#FAF0E6', // Linen
    subtle: '#FFE4C4', // Bisque
    interactive: '#FFDEAD', // Navajo White
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
  },
  highlight: '#CD853F', // Peru
};

const typography = {
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

const spacing = {
  xsmall: 4,
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
  xxlarge: 40,
};

const theme = {
  colors,
  typography,
  spacing,
};

export default theme;
