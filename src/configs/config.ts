import { ENVIRONMENTS } from "@/constants/GlobalConstant";

interface IGetDynamicEnv {
  AUTH_URL_API: string;
  PROPERTY_URL_API: string;
  CHAT_URL_API: string;
  CHAT_URL_SOCKET: string;
  // PAYSTACK_PUBLIC_KEY: string;
}
interface IDefaultUrls {
  AUTH_URL_API: string;
  PROPERTY_URL_API: string;
  CHAT_URL_API: string;
  CHAT_URL_SOCKET: string;
  // PAYSTACK_PUBLIC_KEY: string;
}
interface IProductionUrls {
  PROD_AUTH_URL_API: string;
  PROD_PROPERTY_URL_API: string;
  PROD_CHAT_URL_API: string;
  PROD_CHAT_URL_SOCKET: string;
  // PROD_PAYSTACK_PUBLIC_KEY: string;
}
interface IAppUrls {
  AES_REQ_RES_KEY: string;
  AES_REQ_RES_IV: string;
  RESPONSE_ENCRYPTION_ALGORITHM: string;
  AES_ENCRYPTION_KEY: string;
}
interface IEnvUrls {
  isLocal: () => boolean;
  isDevelopment: () => boolean;
  isStaging: () => boolean;
  isProduction: () => boolean;
}
interface IEnvConfig {
  AUTH_URL_API: string;
  PROPERTY_URL_API: string;
  CHAT_URL_API: string;
  CHAT_URL_SOCKET: string;
  // PAYSTACK_PUBLIC_KEY: string;

  PROD_AUTH_URL_API: string;
  PROD_PROPERTY_URL_API: string;
  PROD_CHAT_URL_API: string;
  PROD_CHAT_URL_SOCKET: string;
  // PROD_PAYSTACK_PUBLIC_KEY: string;

  AES_REQ_RES_KEY: string;
  AES_REQ_RES_IV: string;
  RESPONSE_ENCRYPTION_ALGORITHM: string;
  AES_ENCRYPTION_KEY: string;

  isLocal: () => boolean;
  isDevelopment: () => boolean;
  isStaging: () => boolean;
  isProduction: () => boolean;
}

const DEFAULT_URLS: IDefaultUrls = {
  AUTH_URL_API: import.meta.env.VITE_AUTH_URL_API,
  PROPERTY_URL_API: import.meta.env.VITE_PROPERTY_URL_API,
  CHAT_URL_API: import.meta.env.VITE_CHAT_URL_API,
  CHAT_URL_SOCKET: import.meta.env.VITE_CHAT_URL_SOCKET,
  // PAYSTACK_PUBLIC_KEY: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
};

const PRODUCTION_URLS: IProductionUrls = {
  PROD_AUTH_URL_API: import.meta.env.VITE_PROD_AUTH_URL_API,
  PROD_PROPERTY_URL_API: import.meta.env.VITE_PROD_PROPERTY_URL_API,
  PROD_CHAT_URL_API: import.meta.env.VITE_PROD_CHAT_URL_API,
  PROD_CHAT_URL_SOCKET: import.meta.env.VITE_PROD_CHAT_URL_SOCKET,
  // PROD_PAYSTACK_PUBLIC_KEY: import.meta.env.VITE_PROD_PAYSTACK_PUBLIC_KEY,
};

const APP_URLS: IAppUrls = {
  AES_REQ_RES_KEY: import.meta.env.VITE_AES_REQ_RES_KEY,
  AES_REQ_RES_IV: import.meta.env.VITE_AES_REQ_RES_IV,
  RESPONSE_ENCRYPTION_ALGORITHM: import.meta.env
    .VITE_RESPONSE_ENCRYPTION_ALGORITHM,
  AES_ENCRYPTION_KEY: import.meta.env.VITE_AES_ENCRYPTION_KEY,
};

const ENV_URLS: IEnvUrls = {
  isLocal: () => import.meta.env.VITE_APP_REACT_ENV === ENVIRONMENTS.local,
  isDevelopment: () =>
    import.meta.env.VITE_APP_REACT_ENV === ENVIRONMENTS.development,
  isStaging: () => import.meta.env.VITE_APP_REACT_ENV === ENVIRONMENTS.staging,
  isProduction: () =>
    import.meta.env.VITE_APP_REACT_ENV === ENVIRONMENTS.production,
};

export const envConfig: IEnvConfig = {
  ...DEFAULT_URLS,
  ...PRODUCTION_URLS,
  ...APP_URLS,
  ...ENV_URLS,
};

const dynamicEnvDefault: IGetDynamicEnv = {
  AUTH_URL_API: envConfig.AUTH_URL_API as string,
  PROPERTY_URL_API: envConfig.PROPERTY_URL_API as string,
  CHAT_URL_API: envConfig.CHAT_URL_API as string,
  CHAT_URL_SOCKET: envConfig.CHAT_URL_SOCKET as string,
  // PAYSTACK_PUBLIC_KEY: envConfig.PAYSTACK_PUBLIC_KEY as string,
};

const dynamicEnvProduction: IGetDynamicEnv = {
  AUTH_URL_API: envConfig.PROD_AUTH_URL_API as string,
  PROPERTY_URL_API: envConfig.PROD_PROPERTY_URL_API as string,
  CHAT_URL_API: envConfig.PROD_CHAT_URL_API as string,
  CHAT_URL_SOCKET: envConfig.PROD_CHAT_URL_SOCKET as string,
  // PAYSTACK_PUBLIC_KEY: envConfig.PROD_PAYSTACK_PUBLIC_KEY as string,
};

export function DYNAMIC_ENV(): IGetDynamicEnv {
  switch (import.meta.env.VITE_APP_REACT_ENV || "production") {
    case ENVIRONMENTS.local:
      return {
        ...dynamicEnvDefault,
      };
    case ENVIRONMENTS.development:
      return {
        ...dynamicEnvDefault,
      };
    case ENVIRONMENTS.staging:
      return {
        ...dynamicEnvDefault,
      };
    case ENVIRONMENTS.production:
      return {
        ...dynamicEnvProduction,
      };
    default:
      return {
        ...dynamicEnvDefault,
      };
  }
}
