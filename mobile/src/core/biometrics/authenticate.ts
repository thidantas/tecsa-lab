import * as LocalAuthentication from 'expo-local-authentication';

type AuthenticateOptions = {
  promptMessage: string;
  cancelLabel: string;
};

export async function authenticate(options: AuthenticateOptions) {
  try {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: options.promptMessage,
      cancelLabel: options.cancelLabel,
      disableDeviceFallback: false,
    });

    return result.success;
  } catch {
    return false;
  }
}
