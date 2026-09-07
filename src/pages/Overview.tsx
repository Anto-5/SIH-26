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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">Security Risk Overview</h1>
          <p className="text-sm md:text-base text-gray-400">
            Quantify exposure. Optimize investment. Reduce expected loss.
          </p>
        </div>
        <div className="shrink-0">
          <StatusIndicator />
        </div>
      </div>

      {/* KPI Section */}
      <section aria-label="Key Performance Indicators" className="mb-8">
        <RiskKpi />
      </section>
      
      {/* Visualizations Section */}
      <section aria-label="Risk Visualizations" className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <LossDistributionChart />
        </div>
        <div className="lg:col-span-1">
          <TopRiskExposure />
        </div>
      </section>

      {/* Investment Decision Section */}
      <section aria-label="Investment Decision">
        <InvestmentDecision />
      </section>

    </div>
  );
}
