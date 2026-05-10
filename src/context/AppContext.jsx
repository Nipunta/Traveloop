import React, { createContext, useContext, useState } from 'react'
import { tripsAPI } from '../api'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [trips, setTrips] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const login = (userData) => {
    setUser(userData)
    // Load trips for this user from the backend
    tripsAPI.getAll(userData.id).then(setTrips).catch(() => setTrips([]))
  }

  const logout = () => {
    setUser(null)
    setTrips([])
  }

  const addTrip = async (trip) => {
    const newTrip = await tripsAPI.create({ ...trip, user_id: user.id })
    setTrips(prev => [newTrip, ...prev])
    return newTrip
  }

  const deleteTrip = async (id) => {
    await tripsAPI.remove(id)
    setTrips(prev => prev.filter(t => t.id !== id))
  }

  const updateTrip = async (id, data) => {
    await tripsAPI.update(id, data)
    setTrips(prev => prev.map(t => t.id === id ? { ...t, ...data } : t))
  }

  return (
    <AppContext.Provider value={{ user, login, logout, trips, addTrip, deleteTrip, updateTrip, sidebarOpen, setSidebarOpen }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
