import React, { useState } from 'react'
import { DollarSign, Plus, Trash2, TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Modal from '../components/ui/Modal'

const CATEGORIES = ['Food', 'Transport', 'Accommodation', 'Activities', 'Shopping', 'Other']
const CATEGORY_COLORS = {
  Food: 'bg-orange-100 text-orange-700',
  Transport: 'bg-blue-100 text-blue-700',
  Accommodation: 'bg-purple-100 text-purple-700',
  Activities: 'bg-green-100 text-green-700',
  Shopping: 'bg-pink-100 text-pink-700',
  Other: 'bg-slate-100 text-slate-700',
}

export default function BudgetPage() {
  const { trips } = useApp()
  const [selectedTrip, setSelectedTrip] = useState('')
  const [expenses, setExpenses] = useState({})
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({ description: '', amount: '', category: 'Food' })

  const tripExpenses = expenses[selectedTrip] || []
  const trip = trips.find(t => String(t.id) === String(selectedTrip))
  const totalSpent = tripExpenses.reduce((s, e) => s + Number(e.amount), 0)
  const budget = trip?.budget || 0
  const remaining = budget - totalSpent
  const pct = budget > 0 ? Math.min((totalSpent / budget) * 100, 100) : 0

  const addExpense = () => {
    if (!form.description || !form.amount) return
    const entry = { id: Date.now(), ...form, amount: parseFloat(form.amount) }
    setExpenses(prev => ({ ...prev, [selectedTrip]: [entry, ...(prev[selectedTrip] || [])] }))
    setForm({ description: '', amount: '', category: 'Food' })
    setModalOpen(false)
  }

  const removeExpense = (id) => {
    setExpenses(prev => ({ ...prev, [selectedTrip]: prev[selectedTrip].filter(e => e.id !== id) }))
  }

  const byCategory = CATEGORIES.map(cat => ({
    cat,
    total: tripExpenses.filter(e => e.category === cat).reduce((s, e) => s + Number(e.amount), 0)
  })).filter(c => c.total > 0)

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary font-poppins">Budget Tracker</h1>
          <p className="text-slate-500 text-sm mt-1">Track expenses per trip</p>
        </div>
        {selectedTrip && (
          <Button onClick={() => setModalOpen(true)}>
            <Plus size={16} /> Add Expense
          </Button>
        )}
      </div>

      {/* Trip selector */}
      <Card className="p-4">
        <label className="text-sm font-medium text-secondary block mb-2">Select Trip</label>
        <select
          className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
          value={selectedTrip}
          onChange={e => setSelectedTrip(e.target.value)}
        >
          <option value="">-- Choose a trip --</option>
          {trips.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </Card>

      {selectedTrip && (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Total Budget', value: `$${budget.toLocaleString()}`, icon: Wallet, color: 'text-blue-600 bg-blue-50' },
              { label: 'Total Spent', value: `$${totalSpent.toLocaleString()}`, icon: TrendingDown, color: 'text-red-500 bg-red-50' },
              { label: 'Remaining', value: `$${remaining.toLocaleString()}`, icon: TrendingUp, color: remaining >= 0 ? 'text-green-600 bg-green-50' : 'text-red-500 bg-red-50' },
            ].map(({ label, value, icon: Icon, color }) => (
              <Card key={label} className="p-4 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">{label}</p>
                  <p className="text-lg font-bold text-secondary">{value}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Progress bar */}
          {budget > 0 && (
            <Card className="p-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500">Budget used</span>
                <span className="font-medium text-secondary">{pct.toFixed(0)}%</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${pct >= 100 ? 'bg-red-500' : pct >= 75 ? 'bg-orange-400' : 'bg-primary'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </Card>
          )}

          {/* By category */}
          {byCategory.length > 0 && (
            <Card className="p-4">
              <p className="text-sm font-semibold text-secondary mb-3">By Category</p>
              <div className="flex flex-wrap gap-2">
                {byCategory.map(({ cat, total }) => (
                  <span key={cat} className={`px-3 py-1.5 rounded-xl text-xs font-medium ${CATEGORY_COLORS[cat]}`}>
                    {cat}: ${total.toLocaleString()}
                  </span>
                ))}
              </div>
            </Card>
          )}

          {/* Expense list */}
          <Card className="p-4">
            <p className="text-sm font-semibold text-secondary mb-3">Expenses</p>
            {tripExpenses.length === 0 ? (
              <div className="text-center py-10 text-slate-400">
                <DollarSign size={32} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">No expenses yet. Add one above.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {tripExpenses.map(e => (
                  <div key={e.id} className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-slate-50 group">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded-lg text-xs font-medium ${CATEGORY_COLORS[e.category]}`}>{e.category}</span>
                      <span className="text-sm text-secondary">{e.description}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-secondary">${Number(e.amount).toLocaleString()}</span>
                      <button onClick={() => removeExpense(e.id)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </>
      )}

      {!selectedTrip && (
        <div className="text-center py-20 text-slate-400">
          <DollarSign size={40} className="mx-auto mb-3 opacity-20" />
          <p>Select a trip to track its budget</p>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Expense">
        <div className="space-y-4">
          <Input label="Description" placeholder="e.g. Dinner at restaurant" value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          <Input label="Amount ($)" type="number" placeholder="0.00" value={form.amount}
            onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} />
          <div>
            <label className="text-sm font-medium text-secondary block mb-1.5">Category</label>
            <select
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
              value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button className="flex-1" onClick={addExpense}>Add</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
