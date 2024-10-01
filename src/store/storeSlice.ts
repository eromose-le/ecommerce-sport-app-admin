import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type GlobalInitialStateType } from "@/types/global";
import { logoutAction } from "./storeActions";
import { sportygalaxyAdminApi } from "./storeQuerySlice";
import { ApiUserStoreSlice } from "@/api/ApiUserStoreSlice";
import { envConfig } from "@/configs/config";

export const globalInitialState: GlobalInitialStateType = {
  authUser: null,
  isSideMenu: false,
  userDetailSnapshot: null,
  multiForm: {
    stepIndex: 0,
    formData: {},
  },
};

const slice = createSlice({
  name: "global",
  initialState: globalInitialState,
  reducers: {
    toggleSideMenuAction: (state, { payload }) => {
      state.isSideMenu = payload !== undefined ? !!payload : !state.isSideMenu;
    },

    updateUserDetailSnapshotAction: (state, { payload }) => {
      state.userDetailSnapshot =
        payload !== undefined ? payload : state.userDetailSnapshot;
    },

    // ----------Multi-step form actions---------------------------------------
    nextStepAction: (state) => {
      if (
        state.multiForm.stepIndex <=
        Object.keys(state.multiForm.formData).length - 1
      ) {
        state.multiForm.stepIndex += 1;
      }
    },
    skipStepAction: (state) => {
      state.multiForm.stepIndex += 1;
    },

    previousStepAction: (state) => {
      if (state.multiForm.stepIndex >= 0) {
        state.multiForm.stepIndex -= 1;
      }
    },
    goToStepAction: (state, action: PayloadAction<number>) => {
      state.multiForm.stepIndex = action.payload;
    },
    saveStepDataAction: (
      state,
      action: PayloadAction<{ step: number; data: any }>
    ) => {
      // OLD approach
      // { "0": { step1: "" }, "1": { step2: "" } };
      // const { step, data } = action.payload;
      // state.multiForm.formData[step] = data;
      if (state.multiForm) {
        const { data } = action.payload;
        state.multiForm.formData = {
          ...state.multiForm.formData,
          ...data,
        };
      }
    },
    clearStepAction: (state) => {
      state.multiForm = {
        ...globalInitialState.multiForm,
      };
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(logoutAction, () => ({ ...globalInitialState }))

      .addMatcher(
        sportygalaxyAdminApi.endpoints.login.matchFulfilled,
        (state: any, { payload }) => {
          state.authUser = { ...state?.authUser, ...payload?.data };
        }
      )

      .addMatcher(
        ApiUserStoreSlice.endpoints.getMe.matchFulfilled,
        (state, { payload }) => {
          state.authUser = { ...state.authUser, ...payload?.data };
        }
      ),
});

export const {
  toggleSideMenuAction,
  updateUserDetailSnapshotAction,
  nextStepAction,
  previousStepAction,
  skipStepAction,
  goToStepAction,
  saveStepDataAction,
  clearStepAction,
} = slice.actions;

export default slice;

export function getGlobalSliceStorageState({
  authUser,
  isSideMenu,
  userDetailSnapshot,
  multiForm,
}: GlobalInitialStateType) {
  const rtqStateVariables = {
    authUser,
    isSideMenu,
    userDetailSnapshot,
    multiForm,
  };
  if (envConfig.isProduction()) {
    return { ...rtqStateVariables };
  }
  return { ...rtqStateVariables };
}
