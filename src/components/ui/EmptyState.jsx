import React from 'react'
import Button from './Button'

export default function EmptyState({ icon: Icon, title, description, action, actionLabel }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {Icon && (
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
          <Icon size={32} className="text-slate-400" />
        </div>
      )}
      <h3 className="font-semibold text-secondary text-lg mb-2 font-poppins">{title}</h3>
      {description && <p className="text-slate-500 text-sm max-w-xs mb-6">{description}</p>}
      {action && <Button onClick={action}>{actionLabel}</Button>}
    </div>
  )
}
