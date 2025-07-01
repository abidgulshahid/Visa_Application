"use client";

import React, { useState } from 'react';
import { useLogin, useRegister, useAuth, useApplications, useAdminApplications } from '../lib/hooks';

export default function ApiTestPage() {
  const [activeTab, setActiveTab] = useState('auth');
  const { login, logout } = useLogin();
  const { register } = useRegister();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const { applications, submitApplication, isLoading: appsLoading } = useApplications();
  const { applications: adminApps, isLoading: adminAppsLoading } = useAdminApplications();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    passportNumber: '',
    nationality: '',
    visaType: '',
    purposeOfVisit: '',
    intendedArrivalDate: '',
    intendedDepartureDate: '',
  });

  const handleAuth = async (type: 'login' | 'register') => {
    try {
      if (type === 'login') {
        await login({ email: formData.email, password: formData.password });
      } else {
        await register({ email: formData.email, password: formData.password });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred');
      }
    }
  };

  const handleSubmitApplication = async () => {
    try {
      await submitApplication({
        firstName: formData.firstName,
        lastName: formData.lastName,
        passportNumber: formData.passportNumber,
        nationality: formData.nationality,
        visaType: formData.visaType,
        purposeOfVisit: formData.purposeOfVisit,
        intendedArrivalDate: formData.intendedArrivalDate,
        intendedDepartureDate: formData.intendedDepartureDate,
      });
      alert('Application submitted successfully!');
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API Test Page</h1>
        
        {/* Auth Status */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">Authentication Status</h2>
          <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
          <p>User: {user?.email || 'None'}</p>
          <p>Role: {user?.role || 'None'}</p>
          {isAuthenticated && (
            <button
              onClick={logout}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('auth')}
            className={`px-4 py-2 rounded ${activeTab === 'auth' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Authentication
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2 rounded ${activeTab === 'applications' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Applications
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-4 py-2 rounded ${activeTab === 'admin' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Admin
          </button>
        </div>

        {/* Auth Tab */}
        {activeTab === 'auth' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Authentication</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => handleAuth('login')}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Login
              </button>
              <button
                onClick={() => handleAuth('register')}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Register
              </button>
            </div>
      
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Applications</h2>
            {!isAuthenticated ? (
              <p className="text-red-600">Please login to view and submit applications</p>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Passport Number</label>
                    <input
                      type="text"
                      value={formData.passportNumber}
                      onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Nationality</label>
                    <input
                      type="text"
                      value={formData.nationality}
                      onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Visa Type</label>
                    <input
                      type="text"
                      value={formData.visaType}
                      onChange={(e) => setFormData({ ...formData, visaType: e.target.value })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Purpose of Visit</label>
                    <input
                      type="text"
                      value={formData.purposeOfVisit}
                      onChange={(e) => setFormData({ ...formData, purposeOfVisit: e.target.value })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Arrival Date</label>
                    <input
                      type="date"
                      value={formData.intendedArrivalDate}
                      onChange={(e) => setFormData({ ...formData, intendedArrivalDate: e.target.value })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Departure Date</label>
                    <input
                      type="date"
                      value={formData.intendedDepartureDate}
                      onChange={(e) => setFormData({ ...formData, intendedDepartureDate: e.target.value })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
                <button
                  onClick={handleSubmitApplication}
                  disabled={appsLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {appsLoading ? 'Submitting...' : 'Submit Application'}
                </button>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Your Applications</h3>
                  {appsLoading ? (
                    <p>Loading applications...</p>
                  ) : applications.length === 0 ? (
                    <p>No applications found</p>
                  ) : (
                    <div className="space-y-2">
                      {applications.map((app) => (
                        <div key={app._id} className="p-3 border rounded">
                          <p><strong>{app.firstName} {app.lastName}</strong></p>
                          <p>Passport: {app.passportNumber}</p>
                          <p>Visa Type: {app.visaType}</p>
                          <p>Status: {app.status}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Admin Tab */}
        {activeTab === 'admin' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
            {!isAuthenticated ? (
              <p className="text-red-600">Please login to access admin panel</p>
            ) : !isAdmin ? (
              <p className="text-red-600">Admin access required</p>
            ) : (
              <div>
                <h3 className="text-lg font-semibold mb-2">All Applications</h3>
                {adminAppsLoading ? (
                  <p>Loading applications...</p>
                ) : adminApps.length === 0 ? (
                  <p>No applications found</p>
                ) : (
                  <div className="space-y-2">
                    {adminApps.map((app) => (
                      <div key={app._id} className="p-3 border rounded">
                        <p><strong>{app.firstName} {app.lastName}</strong></p>
                        <p>User: {app.userId.email}</p>
                        <p>Passport: {app.passportNumber}</p>
                        <p>Visa Type: {app.visaType}</p>
                        <p>Status: {app.status}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 