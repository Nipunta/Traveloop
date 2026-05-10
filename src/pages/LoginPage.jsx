import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Plane } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { authAPI } from '../api'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const { login } = useApp()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [forgotMode, setForgotMode] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotLoading, setForgotLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (mode === 'signup' && !form.name.trim()) e.name = 'Full name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Enter a valid email'
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters'
    if (mode === 'signup' && form.password !== form.confirm) e.confirm = 'Passwords do not match'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      let userData
      if (mode === 'login') {
        userData = await authAPI.login(form.email, form.password)
      } else {
        userData = await authAPI.register(form.name, form.email, form.password)
      }
      login(userData)
      toast.success(mode === 'login' ? 'Welcome back!' : 'Account created!')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleForgotPassword = async () => {
    if (!forgotEmail || !forgotEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Please enter a valid email address')
      return
    }
    setForgotLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setForgotLoading(false)
    toast.success(`Reset link sent to ${forgotEmail}`)
    setForgotMode(false)
    setForgotEmail('')
  }

  return (
    <div className="min-h-screen flex">
      {/* Left — Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80"
          alt="Travel"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 via-primary/60 to-accent/40" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <Plane size={20} />
            </div>
            <span className="font-poppins font-bold text-xl">Traveloop</span>
          </div>
          <div>
            <h1 className="font-poppins font-bold text-4xl leading-tight mb-4">
              Plan your next<br />adventure with ease.
            </h1>
            <p className="text-white/70 text-lg">Build itineraries, track budgets, and explore the world — all in one place.</p>
            <div className="flex gap-6 mt-8">
              {[['500+', 'Cities'], ['10K+', 'Travelers'], ['50K+', 'Trips']].map(([n, l]) => (
                <div key={l}>
                  <p className="font-poppins font-bold text-2xl">{n}</p>
                  <p className="text-white/60 text-sm">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
              <Plane size={18} className="text-white" />
            </div>
            <span className="font-poppins font-bold text-xl text-secondary">Traveloop</span>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h2 className="font-poppins font-bold text-2xl text-secondary mb-1">
              {mode === 'login' ? 'Welcome back' : 'Create account'}
            </h2>
            <p className="text-slate-500 text-sm mb-6">
              {mode === 'login' ? 'Sign in to continue your journey' : 'Start planning your adventures'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <Input label="Full Name" icon={User} placeholder="Alex Rivera"
                  value={form.name} onChange={set('name')} error={errors.name} />
              )}
              <Input label="Email" icon={Mail} type="email" placeholder="you@example.com"
                value={form.email} onChange={set('email')} error={errors.email} />
              <Input label="Password" icon={Lock} type="password" placeholder="••••••••"
                value={form.password} onChange={set('password')} error={errors.password} />
              {mode === 'signup' && (
                <Input label="Confirm Password" icon={Lock} type="password" placeholder="••••••••"
                  value={form.confirm} onChange={set('confirm')} error={errors.confirm} />
              )}

              {mode === 'login' && (
                <div className="text-right">
                  {!forgotMode ? (
                    <button type="button" onClick={() => setForgotMode(true)} className="text-xs text-primary hover:underline">
                      Forgot password?
                    </button>
                  ) : (
                    <div className="flex flex-col gap-2 items-end">
                      <input
                        type="email"
                        placeholder="Your email address"
                        value={forgotEmail}
                        onChange={e => setForgotEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <div className="flex gap-2">
                        <button type="button" onClick={handleForgotPassword} disabled={forgotLoading}
                          className="text-xs bg-primary text-white px-3 py-1 rounded-md hover:bg-primary/90">
                          {forgotLoading ? 'Sending...' : 'Send reset link'}
                        </button>
                        <button type="button" onClick={() => { setForgotMode(false); setForgotEmail('') }}
                          className="text-xs text-slate-500 hover:underline">
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <Button type="submit" loading={loading} className="w-full" size="lg">
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-6">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setErrors({}) }}
                className="text-primary font-medium hover:underline">
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          <p className="text-center text-xs text-slate-400 mt-4">
            Sign in or create an account to get started.
          </p>
        </div>
      </div>
    </div>
  )
}
