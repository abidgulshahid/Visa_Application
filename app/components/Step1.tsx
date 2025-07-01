"use client";

import { useAppDispatch, useAppSelector } from "../lib/hooks";
import {
  updatePersonalInfo,
  setStep,
  selectPersonalInfo,
} from "../lib/features/visaSlice";
import { useState } from "react";

const Step1 = () => {
  const dispatch = useAppDispatch();
  const personalInfo = useAppSelector(selectPersonalInfo);
  const [emailError, setEmailError] = useState("");

  const handleNext = () => {
    dispatch(setStep(2));
  };

  const validateEmail = (email: string) => {
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isFormValid =
    personalInfo.name &&
    personalInfo.email &&
    validateEmail(personalInfo.email) &&
    personalInfo.passportNumber &&
    personalInfo.passportExpirationDate &&
    personalInfo.dateOfBirth &&
    personalInfo.nationality &&
    personalInfo.gender &&
    personalInfo.phoneNumber &&
    personalInfo.address;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Step 1: Personal Information</h2>
      <div>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-gray-900">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={personalInfo.name}
            onChange={(e) =>
              dispatch(updatePersonalInfo({ ...personalInfo, name: e.target.value }))
            }
            className="w-full p-2 border rounded text-gray-800"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-gray-900">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={personalInfo.email}
            onChange={(e) => {
              const value = e.target.value;
              dispatch(updatePersonalInfo({ ...personalInfo, email: value }));
              if (!validateEmail(value)) {
                setEmailError("Please enter a valid email address.");
              } else {
                setEmailError("");
              }
            }}
            className="w-full p-2 border rounded text-gray-800"
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="passportNumber" className="block mb-2 text-gray-900">
            Passport Number
          </label>
          <input
            type="text"
            id="passportNumber"
            value={personalInfo.passportNumber}
            onChange={(e) =>
              dispatch(updatePersonalInfo({ ...personalInfo, passportNumber: e.target.value }))
            }
            className="w-full p-2 border rounded text-gray-800"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="passportExpirationDate" className="block mb-2 text-gray-900">
            Passport Expiration Date
          </label>
          <input
            type="date"
            id="passportExpirationDate"
            value={personalInfo.passportExpirationDate}
            onChange={(e) =>
              dispatch(updatePersonalInfo({ ...personalInfo, passportExpirationDate: e.target.value }))
            }
            className="w-full p-2 border rounded text-gray-800"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dateOfBirth" className="block mb-2 text-gray-900">
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            value={personalInfo.dateOfBirth}
            onChange={(e) =>
              dispatch(updatePersonalInfo({ ...personalInfo, dateOfBirth: e.target.value }))
            }
            className="w-full p-2 border rounded text-gray-800"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="nationality" className="block mb-2 text-gray-900">
            Nationality
          </label>
          <input
            type="text"
            id="nationality"
            value={personalInfo.nationality}
            onChange={(e) =>
              dispatch(updatePersonalInfo({ ...personalInfo, nationality: e.target.value }))
            }
            className="w-full p-2 border rounded text-gray-800"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block mb-2 text-gray-900">
            Gender
          </label>
          <input
            type="text"
            id="gender"
            value={personalInfo.gender}
            onChange={(e) =>
              dispatch(updatePersonalInfo({ ...personalInfo, gender: e.target.value }))
            }
            className="w-full p-2 border rounded text-gray-800"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block mb-2 text-gray-900">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            value={personalInfo.phoneNumber}
            onChange={(e) =>
              dispatch(updatePersonalInfo({ ...personalInfo, phoneNumber: e.target.value }))
            }
            className="w-full p-2 border rounded text-gray-800"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block mb-2 text-gray-900">
            Address
          </label>
          <input
            type="text"
            id="address"
            value={personalInfo.address}
            onChange={(e) =>
              dispatch(updatePersonalInfo({ ...personalInfo, address: e.target.value }))
            }
            className="w-full p-2 border rounded text-gray-800"
          />
        </div>
      </div>
      <button
        onClick={handleNext}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!isFormValid}
      >
        Continue to Step 2
      </button>
    </div>
  );
};

export default Step1; 