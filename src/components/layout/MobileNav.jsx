import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Map, PlusCircle, Search, User } from 'lucide-react'
import clsx from 'clsx'

const items = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Home' },
  { to: '/trips', icon: Map, label: 'Trips' },
  { to: '/trips/create', icon: PlusCircle, label: 'Create' },
  { to: '/cities', icon: Search, label: 'Explore' },
  { to: '/profile', icon: User, label: 'Profile' },
]

export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 z-40 px-2 py-2 flex items-center justify-around">
      {items.map(({ to, icon: Icon, label }) => (
        <NavLink key={to} to={to} className={({ isActive }) => clsx(
          'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all',
          isActive ? 'text-primary' : 'text-slate-400'
        )}>
          <Icon size={22} />
          <span className="text-[10px] font-medium">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
