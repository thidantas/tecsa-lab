import * as LocalAuthentication from 'expo-local-authentication';

export async function canUseBiometrics() {
  try {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      return false;
    }

    return LocalAuthentication.isEnrolledAsync();
  } catch {
    return false;
  }
}
