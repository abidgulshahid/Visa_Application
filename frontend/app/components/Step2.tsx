"use client";

import { useAppDispatch, useAppSelector } from "../lib/hooks";
import {
  updateTravelInfo,
  setStep,
  selectTravelInfo,
} from "../lib/features/visaSlice";

const Step2 = () => {
  const dispatch = useAppDispatch();
  const travelInfo = useAppSelector(selectTravelInfo);

  const handleBack = () => {
    dispatch(setStep(1));
  };

  const handleNext = () => {
    dispatch(setStep(3));
  };

  const isFormValid =
    travelInfo.destination &&
    travelInfo.date &&
    travelInfo.intendedArrivalDate &&
    travelInfo.intendedDepartureDate;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Step 2: Travel Information</h2>
      <div className="mb-4">
        <label htmlFor="destination" className="block mb-2">
          Destination
        </label>
        <input
          type="text"
          id="destination"
          value={travelInfo.destination}
          onChange={(e) =>
            dispatch(
              updateTravelInfo({ ...travelInfo, destination: e.target.value })
            )
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block mb-2">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={travelInfo.date}
          onChange={(e) =>
            dispatch(updateTravelInfo({ ...travelInfo, date: e.target.value }))
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="intendedArrivalDate" className="block mb-2">
          Intended Arrival Date
        </label>
        <input
          type="date"
          id="intendedArrivalDate"
          value={travelInfo.intendedArrivalDate}
          onChange={(e) =>
            dispatch(
              updateTravelInfo({ ...travelInfo, intendedArrivalDate: e.target.value })
            )
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="intendedDepartureDate" className="block mb-2">
          Intended Departure Date
        </label>
        <input
          type="date"
          id="intendedDepartureDate"
          value={travelInfo.intendedDepartureDate}
          onChange={(e) =>
            dispatch(
              updateTravelInfo({ ...travelInfo, intendedDepartureDate: e.target.value })
            )
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          className="w-1/2 mr-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          Back to Step 1
        </button>
        <button
          onClick={handleNext}
          className="w-1/2 ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isFormValid}
        >
          Continue to Step 3
        </button>
      </div>
    </div>
  );
};

export default Step2; 