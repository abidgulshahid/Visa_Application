"use client";

import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { setStep, updateTravelInfo, selectTravelInfo } from "../lib/features/visaSlice";

const Step3 = () => {
  const dispatch = useAppDispatch();
  const travelInfo = useAppSelector(selectTravelInfo);

  const handleBack = () => {
    dispatch(setStep(2));
  };

  const handleNext = () => {
    dispatch(setStep(4));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Step 3: Additional Travel Details</h2>
      <div className="mb-4">
        <label htmlFor="purpose" className="block mb-2">
          Purpose
        </label>
        <input
          type="text"
          id="purpose"
          value={travelInfo.purpose}
          onChange={(e) =>
            dispatch(updateTravelInfo({ ...travelInfo, purpose: e.target.value }))
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="travelCompanions" className="block mb-2">
          Travel Companions (comma separated)
        </label>
        <input
          type="text"
          id="travelCompanions"
          value={travelInfo.travelCompanions.join(", ")}
          onChange={(e) =>
            dispatch(updateTravelInfo({ ...travelInfo, travelCompanions: e.target.value.split(",").map(s => s.trim()) }))
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="travelDates" className="block mb-2">
          Travel Dates (comma separated)
        </label>
        <input
          type="text"
          id="travelDates"
          value={travelInfo.travelDates.join(", ")}
          onChange={(e) =>
            dispatch(updateTravelInfo({ ...travelInfo, travelDates: e.target.value.split(",").map(s => s.trim()) }))
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="travelDocuments" className="block mb-2">
          Travel Documents (comma separated)
        </label>
        <input
          type="text"
          id="travelDocuments"
          value={travelInfo.travelDocuments.join(", ")}
          onChange={(e) =>
            dispatch(updateTravelInfo({ ...travelInfo, travelDocuments: e.target.value.split(",").map(s => s.trim()) }))
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="travelBudget" className="block mb-2">
          Travel Budget
        </label>
        <input
          type="text"
          id="travelBudget"
          value={travelInfo.travelBudget}
          onChange={(e) =>
            dispatch(updateTravelInfo({ ...travelInfo, travelBudget: e.target.value }))
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="travelInsurance" className="block mb-2">
          Travel Insurance
        </label>
        <input
          type="text"
          id="travelInsurance"
          value={travelInfo.travelInsurance}
          onChange={(e) =>
            dispatch(updateTravelInfo({ ...travelInfo, travelInsurance: e.target.value }))
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          className="w-1/2 mr-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          Back to Step 2
        </button>
        <button
          onClick={handleNext}
          className="w-1/2 ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Continue to Step 4
        </button>
      </div>
    </div>
  );
};

export default Step3; 