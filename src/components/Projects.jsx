import { useEffect, useMemo, useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import Container from './Container.jsx'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'
import Badge from './Badge.jsx'
import Button from './Button.jsx'
import { apiFetch } from '../lib/api.js'
import { projectsFallback } from '../data/projectsFallback.js'

function ProjectCard({ project }) {
  return (
    <div className="glass group relative overflow-hidden rounded-3xl">
      <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -inset-24 bg-gradient-to-r from-sky-500/15 via-cyan-400/10 to-violet-500/15 blur-2xl" />
      </div>

      <div className="relative p-6 sm:p-7">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-lg font-semibold tracking-tight">
              {project.name}
            </div>
            <div className="mt-1 text-sm text-slate-300/80">
              {project.tagline}
            </div>
          </div>

          <div className="h-12 w-12 rounded-2xl border border-white/10 bg-gradient-to-br from-sky-500/20 via-cyan-400/15 to-violet-500/20">
            {project.logo && (
              <img
                src={project.logo}
                alt={`${project.name} logo`}
                className="h-full w-full object-contain"
              />
            )}
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-200/80">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {(project.tech || []).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button as="a" href={project.liveUrl || '#'} target="_blank">
            Live Demo <ExternalLink className="h-4 w-4" />
          </Button>
          <Button
            as="a"
            href={project.githubUrl || '#'}
            target="_blank"
            variant="secondary"
          >
            GitHub <Github className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function load() {
      try {
        const data = await apiFetch('/api/projects')
        if (!mounted) return
        setProjects(Array.isArray(data?.projects) ? data.projects : [])
      } catch {
        if (!mounted) return
        setProjects(projectsFallback)
      } finally {
        if (!mounted) return
        setLoading(false)
      }
    }

    load()
    return () => {
      mounted = false
    }
  }, [])

  const items = useMemo(() => {
    if (loading && projects.length === 0) return projectsFallback
    return projects
  }, [loading, projects])

  return (
    <section id="projects" className="relative py-20 sm:py-24">
      <Container>
        <SectionHeader
          eyebrow="Selected work"
          title="Projects that shipped in the real world"
          description="Production systems built with a founder’s mindset: reliable workflows, clean UI, and backend foundations that scale."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {items.map((p, idx) => (
            <Reveal key={p.id || p.name} delay={idx * 0.05}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
