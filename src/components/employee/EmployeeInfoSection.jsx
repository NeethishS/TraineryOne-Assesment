import React from 'react';

/**
 * Reusable layout card for grouping metadata on the Employee Detail page.
 */
export default function EmployeeInfoSection({ title, icon: Icon, children, className = '' }) {
  return (
    <div className={`bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs ${className}`}>
      <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100">
        {Icon && <Icon className="w-4 h-4 text-brand-600" />}
        <h3 className="text-xs font-bold text-slate-900 tracking-wider uppercase">
          {title}
        </h3>
      </div>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

/**
 * Key-Value row helper within an InfoSection.
 */
export function InfoRow({ label, value, isLink = false, onClick }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs py-1 gap-1">
      <span className="text-slate-500 font-medium">{label}</span>
      {isLink ? (
        <button
          type="button"
          onClick={onClick}
          className="text-brand-600 hover:text-brand-700 font-semibold hover:underline text-left sm:text-right transition-colors focus:outline-none focus:ring-1 focus:ring-brand-500 rounded px-1 -mx-1"
        >
          {value}
        </button>
      ) : (
        <span className="text-slate-900 font-semibold text-left sm:text-right">{value || '—'}</span>
      )}
    </div>
  );
}
