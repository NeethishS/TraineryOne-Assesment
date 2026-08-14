import React from 'react';
import { EMPLOYEES } from '../data/employees';
import OrgChart from '../components/org-chart/OrgChart';
import { GitFork } from 'lucide-react';

/**
 * Screen 2 — Organization Chart Page.
 */
export default function OrganizationChart() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-brand-600 text-xs font-semibold uppercase tracking-wider mb-1">
          <GitFork className="w-4 h-4" />
          <span>Organizational Structure</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Organization Chart
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Explore reporting relationships across the organization.
        </p>
      </div>

      {/* Interactive Org Chart Canvas */}
      <OrgChart employees={EMPLOYEES} />
    </div>
  );
}
