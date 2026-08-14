import React from 'react';
import { Search, X, Users } from 'lucide-react';

/**
 * Real-time Search input component with result counters.
 */
export default function SearchBar({ searchTerm, onSearchChange, totalCount, filteredCount }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200/80 rounded-xl p-4 shadow-2xs">
      {/* Search Input Box */}
      <div className="relative flex-1 max-w-lg">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          id="employee-search"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, ID, role, or department..."
          className="w-full pl-9 pr-10 py-2 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
          aria-label="Search employees"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
            title="Clear search"
            aria-label="Clear search input"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Employee Counter Badge */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-lg self-start md:self-auto">
        <Users className="w-4 h-4 text-brand-600" />
        <span>
          Showing <span className="font-semibold text-slate-900">{filteredCount}</span>
          {searchTerm && (
            <span> of <span className="font-semibold text-slate-900">{totalCount}</span></span>
          )} employees
        </span>
      </div>
    </div>
  );
}
