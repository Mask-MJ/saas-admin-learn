export function isProdMode(): boolean {
  return import.meta.env.PROD;
}

export interface GlobEnvConfig {
  // Site title
  VITE_PROXY: string;
  VITE_GLOB_APP_TITLE: string;
  // Service interface url prefix
  VITE_GLOB_API_URL_PREFIX?: string;
}

export function getAppEnvConfig(): GlobEnvConfig {
  const { VITE_PROXY, VITE_GLOB_APP_TITLE, VITE_GLOB_API_URL_PREFIX } = import.meta.env;
  return {
    VITE_PROXY,
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL_PREFIX,
  };
}
