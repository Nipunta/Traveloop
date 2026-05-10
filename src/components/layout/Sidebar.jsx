import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import {
  LayoutDashboard, Map, PlusCircle, Search, Compass, DollarSign,
  ShoppingBag, BookOpen, User, LogOut, ChevronLeft, ChevronRight, Plane
} from 'lucide-react'
import clsx from 'clsx'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/trips', icon: Map, label: 'My Trips', end: true },
  { to: '/trips/create', icon: PlusCircle, label: 'Create Trip' },
  { to: '/cities', icon: Search, label: 'Explore Cities' },
  { to: '/activities', icon: Compass, label: 'Activities' },
  { to: '/budget', icon: DollarSign, label: 'Budget' },
  { to: '/packing', icon: ShoppingBag, label: 'Packing' },
  { to: '/notes', icon: BookOpen, label: 'Notes' },
  { to: '/profile', icon: User, label: 'Profile' },
]

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen, logout, user } = useApp()
  const navigate = useNavigate()

  return (
    <aside className={clsx(
      'fixed left-0 top-0 h-full bg-secondary text-white z-40 transition-all duration-300 hidden md:flex flex-col',
      sidebarOpen ? 'w-64' : 'w-20'
    )}>
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
            <Plane size={18} className="text-white" />
          </div>
          {sidebarOpen && <span className="font-poppins font-bold text-lg tracking-tight">Traveloop</span>}
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white/60 hover:text-white transition-colors">
          {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {/* User */}
      {sidebarOpen && user && (
        <div className="px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/50" />
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs text-white/50 truncate">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-hide">
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => clsx(
            'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group',
            isActive ? 'bg-primary text-white' : 'text-white/60 hover:bg-white/10 hover:text-white'
          )}>
            <Icon size={20} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <button onClick={() => { logout(); navigate('/login') }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/60 hover:bg-white/10 hover:text-white transition-all w-full">
          <LogOut size={20} className="flex-shrink-0" />
          {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  )
}
