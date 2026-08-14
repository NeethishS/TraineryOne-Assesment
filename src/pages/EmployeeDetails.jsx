import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { EMPLOYEES } from '../data/employees';
import { getManager, getDirectReports, getOrganizationPath } from '../utils/hierarchy';
import EmployeeAvatar from '../components/employee/EmployeeAvatar';
import EmployeeInfoSection, { InfoRow } from '../components/employee/EmployeeInfoSection';
import OrganizationPath from '../components/employee/OrganizationPath';
import {
  ArrowLeft,
  Briefcase,
  UserCheck,
  Mail,
  GitFork,
  MapPin,
  FileQuestion,
  User
} from 'lucide-react';

/**
 * Screen 1 — Employee Detailed Profile Page.
 */
export default function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Lookup target employee
  const employee = EMPLOYEES.find((e) => e.id === id);

  // If invalid ID, display professional Employee Not Found state
  if (!employee) {
    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => navigate('/employees')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Directory</span>
        </button>

        <div className="bg-white border border-slate-200/80 rounded-xl p-12 text-center my-8 shadow-2xs">
          <FileQuestion className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-900">Employee not found</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            The requested employee profile (ID: <span className="font-mono text-slate-700">{id}</span>) does not exist or has been removed.
          </p>
          <Link
            to="/employees"
            className="inline-flex items-center gap-2 mt-5 px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors shadow-xs"
          >
            Return to Employee Directory
          </Link>
        </div>
      </div>
    );
  }

  // Derive manager, direct reports, and organization path
  const manager = getManager(employee.id, EMPLOYEES);
  const directReports = getDirectReports(employee.id, EMPLOYEES);
  const orgPath = getOrganizationPath(employee.id, EMPLOYEES);

  // Restrained status badge style for light theme
  const statusStyles = {
    Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'On Leave': 'bg-amber-50 text-amber-700 border-amber-200',
    Terminated: 'bg-rose-50 text-rose-700 border-rose-200',
  };
  const badgeStyle = statusStyles[employee.status] || 'bg-slate-100 text-slate-700 border-slate-200';

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top Navigation Back Link */}
      <button
        type="button"
        onClick={() => navigate('/employees')}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/80 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-2xs"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Employee Directory</span>
      </button>

      {/* Main Profile Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-2xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <EmployeeAvatar name={employee.name} avatar={employee.avatar} size="xl" />
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {employee.name}
                </h1>
                <span className={`px-2.5 py-0.5 text-[11px] font-medium rounded-full border ${badgeStyle}`}>
                  {employee.status}
                </span>
              </div>
              <p className="text-sm font-semibold text-brand-600 mt-1">{employee.role}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
                <span className="font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                  {employee.employeeId}
                </span>
                <span>•</span>
                <span>{employee.department}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {employee.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Feature: Organization Path */}
      <OrganizationPath path={orgPath} currentEmployeeId={employee.id} />

      {/* Structured Profile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 1: Overview */}
        <EmployeeInfoSection title="Overview" icon={User}>
          <InfoRow label="Employee ID" value={employee.employeeId} />
          <InfoRow label="Status" value={employee.status} />
          <InfoRow label="Employment Type" value={employee.employmentType} />
          <InfoRow label="Joining Date" value={employee.joiningDate} />
        </EmployeeInfoSection>

        {/* Section 2: Employment */}
        <EmployeeInfoSection title="Employment Details" icon={Briefcase}>
          <InfoRow label="Job Title" value={employee.role} />
          <InfoRow label="Department" value={employee.department} />
          <InfoRow label="Work Location" value={employee.location} />
          <InfoRow
            label="Reporting Manager"
            value={manager ? manager.name : 'No reporting manager (Root)'}
            isLink={!!manager}
            onClick={() => manager && navigate(`/employees/${manager.id}`)}
          />
        </EmployeeInfoSection>

        {/* Section 3: Contact */}
        <EmployeeInfoSection title="Contact Information" icon={Mail}>
          <InfoRow label="Work Email" value={employee.email} />
          <InfoRow label="Phone Number" value={employee.phone} />
        </EmployeeInfoSection>

        {/* Section 4: Organization */}
        <EmployeeInfoSection title="Organizational Hierarchy" icon={GitFork}>
          <InfoRow
            label="Reports To"
            value={manager ? `${manager.name} (${manager.role})` : 'None (Top Level Executive)'}
            isLink={!!manager}
            onClick={() => manager && navigate(`/employees/${manager.id}`)}
          />
          <InfoRow
            label="Direct Reports Count"
            value={`${directReports.length} employee${directReports.length === 1 ? '' : 's'}`}
          />
          {directReports.length > 0 && (
            <div className="pt-2 border-t border-slate-100 mt-2">
              <span className="text-[11px] text-slate-500 font-semibold block mb-2">
                Direct Reports:
              </span>
              <div className="space-y-1.5">
                {directReports.map((report) => (
                  <button
                    key={report.id}
                    type="button"
                    onClick={() => navigate(`/employees/${report.id}`)}
                    className="w-full flex items-center justify-between p-2 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 hover:border-brand-300 rounded-lg text-xs text-left transition-colors group"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <EmployeeAvatar name={report.name} avatar={report.avatar} size="sm" />
                      <div className="truncate">
                        <span className="font-semibold text-slate-900 group-hover:text-brand-600 block truncate">
                          {report.name}
                        </span>
                        <span className="text-[10px] text-slate-500 truncate block">
                          {report.role}
                        </span>
                      </div>
                    </div>
                    <UserCheck className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-600 flex-shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </EmployeeInfoSection>
      </div>
    </div>
  );
}
