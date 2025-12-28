import React from 'react';
import { StatusIndicator, StateWrapper, cn } from './shared';
import { Activity, BarChart3, Layers, ShieldAlert, Cpu } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockSystemStats = [
  { name: 'API Gateway', status: 'live', lat: '4ms', load: '12%' },
  { name: 'Broker Hub', status: 'live', lat: '8ms', load: '4%' },
  { name: 'Market Hub', status: 'live', lat: '12ms', load: '65%' },
  { name: 'Risk Service', status: 'warning', lat: '45ms', load: '22%' },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <div><h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">Global Observer</h1><p className="text-sm text-neutral-500 dark:text-neutral-400">Performance readout</p></div>
        <div className="flex items-center gap-4"><StatusIndicator status="live" label="NOMINAL" /></div>
      </header>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mockSystemStats.map((stat) => (
          <div key={stat.name} className="rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-white/[0.02] p-3 backdrop-blur-sm">
            <div className="mb-3 flex items-center justify-between"><span className="text-[10px] font-bold uppercase text-neutral-400 dark:text-neutral-600">{stat.name}</span><StatusIndicator status={stat.status as any} /></div>
            <div className="text-lg font-mono font-semibold dark:text-neutral-100">{stat.lat}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
