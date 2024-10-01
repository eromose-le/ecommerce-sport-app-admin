import { useMultistepForm } from "@/hooks/useMultistepForm";
import { steps } from "./MultistepForm";

const Step3 = () => {
  const { back, isFirstStep, isLastStep } = useMultistepForm(steps);
  const handleSubmitStep = () => {
    alert("submitted!!");
  };
  return (
    <div>
      <p className="font-crimson font-bold text-2xl">Step 3</p>
      <button
        className="disabled:bg-slate-200 p-3 my-3 bg-green-600 cursor-pointer disabled:cursor-not-allowed hover:bg-green-600 rounded-md"
        onClick={handleSubmitStep}
      >
        Submit
      </button>
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
          disabled={isLastStep}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3;
