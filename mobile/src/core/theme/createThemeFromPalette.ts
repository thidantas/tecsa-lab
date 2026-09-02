import { createTheme } from '@shopify/restyle';

import type { ColorPalette } from './colorPalette';
import { typeface } from './fonts';
import { defaultRadiusScale, type RadiusScale } from './radiusScale';

const defaultColorPalette: ColorPalette = {
  white: '#FFFFFF',
  neutral50: '#F4F1EA',
  neutral100: '#F4F1EA',
  neutral200: '#D9D3C7',
  neutral700: '#5C6654',
  neutral900: '#1A1F16',
  brand50: '#E8F0EC',
  brand400: '#37B97D',
  brand500: '#2F5D50',
  brand700: '#05462D',
  highlight: '#F5B441',
  success: '#22A06B',
  warning: '#E8A317',
  danger: '#E24B4A',
};

function pickColor(value: string | undefined, fallback: string) {
  if (!value) {
    return fallback;
  }

  return value;
}

function resolveColorPalette(palette?: Partial<ColorPalette>): ColorPalette {
  return {
    white: pickColor(palette?.white, defaultColorPalette.white),
    neutral50: pickColor(palette?.neutral50, defaultColorPalette.neutral50),
    neutral100: pickColor(palette?.neutral100, defaultColorPalette.neutral100),
    neutral200: pickColor(palette?.neutral200, defaultColorPalette.neutral200),
    neutral700: pickColor(palette?.neutral700, defaultColorPalette.neutral700),
    neutral900: pickColor(palette?.neutral900, defaultColorPalette.neutral900),
    brand50: pickColor(palette?.brand50, defaultColorPalette.brand50),
    brand400: pickColor(palette?.brand400, defaultColorPalette.brand400),
    brand500: pickColor(palette?.brand500, defaultColorPalette.brand500),
    brand700: pickColor(palette?.brand700, defaultColorPalette.brand700),
    highlight: pickColor(palette?.highlight, defaultColorPalette.highlight),
    success: pickColor(palette?.success, defaultColorPalette.success),
    warning: pickColor(palette?.warning, defaultColorPalette.warning),
    danger: pickColor(palette?.danger, defaultColorPalette.danger),
  };
}

function resolveRadiusScale(radii?: Partial<RadiusScale>): RadiusScale {
  return {
    default: radii?.default ?? defaultRadiusScale.default,
    rounded: radii?.rounded ?? defaultRadiusScale.rounded,
  };
}

export function createThemeFromPalette(
  palette?: Partial<ColorPalette>,
  radii?: Partial<RadiusScale>,
) {
  const colors = resolveColorPalette(palette);
  const borderRadii = resolveRadiusScale(radii);

  return createTheme({
    colors: {
      transparent: 'transparent',
      background: colors.neutral50,
      surface: colors.white,
      text: colors.neutral900,
      textMuted: colors.neutral700,
      accent: colors.brand500,
      accentMuted: colors.brand50,
      border: colors.neutral200,
      highlight: colors.highlight,
      success: colors.success,
      warning: colors.warning,
      danger: colors.danger,
    },
    spacing: {
      default: 16,
      s4: 4,
      s8: 8,
      s12: 12,
      s16: 16,
      s24: 24,
      s32: 32,
      s40: 40,
    },
    borderRadii,
    textVariants: {
      defaults: {
        fontFamily: typeface.regular,
        fontSize: 16,
        lineHeight: 22,
        color: 'text',
      },
      title28: {
        fontFamily: typeface.bold,
        fontSize: 28,
        lineHeight: 34,
        color: 'text',
      },
      text16: {
        fontFamily: typeface.regular,
        fontSize: 16,
        lineHeight: 22,
        color: 'text',
      },
      text14: {
        fontFamily: typeface.regular,
        fontSize: 14,
        lineHeight: 20,
        color: 'text',
      },
    },
  });
}

export type Theme = ReturnType<typeof createThemeFromPalette>;
export type ThemeColors = keyof Theme['colors'];
