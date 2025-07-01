import useSWR from 'swr';
import { applicationApi, Application, AdminApplication, ApplicationRequest } from '../api';

export function useApplications() {
  const { data, error, isLoading, mutate } = useSWR<Application[]>(
    'applications',
    () => applicationApi.getApplications(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const submitApplication = async (applicationData: ApplicationRequest) => {
    try {
      const newApplication = await applicationApi.submitApplication(applicationData);
      mutate([...(data || []), newApplication]);
      return newApplication;
    } catch (error) {
      throw error;
    }
  };

  return {
    applications: data || [],
    submitApplication,
    isLoading,
    error,
    mutate,
  };
}

export function useAdminApplications() {
  const { data, error, isLoading, mutate } = useSWR<AdminApplication[]>(
    'admin-applications',
    () => applicationApi.getAdminApplications(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    applications: data || [],
    isLoading,
    error,
    mutate,
  };
} 