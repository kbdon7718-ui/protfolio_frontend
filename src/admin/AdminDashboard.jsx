import { Link } from 'react-router-dom'
import { FolderKanban, Inbox } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'

function Card({ title, description, to, Icon }) {
  return (
    <Link
      to={to}
      className="glass group block rounded-3xl p-6 sm:p-7 hover:bg-white/10 transition"
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="text-base font-semibold tracking-tight">{title}</div>
          <div className="mt-2 text-sm text-slate-600/90 dark:text-slate-300/90">
            {description}
          </div>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/60 dark:bg-white/5">
          <Icon className="h-5 w-5 text-cyan-400" />
        </div>
      </div>
    </Link>
  )
}

export default function AdminDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Reveal>
        <Card
          title="Projects"
          description="Add, edit, delete projects and upload images."
          to="/admin/projects"
          Icon={FolderKanban}
        />
      </Reveal>
      <Reveal delay={0.05}>
        <Card
          title="Messages"
          description="View contact form submissions."
          to="/admin/messages"
          Icon={Inbox}
        />
      </Reveal>
    </div>
  )
}
