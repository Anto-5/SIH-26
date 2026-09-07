import React from 'react';

export const StatusIndicator: React.FC = () => {
  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-brand-surface border border-brand-border rounded-full shadow-sm">
      <div className="w-2 h-2 rounded-full bg-gray-400"></div>
      <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
        Illustrative Simulation Data
      </span>
    </div>
  );
};
