import React from 'react'
import clsx from 'clsx'

const variants = {
  upcoming: 'bg-blue-100 text-blue-700',
  ongoing: 'bg-green-100 text-green-700',
  completed: 'bg-slate-100 text-slate-600',
  draft: 'bg-yellow-100 text-yellow-700',
  default: 'bg-slate-100 text-slate-600',
}

export default function Badge({ children, variant = 'default', className }) {
  return (
    <span className={clsx('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold', variants[variant] || variants.default, className)}>
      {children}
    </span>
  )
}
