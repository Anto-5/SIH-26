import React from 'react';
import { RiskKpi } from '../components/overview/RiskKpi';
import { LossDistributionChart } from '../components/overview/LossDistributionChart';
import { TopRiskExposure } from '../components/overview/TopRiskExposure';
import { InvestmentDecision } from '../components/overview/InvestmentDecision';
import { StatusIndicator } from '../components/overview/StatusIndicator';

export default function Overview() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div className="max-w-3xl">
          <h1 className="text-2xl md:text-3xl font-bold text-light-text-primary mb-1 tracking-tight animate-fade-in-up" style={{ animationDelay: '0ms' }}>Security Risk Overview</h1>
          <p className="text-sm font-medium text-light-text-secondary uppercase tracking-widest mb-4 animate-fade-in-up" style={{ animationDelay: '50ms' }}>
            Quantify exposure • Optimize investment • Reduce expected loss
          </p>
          <p className="text-sm md:text-base text-light-text-body leading-relaxed animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            Current modeled exposure is <span className="font-semibold text-light-text-primary">₹18.4 Cr</span> in expected annual loss, with <span className="font-semibold text-light-saffron">₹46.7 Cr</span> at the 95th percentile. PRAMANYA identifies a <span className="font-semibold text-light-text-primary">₹5.0 Cr</span> security investment strategy projected to reduce expected loss by <span className="font-semibold text-light-green">31%</span>.
          </p>
        </div>
        <div className="shrink-0 mt-1 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
          <StatusIndicator />
        </div>
      </div>

      {/* KPI Section */}
      <section aria-label="Key Performance Indicators" className="mb-8 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
        <RiskKpi />
      </section>
      
      {/* Visualizations Section */}
      <section aria-label="Risk Visualizations" className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <LossDistributionChart />
        </div>
        <div className="xl:col-span-1 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <TopRiskExposure />
        </div>
      </section>

      {/* Investment Decision Section */}
      <section aria-label="Investment Decision" className="animate-fade-in-up" style={{ animationDelay: '550ms' }}>
        <InvestmentDecision />
      </section>

    </div>
  );
}
