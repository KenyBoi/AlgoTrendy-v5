import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Layers, 
  ShieldAlert, 
  BrainCircuit, 
  Settings, 
  User, 
  Bell, 
  Lock,
  Menu,
  Palette,
  ScrollText,
  LayoutPanelLeft,
  Component,
  Cpu,
  ChevronRight,
  LayoutList,
  Activity
} from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { MarketData } from './components/MarketData';
import { Strategies } from './components/Strategies';
import { RiskOverview } from './components/RiskOverview';
import { AIInsights } from './components/AIInsights';
import { OperatorMode } from './components/OperatorMode';
import { Foundations } from './components/Foundations';
import { ProjectNotes } from './components/ProjectNotes';
import { OrdersPositions } from './components/OrdersPositions';
import { ActivityEvents } from './components/ActivityEvents';
import { SystemStatus } from './components/SystemStatus';
import { AssistantPanel } from './components/AssistantPanel';
import { Logo, LogoFull } from './components/Logo';
import { MessagesSquare } from 'lucide-react';

type Page = 'foundations' | 'dashboard' | 'market' | 'strategies' | 'risk' | 'ai' | 'operator' | 'notes' | 'orders' | 'activity' | 'status';

export default function App() {
  const [currentPage, setCurrentPage] = React.useState<Page>('dashboard');
  const [isOperator, setIsOperator] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [isAssistantOpen, setIsAssistantOpen] = React.useState(false);

  const navGroups = [
    {
      label: 'Foundations',
      items: [
        { id: 'foundations', label: '00 Foundations', icon: Palette },
      ]
    },
    {
      label: 'Core Pages',
      items: [
        { id: 'dashboard', label: '01 Dashboard', icon: LayoutDashboard },
        { id: 'market', label: '02 Market Data', icon: BarChart3 },
        { id: 'strategies', label: '03 Strategies', icon: Layers },
        { id: 'orders', label: '04 Orders & Positions', icon: LayoutList },
        { id: 'risk', label: '05 Risk Overview', icon: ShieldAlert },
        { id: 'ai', label: '06 AI Insights', icon: BrainCircuit },
        { id: 'activity', label: '07 Activity & Events', icon: Activity },
      ]
    },
    {
      label: 'System Status',
      items: [
        { id: 'status', label: '08 Health Monitor', icon: Cpu },
        { id: 'notes', label: '99 Notes & Contracts', icon: ScrollText },
      ]
    }
  ];

  const renderContent = () => {
    switch (currentPage) {
      case 'foundations': return <Foundations />;
      case 'dashboard': return <Dashboard />;
      case 'market': return <MarketData />;
      case 'strategies': return <Strategies />;
      case 'orders': return <OrdersPositions />;
      case 'risk': return <RiskOverview />;
      case 'ai': return <AIInsights />;
      case 'activity': return <ActivityEvents />;
      case 'status': return <SystemStatus />;
      case 'operator': return <OperatorMode />;
      case 'notes': return <ProjectNotes />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white font-sans text-neutral-900">
      <aside className={`relative flex flex-col border-r border-neutral-200 bg-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex h-16 items-center border-b border-neutral-200 px-6">
          {sidebarOpen ? <LogoFull /> : <div className="flex w-full justify-center"><Logo size="sm" /></div>}
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {navGroups.map((group) => (
            <div key={group.label} className="space-y-1">
              {sidebarOpen && <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400">{group.label}</div>}
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id as Page)}
                    className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${currentPage === item.id ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700'}`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {sidebarOpen && <span className="truncate">{item.label}</span>}
                  </button>
                );
              })}
            </div>
          ))}
          <div className="pt-2">
            {sidebarOpen && <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Restricted</div>}
            <button
              onClick={() => {
                if (isOperator) {
                  setCurrentPage('operator');
                } else {
                  const confirm = window.confirm("Requesting Operator Access requires elevated permissions. Proceed with identity verification?");
                  if (confirm) setIsOperator(true);
                }
              }}
              className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${currentPage === 'operator' ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700'}`}
            >
              <Lock className={`h-4 w-4 shrink-0 ${isOperator ? 'text-neutral-400' : 'text-neutral-300'}`} />
              {sidebarOpen && <span>Operator Mode</span>}
            </button>
          </div>
        </nav>
        <div className="border-t border-neutral-200 p-4 space-y-1">
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-xs text-neutral-500 hover:bg-neutral-50">
            <User className="h-4 w-4" />
            {sidebarOpen && <span>Operator #402</span>}
          </button>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-xs text-neutral-500 hover:bg-neutral-50">
            <Menu className="h-4 w-4" />
            {sidebarOpen && <span>Toggle Sidebar</span>}
          </button>
        </div>
      </aside>
      <main className="flex-1 flex flex-col min-w-0 bg-neutral-50/20">
        <header className="flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-8">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-tight">Project:</span>
              <span className="text-[10px] font-bold text-neutral-700 uppercase">AlgoTrendy – P8 Contract UI</span>
            </div>
            <div className="h-4 w-px bg-neutral-100" />
            <div className="flex items-center gap-2 rounded border border-emerald-100 bg-emerald-50 px-2 py-1">
              <div className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 uppercase">Gateway Connected</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsAssistantOpen(true)} className="flex items-center gap-2 rounded border border-neutral-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase text-neutral-600 hover:bg-neutral-50 transition-colors">
              <MessagesSquare className="h-4 w-4" />
              Assistant
            </button>
            <div className="h-4 w-px bg-neutral-100" />
            <div className="flex items-center gap-2 px-3 py-1 bg-neutral-100 rounded text-[10px] font-bold text-neutral-600">ENV: PRE-RESEARCH</div>
            <button className="text-neutral-400 hover:text-neutral-600"><Bell className="h-4 w-4" /></button>
          </div>
        </header>
        <div className="flex-1 flex flex-col overflow-y-auto p-8 max-w-7xl mx-auto w-full">{renderContent()}</div>
        <footer className="flex h-8 items-center justify-between border-t border-neutral-200 bg-white px-8 text-[10px] font-medium text-neutral-400 uppercase tracking-widest">
          <div className="flex gap-6">
            <span>v5.0.0-P8 | 2025-12-23 14:40:12 UTC</span>
            <span>Gateway: Nominal (12ms)</span>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-1"><ShieldAlert className="h-3 w-3" /><span>Contract Locked</span></div>
            <div className="h-2 w-2 rounded-full bg-neutral-400" />
            <span>Encrypted Session</span>
          </div>
        </footer>
      </main>
      <AssistantPanel isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} isAdmin={isOperator} />
    </div>
  );
}
