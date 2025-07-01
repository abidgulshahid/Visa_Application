import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface VisaApplication {
  id: string;
  personalInfo: {
    name: string;
    email: string;
    passportNumber: string;
    passportExpirationDate: string;
    dateOfBirth: string;
    nationality: string;
    gender: string;
    phoneNumber: string;
    address: string;
  };
  travelInfo: {
    destination: string;
    date: string;
    intendedArrivalDate: string;
    intendedDepartureDate: string;
    purpose: string;
    travelCompanions: string[];
    travelDates: string[];
    travelDocuments: string[];
    travelBudget: string;
    travelInsurance: string;
  };
  status: "pending" | "approved" | "rejected";
}

export interface VisaForm { 
  personalInfo: {
    name: string;
    email: string;
    passportNumber: string;
    passportExpirationDate: string;
    dateOfBirth: string;
    nationality: string;
    gender: string;
    phoneNumber: string;
    address: string;

  };
  travelInfo: {
    destination: string;
    date: string;
    intendedArrivalDate: string;
    intendedDepartureDate: string;
    purpose: string;
    travelCompanions: string[];
    travelDates: string[];
    travelDocuments: string[];
    travelBudget: string;
    travelInsurance: string;
  };
}

interface VisaState {
  step: number;
  formData: VisaForm;
  applications: VisaApplication[];
}

const initialState: VisaState = {
  step: 1,
  formData: {
    personalInfo: {
      name: "",
      email: "",
      passportNumber: "",
      passportExpirationDate: "",
      dateOfBirth: "",
      nationality: "",
      gender: "",
      phoneNumber: "",
      address: "",
    },
    travelInfo: {
      destination: "",
      date: "",
      intendedArrivalDate: "",
      intendedDepartureDate: "",
      purpose: "",
      travelCompanions: [],
      travelDates: [],
      travelDocuments: [],
      travelBudget: "",
      travelInsurance: "",
    },
  },
  applications: [],
};

export const visaSlice = createSlice({
  name: "visa",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    updatePersonalInfo: (
      state,
      action: PayloadAction<{ name: string; email: string; passportNumber: string; passportExpirationDate: string; dateOfBirth: string; nationality: string; gender: string; phoneNumber: string; address: string }>
    ) => {
      state.formData.personalInfo = action.payload;
    },
    updateTravelInfo: (
      state,
      action: PayloadAction<{ destination: string; date: string; intendedArrivalDate: string; intendedDepartureDate: string; purpose: string; travelCompanions: string[]; travelDates: string[]; travelDocuments: string[]; travelBudget: string; travelInsurance: string }>
    ) => {
      state.formData.travelInfo = action.payload;
    },
    resetForm: (state) => {
      state.step = 1;
      state.formData = initialState.formData;
    },
  },
});

export const { setStep, updatePersonalInfo, updateTravelInfo, resetForm } =
  visaSlice.actions;

export const selectStep = (state: RootState) => state.visa.step;
export const selectPersonalInfo = (state: RootState) =>
  state.visa.formData.personalInfo;
export const selectTravelInfo = (state: RootState) =>
  state.visa.formData.travelInfo;
export const selectApplications = (state: RootState) => state.visa.applications;

export default visaSlice.reducer;