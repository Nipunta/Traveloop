import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import toast from 'react-hot-toast'

const steps = ['Basic Info', 'Details', 'Settings']

export default function CreateTripPage() {
  const { addTrip } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [preview, setPreview] = useState(null)
  const [form, setForm] = useState({
    name: '', startDate: '', endDate: '', description: '',
    budget: '', travelers: 1, privacy: 'private', coverImage: '',
  })
  const [errors, setErrors] = useState({})

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const validateStep = () => {
    const e = {}
    if (step === 0) {
      if (!form.name.trim()) e.name = 'Trip name is required'
      if (!form.startDate) e.startDate = 'Start date is required'
      if (!form.endDate) e.endDate = 'End date is required'
      if (form.startDate && form.endDate && form.endDate < form.startDate) e.endDate = 'End date must be after start date'
    }
    if (step === 1) {
      if (!form.budget || isNaN(form.budget)) e.budget = 'Enter a valid budget'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => { if (validateStep()) setStep(s => s + 1) }
  const handleBack = () => setStep(s => s - 1)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
      setForm(f => ({ ...f, coverImage: url }))
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    addTrip({
      ...form,
      budget: Number(form.budget),
      travelers: Number(form.travelers),
      spent: 0,
      cities: 0,
      status: 'upcoming',
      coverImage: form.coverImage || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
      destination: 'TBD',
    })
    setLoading(false)
    setSuccess(true)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="font-poppins font-bold text-2xl text-secondary">Create New Trip</h1>
        <p className="text-slate-500 text-sm">Plan your next adventure</p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${i <= step ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>
                {i < step ? <CheckCircle size={16} /> : i + 1}
              </div>
              <span className={`text-sm font-medium hidden sm:block ${i === step ? 'text-primary' : 'text-slate-400'}`}>{s}</span>
            </div>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${i < step ? 'bg-primary' : 'bg-slate-200'}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="font-poppins font-semibold text-secondary mb-4">Basic Information</h2>
            <Input label="Trip Name" placeholder="e.g. Tokyo Adventure" value={form.name} onChange={set('name')} error={errors.name} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Start Date" type="date" value={form.startDate} onChange={set('startDate')} error={errors.startDate} />
              <Input label="End Date" type="date" value={form.endDate} onChange={set('endDate')} error={errors.endDate} />
            </div>
            <div>
              <label className="text-sm font-medium text-secondary block mb-1.5">Description</label>
              <textarea value={form.description} onChange={set('description')} rows={3}
                placeholder="Describe your trip..."
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none" />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-poppins font-semibold text-secondary mb-4">Trip Details</h2>
            <Input label="Budget Limit ($)" type="number" placeholder="3000" value={form.budget} onChange={set('budget')} error={errors.budget} />
            <div>
              <label className="text-sm font-medium text-secondary block mb-1.5">Number of Travelers</label>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setForm(f => ({ ...f, travelers: Math.max(1, f.travelers - 1) }))}
                  className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-secondary transition-colors">−</button>
                <span className="text-lg font-semibold text-secondary w-8 text-center">{form.travelers}</span>
                <button type="button" onClick={() => setForm(f => ({ ...f, travelers: f.travelers + 1 }))}
                  className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-secondary transition-colors">+</button>
              </div>
            </div>
            {/* Cover Photo */}
            <div>
              <label className="text-sm font-medium text-secondary block mb-1.5">Cover Photo</label>
              <label className={`flex flex-col items-center justify-center h-40 rounded-xl border-2 border-dashed cursor-pointer transition-all ${preview ? 'border-primary' : 'border-slate-200 hover:border-primary'} overflow-hidden relative`}>
                {preview ? (
                  <img src={preview} alt="Cover" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <Upload size={28} />
                    <span className="text-sm">Click to upload or drag & drop</span>
                    <span className="text-xs">PNG, JPG up to 10MB</span>
                  </div>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-poppins font-semibold text-secondary mb-4">Privacy Settings</h2>
            {['private', 'public', 'friends'].map(p => (
              <label key={p} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${form.privacy === p ? 'border-primary bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>
                <input type="radio" name="privacy" value={p} checked={form.privacy === p} onChange={set('privacy')} className="accent-primary" />
                <div>
                  <p className="font-medium text-secondary capitalize">{p === 'friends' ? 'Share with Friends' : p}</p>
                  <p className="text-xs text-slate-500">
                    {p === 'private' ? 'Only you can see this trip' : p === 'public' ? 'Anyone with the link can view' : 'Share with selected friends'}
                  </p>
                </div>
              </label>
            ))}

            {/* Summary */}
            <div className="bg-slate-50 rounded-xl p-4 mt-4 space-y-2">
              <p className="font-medium text-secondary text-sm">Trip Summary</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-slate-500">Name:</span><span className="font-medium text-secondary">{form.name || '—'}</span>
                <span className="text-slate-500">Dates:</span><span className="font-medium text-secondary">{form.startDate} → {form.endDate}</span>
                <span className="text-slate-500">Budget:</span><span className="font-medium text-secondary">${form.budget || 0}</span>
                <span className="text-slate-500">Travelers:</span><span className="font-medium text-secondary">{form.travelers}</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6 pt-4 border-t border-slate-100">
          <div>
            {step > 0 && (
              <Button variant="ghost" onClick={handleBack}>
                <ChevronLeft size={16} /> Back
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => { addTrip({ ...form, status: 'draft', spent: 0, cities: 0, coverImage: form.coverImage || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80', destination: 'TBD', budget: Number(form.budget) || 0, travelers: Number(form.travelers) }); toast.success('Draft saved'); navigate('/trips') }}>
              Save Draft
            </Button>
            {step < steps.length - 1 ? (
              <Button onClick={handleNext}>Next <ChevronRight size={16} /></Button>
            ) : (
              <Button loading={loading} onClick={handleSubmit}>Create Trip</Button>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal open={success} onClose={() => { setSuccess(false); navigate('/trips') }} title="Trip Created!">
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-500" />
          </div>
          <h3 className="font-poppins font-bold text-xl text-secondary mb-2">"{form.name}" is ready!</h3>
          <p className="text-slate-500 text-sm mb-6">Your trip has been created. Start building your itinerary now.</p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => { setSuccess(false); navigate('/trips') }}>View Trips</Button>
            <Button onClick={() => { setSuccess(false); navigate('/trips') }}>Build Itinerary</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
