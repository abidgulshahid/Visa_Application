import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VisaApplication, VisaForm } from "./visaSlice";

export const visaApi = createApi({
  reducerPath: "visaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Application"],
  endpoints: (builder) => ({
    getVisaApplications: builder.query<VisaApplication[], void>({
      query: () => "applications",
      providesTags: ["Application"],
    }),
    submitVisaApplication: builder.mutation<void, VisaForm>({
      query: (formData) => ({
        url: "applications",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Application"],
    }),
  }),
});

export const {
  useSubmitVisaApplicationMutation,
  useGetVisaApplicationsQuery,
} = visaApi; 