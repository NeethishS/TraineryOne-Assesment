import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import EmployeeDirectory from './pages/EmployeeDirectory';
import EmployeeDetails from './pages/EmployeeDetails';
import OrganizationChart from './pages/OrganizationChart';
import { FileQuestion } from 'lucide-react';

/**
 * Page Not Found (404) Fallback Component
 */
function NotFound() {
  return (
    <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-12 text-center my-8">
      <FileQuestion className="w-12 h-12 text-slate-500 mx-auto mb-3" />
      <h2 className="text-lg font-bold text-slate-200">Page not found</h2>
      <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
        The requested page URL does not exist.
      </p>
      <Link
        to="/employees"
        className="inline-flex items-center gap-2 mt-5 px-4 py-2 text-xs font-medium text-white bg-brand-600 hover:bg-brand-500 rounded-lg transition-colors shadow-md"
      >
        Return to Employee Directory
      </Link>
    </div>
  );
}

/**
 * Root Application Component with Client Routing.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          {/* Default Route Redirects to /employees */}
          <Route index element={<Navigate to="/employees" replace />} />
          
          {/* Required Assessment Routes */}
          <Route path="employees" element={<EmployeeDirectory />} />
          <Route path="employees/:id" element={<EmployeeDetails />} />
          <Route path="organization" element={<OrganizationChart />} />

          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
