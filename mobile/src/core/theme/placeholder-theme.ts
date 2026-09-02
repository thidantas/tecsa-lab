import { createTheme } from '@shopify/restyle';

export const placeholderTheme = createTheme({
  colors: {
    background: '#F4F1EA',
    surface: '#FFFFFF',
    text: '#1A1F16',
    textMuted: '#5C6654',
    accent: '#2F5D50',
    border: '#D9D3C7',
    danger: '#8B3A3A',
    success: '#2F5D50',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  borderRadii: {
    s: 4,
    m: 8,
    l: 16,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    defaults: {
      fontSize: 16,
      lineHeight: 22,
      color: 'text',
    },
    header: {
      fontSize: 28,
      lineHeight: 34,
      fontWeight: '700',
      color: 'text',
    },
    body: {
      fontSize: 16,
      lineHeight: 22,
      color: 'text',
    },
    muted: {
      fontSize: 14,
      lineHeight: 20,
      color: 'textMuted',
    },
  },
});

export type Theme = typeof placeholderTheme;
