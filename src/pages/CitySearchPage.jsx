import React, { useState } from 'react'
import { Search, Star, DollarSign, Thermometer, TrendingUp, Plus } from 'lucide-react'
import { mockCities } from '../mock-data/cities'
import { TripCardSkeleton } from '../components/ui/Skeleton'
import Button from '../components/ui/Button'
import toast from 'react-hot-toast'

export default function CitySearchPage() {
  const [query, setQuery] = useState('')
  const [country, setCountry] = useState('all')
  const [budget, setBudget] = useState('all')
  const [loading, setLoading] = useState(false)
  const [hoveredCity, setHoveredCity] = useState(null)

  const countries = ['all', ...new Set(mockCities.map(c => c.country))]

  const filtered = mockCities.filter(c => {
    const matchQ = c.name.toLowerCase().includes(query.toLowerCase()) || c.country.toLowerCase().includes(query.toLowerCase())
    const matchCountry = country === 'all' || c.country === country
    const matchBudget = budget === 'all' || c.budget === budget
    return matchQ && matchCountry && matchBudget
  })

  const handleSearch = (e) => {
    setQuery(e.target.value)
    setLoading(true)
    setTimeout(() => setLoading(false), 400)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="font-poppins font-bold text-2xl text-secondary">Explore Cities</h1>
        <p className="text-slate-500 text-sm">Discover your next destination</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={query} onChange={handleSearch} placeholder="Search cities or countries..."
          className="w-full pl-11 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <aside className="lg:w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-100 p-4 space-y-5">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Country</p>
              <div className="space-y-1">
                {countries.map(c => (
                  <button key={c} onClick={() => setCountry(c)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all ${country === c ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-50'}`}>
                    {c === 'all' ? 'All Countries' : c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Budget</p>
              {['all', 'low', 'medium', 'high'].map(b => (
                <button key={b} onClick={() => setBudget(b)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all ${budget === b ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-50'}`}>
                  {b === 'all' ? 'All Budgets' : b.charAt(0).toUpperCase() + b.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1">
          <p className="text-sm text-slate-500 mb-4">{filtered.length} cities found</p>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map(i => <TripCardSkeleton key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map(city => (
                <div key={city.id}
                  className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
                  onMouseEnter={() => setHoveredCity(city.id)}
                  onMouseLeave={() => setHoveredCity(null)}>
                  <div className="relative h-44 overflow-hidden">
                    <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <h3 className="text-white font-poppins font-bold text-lg">{city.name}</h3>
                      <p className="text-white/70 text-sm">{city.country}</p>
                    </div>
                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                      <TrendingUp size={12} className="text-white" />
                      <span className="text-white text-xs font-medium">{city.popularity}%</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-slate-500 text-xs mb-3 line-clamp-2">{city.description}</p>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="text-center bg-slate-50 rounded-lg p-2">
                        <DollarSign size={14} className="text-green-500 mx-auto mb-0.5" />
                        <p className="text-xs font-semibold text-secondary">${city.avgCost}</p>
                        <p className="text-[10px] text-slate-400">per day</p>
                      </div>
                      <div className="text-center bg-slate-50 rounded-lg p-2">
                        <Star size={14} className="text-yellow-400 mx-auto mb-0.5" />
                        <p className="text-xs font-semibold text-secondary">{city.popularity}</p>
                        <p className="text-[10px] text-slate-400">score</p>
                      </div>
                      <div className="text-center bg-slate-50 rounded-lg p-2">
                        <Thermometer size={14} className="text-orange-400 mx-auto mb-0.5" />
                        <p className="text-xs font-semibold text-secondary truncate">{city.weather.split(' ')[0]}</p>
                        <p className="text-[10px] text-slate-400">weather</p>
                      </div>
                    </div>
                    <Button size="sm" className="w-full" onClick={() => toast.success(`${city.name} added to trip!`)}>
                      <Plus size={14} /> Add to Trip
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
