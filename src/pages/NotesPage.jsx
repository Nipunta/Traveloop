import React, { useState } from 'react'
import { BookOpen, Plus, Trash2, Edit3, Save, X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import Input from '../components/ui/Input'

export default function NotesPage() {
  const { trips } = useApp()
  const [selectedTrip, setSelectedTrip] = useState('')
  const [notes, setNotes] = useState({})
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({ title: '', content: '' })

  const tripNotes = notes[selectedTrip] || []

  const openAdd = () => {
    setEditingId(null)
    setForm({ title: '', content: '' })
    setModalOpen(true)
  }

  const openEdit = (note) => {
    setEditingId(note.id)
    setForm({ title: note.title, content: note.content })
    setModalOpen(true)
  }

  const save = () => {
    if (!form.title.trim() && !form.content.trim()) return
    if (editingId) {
      setNotes(prev => ({
        ...prev,
        [selectedTrip]: prev[selectedTrip].map(n => n.id === editingId ? { ...n, ...form, updatedAt: new Date().toLocaleDateString() } : n)
      }))
    } else {
      const note = { id: Date.now(), ...form, createdAt: new Date().toLocaleDateString(), updatedAt: new Date().toLocaleDateString() }
      setNotes(prev => ({ ...prev, [selectedTrip]: [note, ...(prev[selectedTrip] || [])] }))
    }
    setModalOpen(false)
  }

  const remove = (id) => {
    setNotes(prev => ({ ...prev, [selectedTrip]: prev[selectedTrip].filter(n => n.id !== id) }))
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary font-poppins">Notes</h1>
          <p className="text-slate-500 text-sm mt-1">Jot down ideas, reminders, and plans</p>
        </div>
        {selectedTrip && (
          <Button onClick={openAdd}><Plus size={16} /> New Note</Button>
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

      {selectedTrip && (
        tripNotes.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <BookOpen size={40} className="mx-auto mb-3 opacity-20" />
            <p>No notes yet. Add your first note.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tripNotes.map(note => (
              <Card key={note.id} className="p-4 flex flex-col gap-2 group">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-secondary text-sm leading-snug">{note.title || 'Untitled'}</h3>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <button onClick={() => openEdit(note)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-primary transition-colors">
                      <Edit3 size={14} />
                    </button>
                    <button onClick={() => remove(note.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                {note.content && (
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-4 whitespace-pre-wrap">{note.content}</p>
                )}
                <p className="text-xs text-slate-300 mt-auto pt-1">Updated {note.updatedAt}</p>
              </Card>
            ))}
          </div>
        )
      )}

      {!selectedTrip && (
        <div className="text-center py-20 text-slate-400">
          <BookOpen size={40} className="mx-auto mb-3 opacity-20" />
          <p>Select a trip to view its notes</p>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit Note' : 'New Note'}>
        <div className="space-y-4">
          <Input label="Title" placeholder="Note title (optional)" value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          <div>
            <label className="text-sm font-medium text-secondary block mb-1.5">Content</label>
            <textarea
              rows={6}
              placeholder="Write your note here..."
              value={form.content}
              onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white resize-none"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button className="flex-1" onClick={save}><Save size={15} /> Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
