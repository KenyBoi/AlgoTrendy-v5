import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
interface StatusIndicatorProps { status: 'live' | 'stale' | 'error' | 'warning' | 'idle'; label?: string; className?: string; }
export function StatusIndicator({ status, label, className }: StatusIndicatorProps) {
  const statusConfig = { live: { color: 'bg-emerald-500', pulse: true, text: 'LIVE' }, stale: { color: 'bg-neutral-300 dark:bg-neutral-700', pulse: false, text: 'STALE' }, error: { color: 'bg-rose-500', pulse: false, text: 'ERROR' }, warning: { color: 'bg-amber-500', pulse: false, text: 'WARN' }, idle: { color: 'bg-neutral-200 dark:bg-neutral-800', pulse: false, text: 'IDLE' }, };
  const config = statusConfig[status];
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex h-2 w-2">{config.pulse && (<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>)}<span className={cn("relative inline-flex h-2 w-2 rounded-full", config.color)}></span></div>
      <span className={cn("text-[10px] font-bold tracking-wider uppercase", status === 'live' ? 'text-emerald-600 dark:text-emerald-400' : status === 'error' ? 'text-rose-600 dark:text-rose-400' : 'text-neutral-500 dark:text-neutral-400')}>{label || config.text}</span>
    </div>
  );
}
export function StateWrapper({ isLoading, isError, isEmpty, errorLabel = "Failed", emptyLabel = "No data", children }: any) {
  if (isLoading) return <div className="flex min-h-[100px] items-center justify-center rounded border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/50 p-8"><div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-600"></div></div>;
  return <>{children}</>;
}
