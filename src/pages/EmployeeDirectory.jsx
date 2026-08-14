import React, { useState, useMemo } from 'react';
import { EMPLOYEES } from '../data/employees';
import SearchBar from '../components/employee/SearchBar';
import EmployeeRow from '../components/employee/EmployeeRow';
import { SearchX, Users } from 'lucide-react';

/**
 * Screen 1 — Employee Directory Page.
 */
export default function EmployeeDirectory() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter employees dynamically based on query
  const filteredEmployees = useMemo(() => {
    if (!searchTerm.trim()) return EMPLOYEES;
    const query = searchTerm.toLowerCase().trim();

    return EMPLOYEES.filter((emp) => {
      return (
        emp.name.toLowerCase().includes(query) ||
        emp.employeeId.toLowerCase().includes(query) ||
        emp.role.toLowerCase().includes(query) ||
        emp.department.toLowerCase().includes(query)
      );
    });
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-brand-600 text-xs font-semibold uppercase tracking-wider mb-1">
          <Users className="w-4 h-4" />
          <span>Core HRIS Directory</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Employee Directory
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          View employee information and organizational relationships.
        </p>
      </div>

      {/* Directory Search & Controls */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        totalCount={EMPLOYEES.length}
        filteredCount={filteredEmployees.length}
      />

      {/* Employee List */}
      {filteredEmployees.length > 0 ? (
        <div className="space-y-2.5">
          {filteredEmployees.map((employee) => (
            <EmployeeRow key={employee.id} employee={employee} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border border-slate-200/80 rounded-xl p-12 text-center my-8 shadow-2xs">
          <SearchX className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900">No employees found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            We couldn't find any employees matching "{searchTerm}". Try adjusting your search criteria.
          </p>
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            className="mt-4 px-4 py-2 text-xs font-semibold text-brand-600 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            Clear Search Filter
          </button>
        </div>
      )}
    </div>
  );
}
