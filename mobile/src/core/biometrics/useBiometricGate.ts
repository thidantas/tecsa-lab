import { useCallback, useEffect, useState } from 'react';

import { authenticate } from './authenticate';
import { canUseBiometrics } from './canUseBiometrics';

export type BiometricGateStatus = 'checking' | 'locked' | 'unlocked';

type UnlockOptions = {
  promptMessage: string;
  cancelLabel: string;
};

export function useBiometricGate() {
  const [status, setStatus] = useState<BiometricGateStatus>('checking');
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void canUseBiometrics().then((available) => {
      if (cancelled) {
        return;
      }

      setStatus(available ? 'locked' : 'unlocked');
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const unlock = useCallback(async (options: UnlockOptions) => {
    setFailed(false);
    const success = await authenticate(options);

    if (success) {
      setStatus('unlocked');
      return;
    }

    setFailed(true);
  }, []);

  return { status, failed, unlock };
}
