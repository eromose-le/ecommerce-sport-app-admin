import { ReactElement } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  nextStepAction,
  previousStepAction,
  goToStepAction,
  saveStepDataAction,
  skipStepAction,
  clearStepAction,
} from "@/store/storeSlice";

export function useMultistepForm(steps: ReactElement[]) {
  const dispatch = useDispatch();

  const currentStepIndex = useSelector(
    (state: any) => state?.global?.multiForm?.stepIndex
  );
  const formData = useSelector(
    (state: any) => state?.global?.multiForm?.formData
  );

  function next(data: any) {
    dispatch(saveStepDataAction({ step: currentStepIndex, data }));
    dispatch(nextStepAction());
  }

  function skip() {
    dispatch(skipStepAction());
  }

  function back() {
    dispatch(previousStepAction());
  }

  function goTo(index: number) {
    dispatch(goToStepAction(index));
  }

  function clear() {
    dispatch(clearStepAction());
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    formData, // Access form data
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goTo,
    next,
    skip,
    back,
    clear,
  };
}
