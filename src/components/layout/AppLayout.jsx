import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import MobileNav from './MobileNav'
import { useApp } from '../../context/AppContext'

export default function AppLayout() {
  const { sidebarOpen } = useApp()
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">
          <Outlet />
        </main>
        <MobileNav />
      </div>
    </div>
  )
}
