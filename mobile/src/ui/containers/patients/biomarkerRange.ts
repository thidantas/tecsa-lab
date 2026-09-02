import type { Biomarker } from '@/domain/models/patients';
import type { ThemeColors } from '@/core/theme';

export function biomarkerValueColor(marker: Biomarker): ThemeColors {
  if (marker.refLow == null && marker.refHigh == null) {
    return 'text';
  }

  if (marker.refLow != null && marker.value < marker.refLow) {
    return 'danger';
  }

  if (marker.refHigh != null && marker.value > marker.refHigh) {
    return 'danger';
  }

  return 'success';
}

export function biomarkerRangeLabel(marker: Biomarker) {
  if (marker.refLow == null && marker.refHigh == null) {
    return null;
  }

  if (marker.refLow != null && marker.refHigh != null) {
    return `${marker.refLow}–${marker.refHigh} ${marker.unit}`;
  }

  if (marker.refLow != null) {
    return `≥ ${marker.refLow} ${marker.unit}`;
  }

  return `≤ ${marker.refHigh} ${marker.unit}`;
}
