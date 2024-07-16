const colors = {
  primary: '#CB6843', // Earthy Terracotta: Warmth and natural essence.
  secondary: '#A08C6C', // Warm Beige: Subtle complement to the primary color.
  background: '#FAFAFA', // Off-White: Clean, unobtrusive backdrop.
  subtleBackground: '#F5F5DC', // Warm Beige: A gentle background for contrast.
  text: '#333333', // Dark Slate: Maintained for readability and contrast.
  border: '#CB6843', // Earthy Terracotta: Borders in primary color for consistency.
  lightBorder: '#F5F5DC', // Warm Beige: Lighter shade for subtle borders.
  highlight: '#CB6843', // Earthy Terracotta: Highlighting important elements.
  interactive: '#F5F5DC', // Warm Beige: For clickable items or selected options.
  disabled: '#D3D3D3', // Light Gray: Muted for non-active or clickable elements.
  success: '#4CAF50', // Fresh Green: Retained for success, denotes positivity.
  error: '#CD5C5C', // Soft Red: Approachable red for errors.
};

const typography = {
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  body: {fontSize: 14, color: colors.secondary},
  midTitle: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 16,
    color: colors.secondary,
  },
};

const spacing = {
  xsmall: 4,
  small: 8,
  medium: 16,
  large: 24,
};

export {colors, typography, spacing};
