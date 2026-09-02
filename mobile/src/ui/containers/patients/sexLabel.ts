export function sexLabel(sex: string | null) {
  const key = sex?.trim().toUpperCase();

  if (key === 'F') {
    return 'Feminino';
  }

  if (key === 'M') {
    return 'Masculino';
  }

  return null;
}
