import { Github, Linkedin, Mail } from 'lucide-react'
import Container from './Container.jsx'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-900/10 dark:border-white/10 bg-slate-50/60 dark:bg-slate-950/40">
      <Container className="py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold tracking-tight">Azad Gupta</div>
            <div className="mt-1 text-xs text-slate-600/70 dark:text-slate-300/70">
              © {year} All rights reserved.
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              className="glass inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-white/10 transition"
              href="mailto:azadgupta1010@gmail.com"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              className="glass inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-white/10 transition"
              href="https://www.linkedin.com/in/azad-gupta-6619692ba/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              className="glass inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-white/10 transition"
              href="https://github.com/azadgupta1010"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
