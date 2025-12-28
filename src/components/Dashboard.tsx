import React from 'react';
import { StatusIndicator, StateWrapper, cn } from './shared';
import { Activity, BarChart3, Layers, ShieldAlert, Cpu } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const mockSystemStats = [
  { name: 'API Gateway', status: 'live', lat: '4ms', load: '12%' },
  { name: 'Broker Hub', status: 'live', lat: '8ms', load: '4%' },
  { name: 'Market Hub', status: 'live', lat: '12ms', load: '65%' },
  { name: 'Risk Service', status: 'warning', lat: '45ms', load: '22%' },
];

const mockTopAssets = [
  { symbol: 'BTC/USD', price: '42,102.50', change: '+1.2%', vol: '2.4B' },
  { symbol: 'ETH/USD', price: '2,241.15', change: '+0.8%', vol: '1.1B' },
  { symbol: 'AAPL', price: '175.43', change: '-0.3%', vol: '450M' },
];

const mockMarketSummary = [
  { time: '09:00', price: 150 }, { time: '10:00', price: 155 }, { time: '11:00', price: 153 }, { time: '12:00', price: 158 }, { time: '13:00', price: 162 }, { time: '14:00', price: 160 }, { time: '15:00', price: 165 },
];

const mockStrategyStates = [
  { id: 'S1', name: 'Trend_Follower_A', state: 'Active', load: 45 },
  { id: 'S2', name: 'Mean_Reversion_B', state: 'Paused', load: 0 },
  { id: 'S3', name: 'Arbitrage_C', state: 'Active', load: 88 },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between border-b border-neutral-200 pb-4">
        <div>
          <h1 className="text-xl font-semibold text-neutral-800">Global Observer</h1>
          <p className="text-sm text-neutral-500">System-wide performance and execution state</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-neutral-400 uppercase">Gateway Throughput</span>
            <span className="text-sm font-mono font-medium text-neutral-700">14.2k req/s</span>
          </div>
          <StatusIndicator status="live" label="SYSTEM NOMINAL" />
        </div>
      </header>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mockSystemStats.map((stat) => (
          <div key={stat.name} className="rounded border border-neutral-200 bg-white p-3">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">{stat.name}</span>
              <StatusIndicator status={stat.status as any} />
            </div>
            <div className="flex items-end justify-between">
              <div><div className="text-lg font-mono font-semibold text-neutral-800">{stat.lat}</div><div className="text-[10px] text-neutral-400 uppercase">Latency</div></div>
              <div className="text-right"><div className="text-lg font-mono font-semibold text-neutral-800">{stat.load}</div><div className="text-[10px] text-neutral-400 uppercase">Load</div></div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Aggregated Market Feed</h2>
            <div className="flex gap-2">{['1m', '5m', '15m', '1h', '1d'].map(tf => <button key={tf} className="px-2 py-0.5 text-[10px] font-bold rounded hover:bg-neutral-100 text-neutral-500">{tf}</button>)}</div>
          </div>
          <div className="h-[340px] w-full rounded border border-neutral-200 bg-white p-4 overflow-hidden">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <LineChart data={mockMarketSummary}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#a3a3a3', fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} domain={['auto', 'auto']} tick={{ fontSize: 9, fill: '#a3a3a3', fontWeight: 600 }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e5e5', borderRadius: '2px', fontSize: '11px', boxShadow: 'none' }} />
                <Line type="stepAfter" dataKey="price" stroke="#404040" strokeWidth={1.5} dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded border border-neutral-200 bg-white overflow-hidden">
            <table className="w-full text-left text-[10px]">
              <thead className="border-b border-neutral-100 bg-neutral-50/50 font-bold uppercase tracking-wider text-neutral-400">
                <tr><th className="px-4 py-2">Symbol</th><th className="px-4 py-2 text-right">Price</th><th className="px-4 py-2 text-right">24h Change</th><th className="px-4 py-2 text-right">Volume</th></tr>
              </thead>
              <tbody className="divide-y divide-neutral-50 font-mono">
                {mockTopAssets.map(asset => (
                  <tr key={asset.symbol} className="hover:bg-neutral-50/50">
                    <td className="px-4 py-2 font-bold text-neutral-700">{asset.symbol}</td>
                    <td className="px-4 py-2 text-right text-neutral-600">${asset.price}</td>
                    <td className={cn("px-4 py-2 text-right font-bold", asset.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600')}>{asset.change}</td>
                    <td className="px-4 py-2 text-right text-neutral-400">{asset.vol}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Strategy Hub</h2>
            <div className="rounded border border-neutral-200 bg-white divide-y divide-neutral-100">
              <StateWrapper isEmpty={mockStrategyStates.length === 0}>
                {mockStrategyStates.map((strategy) => (
                  <div key={strategy.id} className="p-3">
                    <div className="flex items-center justify-between mb-2"><span className="text-xs font-bold text-neutral-700">{strategy.name}</span><span className={cn("rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase", strategy.state === 'Active' ? "bg-emerald-100 text-emerald-700" : "bg-neutral-50 text-neutral-400")}>{strategy.state}</span></div>
                    <div className="flex items-center gap-3"><div className="flex-1 h-1 bg-neutral-100 rounded-full overflow-hidden"><div className={cn("h-full transition-all", strategy.load > 75 ? "bg-rose-500" : strategy.load > 30 ? "bg-amber-400" : "bg-emerald-500")} style={{ width: `${strategy.load}%` }}></div></div><span className="text-[10px] font-mono text-neutral-400">{strategy.load}%</span></div>
                  </div>
                ))}
              </StateWrapper>
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Compliance & Risk</h2>
            <div className="rounded border border-neutral-200 bg-neutral-900 p-4 text-white">
              <div className="mb-4 flex items-center justify-between border-b border-neutral-800 pb-2"><span className="text-[10px] font-bold uppercase text-neutral-500">Global Risk Gate</span><div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div></div>
              <div className="space-y-3">
                <div className="flex justify-between items-center"><span className="text-[10px] text-neutral-400 uppercase">Daily Drawdown</span><span className="text-xs font-mono">0.42% / 2.0%</span></div>
                <div className="flex justify-between items-center"><span className="text-[10px] text-neutral-400 uppercase">Active Exposure</span><span className="text-xs font-mono">$1.24M</span></div>
                <div className="flex justify-between items-center"><span className="text-[10px] text-neutral-400 uppercase">Margin Usage</span><span className="text-xs font-mono">14.8%</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
