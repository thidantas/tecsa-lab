import { format, isValid, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDate(value: string) {
  const date = parseISO(value);

  if (!isValid(date)) {
    return value;
  }

  return format(date, 'P', { locale: ptBR });
}
