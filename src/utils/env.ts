export const getEnv = (key: string, defaultValue: string = ""): string => {
  try {
    // @ts-ignore - Vite mengizinkan akses ini saat runtime
    const value = import.meta.env[key];
    return value || defaultValue;
  } catch (error) {
    return defaultValue;
  }
};