"use client";

import { useAppDispatch, useAppSelector } from "../lib/hooks";
import {
  setStep,
  selectPersonalInfo,
  selectTravelInfo,
  resetForm,
} from "../lib/features/visaSlice";
import { useSubmitVisaApplicationMutation } from "../lib/features/visaApi";
import { useState } from "react";

const Step4 = () => {
  const dispatch = useAppDispatch();
  const personalInfo = useAppSelector(selectPersonalInfo);
  const travelInfo = useAppSelector(selectTravelInfo);
  const [submitApplication, { isLoading, isSuccess, isError }] = useSubmitVisaApplicationMutation();
  const [submitted, setSubmitted] = useState(false);

  const handleBack = () => {
    dispatch(setStep(3));
  };

  const handleSubmit = async () => {
    try {
      await submitApplication({ personalInfo, travelInfo }).unwrap();
      setSubmitted(true);
      dispatch(resetForm());
    } catch {
      // Error handled by isError
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Step 4: Review and Submit</h2>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Personal Information</h3>
        <p><strong className="text-gray-900">Name:</strong> <span className="text-gray-900">{personalInfo.name}</span></p>
        <p><strong className="text-gray-900">Email:</strong> <span className="text-gray-900">{personalInfo.email}</span></p>
        <p><strong className="text-gray-900">Passport Number:</strong> <span className="text-gray-900">{personalInfo.passportNumber}</span></p>
        <p><strong className="text-gray-900">Passport Expiration Date:</strong> <span className="text-gray-900">{personalInfo.passportExpirationDate}</span></p>
        <p><strong className="text-gray-900">Date of Birth:</strong> <span className="text-gray-900">{personalInfo.dateOfBirth}</span></p>
        <p><strong className="text-gray-900">Nationality:</strong> <span className="text-gray-900">{personalInfo.nationality}</span></p>
        <p><strong className="text-gray-900">Gender:</strong> <span className="text-gray-900">{personalInfo.gender}</span></p>
        <p><strong className="text-gray-900">Phone Number:</strong> <span className="text-gray-900">{personalInfo.phoneNumber}</span></p>
        <p><strong className="text-gray-900">Address:</strong> <span className="text-gray-900">{personalInfo.address}</span></p>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Travel Information</h3>
        <p><strong className="text-gray-900">Destination:</strong> <span className="text-gray-900">{travelInfo.destination}</span></p>
        <p><strong className="text-gray-900">Date:</strong> <span className="text-gray-900">{travelInfo.date}</span></p>
        <p><strong className="text-gray-900">Intended Arrival Date:</strong> <span className="text-gray-900">{travelInfo.intendedArrivalDate}</span></p>
        <p><strong className="text-gray-900">Intended Departure Date:</strong> <span className="text-gray-900">{travelInfo.intendedDepartureDate}</span></p>
        <p><strong className="text-gray-900">Purpose:</strong> <span className="text-gray-900">{travelInfo.purpose}</span></p>
        <p><strong className="text-gray-900">Travel Companions:</strong> <span className="text-gray-900">{travelInfo.travelCompanions && travelInfo.travelCompanions.join(", ")}</span></p>
        <p><strong className="text-gray-900">Travel Dates:</strong> <span className="text-gray-900">{travelInfo.travelDates && travelInfo.travelDates.join(", ")}</span></p>
        <p><strong className="text-gray-900">Travel Documents:</strong> <span className="text-gray-900">{travelInfo.travelDocuments && travelInfo.travelDocuments.join(", ")}</span></p>
        <p><strong className="text-gray-900">Travel Budget:</strong> <span className="text-gray-900">{travelInfo.travelBudget}</span></p>
        <p><strong className="text-gray-900">Travel Insurance:</strong> <span className="text-gray-900">{travelInfo.travelInsurance}</span></p>
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          className="w-1/2 mr-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          disabled={isLoading}
        >
          Back to Step 3
        </button>
        <button
          onClick={handleSubmit}
          className="w-1/2 ml-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit Application"}
        </button>
      </div>
      {isSuccess && submitted && (
        <div className="mt-4 text-green-600 font-semibold">Application submitted successfully!</div>
      )}
      {isError && (
        <div className="mt-4 text-red-600 font-semibold">Submission failed. Please try again.</div>
      )}
    </div>
  );
};

export default Step4; 