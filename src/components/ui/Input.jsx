import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import clsx from 'clsx'

export default function Input({ label, error, icon: Icon, type = 'text', className, ...props }) {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (show ? 'text' : 'password') : type

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-secondary">{label}</label>}
      <div className="relative">
        {Icon && <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />}
        <input
          type={inputType}
          className={clsx(
            'w-full px-4 py-2.5 text-sm rounded-xl border transition-all duration-200 bg-white',
            'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary',
            Icon ? 'pl-9' : '',
            isPassword ? 'pr-10' : '',
            error ? 'border-red-400 focus:ring-red-200' : 'border-slate-200',
            className
          )}
          {...props}
        />
        {isPassword && (
          <button type="button" onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
