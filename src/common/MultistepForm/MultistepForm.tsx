import { useMultistepForm } from "@/hooks/useMultistepForm";
import Step1 from "./Step1";
import Step3 from "./Step3";
import Step2 from "./Step2";

export const steps = [<Step1 />, <Step2 />, <Step3 />];

function MultiStepForm() {
  const {
    step,
    back,
    skip,
    clear,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    formData,
  } = useMultistepForm(steps);

  return (
    <div className="space-y-4 py-5 my-2 bg-slate-100">
      Page {currentStepIndex + 1}
      <p className="font-crimson font-normal text-2xl">
        {JSON.stringify(formData, null, 3)}
      </p>
      <div>{step}</div>
      <div className="flex gap-1">
        <button
          className="disabled:bg-slate-200 py-1 px-3 rounded-md bg-blue-400 cursor-pointer disabled:cursor-not-allowed hover:bg-blue-600"
          onClick={back}
          disabled={isFirstStep}
        >
          Back
        </button>
        <button
          className="disabled:bg-slate-200 py-1 px-3 rounded-md bg-red-400 cursor-pointer disabled:cursor-not-allowed hover:bg-red-600"
          onClick={clear}
        >
          Clear
        </button>
        <button
          className="disabled:bg-slate-200 py-1 px-3 rounded-md bg-blue-400 cursor-pointer disabled:cursor-not-allowed hover:bg-blue-600"
          onClick={skip}
          disabled={
            isLastStep
            // Object.keys(formData).length === 0
          }
        >
          Skip
        </button>
      </div>
    </div>
  );
}

export default MultiStepForm;
