import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ChevronRight } from 'lucide-react';
import EmployeeAvatar from './EmployeeAvatar';

/**
 * Interactive Employee row component for table/list directory view.
 */
export default function EmployeeRow({ employee }) {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/employees/${employee.id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleRowClick();
    }
  };

  // Restrained status badge colors for light theme
  const statusStyles = {
    Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'On Leave': 'bg-amber-50 text-amber-700 border-amber-200',
    Terminated: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  const badgeStyle = statusStyles[employee.status] || 'bg-slate-100 text-slate-700 border-slate-200';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleRowClick}
      onKeyDown={handleKeyDown}
      className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white hover:bg-slate-50/80 border border-slate-200/80 hover:border-brand-300 rounded-xl cursor-pointer transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-brand-500/30 shadow-2xs"
    >
      {/* Left: Avatar + Identity */}
      <div className="flex items-center gap-3.5 min-w-0">
        <EmployeeAvatar name={employee.name} avatar={employee.avatar} size="md" />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-900 group-hover:text-brand-600 transition-colors text-sm truncate">
              {employee.name}
            </h3>
            <span className="text-[11px] font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              {employee.employeeId}
            </span>
          </div>
          <p className="text-xs text-slate-600 truncate mt-0.5">
            {employee.role}
          </p>
        </div>
      </div>

      {/* Center/Right Metadata */}
      <div className="flex items-center justify-between md:justify-end gap-4 md:gap-6 text-xs text-slate-500">
        {/* Department Badge */}
        <span className="hidden sm:inline-block px-2.5 py-1 bg-slate-100/80 text-slate-700 rounded-md border border-slate-200 font-medium text-[11px]">
          {employee.department}
        </span>

        {/* Location */}
        <div className="flex items-center gap-1 text-slate-500 min-w-[110px]">
          <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="truncate">{employee.location}</span>
        </div>

        {/* Status */}
        <span className={`px-2.5 py-0.5 text-[11px] font-medium rounded-full border ${badgeStyle}`}>
          {employee.status}
        </span>

        {/* Action Icon */}
        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all hidden sm:block" />
      </div>
    </div>
  );
}
