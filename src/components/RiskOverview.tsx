import React from 'react';
import { StatusIndicator, cn } from './shared';
import { ShieldAlert, ShieldCheck, Lock, Unlock, AlertTriangle, Scale } from 'lucide-react';

const mockPolicies = [
  { id: 'POL-001', name: 'Global Daily Drawdown', limit: '2.00%', current: '0.42%', status: 'nominal' },
  { id: 'POL-002', name: 'Asset Concentration', limit: '25.0%', current: '14.8%', status: 'nominal' },
  { id: 'POL-003', name: 'Maximum Order Size', limit: '$100k', current: '$12k', status: 'nominal' },
  { id: 'POL-004', name: 'Volatility Spike Guard', limit: '5% / 5m', current: '0.8%', status: 'nominal' },
];

export function RiskOverview() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between border-b border-neutral-200 pb-4">
        <div><h1 className="text-xl font-semibold text-neutral-800">Risk & Compliance</h1><p className="text-sm text-neutral-500">Real-time policy enforcement and exposure analytics</p></div>
        <div className="flex items-center gap-2 rounded bg-neutral-100 px-3 py-1"><ShieldCheck className="h-4 w-4 text-neutral-600" /><span className="text-[10px] font-bold text-neutral-600 uppercase">Risk Gate: Active</span></div>
      </header>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Exposure Heatmap</h2>
          <div className="rounded border border-neutral-200 bg-white p-6 h-[340px] flex flex-col">
            <div className="grid grid-cols-8 gap-2 flex-1">{[...Array(64)].map((_, i) => <div key={i} className={cn("rounded transition-all hover:scale-110 cursor-help", i % 12 === 0 ? "bg-rose-500" : i % 7 === 0 ? "bg-amber-400" : "bg-emerald-500/10")} title={`Sector ${i} | Exposure: ${i % 12 === 0 ? 'Concentrated' : i % 7 === 0 ? 'Moderate' : 'Low'}`} />)}</div>
            <div className="mt-4 flex justify-between items-center border-t border-neutral-50 pt-4"><div className="flex gap-4 text-[9px] font-bold uppercase text-neutral-400"><div className="flex items-center gap-2"><div className="h-2 w-2 rounded bg-emerald-500/20" /> Low Risk</div><div className="flex items-center gap-2"><div className="h-2 w-2 rounded bg-amber-400" /> Moderate</div><div className="flex items-center gap-2"><div className="h-2 w-2 rounded bg-rose-500" /> Concentrated</div></div><span className="text-[10px] text-neutral-400 italic font-mono uppercase">Last Refresh: 14:42:01 UTC</span></div>
          </div>
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Policy Readout</h2>
            <div className="rounded border border-neutral-200 bg-white"><table className="w-full text-left text-xs"><thead className="border-b border-neutral-100 bg-neutral-50/50 text-[10px] font-bold uppercase tracking-wider text-neutral-400"><tr><th className="px-4 py-3">Policy Name</th><th className="px-4 py-3">Hard Limit</th><th className="px-4 py-3">Current</th><th className="px-4 py-3">Status</th></tr></thead><tbody className="divide-y divide-neutral-100">{mockPolicies.map((pol) => <tr key={pol.id} className="hover:bg-neutral-50/30"><td className="px-4 py-3 font-bold text-neutral-700">{pol.name}</td><td className="px-4 py-3 font-mono text-neutral-400">{pol.limit}</td><td className="px-4 py-3 font-mono text-neutral-600">{pol.current}</td><td className="px-4 py-3 uppercase text-[9px] font-bold text-neutral-500">{pol.status}</td></tr>)}</tbody></table></div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">System Interlock</h2>
            <div className="rounded border border-neutral-200 bg-neutral-900 p-6 text-white space-y-6"><div className="flex flex-col items-center justify-center py-4 text-center"><div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-neutral-800 bg-neutral-800 shadow-[0_0_20px_rgba(255,255,255,0.05)]"><Unlock className="h-6 w-6 text-neutral-500" /></div><h3 className="text-sm font-bold uppercase tracking-widest">Global Lock: Disengaged</h3><p className="mt-2 text-[10px] text-neutral-400">Risk Service is monitoring all order flows.</p></div><div className="space-y-4 border-t border-neutral-800 pt-6"><div className="flex justify-between items-center"><div className="flex items-center gap-2"><Scale className="h-3.5 w-3.5 text-neutral-500" /><span className="text-[10px] text-neutral-400 uppercase">Margin Coverage</span></div><span className="text-xs font-mono">1,402.1%</span></div><div className="flex justify-between items-center"><div className="flex items-center gap-2"><AlertTriangle className="h-3.5 w-3.5 text-neutral-500" /><span className="text-[10px] text-neutral-400 uppercase">Violation Count</span></div><span className="text-xs font-mono">0</span></div></div></div>
          </div>
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Asset Blacklist</h2>
            <div className="rounded border border-neutral-200 bg-white p-4"><div className="space-y-2">{['DOGE/USD', 'PEPE/USD', 'MEME/USD'].map(asset => <div key={asset} className="flex justify-between items-center p-2 rounded bg-neutral-50 border border-neutral-100"><span className="text-[10px] font-bold text-neutral-700">{asset}</span><span className="text-[9px] font-bold text-neutral-400 uppercase">Restricted</span></div>)}</div><p className="mt-4 text-[9px] text-neutral-400 text-center uppercase">Managed via Compliance Contract</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}
