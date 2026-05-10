import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Plus, GripVertical, Clock, DollarSign, MapPin, Hotel, Bus, ChevronDown, ChevronUp, Utensils, Mountain, Landmark, Leaf, Moon, Smile } from 'lucide-react'
import { mockItinerary } from '../mock-data/itinerary'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import toast from 'react-hot-toast'

const categoryIcons = { Food: Utensils, Adventure: Mountain, Historical: Landmark, Nature: Leaf, Nightlife: Moon, Relaxation: Smile }
const categoryColors = { Food: 'bg-orange-100 text-orange-600', Adventure: 'bg-red-100 text-red-600', Historical: 'bg-amber-100 text-amber-600', Nature: 'bg-green-100 text-green-600', Nightlife: 'bg-purple-100 text-purple-600', Relaxation: 'bg-blue-100 text-blue-600' }

export default function ItineraryBuilderPage() {
  const { id } = useParams()
  const [days, setDays] = useState(mockItinerary.days)
  const [selectedDay, setSelectedDay] = useState(0)
  const [expandedActivity, setExpandedActivity] = useState(null)
  const [showAddActivity, setShowAddActivity] = useState(false)
  const [newActivity, setNewActivity] = useState({ name: '', time: '', cost: '', duration: '', category: 'Food', notes: '' })

  const day = days[selectedDay]

  const addActivity = () => {
    if (!newActivity.name.trim()) { toast.error('Activity name required'); return }
    const updated = days.map((d, i) => i === selectedDay
      ? { ...d, activities: [...d.activities, { ...newActivity, id: Date.now(), cost: Number(newActivity.cost) || 0 }] }
      : d)
    setDays(updated)
    setNewActivity({ name: '', time: '', cost: '', duration: '', category: 'Food', notes: '' })
    setShowAddActivity(false)
    toast.success('Activity added')
  }

  const removeActivity = (actId) => {
    setDays(days.map((d, i) => i === selectedDay ? { ...d, activities: d.activities.filter(a => a.id !== actId) } : d))
    toast.success('Activity removed')
  }

  const dayTotal = day?.activities.reduce((s, a) => s + (a.cost || 0), 0) || 0

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="font-poppins font-bold text-2xl text-secondary">{mockItinerary.tripName} — Itinerary</h1>
        <p className="text-slate-500 text-sm">Build your day-by-day plan</p>
      </div>

      <div className="flex gap-4 h-[calc(100vh-200px)]">
        {/* Left Panel */}
        <div className="w-64 flex-shrink-0 flex flex-col gap-3 overflow-y-auto scrollbar-hide">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">Days</p>
          {days.map((d, i) => (
            <button key={d.id} onClick={() => setSelectedDay(i)}
              className={`text-left p-3 rounded-xl border-2 transition-all ${selectedDay === i ? 'border-primary bg-blue-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
              <p className="text-xs text-slate-400 mb-0.5">Day {i + 1}</p>
              <p className="font-semibold text-secondary text-sm">{d.city}</p>
              <p className="text-xs text-slate-500">{new Date(d.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}</p>
              <p className="text-xs text-primary mt-1">{d.activities.length} activities</p>
            </button>
          ))}
          <button onClick={() => toast.success('City stop added (demo)')}
            className="p-3 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-primary hover:text-primary transition-all text-sm flex items-center gap-2">
            <Plus size={16} /> Add City Stop
          </button>
        </div>

        {/* Right Panel */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {day && (
            <Card className="p-5">
              {/* Day Header */}
              <div className="flex items-start justify-between mb-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="font-poppins font-bold text-xl text-secondary">Day {selectedDay + 1} — {day.city}</h2>
                  <p className="text-slate-500 text-sm">{new Date(day.date).toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Day Total</p>
                  <p className="font-bold text-secondary">${dayTotal}</p>
                </div>
              </div>

              {/* Hotel & Transport */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 bg-slate-50 rounded-xl p-3">
                  <Hotel size={16} className="text-primary" />
                  <div>
                    <p className="text-xs text-slate-400">Hotel</p>
                    <p className="text-sm font-medium text-secondary">{day.hotel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 rounded-xl p-3">
                  <Bus size={16} className="text-accent" />
                  <div>
                    <p className="text-xs text-slate-400">Transport</p>
                    <p className="text-sm font-medium text-secondary">{day.transport}</p>
                  </div>
                </div>
              </div>

              {/* Activities Timeline */}
              <div className="space-y-3">
                {day.activities.map((activity) => {
                  const Icon = categoryIcons[activity.category] || MapPin
                  const colorClass = categoryColors[activity.category] || 'bg-slate-100 text-slate-600'
                  const isExpanded = expandedActivity === activity.id
                  return (
                    <div key={activity.id} className="border border-slate-100 rounded-xl overflow-hidden">
                      <div className="flex items-center gap-3 p-3 cursor-pointer hover:bg-slate-50 transition-colors"
                        onClick={() => setExpandedActivity(isExpanded ? null : activity.id)}>
                        <GripVertical size={16} className="text-slate-300 flex-shrink-0" />
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                          <Icon size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-secondary text-sm">{activity.name}</p>
                          <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                            {activity.time && <span className="flex items-center gap-1"><Clock size={11} />{activity.time}</span>}
                            {activity.duration && <span>{activity.duration}</span>}
                            {activity.cost > 0 && <span className="flex items-center gap-1"><DollarSign size={11} />${activity.cost}</span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${colorClass}`}>{activity.category}</span>
                          {isExpanded ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                        </div>
                      </div>
                      {isExpanded && (
                        <div className="px-4 pb-3 border-t border-slate-100 bg-slate-50">
                          <p className="text-sm text-slate-600 mt-2">{activity.notes || 'No notes added.'}</p>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-600 hover:bg-red-50" onClick={() => removeActivity(activity.id)}>Remove</Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Add Activity */}
              {showAddActivity ? (
                <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100 space-y-3">
                  <p className="font-medium text-secondary text-sm">Add Activity</p>
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="Activity name *" value={newActivity.name} onChange={e => setNewActivity(a => ({ ...a, name: e.target.value }))}
                      className="px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30 col-span-2" />
                    <input placeholder="Time (e.g. 09:00)" value={newActivity.time} onChange={e => setNewActivity(a => ({ ...a, time: e.target.value }))}
                      className="px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    <input placeholder="Duration (e.g. 2h)" value={newActivity.duration} onChange={e => setNewActivity(a => ({ ...a, duration: e.target.value }))}
                      className="px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    <input placeholder="Cost ($)" type="number" value={newActivity.cost} onChange={e => setNewActivity(a => ({ ...a, cost: e.target.value }))}
                      className="px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    <select value={newActivity.category} onChange={e => setNewActivity(a => ({ ...a, category: e.target.value }))}
                      className="px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30">
                      {Object.keys(categoryIcons).map(c => <option key={c}>{c}</option>)}
                    </select>
                    <input placeholder="Notes" value={newActivity.notes} onChange={e => setNewActivity(a => ({ ...a, notes: e.target.value }))}
                      className="px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30 col-span-2" />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={addActivity}>Add</Button>
                    <Button size="sm" variant="ghost" onClick={() => setShowAddActivity(false)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setShowAddActivity(true)}
                  className="mt-4 w-full p-3 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-primary hover:text-primary transition-all text-sm flex items-center justify-center gap-2">
                  <Plus size={16} /> Add Activity
                </button>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
