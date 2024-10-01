import { useMultistepForm } from "@/hooks/useMultistepForm";
import { steps } from "./MultistepForm";

const Step2 = () => {
 const { next, back, isFirstStep, isLastStep } = useMultistepForm(steps);

 const handleSubmitStep = () => {
   const payload = { step2: "" };
   next(payload); // Pass form data for the current step
 };
  return (
    <div>
      <p className="font-crimson font-bold text-2xl">Step 2</p>
      <div className="flex gap-1">
        <button
          className="disabled:bg-slate-200 p-3 bg-blue-400 cursor-pointer disabled:cursor-not-allowed hover:bg-blue-600 rounded-md"
          onClick={back}
          disabled={isFirstStep}
        >
          Back
        </button>
        <button
          className="disabled:bg-slate-200 p-3 bg-blue-400 cursor-pointer disabled:cursor-not-allowed hover:bg-blue-600 rounded-md"
          onClick={handleSubmitStep}
          disabled={isLastStep}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2;
