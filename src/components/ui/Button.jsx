import React from 'react'
import clsx from 'clsx'
import { Loader2 } from 'lucide-react'

export default function Button({ children, variant = 'primary', size = 'md', loading, className, ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-primary text-white hover:bg-blue-700 shadow-sm hover:shadow-md active:scale-95',
    secondary: 'bg-secondary text-white hover:bg-slate-800 shadow-sm active:scale-95',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white active:scale-95',
    ghost: 'text-slate-600 hover:bg-slate-100 hover:text-secondary active:scale-95',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-sm active:scale-95',
    accent: 'bg-accent text-secondary hover:bg-sky-400 shadow-sm active:scale-95',
  }
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  }
  return (
    <button className={clsx(base, variants[variant], sizes[size], className)} disabled={loading || props.disabled} {...props}>
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  )
}
