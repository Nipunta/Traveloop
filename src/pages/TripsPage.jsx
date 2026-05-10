import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, SlidersHorizontal, Map, PlusCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import TripCard from '../components/trips/TripCard'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'

export default function TripsPage() {
  const { trips } = useApp()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('newest')

  const filtered = trips
    .filter(t => {
      const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.destination.toLowerCase().includes(search.toLowerCase())
      const matchFilter = filter === 'all' || t.status === filter
      return matchSearch && matchFilter
    })
    .sort((a, b) => {
      if (sort === 'newest') return new Date(b.startDate) - new Date(a.startDate)
      if (sort === 'budget') return b.budget - a.budget
      if (sort === 'date') return new Date(a.startDate) - new Date(b.startDate)
      return 0
    })

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-poppins font-bold text-2xl text-secondary">My Trips</h1>
          <p className="text-slate-500 text-sm">{trips.length} trips total</p>
        </div>
        <Button onClick={() => navigate('/trips/create')}>
          <PlusCircle size={16} /> New Trip
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search trips..."
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
        </div>
        <div className="flex gap-2">
          <select value={filter} onChange={e => setFilter(e.target.value)}
            className="px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer">
            <option value="all">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
          <select value={sort} onChange={e => setSort(e.target.value)}
            className="px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer">
            <option value="newest">Newest</option>
            <option value="date">By Date</option>
            <option value="budget">By Budget</option>
          </select>
        </div>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'upcoming', 'ongoing', 'completed'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${filter === s ? 'bg-primary text-white' : 'bg-white text-slate-500 border border-slate-200 hover:border-primary hover:text-primary'}`}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
            <span className="ml-1.5 text-xs opacity-70">
              {s === 'all' ? trips.length : trips.filter(t => t.status === s).length}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(trip => <TripCard key={trip.id} trip={trip} />)}
        </div>
      ) : (
        <EmptyState
          icon={Map}
          title="No trips found"
          description={search ? `No trips match "${search}"` : "You haven't created any trips yet."}
          action={() => navigate('/trips/create')}
          actionLabel="Create New Trip"
        />
      )}
    </div>
  )
}
