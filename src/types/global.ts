import { AuthUserResponse } from "./user";

declare global {
  interface Window {
    analytics: any;
    lintrk: any;
  }
}

export interface GlobalInitialStateType {
  authUser: AuthUserType | null;
  isSideMenu: boolean;
  userDetailSnapshot?: any;
  multiForm: {
    stepIndex: number;
    formData: { [key: string]: any };
  };
}

export type AuthUserType = AuthUserResponse;

export type AuthAccountsType = [];
export interface ServerResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

export interface ServerPaginatedResponse<T = unknown> {
  success: boolean;
  message: string;
  data: {
    currentPage: number;
    pageCount: number;
    count: number;
    results: Array<T>;
  };
}

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
