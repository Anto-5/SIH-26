import React from 'react';
import { Database, FileCheck2, Info, ArrowRight, ArrowDown } from 'lucide-react';

export default function DataAssumptions() {
  const dataProvenance = [
    {
      input: 'Threat Frequency',
      valueRange: '0.42 / year',
      source: 'Simulation',
      status: 'SYNTHETIC',
      statusColor: 'text-light-saffron bg-yellow-50 border-yellow-200'
    },
    {
      input: 'Loss Magnitude',
      valueRange: '₹2.4 Cr (Avg)',
      source: 'Scenario Model',
      status: 'ASSUMED',
      statusColor: 'text-light-slate bg-slate-50 border-slate-200'
    },
    {
      input: 'Control Effectiveness',
      valueRange: '65% - 81%',
      source: 'Control Model',
      status: 'ASSUMED',
      statusColor: 'text-light-slate bg-slate-50 border-slate-200'
    },
    {
      input: 'Vulnerability Data',
      valueRange: 'NVD Feed',
      source: 'External Dataset',
      status: 'REAL',
      statusColor: 'text-light-green bg-green-50 border-green-200'
    },
    {
      input: 'Control Costs',
      valueRange: 'Market Estimates',
      source: 'Industry Benchmark',
      status: 'ASSUMED',
      statusColor: 'text-light-slate bg-slate-50 border-slate-200'
    },
    {
      input: 'Interaction Network',
      valueRange: 'Deterministic Graph',
      source: 'Simulation',
      status: 'SYNTHETIC',
      statusColor: 'text-light-saffron bg-yellow-50 border-yellow-200'
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-light-text-primary mb-1 tracking-tight">DATA & ASSUMPTIONS</h1>
        <p className="text-sm font-medium text-light-text-secondary uppercase tracking-widest">TRACE EVERY DECISION BACK TO ITS UNDERLYING ASSUMPTIONS.</p>
      </div>

      {/* SECTION 1 — DATA PROVENANCE */}
      <div className="bg-light-surface border border-light-border rounded-lg p-6 lg:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Database className="w-6 h-6 text-data-accent" />
          <h2 className="text-xl font-bold text-light-text-primary">Data Provenance</h2>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block border border-light-border rounded-lg shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm text-light-text-body">
            <thead className="text-[11px] text-light-text-secondary font-bold uppercase tracking-widest bg-data-bg border-b border-light-border">
              <tr>
                <th scope="col" className="px-6 py-4">Input / Parameter</th>
                <th scope="col" className="px-6 py-4">Value Range</th>
                <th scope="col" className="px-6 py-4">Source</th>
                <th scope="col" className="px-6 py-4">Data Status</th>
              </tr>
            </thead>
            <tbody>
              {dataProvenance.map((item, index) => (
                <tr key={index} className="border-b border-light-border bg-light-surface hover:bg-data-bg/50 transition-colors last:border-b-0">
                  <td className="px-6 py-4 font-bold text-light-text-primary">{item.input}</td>
                  <td className="px-6 py-4 font-medium">{item.valueRange}</td>
                  <td className="px-6 py-4">{item.source}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm border uppercase tracking-widest inline-block ${item.statusColor}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {dataProvenance.map((item, index) => (
            <div key={index} className="border border-light-border rounded-lg p-4 bg-light-surface shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div className="font-bold text-light-text-primary text-sm">{item.input}</div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm border uppercase tracking-widest ${item.statusColor}`}>
                  {item.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="text-light-text-secondary uppercase tracking-widest font-bold text-[10px] mb-0.5">Value Range</div>
                  <div className="font-medium text-light-text-body">{item.valueRange}</div>
                </div>
                <div>
                  <div className="text-light-text-secondary uppercase tracking-widest font-bold text-[10px] mb-0.5">Source</div>
                  <div className="font-medium text-light-text-body">{item.source}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2 — TRANSPARENCY STATEMENT */}
      <div className="bg-data-bg border border-data-border rounded-lg p-6 lg:p-8 flex flex-col md:flex-row items-start gap-4 shadow-sm">
        <FileCheck2 className="w-8 h-8 text-data-accent shrink-0 mt-0.5" />
        <div>
          <h3 className="text-light-text-primary font-bold mb-2">Transparency Statement</h3>
          <p className="text-sm text-light-text-body leading-relaxed font-medium mb-4">
            PRAMANYA is designed to be a transparent decision-support tool. Because empirical cybersecurity loss data is highly classified and rarely shared publicly, this prototype utilizes deterministic synthetic simulations and assumed parameters to demonstrate the mathematical optimization engine.
          </p>
          <p className="text-sm text-light-text-primary leading-relaxed font-bold mb-4">
            Never imply synthetic or assumed data represents measured historical truth.
          </p>
          <p className="text-sm text-light-text-body leading-relaxed font-medium">
            When deployed in an enterprise environment, these parameters would be calibrated against internal incident history and threat intelligence feeds.
          </p>
        </div>
      </div>

      {/* SECTION 3 — WHAT EACH DATA TYPE MEANS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-light-surface border border-light-border rounded-lg p-6 shadow-sm flex flex-col">
          <div className="mb-3">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-sm border uppercase tracking-widest inline-block text-light-green bg-green-50 border-green-200">
              REAL
            </span>
          </div>
          <p className="text-sm text-light-text-body font-medium mb-4">
            Externally sourced or observed data.
          </p>
          <div className="text-xs border-t border-light-border pt-4 mt-auto">
            <span className="font-bold text-light-text-secondary uppercase tracking-widest block mb-1">Example:</span>
            <div className="font-medium text-light-text-body">NVD vulnerability information.</div>
          </div>
        </div>

        <div className="bg-light-surface border border-light-border rounded-lg p-6 shadow-sm flex flex-col">
          <div className="mb-3">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-sm border uppercase tracking-widest inline-block text-light-saffron bg-yellow-50 border-yellow-200">
              SYNTHETIC
            </span>
          </div>
          <p className="text-sm text-light-text-body font-medium mb-4">
            Generated deterministic data used to demonstrate the simulation and optimization pipeline.
          </p>
          <div className="text-xs border-t border-light-border pt-4 mt-auto">
            <span className="font-bold text-light-text-secondary uppercase tracking-widest block mb-1">Example:</span>
            <div className="font-medium text-light-text-body">Threat-frequency simulation and interaction network.</div>
          </div>
        </div>

        <div className="bg-light-surface border border-light-border rounded-lg p-6 shadow-sm flex flex-col">
          <div className="mb-3">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-sm border uppercase tracking-widest inline-block text-light-slate bg-slate-50 border-slate-200">
              ASSUMED
            </span>
          </div>
          <p className="text-sm text-light-text-body font-medium mb-4">
            Prototype parameters used where reliable public empirical values are unavailable.
          </p>
          <div className="text-xs border-t border-light-border pt-4 mt-auto">
            <span className="font-bold text-light-text-secondary uppercase tracking-widest block mb-1">Example:</span>
            <div className="font-medium text-light-text-body">Control effectiveness and estimated control costs.</div>
          </div>
        </div>
      </div>

      {/* SECTION 4 — METHODOLOGY NOTE */}
      <div className="bg-light-surface border border-light-border rounded-lg p-6 lg:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Info className="w-6 h-6 text-data-accent" />
          <h2 className="text-xl font-bold text-light-text-primary">Methodology Note</h2>
        </div>
        
        <ul className="text-sm text-light-text-body space-y-3 ml-4 list-disc marker:text-data-accent font-medium mb-8">
          <li><span className="font-bold text-light-text-primary">Threat frequency</span> estimates how often loss events may occur.</li>
          <li><span className="font-bold text-light-text-primary">Loss magnitude</span> estimates the financial impact when an event occurs.</li>
          <li><span className="font-bold text-light-text-primary">Control effectiveness</span> reduces modeled exposure.</li>
          <li><span className="font-bold text-light-text-primary">Control interactions</span> model dependencies between security controls.</li>
          <li>These parameters feed the risk simulation and portfolio optimization process.</li>
        </ul>

        <div className="bg-data-bg rounded-lg p-4 lg:p-6 border border-data-border flex flex-col md:flex-row items-center justify-between gap-3 lg:gap-4 overflow-hidden">
          <div className="text-center w-full md:w-auto">
            <div className="text-[10px] font-bold text-data-accent uppercase tracking-widest bg-white border border-data-border px-3 py-2.5 rounded shadow-sm whitespace-nowrap">Data Inputs</div>
          </div>
          <ArrowDown className="w-4 h-4 text-light-text-secondary md:hidden shrink-0" />
          <ArrowRight className="w-4 h-4 text-light-text-secondary hidden md:block shrink-0" />
          
          <div className="text-center w-full md:w-auto">
            <div className="text-[10px] font-bold text-data-accent uppercase tracking-widest bg-white border border-data-border px-3 py-2.5 rounded shadow-sm whitespace-nowrap">Risk Model</div>
          </div>
          <ArrowDown className="w-4 h-4 text-light-text-secondary md:hidden shrink-0" />
          <ArrowRight className="w-4 h-4 text-light-text-secondary hidden md:block shrink-0" />
          
          <div className="text-center w-full md:w-auto">
            <div className="text-[10px] font-bold text-data-accent uppercase tracking-widest bg-white border border-data-border px-3 py-2.5 rounded shadow-sm whitespace-nowrap">Monte Carlo Simulation</div>
          </div>
          <ArrowDown className="w-4 h-4 text-light-text-secondary md:hidden shrink-0" />
          <ArrowRight className="w-4 h-4 text-light-text-secondary hidden md:block shrink-0" />
          
          <div className="text-center w-full md:w-auto">
            <div className="text-[10px] font-bold text-data-accent uppercase tracking-widest bg-white border border-data-border px-3 py-2.5 rounded shadow-sm whitespace-nowrap">Loss Distribution</div>
          </div>
          <ArrowDown className="w-4 h-4 text-light-text-secondary md:hidden shrink-0" />
          <ArrowRight className="w-4 h-4 text-light-text-secondary hidden md:block shrink-0" />
          
          <div className="text-center w-full md:w-auto">
            <div className="text-[10px] font-bold text-light-green uppercase tracking-widest bg-green-50 border border-green-200 px-3 py-2.5 rounded shadow-sm whitespace-nowrap">Portfolio Optimization</div>
          </div>
        </div>
      </div>
    </div>
  );
}
