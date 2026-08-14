import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Users, GitFork, Menu, X, ShieldCheck, Layers } from 'lucide-react';

/**
 * Enterprise Navigation Sidebar with TraineryCORE light branding.
 */
export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    {
      name: 'Employee Directory',
      path: '/employees',
      icon: Users,
      isActive: location.pathname.startsWith('/employees'),
    },
    {
      name: 'Organization Chart',
      path: '/organization',
      icon: GitFork,
      isActive: location.pathname === '/organization',
    },
  ];

  return (
    <>
      {/* Mobile Bar Top Header */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white shadow-xs font-bold text-sm">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-900 text-base tracking-tight">
              Trainery<span className="text-brand-500">CORE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accentGold-500 inline-block ml-1"></span>
            </span>
            <span className="block text-[10px] text-slate-500 font-mono">HRIS v1.0</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-slate-600 hover:text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
          aria-label="Toggle Navigation Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Backdrop overlay for mobile drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between transition-transform duration-200 ease-in-out select-none ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-5">
          {/* Brand Header */}
          <div className="flex items-center gap-3 pb-6 border-b border-slate-200/80">
            <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-xs font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 text-lg tracking-tight">
                Trainery<span className="text-brand-500">CORE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accentGold-500 inline-block ml-1"></span>
              </h1>
              <p className="text-[11px] text-slate-500 font-medium">Core Employee Management</p>
            </div>
          </div>

          {/* Navigation Category Label */}
          <div className="mt-6 mb-2.5 px-2 text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
            Core HR Modules
          </div>

          {/* Nav Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive || item.isActive
                        ? 'bg-brand-50 text-brand-600 border border-brand-200/80 font-semibold shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 border border-transparent'
                    }`
                  }
                >
                  <Icon className={`w-4 h-4 ${item.isActive ? 'text-brand-600' : 'text-slate-500'}`} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom User/HR Professional Context */}
        <div className="p-3.5 m-3 bg-slate-50 border border-slate-200/80 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs border border-slate-300">
              ABC
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-900 truncate">ABC</p>
              <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-medium">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Admin Access</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
