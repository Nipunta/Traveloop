import React, { useState } from 'react'
import { Bell, Search, Menu } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export default function Navbar() {
  const { user, setSidebarOpen, sidebarOpen } = useApp()
  const [showNotif, setShowNotif] = useState(false)

  const notifications = [
    { id: 1, text: 'Your Tokyo trip starts in 31 days!', time: '2h ago', unread: true },
    { id: 2, text: 'Budget alert: 80% spent on Bali trip', time: '1d ago', unread: true },
    { id: 3, text: 'New city recommendation: Kyoto', time: '2d ago', unread: false },
  ]

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 md:px-6 py-3 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden md:flex text-slate-500 hover:text-secondary transition-colors">
          <Menu size={22} />
        </button>
        <div className="relative hidden sm:flex items-center">
          <Search size={16} className="absolute left-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search trips, cities..."
            className="pl-9 pr-4 py-2 text-sm bg-slate-100 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary/30 w-56 lg:w-72 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative">
          <button onClick={() => setShowNotif(!showNotif)}
            className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
            <Bell size={18} className="text-slate-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          {showNotif && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="font-semibold text-sm text-secondary">Notifications</p>
              </div>
              {notifications.map(n => (
                <div key={n.id} className={`px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer ${n.unread ? 'bg-blue-50/50' : ''}`}>
                  <p className="text-sm text-secondary">{n.text}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Avatar */}
        {user && (
          <img src={user.avatar} alt={user.name}
            className="w-9 h-9 rounded-xl object-cover ring-2 ring-primary/20 cursor-pointer hover:ring-primary/50 transition-all" />
        )}
      </div>
    </header>
  )
}
