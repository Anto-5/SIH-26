import React from 'react';

export const StatusIndicator: React.FC = () => {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-light-surface border border-light-border rounded-md">
      <div className="w-1.5 h-1.5 rounded-full bg-light-text-secondary"></div>
      <span className="text-[11px] font-bold text-light-text-secondary tracking-widest uppercase">
        Illustrative Simulation Data
      </span>
    </div>
  );
};
