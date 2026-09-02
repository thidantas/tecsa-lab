import { useLocalSearchParams } from 'expo-router';

import { PatientDetail } from '@/ui/containers';

export default function PatientDetailScreen() {
  const param = useLocalSearchParams<{ id: string | string[] }>().id;
  const id = Array.isArray(param) ? (param[0] ?? '') : (param ?? '');

  return <PatientDetail id={id} />;
}
