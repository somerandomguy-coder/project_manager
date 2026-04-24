import { getPayload } from 'payload'
import config from '@/payload.config'
import './styles.css'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const projects = await payload.find({
    collection: 'projects',
    where: {
      isActive: {
        equals: true,
      },
    },
    sort: 'sortOrder',
    limit: 100,
  })

  return (
    <div className="catalog">
      <header className="catalog-header">
        <div>
          <p className="eyebrow">Headless CMS</p>
          <h1>Projects</h1>
          <p className="subtitle">
            Manage project cards from <code>/admin</code> with name, URL, thumbnail, and active
            toggle.
          </p>
        </div>
        <Link className="admin-link" href="/admin">
          Open Admin
        </Link>
      </header>

      <main className="projects-grid">
        {projects.docs.length === 0 && (
          <p className="empty-state">
            No active projects yet. Add one in <code>/admin</code> and keep the Active toggle on.
          </p>
        )}

        {projects.docs.map((project) => {
          const thumbnail = typeof project.thumbnail === 'object' ? project.thumbnail : null

          return (
            <article key={project.id} className="project-card">
              {thumbnail?.url && (
                <div className="thumbnail-wrapper">
                  <Image
                    src={thumbnail.url}
                    alt={thumbnail.alt || project.name}
                    width={720}
                    height={450}
                    className="thumbnail"
                  />
                </div>
              )}

              <div className="project-content">
                <h2>{project.name}</h2>
                {project.notes && <p className="notes">{project.notes}</p>}
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="visit-link">
                  Visit Project
                </a>
              </div>
            </article>
          )
        })}
      </main>
    </div>
  )
}
