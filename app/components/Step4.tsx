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
      <h2 className="text-xl font-semibold mb-4">Step 4: Review and Submit</h2>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
        <p><strong>Name:</strong> {personalInfo.name}</p>
        <p><strong>Email:</strong> {personalInfo.email}</p>
        <p><strong>Passport Number:</strong> {personalInfo.passportNumber}</p>
        <p><strong>Passport Expiration Date:</strong> {personalInfo.passportExpirationDate}</p>
        <p><strong>Date of Birth:</strong> {personalInfo.dateOfBirth}</p>
        <p><strong>Nationality:</strong> {personalInfo.nationality}</p>
        <p><strong>Gender:</strong> {personalInfo.gender}</p>
        <p><strong>Phone Number:</strong> {personalInfo.phoneNumber}</p>
        <p><strong>Address:</strong> {personalInfo.address}</p>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Travel Information</h3>
        <p><strong>Destination:</strong> {travelInfo.destination}</p>
        <p><strong>Date:</strong> {travelInfo.date}</p>
        <p><strong>Intended Arrival Date:</strong> {travelInfo.intendedArrivalDate}</p>
        <p><strong>Intended Departure Date:</strong> {travelInfo.intendedDepartureDate}</p>
        <p><strong>Purpose:</strong> {travelInfo.purpose}</p>
        <p><strong>Travel Companions:</strong> {travelInfo.travelCompanions && travelInfo.travelCompanions.join(", ")}</p>
        <p><strong>Travel Dates:</strong> {travelInfo.travelDates && travelInfo.travelDates.join(", ")}</p>
        <p><strong>Travel Documents:</strong> {travelInfo.travelDocuments && travelInfo.travelDocuments.join(", ")}</p>
        <p><strong>Travel Budget:</strong> {travelInfo.travelBudget}</p>
        <p><strong>Travel Insurance:</strong> {travelInfo.travelInsurance}</p>
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