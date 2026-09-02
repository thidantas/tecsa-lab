const biomarkerLabels: Record<string, string> = {
  glucose: 'Glicose',
  hba1c: 'HbA1c',
  vitamin_d: 'Vitamina D',
  weight: 'Peso',
};

export function biomarkerLabel(name: string) {
  return biomarkerLabels[name] ?? name;
}
