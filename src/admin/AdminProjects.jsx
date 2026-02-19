import { useEffect, useMemo, useState } from 'react'
import { Plus, Trash2, Upload } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import Button from '../components/Button.jsx'
import Badge from '../components/Badge.jsx'
import { useAdminCode } from '../lib/adminAuth.js'
import { adminFetch } from '../services/adminApi.js'

const emptyProject = {
  title: '',
  description: '',
  tech_stack: '',
  live_url: '',
  github_url: '',
  image_url: '',
}

function TechBadges({ tech }) {
  const items = Array.isArray(tech) ? tech : []
  if (!items.length) return null
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {items.map((t) => (
        <Badge key={t}>{t}</Badge>
      ))}
    </div>
  )
}

export default function AdminProjects() {
  const { code: adminCode } = useAdminCode()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [form, setForm] = useState(emptyProject)
  const [file, setFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const techArray = useMemo(() => {
    return form.tech_stack
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  }, [form.tech_stack])

  async function load() {
    setLoading(true)
    setError('')
    try {
      const data = await adminFetch('/api/projects', adminCode)
      setProjects(Array.isArray(data?.projects) ? data.projects : [])
    } catch (err) {
      setError(err?.message || 'Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (adminCode) load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminCode])

  async function uploadImageIfNeeded() {
    if (!file) return form.image_url || ''

    const body = new FormData()
    body.append('file', file)

    const data = await fetch('/api/uploads/project-image', {
      method: 'POST',
      headers: {
        'x-admin-code': adminCode,
      },
      body,
    }).then(async (r) => {
      if (!r.ok) {
        let msg = 'Upload failed'
        try {
          const j = await r.json()
          msg = j?.error || msg
        } catch {
          // ignore
        }
        throw new Error(msg)
      }
      return r.json()
    })

    return data?.imageUrl || ''
  }

  async function onSave(e) {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const imageUrl = await uploadImageIfNeeded()

      const payload = {
        title: form.title,
        description: form.description,
        tech_stack: techArray,
        live_url: form.live_url,
        github_url: form.github_url,
        image_url: imageUrl,
      }

      if (editingId) {
        await adminFetch(`/api/projects/${editingId}`, adminCode, {
          method: 'PUT',
          body: JSON.stringify(payload),
        })
      } else {
        await adminFetch('/api/projects', adminCode, {
          method: 'POST',
          body: JSON.stringify(payload),
        })
      }

      setForm(emptyProject)
      setFile(null)
      setEditingId(null)
      await load()
    } catch (err) {
      setError(err?.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  async function onDelete(id) {
    if (!id) return
    // eslint-disable-next-line no-alert
    const ok = window.confirm('Delete this project?')
    if (!ok) return

    setError('')
    try {
      await adminFetch(`/api/projects/${id}`, adminCode, { method: 'DELETE' })
      await load()
    } catch (err) {
      setError(err?.message || 'Delete failed')
    }
  }

  function startEdit(p) {
    setEditingId(p.id)
    setForm({
      title: p.title || p.name || '',
      description: p.description || '',
      tech_stack: Array.isArray(p.tech_stack)
        ? p.tech_stack.join(', ')
        : Array.isArray(p.tech)
          ? p.tech.join(', ')
          : '',
      live_url: p.live_url || p.liveUrl || '',
      github_url: p.github_url || p.githubUrl || '',
      image_url: p.image_url || p.imageUrl || '',
    })
    setFile(null)
  }

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-lg font-semibold tracking-tight">Projects</div>
          <div className="mt-1 text-sm text-slate-600/90 dark:text-slate-300/90">
            Create and manage portfolio projects.
          </div>
        </div>

        <Button
          variant="secondary"
          type="button"
          onClick={() => {
            setEditingId(null)
            setForm(emptyProject)
            setFile(null)
          }}
        >
          <Plus className="h-4 w-4" /> New
        </Button>
      </div>

      <form onSubmit={onSave} className="glass rounded-3xl p-6 sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <div className="text-xs text-slate-600/80 dark:text-slate-300/80">Title</div>
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="mt-2 w-full rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-slate-950/40 px-4 py-3 text-sm outline-none focus:border-cyan-400/40"
              placeholder="Project title"
              required
            />
          </label>

          <label className="block">
            <div className="text-xs text-slate-600/80 dark:text-slate-300/80">Tech stack (comma-separated)</div>
            <input
              value={form.tech_stack}
              onChange={(e) =>
                setForm((f) => ({ ...f, tech_stack: e.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-slate-950/40 px-4 py-3 text-sm outline-none focus:border-cyan-400/40"
              placeholder="React, Node.js, Supabase"
            />
          </label>
        </div>

        <label className="mt-4 block">
          <div className="text-xs text-slate-600/80 dark:text-slate-300/80">Description</div>
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            className="mt-2 min-h-[110px] w-full resize-y rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-slate-950/40 px-4 py-3 text-sm outline-none focus:border-cyan-400/40"
            placeholder="What it is, what it solves, key features…"
            required
          />
        </label>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <div className="text-xs text-slate-600/80 dark:text-slate-300/80">Live URL</div>
            <input
              value={form.live_url}
              onChange={(e) => setForm((f) => ({ ...f, live_url: e.target.value }))}
              className="mt-2 w-full rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-slate-950/40 px-4 py-3 text-sm outline-none focus:border-cyan-400/40"
              placeholder="https://…"
            />
          </label>

          <label className="block">
            <div className="text-xs text-slate-600/80 dark:text-slate-300/80">GitHub URL</div>
            <input
              value={form.github_url}
              onChange={(e) =>
                setForm((f) => ({ ...f, github_url: e.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-slate-950/40 px-4 py-3 text-sm outline-none focus:border-cyan-400/40"
              placeholder="https://github.com/…"
            />
          </label>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <div className="text-xs text-slate-600/80 dark:text-slate-300/80">Image URL (optional)</div>
            <input
              value={form.image_url}
              onChange={(e) =>
                setForm((f) => ({ ...f, image_url: e.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-slate-950/40 px-4 py-3 text-sm outline-none focus:border-cyan-400/40"
              placeholder="https://…"
            />
          </label>

          <label className="block">
            <div className="text-xs text-slate-600/80 dark:text-slate-300/80">Upload image</div>
            <div className="mt-2 flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="block w-full text-sm"
              />
              <div className="inline-flex items-center gap-2 text-xs text-slate-600/80 dark:text-slate-300/80">
                <Upload className="h-4 w-4" />
                {file ? file.name : 'Optional'}
              </div>
            </div>
          </label>
        </div>

        {error ? (
          <div className="mt-4 rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-200">
            {error}
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving…' : editingId ? 'Update project' : 'Create project'}
          </Button>
          {editingId ? (
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setEditingId(null)
                setForm(emptyProject)
                setFile(null)
              }}
            >
              Cancel
            </Button>
          ) : null}
        </div>
      </form>

      <div className="mt-6">
        <div className="text-sm font-semibold">Current projects</div>
        <div className="mt-4">
          {loading ? (
            <div className="glass rounded-3xl p-6 text-sm">Loading…</div>
          ) : projects.length === 0 ? (
            <div className="glass rounded-3xl p-6 text-sm">No projects yet.</div>
          ) : (
            <div className="grid gap-4">
              {projects.map((p, idx) => (
                <Reveal key={p.id || idx} delay={idx * 0.02}>
                  <div className="glass rounded-3xl p-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="text-base font-semibold tracking-tight">
                          {p.title || p.name}
                        </div>
                        <div className="mt-2 text-sm text-slate-600/90 dark:text-slate-300/90">
                          {p.description}
                        </div>
                        <TechBadges tech={p.tech_stack || p.tech} />
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => startEdit(p)}
                        >
                          Edit
                        </Button>
                        <button
                          type="button"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-rose-400/30 bg-rose-400/10 text-rose-700 dark:text-rose-200 hover:bg-rose-400/15 transition"
                          aria-label="Delete"
                          onClick={() => onDelete(p.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
