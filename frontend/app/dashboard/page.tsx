"use client";
import Header from "../components/Header";
import VisaForm from "../components/VisaForm";
import { useGetVisaApplicationsQuery } from "../lib/features/visaApi";
import VisaStatus from "../components/VisaStatus";
import { useAuth } from "../lib/hooks/useAuth";

const Dashboard = () => {
  const { data: applications, isLoading } = useGetVisaApplicationsQuery();
  const hasSubmittedApplication = applications && applications.length > 0;
  const user = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {isLoading ? (
              <p>Loading...</p>
            ) : hasSubmittedApplication ? (
              <VisaStatus application={applications[0]} />
            ) : (
              <>
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                  Welcome, {user?.user?.email}, Visa Application
                </h1>
                <VisaForm />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;