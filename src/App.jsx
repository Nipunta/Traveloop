import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AppProvider, useApp } from './context/AppContext'
import AppLayout from './components/layout/AppLayout'

import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import TripsPage from './pages/TripsPage'
import CreateTripPage from './pages/CreateTripPage'
import ItineraryBuilderPage from './pages/ItineraryBuilderPage'
import ItineraryViewPage from './pages/ItineraryViewPage'
import CitySearchPage from './pages/CitySearchPage'
import ActivitySearchPage from './pages/ActivitySearchPage'
import BudgetPage from './pages/BudgetPage'
import PackingPage from './pages/PackingPage'
import NotesPage from './pages/NotesPage'
import SharedItineraryPage from './pages/SharedItineraryPage'
import ProfilePage from './pages/ProfilePage'

function ProtectedRoute({ children }) {
  const { user } = useApp()
  return user ? children : <Navigate to="/login" replace />
}

function AppRoutes() {
  const { user } = useApp()
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/shared/:id" element={<SharedItineraryPage />} />
      <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="trips" element={<TripsPage />} />
        <Route path="trips/create" element={<CreateTripPage />} />
        <Route path="trips/:id/itinerary" element={<ItineraryBuilderPage />} />
        <Route path="trips/:id/view" element={<ItineraryViewPage />} />
        <Route path="cities" element={<CitySearchPage />} />
        <Route path="activities" element={<ActivitySearchPage />} />
        <Route path="budget" element={<BudgetPage />} />
        <Route path="packing" element={<PackingPage />} />
        <Route path="notes" element={<NotesPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
      <Toaster position="top-right" toastOptions={{
        style: { fontFamily: 'Inter, sans-serif', borderRadius: '12px', fontSize: '14px' },
        success: { iconTheme: { primary: '#2563eb', secondary: '#fff' } },
      }} />
    </AppProvider>
  )
}
