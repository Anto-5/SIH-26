import React from 'react';
import { riskFactors, simulationResults } from '../data/mockData';
import { AlertTriangle, TrendingUp, BarChart3, ScatterChart as ScatterChartIcon, Info, ShieldAlert } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine,
  ScatterChart, Scatter, ZAxis
} from 'recharts';

export default function RiskFactors() {
  // Total sum for contribution calculation
  const totalRepresentedLoss = riskFactors.reduce((sum, risk) => sum + risk.exposure, 0);

  // Sorting for bar chart
  const sortedRisks = [...riskFactors].sort((a, b) => b.exposure - a.exposure);

  // Map severities to visual theme colors
  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'HIGH': return 'var(--color-light-crimson)';
      case 'MEDIUM': return 'var(--color-light-saffron)';
      case 'LOW': return 'var(--color-light-slate)';
      default: return 'var(--color-light-text-secondary)';
    }
  };

  const getSeverityBgColor = (severity: string) => {
    switch(severity) {
      case 'HIGH': return 'bg-red-50 text-light-crimson border-red-200';
      case 'MEDIUM': return 'bg-yellow-50 text-light-saffron border-yellow-200';
      case 'LOW': return 'bg-slate-50 text-light-slate border-slate-200';
      default: return 'bg-light-surface';
    }
  };

  // Prepare chart data
  const barChartData = sortedRisks.map(rf => ({
    name: rf.name,
    exposure: rf.exposure,
    color: getSeverityColor(rf.severity),
  }));

  const scatterData = riskFactors.map(rf => ({
    name: rf.name,
    frequency: rf.frequency,
    loss: rf.exposure,
    severity: rf.severity,
    color: getSeverityColor(rf.severity),
  }));

  const CustomScatterTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-light-surface border border-light-border p-3 rounded-lg shadow-lg">
          <p className="font-bold text-light-text-primary mb-1">{data.name}</p>
          <div className="text-sm text-light-text-body space-y-1">
            <p><span className="font-semibold text-light-text-secondary">Expected Loss:</span> ₹{data.loss} Cr</p>
            <p><span className="font-semibold text-light-text-secondary">Frequency:</span> {data.frequency}/year</p>
            <p><span className="font-semibold text-light-text-secondary">Severity:</span> <span className="font-bold" style={{ color: data.color }}>{data.severity}</span></p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-light-text-primary mb-1 tracking-tight">Risk Factors</h1>
          <p className="text-sm font-medium text-light-text-secondary uppercase tracking-widest">Identify the events driving financial cyber exposure.</p>
        </div>
        <div className="flex items-center gap-2 bg-light-surface border border-light-border px-3 py-1.5 rounded-md shadow-sm w-fit">
          <div className="w-2 h-2 rounded-full bg-light-saffron animate-pulse"></div>
          <span className="text-[10px] font-bold text-light-text-secondary uppercase tracking-widest">Illustrative Simulation Data</span>
        </div>
      </div>

      {/* Top Summary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-light-surface border border-light-border rounded-lg shadow-sm overflow-hidden mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <div className="p-5 border-b lg:border-b-0 lg:border-r border-light-border">
          <div className="text-[10px] font-bold text-light-text-secondary mb-1 uppercase tracking-widest">Total Modeled Risk Events</div>
          <div className="text-2xl font-bold text-light-text-primary">{riskFactors.length}</div>
        </div>
        <div className="p-5 border-b lg:border-b-0 lg:border-r border-light-border">
          <div className="text-[10px] font-bold text-light-text-secondary mb-1 uppercase tracking-widest">Highest Exposure</div>
          <div className="text-base md:text-lg font-bold text-light-text-primary">{sortedRisks[0].name}</div>
        </div>
        <div className="p-5 border-b md:border-b-0 lg:border-r border-light-border bg-risk-bg/50">
          <div className="text-[10px] font-bold text-risk-accent mb-1 uppercase tracking-widest">Largest Expected Loss Driver</div>
          <div className="text-base md:text-lg font-bold text-risk-accent">{sortedRisks[0].name} — ₹{sortedRisks[0].exposure} Cr</div>
        </div>
        <div className="p-5 relative overflow-hidden bg-red-50">
          <div className="absolute inset-y-0 left-0 w-1 bg-light-crimson"></div>
          <div className="text-[10px] font-bold text-light-crimson mb-1 uppercase tracking-widest pl-1">Overall Risk Severity</div>
          <div className="flex items-center gap-2 pl-1">
            <ShieldAlert className="w-5 h-5 text-light-crimson" />
            <div className="text-2xl font-bold text-light-crimson">HIGH</div>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="bg-light-surface border border-light-border rounded-lg shadow-sm p-6 lg:p-8 mb-8">
        <div className="flex items-center gap-3 mb-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <BarChart3 className="w-6 h-6 text-risk-accent" />
          <div>
            <h2 className="text-xl font-bold text-light-text-primary">Risk Event Analysis</h2>
            <p className="text-sm font-medium text-light-text-secondary uppercase tracking-widest mt-1">Quantified cyber events ranked by expected financial impact.</p>
          </div>
        </div>

        {/* Visualizations Container */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          
          {/* Chart 1: Bar Chart */}
          <div className="border border-light-border rounded-lg p-5 animate-fade-in-up" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-sm font-bold text-light-text-primary uppercase tracking-widest">Expected Loss by Risk Factor</h3>
              <div className="text-right">
                <div className="text-[10px] font-bold text-light-text-secondary uppercase tracking-widest">Aggregate Expected Loss</div>
                <div className="text-sm font-bold text-light-text-primary">₹{simulationResults.baselineExpectedLoss} Cr</div>
                <div className="text-[9px] text-light-text-secondary font-medium">Aggregate simulated exposure</div>
              </div>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-light-border)" horizontal={true} vertical={false} />
                  <XAxis 
                    type="number" 
                    stroke="var(--color-light-text-secondary)" 
                    tickFormatter={(val) => `₹${val}`} 
                    tick={{fill: 'var(--color-light-text-secondary)', fontSize: 11, fontWeight: 600}} 
                  />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    stroke="var(--color-light-text-secondary)" 
                    width={130} 
                    tick={{fill: 'var(--color-light-text-primary)', fontSize: 11, fontWeight: 600}} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--color-light-surface)', borderColor: 'var(--color-light-border)', borderRadius: '6px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
                    itemStyle={{ fontWeight: 600 }}
                    formatter={(val: any) => [`₹${val} Cr`, 'Expected Loss']}
                    cursor={{fill: 'var(--color-light-bg)'}}
                  />
                  <Bar dataKey="exposure" radius={[0, 4, 4, 0]} barSize={20}>
                    {barChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Scatter Plot */}
          <div className="border border-light-border rounded-lg p-5 animate-fade-in-up" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
            <h3 className="text-sm font-bold text-light-text-primary uppercase tracking-widest mb-6">Risk Frequency vs. Financial Impact</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-light-border)" />
                  <XAxis 
                    type="number" 
                    dataKey="frequency" 
                    name="Frequency" 
                    stroke="var(--color-light-text-secondary)"
                    tick={{fill: 'var(--color-light-text-secondary)', fontSize: 11, fontWeight: 600}}
                    label={{ value: 'Expected Frequency (Events/Year)', position: 'bottom', fill: 'var(--color-light-text-secondary)', fontSize: 11, fontWeight: 600 }}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="loss" 
                    name="Expected Loss" 
                    stroke="var(--color-light-text-secondary)"
                    tickFormatter={(val) => `₹${val}`}
                    tick={{fill: 'var(--color-light-text-secondary)', fontSize: 11, fontWeight: 600}}
                    label={{ value: 'Expected Loss (₹ Cr)', angle: -90, position: 'insideLeft', fill: 'var(--color-light-text-secondary)', fontSize: 11, fontWeight: 600 }}
                  />
                  <ZAxis type="number" range={[100, 100]} />
                  <Tooltip content={<CustomScatterTooltip />} cursor={{strokeDasharray: '3 3'}} />
                  {scatterData.map((entry, index) => (
                    <Scatter key={`scatter-${index}`} data={[entry]} fill={entry.color} />
                  ))}
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
          
        </div>

        {/* Risk Detail Table / List */}
        <div className="mb-2 animate-fade-in-up" style={{ animationDelay: '500ms', animationFillMode: 'both' }}>
          <h3 className="text-sm font-bold text-light-text-primary uppercase tracking-widest mb-2">Risk Factors Detail</h3>
          <p className="text-xs text-light-text-secondary italic mb-4">
            * Risk-driver losses are modeled at the individual event level and are not directly additive to aggregate expected loss because interconnected risk events and control interactions may create overlap.
          </p>
          
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto border border-light-border rounded-lg">
            <table className="w-full text-left text-sm text-light-text-body">
              <thead className="text-[11px] text-light-text-secondary font-bold uppercase tracking-widest bg-light-bg border-b border-light-border">
                <tr>
                  <th scope="col" className="px-5 py-3">Risk Factor</th>
                  <th scope="col" className="px-5 py-3 text-right">Frequency (per yr)</th>
                  <th scope="col" className="px-5 py-3 text-right">Expected Loss</th>
                  <th scope="col" className="px-5 py-3 text-center">Severity</th>
                  <th scope="col" className="px-5 py-3 text-right">Contribution to risk-driver total</th>
                </tr>
              </thead>
              <tbody>
                {sortedRisks.map((risk, index) => {
                  const contribution = ((risk.exposure / totalRepresentedLoss) * 100).toFixed(1);
                  return (
                    <tr key={index} className="border-b border-light-border last:border-0 hover:bg-light-bg/50 transition-colors">
                      <td className="px-5 py-4 font-bold text-light-text-primary">{risk.name}</td>
                      <td className="px-5 py-4 text-right font-medium">{risk.frequency}</td>
                      <td className="px-5 py-4 text-right font-bold text-light-text-primary">₹{risk.exposure} Cr</td>
                      <td className="px-5 py-4 text-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm border uppercase tracking-widest inline-block ${getSeverityBgColor(risk.severity)}`}>
                          {risk.severity}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right font-semibold text-light-text-secondary">{contribution}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
            {sortedRisks.map((risk, index) => {
              const contribution = ((risk.exposure / totalRepresentedLoss) * 100).toFixed(1);
              return (
                <div key={index} className="border border-light-border rounded-lg p-4 bg-light-surface shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div className="font-bold text-light-text-primary text-base">{risk.name}</div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm border uppercase tracking-widest ${getSeverityBgColor(risk.severity)}`}>
                      {risk.severity}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-[10px] font-bold text-light-text-secondary uppercase tracking-widest">Frequency</div>
                      <div className="font-medium text-light-text-primary">{risk.frequency} / yr</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-light-text-secondary uppercase tracking-widest">Expected Loss</div>
                      <div className="font-bold text-light-text-primary">₹{risk.exposure} Cr</div>
                    </div>
                    <div className="col-span-2 mt-1">
                      <div className="w-full bg-light-secondary rounded-full h-1.5 border border-light-border">
                        <div 
                          className="h-full rounded-full" 
                          style={{ width: `${contribution}%`, backgroundColor: getSeverityColor(risk.severity) }}
                        ></div>
                      </div>
                      <div className="text-right text-[10px] font-bold text-light-text-secondary uppercase tracking-widest mt-1">
                        {contribution}% of risk-driver total
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
        </div>
      </div>

      {/* Key Risk Insight */}
      <div className="bg-risk-bg border border-risk-border rounded-lg p-6 lg:p-8 flex items-start gap-4 shadow-sm animate-fade-in-up" style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
        <Info className="w-6 h-6 text-risk-accent shrink-0 mt-0.5" />
        <div>
          <h3 className="text-light-text-primary font-bold mb-2">Key Risk Insight</h3>
          <p className="text-sm text-light-text-body leading-relaxed font-medium">
            <span className="font-bold text-light-text-primary">Credential compromise</span> is currently the largest modeled loss driver, followed by <span className="font-bold text-light-text-primary">lateral movement</span>. Together, these risks represent a substantial portion of modeled exposure and should be evaluated first when prioritizing security controls.
          </p>
        </div>
      </div>
    </div>
  );
}
