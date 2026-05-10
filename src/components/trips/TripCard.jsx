import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, MapPin, Users, DollarSign, Trash2, Edit, Share2, Eye } from 'lucide-react'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { useApp } from '../../context/AppContext'
import toast from 'react-hot-toast'

export default function TripCard({ trip }) {
  const { deleteTrip } = useApp()
  const navigate = useNavigate()
  const progress = Math.round((trip.spent / trip.budget) * 100)

  const handleDelete = (e) => {
    e.stopPropagation()
    deleteTrip(trip.id)
    toast.success('Trip deleted')
  }

  const handleShare = (e) => {
    e.stopPropagation()
    navigator.clipboard.writeText(`${window.location.origin}/shared/${trip.id}`)
    toast.success('Share link copied!')
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
      {/* Cover */}
      <div className="relative h-44 overflow-hidden">
        <img src={trip.coverImage} alt={trip.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <Badge variant={trip.status}>{trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}</Badge>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-semibold font-poppins text-lg leading-tight">{trip.name}</h3>
          <div className="flex items-center gap-1 text-white/80 text-xs mt-0.5">
            <MapPin size={12} />
            <span>{trip.destination}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-0.5">
              <Calendar size={11} />
              <span>Dates</span>
            </div>
            <p className="text-xs font-medium text-secondary">
              {new Date(trip.startDate).toLocaleDateString('en', { month: 'short', day: 'numeric' })} –{' '}
              {new Date(trip.endDate).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-0.5">
              <MapPin size={11} />
              <span>Cities</span>
            </div>
            <p className="text-xs font-medium text-secondary">{trip.cities}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-0.5">
              <Users size={11} />
              <span>People</span>
            </div>
            <p className="text-xs font-medium text-secondary">{trip.travelers}</p>
          </div>
        </div>

        {/* Budget */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-500 flex items-center gap-1"><DollarSign size={11} />Budget</span>
            <span className="font-semibold text-secondary">${trip.spent.toLocaleString()} / ${trip.budget.toLocaleString()}</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all ${progress > 90 ? 'bg-red-400' : progress > 70 ? 'bg-yellow-400' : 'bg-primary'}`}
              style={{ width: `${Math.min(progress, 100)}%` }} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button size="sm" variant="primary" className="flex-1" onClick={() => navigate(`/trips/${trip.id}/view`)}>
            <Eye size={14} /> View
          </Button>
          <Button size="sm" variant="ghost" onClick={() => navigate(`/trips/${trip.id}/itinerary`)}>
            <Edit size={14} />
          </Button>
          <Button size="sm" variant="ghost" onClick={handleShare}>
            <Share2 size={14} />
          </Button>
          <Button size="sm" variant="ghost" onClick={handleDelete} className="text-red-400 hover:text-red-600 hover:bg-red-50">
            <Trash2 size={14} />
          </Button>
        </div>
      </div>
    </div>
  )
}
