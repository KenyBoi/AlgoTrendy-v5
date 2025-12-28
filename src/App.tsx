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
import { ThemeProvider } from 'next-themes';
import { ThemeToggle } from './components/ThemeToggle';
import { LuxuryBackground } from './components/LuxuryBackground';

type Page = 'foundations' | 'dashboard' | 'market' | 'strategies' | 'risk' | 'ai' | 'operator' | 'notes' | 'orders' | 'activity' | 'status';

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
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
    <div className="flex h-screen w-screen overflow-hidden bg-white font-sans text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 transition-colors duration-300">
      <div className="fixed inset-0 pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-700 z-0">
        <LuxuryBackground />
      </div>
      <aside className={`relative z-10 flex flex-col border-r border-neutral-200 bg-white dark:bg-neutral-950 dark:border-neutral-800 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex h-16 items-center border-b border-neutral-200 dark:border-neutral-800 px-6">
          {sidebarOpen ? <LogoFull /> : <div className="flex w-full justify-center"><Logo size="sm" /></div>}
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {navGroups.map((group) => (
            <div key={group.label} className="space-y-1">
              {sidebarOpen && <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-600">{group.label}</div>}
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id as Page)}
                    className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${currentPage === item.id ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-900/50 dark:hover:text-neutral-200'}`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {sidebarOpen && <span className="truncate">{item.label}</span>}
                  </button>
                );
              })}
            </div>
          ))}
          <div className="pt-2">
            {sidebarOpen && <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-600">Restricted</div>}
            <button
              onClick={() => { if (isOperator) { setCurrentPage('operator'); } else { const confirm = window.confirm("Requesting Operator Access..."); if (confirm) setIsOperator(true); } }}
              className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${currentPage === 'operator' ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-900/50'}`}
            >
              <Lock className={`h-4 w-4 shrink-0 ${isOperator ? 'text-neutral-400 dark:text-neutral-500' : 'text-neutral-300 dark:text-neutral-700'}`} />
              {sidebarOpen && <span>Operator Mode</span>}
            </button>
          </div>
        </nav>
        <div className="border-t border-neutral-200 dark:border-neutral-800 p-4 space-y-1">
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-xs text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-900/50"><User className="h-4 w-4" />{sidebarOpen && <span>Operator #402</span>}</button>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-xs text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-900/50"><Menu className="h-4 w-4" />{sidebarOpen && <span>Toggle Sidebar</span>}</button>
        </div>
      </aside>
      <main className="relative z-10 flex-1 flex flex-col min-w-0 bg-neutral-50/20 dark:bg-transparent">
        <header className="flex h-16 items-center justify-between border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/80 dark:backdrop-blur-md px-8">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2"><span className="text-[10px] font-bold text-neutral-400 uppercase tracking-tight dark:text-neutral-600">Project:</span><span className="text-[10px] font-bold text-neutral-700 dark:text-neutral-300 uppercase">AlgoTrendy</span></div>
            <div className="h-4 w-px bg-neutral-100 dark:bg-neutral-800" />
            <div className="flex items-center gap-2 rounded border border-emerald-100 bg-emerald-50 px-2 py-1 dark:bg-emerald-500/10 dark:border-emerald-500/20"><div className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span></div><span className="text-[10px] font-bold text-emerald-600 uppercase dark:text-emerald-400">Connected</span></div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle /><button onClick={() => setIsAssistantOpen(true)} className="flex items-center gap-2 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-1.5 text-[10px] font-bold uppercase text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"><MessagesSquare className="h-4 w-4" />Assistant</button>
            <div className="h-4 w-px bg-neutral-100 dark:bg-neutral-800" /><div className="flex items-center gap-2 px-3 py-1 bg-neutral-100 dark:bg-neutral-900 rounded text-[10px] font-bold text-neutral-600 dark:text-neutral-400">ENV: PRE-RESEARCH</div>
            <button className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"><Bell className="h-4 w-4" /></button>
          </div>
        </header>
        <div className="flex-1 flex flex-col overflow-y-auto p-8 max-w-7xl mx-auto w-full">{renderContent()}</div>
        <footer className="flex h-8 items-center justify-between border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/80 dark:backdrop-blur-md px-8 text-[10px] font-medium text-neutral-400 dark:text-neutral-600 uppercase tracking-widest">
          <div className="flex gap-6"><span>v5.0.0-P8 | 2025-12-23</span><span>Gateway: Nominal</span></div>
          <div className="flex gap-4 items-center"><div className="flex items-center gap-1"><ShieldAlert className="h-3 w-3" /><span>Contract Locked</span></div><div className="h-2 w-2 rounded-full bg-neutral-400 dark:bg-neutral-700" /><span>Encrypted</span></div>
        </footer>
      </main>
      <AssistantPanel isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} isAdmin={isOperator} />
    </div>
  );
}
