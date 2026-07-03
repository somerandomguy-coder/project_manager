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
      name: 'Neural Translation API',
      category: 'AI',
      description: 'A high-performance machine translation microservice powered by Transformer models. Supports real-time streaming and custom translation vocabularies.',
      tags: 'PyTorch, Python, FastAPI, Docker',
      url: 'https://translation-demo.namle.dev',
      githubUrl: 'https://github.com/namle/neural-translation-api',
      sortOrder: 1,
    },
    {
      name: 'MLOps Training Orchestrator',
      category: 'MLOps',
      description: 'Distributed ML training runner that dynamically schedules GPU nodes on Kubernetes. Integrates with MLflow for experiment tracking and model registry.',
      tags: 'Kubernetes, Go, gRPC, MLflow, Docker',
      githubUrl: 'https://github.com/namle/mlops-orchestrator',
      sortOrder: 2,
    },
    {
      name: 'Distributed Lock Manager',
      category: 'Backend',
      description: 'A fault-tolerant distributed locking mechanism built on top of Raft consensus protocol. Designed for multi-region microservices coordination.',
      tags: 'Rust, Raft, gRPC, Redis, Linux',
      githubUrl: 'https://github.com/namle/distributed-lock-manager',
      sortOrder: 3,
    },
    {
      name: 'Rust JSON Stream Parser',
      category: 'Tools',
      description: 'Extremely fast, zero-copy JSON streaming parser library for Rust. Processes gigabytes of structured data with minimal memory footprint.',
      tags: 'Rust, Cargo, Performance, JSON',
      githubUrl: 'https://github.com/namle/json-stream-parser',
      sortOrder: 4,
    },
    {
      name: 'Agentic SQL Query Builder',
      category: 'AI',
      description: 'LLM-powered text-to-SQL system that safeguards database schemas and generates verified queries. Includes natural language data explanations.',
      tags: 'Python, OpenAI, PostgreSQL, LangChain',
      url: 'https://sql-agent.namle.dev',
      githubUrl: 'https://github.com/namle/agentic-sql-builder',
      sortOrder: 5,
    },
    {
      name: 'Realtime Serverless Analytics',
      category: 'Backend',
      description: 'Event-driven analytics backend processing millions of events per second via serverless edge functions. Saves results to ClickHouse.',
      tags: 'TypeScript, Next.js, ClickHouse, Cloudflare Workers',
      url: 'https://analytics-dashboard.namle.dev',
      githubUrl: 'https://github.com/namle/serverless-analytics',
      sortOrder: 6,
    },
    {
      name: 'Model Deployment Canary Operator',
      category: 'MLOps',
      description: 'Canary LLM deployment operator that manages canary rollouts and handles rollbacks on latency spikes.',
      tags: 'Go, Kubernetes, Prometheus, Istio',
      githubUrl: 'https://github.com/namle/llm-canary-operator',
      sortOrder: 7,
    },
    {
      name: 'Interactive UI Shader Sandbox',
      category: 'Frontend',
      description: 'A WebGL Web-based shader playground. Lets developers write, compile, and share fragment shaders with realtime graphics previews.',
      tags: 'TypeScript, React, WebGL, GLSL, Tailwind',
      url: 'https://shaders.namle.dev',
      githubUrl: 'https://github.com/namle/shader-sandbox',
      sortOrder: 8,
    },
    {
      name: 'Kubernetes Cluster Status CLI',
      category: 'Tools',
      description: 'A beautiful terminal UI (TUI) tool to monitor the health, resource allocation, and warning logs of K8s namespaces in realtime.',
      tags: 'Go, Bubbletea, Kubernetes API, CLI',
      githubUrl: 'https://github.com/namle/k8s-status-tui',
      sortOrder: 9,
    },
    {
      name: 'Sleek Developer Portfolio Template',
      category: 'Frontend',
      description: 'A modern, responsive, high-end developer portfolio catalog built using Next.js and Payload CMS with complete backend curating capabilities.',
      tags: 'TypeScript, Next.js, Payload CMS, SQLite, Vanilla CSS',
      url: 'https://portfolio-demo.namle.dev',
      githubUrl: 'https://github.com/namle/project-manager',
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
