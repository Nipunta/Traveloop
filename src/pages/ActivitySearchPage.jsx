import React, { useState } from 'react'
import { Star, Clock, IndianRupee, Heart, Plus, MapPin } from 'lucide-react'
import { mockActivities, activityCategories } from '../mock-data/activities'
import Button from '../components/ui/Button'
import toast from 'react-hot-toast'

export default function ActivitySearchPage() {
  const [category, setCategory] = useState('all')
  const [favorites, setFavorites] = useState(
    mockActivities.filter(a => a.favorite).map(a => a.id)
  )
  const [added, setAdded] = useState([])

  const filtered = category === 'all'
    ? mockActivities
    : mockActivities.filter(a => a.category.toLowerCase() === category.toLowerCase())

  const handleAdd = (activity) => {
    if (added.includes(activity.id)) return
    setAdded(prev => [...prev, activity.id])
    toast.success(`${activity.name} added!`)
  }

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="font-poppins font-bold text-2xl text-secondary">Explore Activities</h1>
        <p className="text-slate-500 text-sm mt-1">Discover things to do across India</p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCategory('all')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            category === 'all'
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary'
          }`}
        >
          All
        </button>
        {activityCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.name)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              category === cat.name
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Activity grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(activity => (
            <div key={activity.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
              <div className="relative h-40">
                <img src={activity.image} alt={activity.name} className="w-full h-full object-cover" />
                <button
                  onClick={() => toggleFavorite(activity.id)}
                  className="absolute top-2 right-2 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow"
                >
                  <Heart
                    size={15}
                    className={favorites.includes(activity.id) ? 'fill-red-500 text-red-500' : 'text-slate-400'}
                  />
                </button>
                <span className="absolute top-2 left-2 text-xs bg-white/90 text-slate-700 px-2 py-0.5 rounded-full font-medium">
                  {activity.city}
                </span>
              </div>

              <div className="p-4 flex flex-col gap-2 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-secondary text-sm leading-snug">{activity.name}</h3>
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full flex-shrink-0">{activity.category}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">{activity.description}</p>

                <div className="flex items-center gap-3 text-xs text-slate-500 mt-auto">
                  {activity.rating && (
                    <span className="flex items-center gap-1"><Star size={12} className="text-yellow-400 fill-yellow-400" />{activity.rating}</span>
                  )}
                  {activity.duration && (
                    <span className="flex items-center gap-1"><Clock size={12} />{activity.duration}</span>
                  )}
                  <span className="flex items-center gap-1 ml-auto font-medium text-secondary">
                    {activity.cost === 0 ? 'Free' : <><IndianRupee size={12} />{activity.cost.toLocaleString('en-IN')}</>}
                  </span>
                </div>

                <Button
                  size="sm"
                  variant={added.includes(activity.id) ? 'ghost' : 'primary'}
                  onClick={() => handleAdd(activity)}
                  disabled={added.includes(activity.id)}
                  className="mt-1 w-full"
                >
                  <Plus size={14} />
                  {added.includes(activity.id) ? 'Added' : 'Add to Trip'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-400 mt-12">No activities found for this category.</p>
      )}
    </div>
  )
}
