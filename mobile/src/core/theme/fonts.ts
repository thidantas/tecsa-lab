export const typeface = {
  regular: 'Tecsa-Regular',
  medium: 'Tecsa-Medium',
  semibold: 'Tecsa-SemiBold',
  bold: 'Tecsa-Bold',
} as const;

export function getFontSources(): Record<string, number> {
  return {
    [typeface.regular]: require('../../../assets/fonts/Poppins-Regular.ttf'),
    [typeface.medium]: require('../../../assets/fonts/Poppins-Medium.ttf'),
    [typeface.semibold]: require('../../../assets/fonts/Poppins-SemiBold.ttf'),
    [typeface.bold]: require('../../../assets/fonts/Poppins-Bold.ttf'),
  };
}
