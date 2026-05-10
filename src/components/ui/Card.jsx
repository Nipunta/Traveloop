import React from 'react'
import clsx from 'clsx'

export default function Card({ children, className, hover = false, ...props }) {
  return (
    <div className={clsx(
      'bg-white rounded-2xl shadow-sm border border-slate-100',
      hover && 'hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer',
      className
    )} {...props}>
      {children}
    </div>
  )
}
