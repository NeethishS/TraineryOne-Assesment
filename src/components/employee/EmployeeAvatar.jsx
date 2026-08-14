import React, { useState } from 'react';

/**
 * Renders an employee avatar image with automatic fallback to initials.
 */
export default function EmployeeAvatar({ name = '', avatar, size = 'md', className = '' }) {
  const [imageError, setImageError] = useState(false);

  // Compute initials from name
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('') || '??';

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl font-bold',
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  if (avatar && !imageError) {
    return (
      <img
        src={avatar}
        alt={name}
        onError={() => setImageError(true)}
        className={`${currentSize} rounded-full object-cover ring-2 ring-slate-100 shadow-2xs border border-slate-200 ${className}`}
      />
    );
  }

  return (
    <div
      className={`${currentSize} rounded-full bg-brand-50 text-brand-600 flex items-center justify-center font-semibold tracking-wider ring-2 ring-slate-100 shadow-2xs border border-brand-200/80 ${className}`}
    >
      {initials}
    </div>
  );
}
