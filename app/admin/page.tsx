"use client";
import React, { useState } from "react";
import useSWR from "swr";
import Header from "../components/Header";
import { authApi } from "../lib/api";
import { applicationApi, AdminApplication } from "../lib/api";
import { useAuth } from "../lib/hooks/useAuth";

const SECTIONS = [
  { key: "users", label: "Users" },
  { key: "applications", label: "Applications" },
  { key: "admin", label: "Create Admin" },
];

const fetchUsers = async () => authApi.getAllUsers();
const fetchApplications = async () => applicationApi.getAdminApplications();

type UserRow = {
  id?: string;
  _id?: string;
  email: string;
  role: string;
};

type AdminAppWithNested = {
  _id: string;
  userId?: { _id: string; email: string };
  status: string;
  createdAt?: string;
  updatedAt?: string;
  adminNotes?: string;
  personalInfo?: {
    name?: string;
    email?: string;
    passportNumber?: string;
    passportExpirationDate?: string;
    dateOfBirth?: string;
    nationality?: string;
    gender?: string;
    phoneNumber?: string;
    address?: string;
  };
  travelInfo?: {
    destination?: string;
    date?: string;
    purpose?: string;
    travelCompanions?: string[];
    travelDates?: string[];
    travelDocuments?: string[];
    travelBudget?: string;
    travelInsurance?: string;
    intendedArrivalDate?: string;
    intendedDepartureDate?: string;
    visaType?: string;
  };
};

const AdminPage = () => {
  const { isAdmin } = useAuth();
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminCreated, setAdminCreated] = useState(false);
  const [activeSection, setActiveSection] = useState("users");
  const [statusLoading, setStatusLoading] = useState<string | null>(null);
  const [adminError, setAdminError] = useState("");
  // Modal state for viewing application details
  const [viewApp, setViewApp] = useState<AdminAppWithNested | null>(null);

  // SWR for users and applications
  const {
    data: users,
    error: usersError,
    isLoading: usersLoading,
    mutate: mutateUsers,
  } = useSWR("admin-users", fetchUsers);

  const {
    data: applications,
    error: appsError,
    isLoading: appsLoading,
    mutate: mutateApplications,
  } = useSWR<AdminAppWithNested[]>("admin-applications", fetchApplications as () => Promise<AdminAppWithNested[]>);

  // Handle status change
  const handleStatusChange = async (
    appId: string,
    newStatus: AdminApplication["status"]
  ) => {
    setStatusLoading(appId);
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001/';
      const res = await fetch(
        `${API_BASE}admin/applications/${appId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status: newStatus, adminNotes: "" }),
        }
      );
      if (!res.ok) throw new Error("Failed to update status");
      await mutateApplications();
    } catch {
      // Optionally show error
    } finally {
      setStatusLoading(null);
    }
  };

  // Handle admin creation
  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError("");
    if (!adminEmail || !adminPassword) return;
    try {
      await authApi.createAdmin({ email: adminEmail, password: adminPassword });
      setAdminCreated(true);
      setAdminEmail("");
      setAdminPassword("");
      setTimeout(() => setAdminCreated(false), 2000);
      mutateUsers();
    } catch (err: unknown) {
      setAdminError(err instanceof Error ? err.message : "Failed to create admin");
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600 font-bold">Access denied. Admins only.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md min-h-screen p-6 hidden md:block">
          <nav className="space-y-2">
            {SECTIONS.map((section) => (
              <button
                key={section.key}
                onClick={() => setActiveSection(section.key)}
                className={`w-full text-left px-4 py-2 rounded-lg font-semibold transition-colors duration-150 ${
                  activeSection === section.key
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-100"
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-6 max-w-6xl mx-auto">
          {/* Mobile nav */}
          <div className="md:hidden mb-4 flex space-x-2">
            {SECTIONS.map((section) => (
              <button
                key={section.key}
                onClick={() => setActiveSection(section.key)}
                className={`px-3 py-2 rounded-lg font-semibold transition-colors duration-150 ${
                  activeSection === section.key
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 bg-white border border-gray-200"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Section: Users */}
          {activeSection === "users" && (
            <section>
              <h1 className="text-3xl font-bold mb-6 text-gray-800">All Users</h1>
              {usersLoading ? (
                <p className="text-gray-800">Loading users...</p>
              ) : usersError ? (
                <p className="text-red-600 text-gray-800">Failed to load users.</p>
              ) : (
                <div className="overflow-x-auto rounded-lg shadow bg-white">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">ID</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {(users as UserRow[] | undefined)?.map((user) => (
                        <tr key={user.id || user._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap capitalize text-gray-900">{user.role}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">{user.id || user._id}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {/* Section: Applications */}
          {activeSection === "applications" && (
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">All Visa Applications</h2>
              {appsLoading ? (
                <p>Loading applications...</p>
              ) : appsError ? (
                <p className="text-red-600">Failed to load applications.</p>
              ) : (
                <div className="overflow-x-auto rounded-lg shadow bg-white">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Applicant</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Passport</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Nationality</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Visa Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Purpose</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Arrival</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Departure</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Change Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {applications?.map((app) => {
                        const user = app.userId;
                        return (
                          <tr key={app._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                              {app.personalInfo?.name}
                              <span className="block text-xs text-gray-800">
                                ({app.personalInfo?.email || user?.email || "Unknown"})
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-800">{app.personalInfo?.passportNumber}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-800">{app.personalInfo?.nationality}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-800">{app.travelInfo?.visaType || ""}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-800">{app.travelInfo?.purpose || ""}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-800">{app.travelInfo?.intendedArrivalDate ? new Date(app.travelInfo.intendedArrivalDate).toLocaleDateString() : ""}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-800">{app.travelInfo?.intendedDepartureDate ? new Date(app.travelInfo.intendedDepartureDate).toLocaleDateString() : ""}</td>
                            <td className="px-6 py-4 whitespace-nowrap font-bold capitalize text-gray-800">{app.status}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select
                                value={app.status}
                                onChange={e => handleStatusChange(app._id, e.target.value as AdminApplication["status"])}
                                className="border rounded px-2 py-1 text-gray-800"
                                disabled={statusLoading === app._id}
                              >
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                              </select>
                              {statusLoading === app._id && <span className="ml-2 text-xs text-gray-400">Updating...</span>}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
                                onClick={() => setViewApp(app)}
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              {/* Modal for viewing application details */}
              {viewApp && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                  <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
                    <button
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                      onClick={() => setViewApp(null)}
                      aria-label="Close"
                    >
                      &times;
                    </button>
                    <h3 className="text-xl font-bold mb-4 text-gray-800">Application Details</h3>
                    <div className="space-y-4 text-sm">
                      <div>
                        <span className="font-semibold text-gray-800">Application ID:</span> {viewApp._id}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-800">Status:</span> <span className="capitalize">{viewApp.status}</span>
                      </div>
                      <hr />
                      <div>
                        <h4 className="font-bold mb-2 text-gray-800">Personal Info</h4>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                          <div><span className="font-semibold text-gray-800">Name:</span> {viewApp.personalInfo?.name}</div>
                          <div><span className="font-semibold text-gray-800">Email:</span> {viewApp.personalInfo?.email}</div>
                          <div><span className="font-semibold text-gray-800">Passport #:</span> {viewApp.personalInfo?.passportNumber}</div>
                          <div><span className="font-semibold text-gray-800">Passport Expiry:</span> {viewApp.personalInfo?.passportExpirationDate ? new Date(viewApp.personalInfo.passportExpirationDate).toLocaleDateString() : ""}</div>
                          <div><span className="font-semibold text-gray-800">Date of Birth:</span> {viewApp.personalInfo?.dateOfBirth ? new Date(viewApp.personalInfo.dateOfBirth).toLocaleDateString() : ""}</div>
                          <div><span className="font-semibold text-gray-800">Nationality:</span> {viewApp.personalInfo?.nationality}</div>
                          <div><span className="font-semibold text-gray-800">Gender:</span> {viewApp.personalInfo?.gender}</div>
                          <div><span className="font-semibold text-gray-800">Phone:</span> {viewApp.personalInfo?.phoneNumber}</div>
                          <div className="col-span-2 text-gray-800"><span className="font-semibold">Address:</span> {viewApp.personalInfo?.address}</div>
                        </div>
                      </div>
                      <hr />
                      <div>
                        <h4 className="font-bold mb-2 text-gray-800">Travel Info</h4>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                          <div><span className="font-semibold text-gray-800">Destination:</span> {viewApp.travelInfo?.destination}</div>
                          <div><span className="font-semibold text-gray-800">Travel Date:</span> {viewApp.travelInfo?.date ? new Date(viewApp.travelInfo.date).toLocaleDateString() : ""}</div>
                          <div><span className="font-semibold text-gray-800">Purpose:</span> {viewApp.travelInfo?.purpose}</div>
                          <div><span className="font-semibold text-gray-800">Arrival:</span> {viewApp.travelInfo?.intendedArrivalDate ? new Date(viewApp.travelInfo.intendedArrivalDate).toLocaleDateString() : ""}</div>
                          <div><span className="font-semibold text-gray-800">Departure:</span> {viewApp.travelInfo?.intendedDepartureDate ? new Date(viewApp.travelInfo.intendedDepartureDate).toLocaleDateString() : ""}</div>
                          <div><span className="font-semibold text-gray-800">Budget:</span> {viewApp.travelInfo?.travelBudget}</div>
                          <div><span className="font-semibold text-gray-800">Insurance:</span> {viewApp.travelInfo?.travelInsurance}</div>
                          <div className="col-span-2"><span className="font-semibold text-gray-800">Travel Companions:</span> {viewApp.travelInfo?.travelCompanions?.join(", ")}</div>
                          <div className="col-span-2"><span className="font-semibold text-gray-800">Travel Dates:</span> {viewApp.travelInfo?.travelDates?.join(", ")}</div>
                          <div className="col-span-2"><span className="font-semibold text-gray-800">Travel Documents:</span> {viewApp.travelInfo?.travelDocuments?.join(", ")}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Section: Create Admin */}
          {activeSection === "admin" && (
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Create New Admin</h2>
              <div className="bg-white rounded-lg shadow p-8 max-w-lg mx-auto">
                <form onSubmit={handleCreateAdmin} className="space-y-6">
                  <div>
                    <label className="block font-semibold mb-1 text-gray-800">Email</label>
                    <input
                      type="email"
                      value={adminEmail}
                      onChange={e => setAdminEmail(e.target.value)}
                      className="border rounded px-3 py-2 w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-gray-800">Password</label>
                    <input
                      type="password"
                      value={adminPassword}
                      onChange={e => setAdminPassword(e.target.value)}
                      className="border rounded px-3 py-2 w-full"
                      required
                    />
                  </div>
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Create Admin</button>
                  {adminCreated && <p className="text-green-600 font-semibold mt-2">Admin created!</p>}
                  {adminError && <p className="text-red-600 font-semibold mt-2">{adminError}</p>}
                </form>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPage;