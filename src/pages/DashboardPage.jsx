import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Map, DollarSign, Globe, Compass, PlusCircle, BookOpen, TrendingUp, Calendar } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { mockStats } from '../mock-data/trips'
import { mockCities } from '../mock-data/cities'
import TripCard from '../components/trips/TripCard'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

const quotes = [
  '"The world is a book, and those who do not travel read only one page." — St. Augustine',
  '"Travel is the only thing you buy that makes you richer."',
  '"Not all those who wander are lost." — J.R.R. Tolkien',
]

export default function DashboardPage() {
  const { user, trips } = useApp()
  const navigate = useNavigate()
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const quote = quotes[new Date().getDay() % quotes.length]
  const recentTrips = (trips || []).slice(0, 3)

  const stats = [
    { label: 'Total Trips', value: mockStats?.totalTrips ?? 0, icon: Map, color: 'bg-blue-50 text-primary' },
    { label: 'Upcoming', value: mockStats?.upcomingTrips ?? 0, icon: Calendar, color: 'bg-sky-50 text-accent' },
    { label: 'Budget Spent', value: `$${(mockStats?.budgetSpent ?? 0).toLocaleString()}`, icon: DollarSign, color: 'bg-green-50 text-green-600' },
    { label: 'Cities Visited', value: mockStats?.citiesVisited ?? 0, icon: Globe, color: 'bg-purple-50 text-purple-600' },
  ]

  const quickActions = [
    { label: 'Create Trip', icon: PlusCircle, to: '/trips/create', color: 'bg-primary text-white' },
    { label: 'Explore Cities', icon: Compass, to: '/cities', color: 'bg-accent text-secondary' },
    { label: 'View Budget', icon: DollarSign, to: '/budget', color: 'bg-green-500 text-white' },
    { label: 'Open Notes', icon: BookOpen, to: '/notes', color: 'bg-purple-500 text-white' },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-secondary via-slate-800 to-primary rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="relative z-10">
          <p className="text-white/60 text-sm mb-1">{today}</p>
          <h1 className="font-poppins font-bold text-2xl md:text-3xl mb-2">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {user?.name?.split(' ')[0]} ✈️
          </h1>
          <p className="text-white/70 text-sm italic max-w-lg">{quote}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
              <Icon size={20} />
            </div>
            <p className="font-poppins font-bold text-2xl text-secondary">{value}</p>
            <p className="text-slate-500 text-sm mt-0.5">{label}</p>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-poppins font-semibold text-secondary mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map(({ label, icon: Icon, to, color }) => (
            <button key={label} onClick={() => navigate(to)}
              className={`${color} rounded-2xl p-4 flex flex-col items-center gap-2 hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 shadow-sm`}>
              <Icon size={24} />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Trips */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-poppins font-semibold text-secondary">Recent Trips</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate('/trips')}>View all</Button>
        </div>
        {recentTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentTrips.map(trip => <TripCard key={trip.id} trip={trip} />)}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Map size={40} className="text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No trips yet. Start planning!</p>
            <Button className="mt-4" onClick={() => navigate('/trips/create')}>Create your first trip</Button>
          </Card>
        )}
      </div>

      {/* Recommended Destinations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-poppins font-semibold text-secondary">Recommended Destinations</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate('/cities')}>Explore all</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockCities.slice(0, 4).map(city => (
            <div key={city.id} className="group relative rounded-2xl overflow-hidden h-40 cursor-pointer hover:shadow-lg transition-all duration-200">
              <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3">
                <p className="text-white font-semibold text-sm font-poppins">{city.name}</p>
                <p className="text-white/70 text-xs">{city.country}</p>
              </div>
              <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-lg px-2 py-0.5">
                <p className="text-white text-xs font-medium">~${city.avgCost}/day</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
