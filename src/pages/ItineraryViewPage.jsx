import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Printer, Download, Share2, Clock, DollarSign, MapPin, Hotel, Bus, List, Calendar, AlignLeft } from 'lucide-react'
import { mockItinerary } from '../mock-data/itinerary'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import toast from 'react-hot-toast'

const views = [
  { id: 'timeline', label: 'Timeline', icon: AlignLeft },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'list', label: 'List', icon: List },
]

export default function ItineraryViewPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [view, setView] = useState('timeline')
  const [activeDay, setActiveDay] = useState(0)
  const { days, tripName } = mockItinerary

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/shared/${id}`)
    toast.success('Share link copied!')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-poppins font-bold text-2xl text-secondary">{tripName}</h1>
          <p className="text-slate-500 text-sm">{days.length} days · {days.reduce((s, d) => s + d.activities.length, 0)} activities</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.success('Printing...')}><Printer size={15} /> Print</Button>
          <Button variant="outline" size="sm" onClick={() => toast.success('Downloading PDF...')}><Download size={15} /> PDF</Button>
          <Button size="sm" onClick={handleShare}><Share2 size={15} /> Share</Button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        {views.map(({ id: vid, label, icon: Icon }) => (
          <button key={vid} onClick={() => setView(vid)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === vid ? 'bg-white text-secondary shadow-sm' : 'text-slate-500 hover:text-secondary'}`}>
            <Icon size={15} />{label}
          </button>
        ))}
      </div>

      {/* Sticky Day Nav */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {days.map((d, i) => (
          <button key={d.id} onClick={() => setActiveDay(i)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeDay === i ? 'bg-primary text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-primary hover:text-primary'}`}>
            Day {i + 1} · {d.city}
          </button>
        ))}
      </div>

      {/* Content */}
      {view === 'timeline' && (
        <div className="space-y-6">
          {days.map((day, di) => (
            <Card key={day.id} className={`overflow-hidden transition-all ${di !== activeDay ? 'opacity-60' : ''}`}>
              {/* Day Header */}
              <div className="bg-gradient-to-r from-secondary to-slate-700 px-6 py-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-xs">Day {di + 1}</p>
                    <h3 className="font-poppins font-bold text-xl">{day.city}</h3>
                    <p className="text-white/70 text-sm">{new Date(day.date).toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/60 text-xs">Day Cost</p>
                    <p className="font-bold text-lg">${day.activities.reduce((s, a) => s + (a.cost || 0), 0)}</p>
                  </div>
                </div>
                <div className="flex gap-4 mt-3 text-sm">
                  <span className="flex items-center gap-1.5 text-white/70"><Hotel size={14} />{day.hotel}</span>
                  <span className="flex items-center gap-1.5 text-white/70"><Bus size={14} />{day.transport}</span>
                </div>
              </div>

              {/* Activities */}
              <div className="p-5">
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100" />
                  <div className="space-y-4">
                    {day.activities.map((act, ai) => (
                      <div key={act.id} className="flex gap-4 relative">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 z-10 text-white text-xs font-bold">
                          {ai + 1}
                        </div>
                        <div className="flex-1 bg-slate-50 rounded-xl p-3">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-semibold text-secondary text-sm">{act.name}</p>
                              <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                                {act.time && <span className="flex items-center gap-1"><Clock size={11} />{act.time}</span>}
                                {act.duration && <span>{act.duration}</span>}
                                <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">{act.category}</span>
                              </div>
                              {act.notes && <p className="text-xs text-slate-500 mt-1.5 italic">{act.notes}</p>}
                            </div>
                            {act.cost > 0 && (
                              <span className="flex items-center gap-1 text-sm font-semibold text-secondary flex-shrink-0">
                                <DollarSign size={13} />{act.cost}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {view === 'list' && (
        <Card className="overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-4 py-3 text-slate-500 font-medium">Activity</th>
                <th className="text-left px-4 py-3 text-slate-500 font-medium">Day</th>
                <th className="text-left px-4 py-3 text-slate-500 font-medium">Time</th>
                <th className="text-left px-4 py-3 text-slate-500 font-medium">Category</th>
                <th className="text-right px-4 py-3 text-slate-500 font-medium">Cost</th>
              </tr>
            </thead>
            <tbody>
              {days.flatMap((d, di) => d.activities.map(a => (
                <tr key={a.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-secondary">{a.name}</td>
                  <td className="px-4 py-3 text-slate-500">Day {di + 1} · {d.city}</td>
                  <td className="px-4 py-3 text-slate-500">{a.time || '—'}</td>
                  <td className="px-4 py-3"><span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">{a.category}</span></td>
                  <td className="px-4 py-3 text-right font-medium text-secondary">{a.cost > 0 ? `$${a.cost}` : 'Free'}</td>
                </tr>
              )))}
            </tbody>
          </table>
        </Card>
      )}

      {view === 'calendar' && (
        <Card className="p-6">
          <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-400 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d} className="py-1 font-medium">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 30 }, (_, i) => {
              const day = days.find(d => new Date(d.date).getDate() === i + 10)
              return (
                <div key={i} className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs transition-all ${day ? 'bg-primary text-white font-semibold cursor-pointer hover:bg-blue-700' : 'bg-slate-50 text-slate-400'}`}>
                  <span>{i + 10}</span>
                  {day && <span className="text-[9px] opacity-80 truncate w-full text-center px-0.5">{day.city}</span>}
                </div>
              )
            })}
          </div>
        </Card>
      )}
    </div>
  )
}
