"use client";

import { useAppSelector } from "../lib/hooks";
import { selectStep } from "../lib/features/visaSlice";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

const VisaForm = () => {
  const step = useAppSelector(selectStep);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
      {step === 4 && <Step4 />}
    </div>
  );
};

export default VisaForm; 