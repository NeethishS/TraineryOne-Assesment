import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, UserCheck, ExternalLink } from 'lucide-react';
import EmployeeAvatar from '../employee/EmployeeAvatar';

/**
 * Individual Node card component in the Organization Chart.
 */
export default function OrgNodeCard({
  node,
  isExpanded,
  onToggleExpand,
  hasChildren,
}) {
  const navigate = useNavigate();
  const { employee } = node;

  const handleCardClick = (e) => {
    // Prevent navigation if click came from expand/collapse button
    if (e.target.closest('.toggle-btn')) return;
    navigate(`/employees/${employee.id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (e.target.closest('.toggle-btn')) return;
      e.preventDefault();
      navigate(`/employees/${employee.id}`);
    }
  };

  return (
    <div className="relative flex flex-col items-center group">
      {/* Node Card */}
      <div
        role="button"
        tabIndex={0}
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
        className="w-64 bg-white hover:bg-slate-50 border border-slate-200 hover:border-brand-400 rounded-xl p-4 shadow-2xs transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500 relative z-10 select-none"
      >
        <div className="flex items-start justify-between gap-2">
          {/* Avatar & Basic Info */}
          <div className="flex items-center gap-3 min-w-0">
            <EmployeeAvatar name={employee.name} avatar={employee.avatar} size="md" />
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-brand-600 transition-colors truncate">
                {employee.name}
              </h4>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">
                {employee.role}
              </p>
            </div>
          </div>
          
          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-600 transition-colors flex-shrink-0" />
        </div>

        {/* Card Footer: Department & Direct Reports Count */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200 font-medium">
            {employee.department}
          </span>

          {hasChildren && (
            <span className="flex items-center gap-1 font-medium bg-brand-50 text-brand-700 px-2 py-0.5 rounded border border-brand-200/80">
              <UserCheck className="w-3 h-3 text-brand-600" />
              {node.children.length} {node.children.length === 1 ? 'report' : 'reports'}
            </span>
          )}
        </div>

        {/* Expand / Collapse Floating Toggle Button */}
        {hasChildren && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand(employee.id);
            }}
            className="toggle-btn absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border border-slate-300 hover:border-brand-500 text-slate-600 hover:text-brand-600 flex items-center justify-center shadow-2xs transition-colors z-20 focus:outline-none focus:ring-2 focus:ring-brand-500"
            title={isExpanded ? 'Collapse team' : 'Expand team'}
            aria-label={isExpanded ? 'Collapse team' : 'Expand team'}
          >
            {isExpanded ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
