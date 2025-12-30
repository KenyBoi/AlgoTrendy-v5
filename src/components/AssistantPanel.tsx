import React from 'react';
import { 
  X, 
  Settings, 
  Mic, 
  MessagesSquare, 
  Send, 
  ShieldAlert, 
  RotateCcw, 
  ChevronDown, 
  WandSparkles,
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from './shared';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  tools?: string[];
  error?: boolean;
}

interface AssistantPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin?: boolean;
}

export function AssistantPanel({ isOpen, onClose, isAdmin = true }: AssistantPanelProps) {
  const [activeTab, setActiveTab] = React.useState<'chat' | 'voice'>('chat');
  const [status, setStatus] = React.useState<'idle' | 'connecting' | 'live' | 'error'>('idle');
  const [toolsEnabled, setToolsEnabled] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [inputText, setInputText] = React.useState('');
  const [micPermission, setMicPermission] = React.useState<'granted' | 'prompt' | 'denied'>('granted');
  const [defaultTab, setDefaultTab] = React.useState<'chat' | 'voice'>('chat');
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'System initialized. Operator #402, how can I assist with your execution strategy today?',
      timestamp: '14:40:12'
    }
  ]);

  const [provider, setProvider] = React.useState('OpenAI');
  const [verbosity, setVerbosity] = React.useState('Succinct');

  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
    };
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setStatus('connecting');
    setTimeout(() => {
      setStatus('live');
      let content = "Acknowledged. Accessing Gateway status... System is nominal. Latency: 12ms."; 
      const response: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
      };
      setMessages(prev => [...prev, response]);
      setTimeout(() => setStatus('idle'), 2000);
    }, 1000);
  };

  const StatusPill = () => {
    const config = {
      idle: { label: 'Idle', color: 'bg-neutral-500', text: 'text-neutral-500' },
      connecting: { label: 'Connecting', color: 'bg-blue-500', text: 'text-blue-500', pulse: true },
      live: { label: 'Live', color: 'bg-emerald-500', text: 'text-emerald-500' },
      error: { label: 'Error', color: 'bg-rose-500', text: 'text-rose-500' },
    };
    const current = config[status];
    return (
      <div className="flex items-center gap-1.5 rounded-full bg-neutral-100 px-2 py-0.5 border border-neutral-200">
        <div className={cn("h-1.5 w-1.5 rounded-full", current.color, current.pulse && "animate-pulse")} />
        <span className={cn("text-[10px] font-bold uppercase tracking-tight", current.text)}>{current.label}</span>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-40 bg-neutral-950/20 backdrop-blur-[2px]" />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed right-0 top-0 z-50 h-screen w-96 border-l border-neutral-200 bg-white shadow-2xl flex flex-col" >
            <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-4 shrink-0">
              <div className="flex items-center gap-3"><span className="text-xs font-bold uppercase tracking-widest text-neutral-800">Assistant</span><StatusPill /></div>
              <div className="flex items-center gap-1"><button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded text-neutral-400"><X className="h-4 w-4" /></button></div>
            </div>
            <div className="flex-1 overflow-hidden relative flex flex-col">
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.map((msg) => (
                  <div key={msg.id} className={cn("flex flex-col gap-1.5 max-w-[85%]", msg.role === 'user' ? "ml-auto items-end" : "items-start")}>
                    <div className={cn("rounded-lg p-3 text-xs leading-relaxed", msg.role === 'user' ? "bg-neutral-900 text-white" : "bg-neutral-50 border border-neutral-100 text-neutral-700")}>{msg.content}</div>
                    <div className="flex items-center gap-2 px-1"><span className="text-[9px] font-mono text-neutral-400 uppercase">{msg.timestamp}</span><span className="text-[9px] font-bold text-neutral-300 uppercase tracking-tighter italic">Advisory Only</span></div>
                  </div>
                ))}
              </div>
              <div className="border-t border-neutral-100 p-4 bg-white space-y-3 shrink-0">
                <div className="flex gap-2">
                  <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Inquire with AI Assistant..." className="flex-1 rounded border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs outline-none focus:border-neutral-400 focus:bg-white transition-all" />
                  <button onClick={handleSendMessage} className="flex h-9 w-9 items-center justify-center rounded bg-neutral-900 text-white hover:bg-neutral-800 transition-colors" ><Send className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
