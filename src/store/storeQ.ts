import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import CryptoJS from "crypto-js";
import { envConfig } from "@/configs/config";
import globalSlice, {
  getGlobalSliceStorageState,
  globalInitialState,
} from "./storeSlice";
import { sportygalaxyAdminApi } from "./storeQuerySlice";
import { deepMerge, isObjectEmpty, throttle } from "@/utils/store";
import { logoutAction } from "./storeActions";
import { mockApi } from "@/mock/rtk";

const isDevelopment = envConfig.isDevelopment();

function getLocalStorageState() {
  const serializedState = localStorage.getItem("@state");
  if (serializedState) {
    return JSON.parse(
      isDevelopment
        ? serializedState
        : CryptoJS.AES.decrypt(
            serializedState,
            envConfig.AES_ENCRYPTION_KEY
          ).toString(CryptoJS.enc.Utf8)
    );
  }
  return null;
}

function loadState(initialState = {}) {
  try {
    const newState = { ...initialState };
    const storageState = getLocalStorageState();
    if (storageState && !isObjectEmpty(storageState)) {
      Object.assign(newState, deepMerge(newState, storageState));
    }
    return newState;
  } catch (error) {
    //
  }
  return undefined;
}

const storeQ = configureStore({
  reducer: {
    [globalSlice.name]: globalSlice.reducer,
    [sportygalaxyAdminApi.reducerPath]: sportygalaxyAdminApi.reducer,
    [mockApi.reducerPath]: mockApi.reducer,
  },
  preloadedState: loadState({
    [globalSlice.name]: globalInitialState,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      sportygalaxyAdminApi.middleware,
      mockApi.middleware,
      rtkqOnResetMiddleware(sportygalaxyAdminApi),
      rtkqOnResetMiddleware(mockApi)
    ),

  devTools: isDevelopment,
});

setupListeners(storeQ.dispatch);

function saveState(state: any) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(
      "@state",
      isDevelopment
        ? serializedState
        : (CryptoJS.AES.encrypt(
            serializedState,
            envConfig.AES_ENCRYPTION_KEY
          ) as any)
    );
  } catch (error) {
    //
  }
}

storeQ.subscribe(
  throttle(() => {
    const state = storeQ.getState();
    saveState({
      [globalSlice.name]: getGlobalSliceStorageState(state[globalSlice.name]),
    });
  }, 1000)
);

export function rtkqOnResetMiddleware(...apis: any[]) {
  return (store: any) => (next: any) => (action: any) => {
    const result = next(action);
    if (logoutAction.match(action)) {
      for (const api of apis) {
        store.dispatch(api.util.resetApiState());
      }
    }
    return result;
  };
}

export default storeQ;
