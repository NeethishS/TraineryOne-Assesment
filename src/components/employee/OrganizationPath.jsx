import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GitCommit, ChevronDown, CheckCircle2 } from 'lucide-react';
import EmployeeAvatar from './EmployeeAvatar';

/**
 * Organization Path Component — Signature Product Feature.
 * Displays the dynamic reporting chain from root executive down to the selected employee.
 */
export default function OrganizationPath({ path = [], currentEmployeeId }) {
  const navigate = useNavigate();

  if (!path || path.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs">
      {/* Component Title Header */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-accentGold-500/15 text-accentGold-600 flex items-center justify-center">
            <GitCommit className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-xs font-bold text-slate-900 tracking-wider uppercase">
            Organization Path
          </h3>
        </div>
        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
          {path.length} level{path.length === 1 ? '' : 's'} chain
        </span>
      </div>

      {/* Path List View */}
      <div className="relative space-y-3 pl-2">
        {path.map((item, index) => {
          const isSelected = item.id === currentEmployeeId;
          const isLast = index === path.length - 1;

          return (
            <div key={item.id} className="relative flex flex-col items-start">
              {/* Connector Line to Next Step */}
              {!isLast && (
                <div className="absolute left-[15px] top-9 bottom--3 w-0.5 bg-slate-200 z-0"></div>
              )}

              {/* Step Row */}
              <div className="flex items-center gap-3 w-full z-10">
                {/* Clickable Node Card */}
                <button
                  type="button"
                  onClick={() => !isSelected && navigate(`/employees/${item.id}`)}
                  disabled={isSelected}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-brand-50/70 border-brand-300 shadow-2xs'
                      : 'bg-white hover:bg-slate-50 border-slate-200/80 hover:border-brand-300'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <EmployeeAvatar name={item.name} avatar={item.avatar} size="sm" />
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold truncate ${isSelected ? 'text-brand-900' : 'text-slate-900'}`}>
                          {item.name}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-semibold bg-brand-600 text-white px-2 py-0.2 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Selected
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 truncate block">
                        {item.role} • <span className="font-medium text-slate-600">{item.department}</span>
                      </span>
                    </div>
                  </div>

                  {!isSelected && (
                    <span className="text-[10px] font-medium text-brand-600 hover:underline flex-shrink-0 ml-2">
                      View →
                    </span>
                  )}
                </button>
              </div>

              {/* Arrow Connector Down */}
              {!isLast && (
                <div className="self-center py-1 text-slate-400">
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
