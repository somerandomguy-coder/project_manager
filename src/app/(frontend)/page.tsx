import { getPayload } from 'payload'
import config from '@/payload.config'
import './styles.css'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

function getProjectInitials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()
}

function getGradientStyle(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const h1 = Math.abs(hash % 360)
  const h2 = (h1 + 60) % 360
  return {
    background: `linear-gradient(135deg, hsl(${h1}, 70%, 40%) 0%, hsl(${h2}, 80%, 25%) 100%)`,
  }
}

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch Settings Global
  const settings = await payload.findGlobal({
    slug: 'settings',
  })

  const activeFilter = settings?.filterCategory || 'all'

  // Query projects based on category filter
  const whereClause: any = {
    isActive: {
      equals: true,
    },
  }

  if (activeFilter !== 'all') {
    whereClause.category = {
      equals: activeFilter,
    }
  }

  const projects = await payload.find({
    collection: 'projects',
    where: whereClause,
    sort: 'sortOrder',
    limit: 100,
  })

  // Format filter label for display
  const getFilterLabel = (val: string) => {
    switch (val) {
      case 'AI': return 'AI Projects'
      case 'MLOps': return 'MLOps Projects'
      case 'Backend': return 'Backend Projects'
      case 'Tools': return 'Tools & Utilities'
      case 'Frontend': return 'Frontend Projects'
      case 'Other': return 'Other Projects'
      default: return 'All Projects'
    }
  }

  return (
    <div className="catalog">
      <header className="catalog-header">
        <div className="header-info">
          <div className="header-title-container">
            <Image
              src="/logo.png"
              alt="Nam Le Logo"
              width={56}
              height={56}
              className="header-logo"
            />
            <div>
              <p className="eyebrow">Portfolio Catalog</p>
              <h1>Nam Le</h1>
            </div>
          </div>
          <p className="subtitle">
            {activeFilter !== 'all' ? (
              <span>
                Showing <strong>{getFilterLabel(activeFilter)}</strong> curated for you.
              </span>
            ) : (
              'Full-stack software developer catalog. A collection of selected personal projects and professional works.'
            )}
          </p>
        </div>
      </header>

      <main className="projects-grid">
        {projects.docs.length === 0 && (
          <div className="empty-state">
            <p>No active projects match the current filter: <strong>{getFilterLabel(activeFilter)}</strong>.</p>
            <p className="empty-subtext">Toggle active or change the settings in the dashboard.</p>
          </div>
        )}

        {projects.docs.map((project: any) => {
          const thumbnail = typeof project.thumbnail === 'object' ? project.thumbnail : null
          const tagsList = project.tags
            ? project.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
            : []

          return (
            <article key={project.id} className="project-card">
              {thumbnail?.url ? (
                <div className="thumbnail-wrapper">
                  <Image
                    src={thumbnail.url}
                    alt={thumbnail.alt || project.name}
                    width={720}
                    height={450}
                    className="thumbnail"
                  />
                  {project.category && (
                    <span className="category-badge">{project.category}</span>
                  )}
                </div>
              ) : (
                <div className="gradient-placeholder" style={getGradientStyle(project.name)}>
                  <span className="initials">{getProjectInitials(project.name)}</span>
                  {project.category && (
                    <span className="category-badge">{project.category}</span>
                  )}
                </div>
              )}

              <div className="project-content">
                <div className="card-header">
                  <h2>{project.name}</h2>
                </div>

                {project.recognition && (
                  <div className="recognition-badge-card">
                    <span className="trophy-icon">🏆</span> {project.recognition}
                  </div>
                )}

                <p className="description">
                  {project.description || project.notes || 'No description provided.'}
                </p>

                {tagsList.length > 0 && (
                  <div className="tags-container">
                    {tagsList.map((tag: string, idx: number) => (
                      <span key={idx} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="project-links">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Visit Live
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                    >
                      GitHub Repo
                    </a>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </main>
    </div>
  )
}
