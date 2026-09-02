import { act } from '@testing-library/react-native';

export function advanceMs(ms: number) {
  return act(async () => {
    await new Promise<void>((resolve) => {
      setTimeout(resolve, ms);
    });
  });
}
