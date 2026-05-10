import React, { useState } from 'react'
import { ShoppingBag, Plus, Trash2, CheckSquare, Square } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Modal from '../components/ui/Modal'

const DEFAULT_CATEGORIES = ['Clothing', 'Toiletries', 'Electronics', 'Documents', 'Medications', 'Other']

export default function PackingPage() {
  const { trips } = useApp()
  const [selectedTrip, setSelectedTrip] = useState('')
  const [lists, setLists] = useState({})
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({ item: '', category: 'Clothing', qty: 1 })

  const items = lists[selectedTrip] || []
  const packed = items.filter(i => i.checked).length
  const pct = items.length > 0 ? Math.round((packed / items.length) * 100) : 0

  const addItem = () => {
    if (!form.item.trim()) return
    const entry = { id: Date.now(), item: form.item, category: form.category, qty: form.qty, checked: false }
    setLists(prev => ({ ...prev, [selectedTrip]: [...(prev[selectedTrip] || []), entry] }))
    setForm({ item: '', category: 'Clothing', qty: 1 })
    setModalOpen(false)
  }

  const toggle = (id) => {
    setLists(prev => ({
      ...prev,
      [selectedTrip]: prev[selectedTrip].map(i => i.id === id ? { ...i, checked: !i.checked } : i)
    }))
  }

  const remove = (id) => {
    setLists(prev => ({ ...prev, [selectedTrip]: prev[selectedTrip].filter(i => i.id !== id) }))
  }

  const clearChecked = () => {
    setLists(prev => ({ ...prev, [selectedTrip]: prev[selectedTrip].filter(i => !i.checked) }))
  }

  const grouped = DEFAULT_CATEGORIES.map(cat => ({
    cat,
    items: items.filter(i => i.category === cat)
  })).filter(g => g.items.length > 0)

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary font-poppins">Packing List</h1>
          <p className="text-slate-500 text-sm mt-1">Never forget a thing</p>
        </div>
        {selectedTrip && (
          <div className="flex gap-2">
            {items.some(i => i.checked) && (
              <Button variant="ghost" size="sm" onClick={clearChecked}>Clear packed</Button>
            )}
            <Button onClick={() => setModalOpen(true)}><Plus size={16} /> Add Item</Button>
          </div>
        )}
      </div>

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

      {selectedTrip && items.length > 0 && (
        <Card className="p-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-500">{packed} of {items.length} packed</span>
            <span className="font-medium text-secondary">{pct}%</span>
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${pct === 100 ? 'bg-green-500' : 'bg-primary'}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </Card>
      )}

      {selectedTrip && (
        grouped.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <ShoppingBag size={40} className="mx-auto mb-3 opacity-20" />
            <p>No items yet. Start adding to your packing list.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {grouped.map(({ cat, items: catItems }) => (
              <Card key={cat} className="p-4">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">{cat}</p>
                <div className="space-y-1">
                  {catItems.map(item => (
                    <div key={item.id} className="flex items-center gap-3 py-2 px-2 rounded-xl hover:bg-slate-50 group">
                      <button onClick={() => toggle(item.id)} className="text-primary flex-shrink-0">
                        {item.checked ? <CheckSquare size={18} /> : <Square size={18} className="text-slate-300" />}
                      </button>
                      <span className={`flex-1 text-sm ${item.checked ? 'line-through text-slate-400' : 'text-secondary'}`}>
                        {item.item}
                        {item.qty > 1 && <span className="text-slate-400 ml-1">×{item.qty}</span>}
                      </span>
                      <button onClick={() => remove(item.id)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )
      )}

      {!selectedTrip && (
        <div className="text-center py-20 text-slate-400">
          <ShoppingBag size={40} className="mx-auto mb-3 opacity-20" />
          <p>Select a trip to manage your packing list</p>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Packing Item">
        <div className="space-y-4">
          <Input label="Item" placeholder="e.g. Passport" value={form.item}
            onChange={e => setForm(f => ({ ...f, item: e.target.value }))} />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-secondary block mb-1.5">Category</label>
              <select
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              >
                {DEFAULT_CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <Input label="Quantity" type="number" min="1" value={form.qty}
              onChange={e => setForm(f => ({ ...f, qty: parseInt(e.target.value) || 1 }))} />
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button className="flex-1" onClick={addItem}>Add</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
