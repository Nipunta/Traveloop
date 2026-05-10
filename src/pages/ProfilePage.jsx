import React, { useState } from 'react'
import { User, Mail, FileText, Camera, Save, LogOut, Map, CheckCircle, DollarSign } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const { user, login, logout, trips } = useApp()
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', bio: user?.bio || '' })

  const totalBudget = trips.reduce((s, t) => s + Number(t.budget || 0), 0)
  const totalSpent = trips.reduce((s, t) => s + Number(t.spent || 0), 0)
  const upcoming = trips.filter(t => t.status === 'upcoming').length
  const completed = trips.filter(t => t.status === 'completed').length

  const save = () => {
    if (!form.name.trim()) return toast.error('Name is required')
    login({ ...user, ...form })
    setEditing(false)
    toast.success('Profile updated')
  }

  const cancel = () => {
    setForm({ name: user?.name || '', email: user?.email || '', bio: user?.bio || '' })
    setEditing(false)
  }

  const avatarUrl = user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=2563eb&color=fff&size=200`

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary font-poppins">Profile</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your account</p>
        </div>
        {!editing && (
          <Button variant="outline" onClick={() => setEditing(true)}>Edit Profile</Button>
        )}
      </div>

      {/* Avatar + name */}
      <Card className="p-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={avatarUrl}
              alt={user?.name}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-primary/20"
            />
            {editing && (
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-white shadow">
                <Camera size={13} />
              </button>
            )}
          </div>
          <div>
            <p className="text-xl font-bold text-secondary">{user?.name}</p>
            <p className="text-sm text-slate-500">{user?.email}</p>
            {user?.bio && !editing && <p className="text-sm text-slate-400 mt-1">{user.bio}</p>}
          </div>
        </div>

        {editing && (
          <div className="mt-6 space-y-4 border-t border-slate-100 pt-5">
            <Input label="Full Name" icon={User} value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <Input label="Email" icon={Mail} type="email" value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            <div>
              <label className="text-sm font-medium text-secondary block mb-1.5">Bio</label>
              <textarea
                rows={3}
                placeholder="Tell us a bit about yourself..."
                value={form.bio}
                onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white resize-none"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={cancel}>Cancel</Button>
              <Button className="flex-1" onClick={save}><Save size={15} /> Save Changes</Button>
            </div>
          </div>
        )}
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Trips', value: trips.length, icon: Map, color: 'text-blue-600 bg-blue-50' },
          { label: 'Upcoming', value: upcoming, icon: Map, color: 'text-orange-500 bg-orange-50' },
          { label: 'Completed', value: completed, icon: CheckCircle, color: 'text-green-600 bg-green-50' },
          { label: 'Total Budget', value: `$${totalBudget.toLocaleString()}`, icon: DollarSign, color: 'text-purple-600 bg-purple-50' },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="p-4 text-center">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-2 ${color}`}>
              <Icon size={18} />
            </div>
            <p className="text-lg font-bold text-secondary">{value}</p>
            <p className="text-xs text-slate-400">{label}</p>
          </Card>
        ))}
      </div>

      {/* Danger zone */}
      <Card className="p-5">
        <p className="text-sm font-semibold text-secondary mb-3">Account</p>
        <Button
          variant="danger"
          onClick={() => { logout(); navigate('/login') }}
        >
          <LogOut size={16} /> Sign Out
        </Button>
      </Card>
    </div>
  )
}
