import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FolderKanban, Inbox, LogOut } from 'lucide-react'
import { clearAdminCode } from '../lib/adminAuth.js'

const linkClass = ({ isActive }) =>
  [
    'flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition',
    isActive
      ? 'bg-white/10 text-slate-950 dark:text-slate-100'
      : 'text-slate-700/80 dark:text-slate-200/80 hover:bg-white/10',
  ].join(' ')

export default function AdminShell() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-agency">
      <div className="section pt-20 pb-10">
        <div className="glass rounded-3xl p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold">Admin</div>
              <div className="text-xs text-slate-600/80 dark:text-slate-300/80">
                Manage projects and messages
              </div>
            </div>
            <button
              className="inline-flex items-center gap-2 rounded-xl border border-slate-900/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-3 py-2 text-sm hover:bg-white/80 dark:hover:bg-white/10 transition"
              type="button"
              onClick={async () => {
                clearAdminCode()
                navigate('/admin/login', { replace: true })
              }}
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-12">
            <aside className="lg:col-span-3">
              <nav className="flex flex-col gap-1">
                <NavLink to="/admin/dashboard" className={linkClass}>
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </NavLink>
                <NavLink to="/admin/projects" className={linkClass}>
                  <FolderKanban className="h-4 w-4" /> Projects
                </NavLink>
                <NavLink to="/admin/messages" className={linkClass}>
                  <Inbox className="h-4 w-4" /> Messages
                </NavLink>
              </nav>
            </aside>

            <main className="lg:col-span-9">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
