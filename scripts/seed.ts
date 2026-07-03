import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.js'
import { seedTestUser } from '../tests/helpers/seedUser.js'

async function run() {
  console.log('Initializing payload...')
  const payload = await getPayload({ config })

  console.log('Seeding test user...')
  await seedTestUser()

  console.log('Cleaning up existing projects...')
  await payload.delete({
    collection: 'projects',
    where: {
      id: { exists: true }
    }
  })

  console.log('Seeding 10 mock projects...')
  const mockProjects = [
    {
      name: 'ImConvo',
      category: 'AI',
      description: 'Co-developed a visual lip-reading speech translation pipeline using a spatio-temporal LipNet neural network architecture. Architected a decoupled serverless execution environment leveraging GCP Cloud Run and Cloud Storage FUSE to isolate heavy .keras checkpoints, reducing container footprints by over 80%.',
      recognition: 'Invited Presenter: UTS Faculty of Engineering and IT (FEIT) AI Showcase, 2026',
      tags: 'TensorFlow, Next.js, GCP Cloud Run, Cloud Storage FUSE',
      url: 'https://imconvo.fly.dev',
      githubUrl: 'https://github.com/somerandomguy-coder/imconvo',
      sortOrder: 1,
    },
    {
      name: 'Centralized Log Ingestion & Analytics Microservice',
      category: 'Backend',
      description: 'Engineered a concurrent log aggregator handling load-testing thresholds of 1,000+ concurrent requests with zero log drops. Implemented backpressure buffering utilizing atomic Redis queue operations, storing event records in MongoDB Atlas TimeSeries database.',
      tags: 'FastAPI, Python, Upstash Redis, MongoDB Atlas',
      githubUrl: 'https://github.com/somerandomguy-coder/log-aggregator',
      sortOrder: 2,
    },
    {
      name: 'Online Force-Directed Graph',
      category: 'Frontend',
      description: 'Interactive text-to-graph translation workspace visualizing up to 5,000 concurrent graph nodes. Offloaded NLP text processing to Web Workers, pairing D3.js physics vector computations directly with client-side HTML5 Canvas to guarantee frame rates above 30 FPS.',
      tags: 'TypeScript, Vite, D3.js, HTML5 Canvas, Web Workers',
      githubUrl: 'https://github.com/somerandomguy-coder/force-directed-graph',
      sortOrder: 3,
    },
    {
      name: 'Quests',
      category: 'Tools',
      description: 'Native, system-integrated task management tool running on Linux via PyGObject bindings. Features a deterministic multi-variable ranking engine to compute a balanced focus menu, eliminating choice-paralysis with a localized SQLite persistence tier.',
      tags: 'Python, GTK4, libadwaita, SQLite, aiosqlite',
      githubUrl: 'https://github.com/somerandomguy-coder/quests',
      sortOrder: 4,
    },
    {
      name: 'Distributed Lock Manager',
      category: 'Backend',
      description: 'A fault-tolerant distributed locking mechanism built on top of Raft consensus protocol. Designed for multi-region microservices coordination.',
      tags: 'Rust, Raft, gRPC, Redis, Linux',
      githubUrl: 'https://github.com/somerandomguy-coder/distributed-lock-manager',
      sortOrder: 5,
    },
    {
      name: 'Rust JSON Stream Parser',
      category: 'Tools',
      description: 'Extremely fast, zero-copy JSON streaming parser library for Rust. Processes gigabytes of structured data with minimal memory footprint.',
      tags: 'Rust, Cargo, Performance, JSON',
      githubUrl: 'https://github.com/somerandomguy-coder/json-stream-parser',
      sortOrder: 6,
    },
    {
      name: 'Agentic SQL Query Builder',
      category: 'AI',
      description: 'LLM-powered text-to-SQL system that safeguards database schemas and generates verified queries. Includes natural language data explanations.',
      tags: 'Python, OpenAI, PostgreSQL, LangChain',
      url: 'https://sql-agent.namle.dev',
      githubUrl: 'https://github.com/somerandomguy-coder/agentic-sql-builder',
      sortOrder: 7,
    },
    {
      name: 'Model Deployment Canary Operator',
      category: 'MLOps',
      description: 'Canary LLM deployment operator that manages canary rollouts and handles rollbacks on latency spikes.',
      tags: 'Go, Kubernetes, Prometheus, Istio',
      githubUrl: 'https://github.com/somerandomguy-coder/llm-canary-operator',
      sortOrder: 8,
    },
    {
      name: 'Neural Translation API',
      category: 'AI',
      description: 'A high-performance machine translation microservice powered by Transformer models. Supports real-time streaming and custom translation vocabularies.',
      tags: 'PyTorch, Python, FastAPI, Docker',
      url: 'https://translation-demo.namle.dev',
      githubUrl: 'https://github.com/somerandomguy-coder/neural-translation-api',
      sortOrder: 9,
    },
    {
      name: 'Sleek Developer Portfolio Template',
      category: 'Frontend',
      description: 'A modern, responsive, high-end developer portfolio catalog built using Next.js and Payload CMS with complete backend curating capabilities.',
      tags: 'TypeScript, Next.js, Payload CMS, SQLite, Vanilla CSS',
      url: 'https://portfolio-demo.namle.dev',
      githubUrl: 'https://github.com/somerandomguy-coder/project-manager',
      sortOrder: 10,
    },
  ]

  for (const proj of mockProjects) {
    await payload.create({
      collection: 'projects',
      data: proj,
    })
    console.log(`Created project: ${proj.name}`)
  }

  console.log('Seed complete!')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
