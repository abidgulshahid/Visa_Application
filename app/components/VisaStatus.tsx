import React from "react";
import { VisaApplication } from "../lib/features/visaSlice";

interface VisaStatusProps {
  application: VisaApplication;
}

const VisaStatus: React.FC<VisaStatusProps> = ({ application }) => {
  const { personalInfo, travelInfo, status, __v } = application as VisaApplication & { __v?: number };

  const renderFields = (obj: Record<string, unknown>) =>
    Object.entries(obj)
      .filter(([key]) => key !== "_id")
      .map(([key, value]) => (
        <div key={key}>
          <p className="font-semibold">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</p>
          <p className="text-gray-900">{Array.isArray(value) ? value.join(", ") : String(value)}</p>
        </div>
      ));

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Application Status</h2>
      <div className="grid grid-cols-2 gap-4">
        {renderFields(personalInfo)}
        {renderFields(travelInfo)}
        <div>
          <p className="font-semibold">Status:</p>
          <p
            className={`font-bold text-gray-900 ${
              status === "approved"
                ? "text-green-500"
                : status === "rejected"
                ? "text-red-500"
                : "text-yellow-500"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </p>
        </div>
        {typeof __v !== 'undefined' && (
          <div>
            <p className="font-semibold">Version:</p>
            <p className="text-gray-900">{__v}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisaStatus; 