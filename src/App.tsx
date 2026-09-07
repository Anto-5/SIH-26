import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { Layout } from './components/Layout';

// Placeholder Pages
const Overview = React.lazy(() => import('./pages/Overview'));
const RiskFactors = React.lazy(() => import('./pages/RiskFactors'));
const SecurityControls = React.lazy(() => import('./pages/SecurityControls'));
const InvestmentOptimizer = React.lazy(() => import('./pages/InvestmentOptimizer'));
const ControlInteractions = React.lazy(() => import('./pages/ControlInteractions'));
const WhatIfAnalysis = React.lazy(() => import('./pages/WhatIfAnalysis'));
const Benchmark = React.lazy(() => import('./pages/Benchmark'));
const DataAssumptions = React.lazy(() => import('./pages/DataAssumptions'));

// Simple loading component
const PageLoader = () => (
  <div className="flex items-center justify-center h-full">
    <div className="w-8 h-8 border-2 border-brand-saffron border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <Router>
      <React.Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route element={<Layout />}>
            <Route path="/overview" element={<Overview />} />
            <Route path="/risk-factors" element={<RiskFactors />} />
            <Route path="/security-controls" element={<SecurityControls />} />
            <Route path="/optimizer" element={<InvestmentOptimizer />} />
            <Route path="/control-interactions" element={<ControlInteractions />} />
            <Route path="/what-if-analysis" element={<WhatIfAnalysis />} />
            <Route path="/benchmark" element={<Benchmark />} />
            <Route path="/data-assumptions" element={<DataAssumptions />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </React.Suspense>
    </Router>
  );
}

export default App;
