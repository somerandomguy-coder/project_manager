# Project Catalog CMS (Payload + Next.js)

A simple self-hosted headless CMS for managing project cards like lightweight products.

Each project is managed from the Payload admin and includes:
- `name` (project name)
- `url` (hosting/live URL)
- `thumbnail` (upload image)
- `isActive` (toggle on/off)
- `sortOrder` and optional `notes`

Only active projects are shown on the public homepage.

## Local setup

1. `cp .env.example .env`
2. Set a strong `PAYLOAD_SECRET` in `.env`
3. `pnpm install`
4. `pnpm dev`
5. Open `http://localhost:3000`
6. Open `http://localhost:3000/admin` and create your first admin user

If you are upgrading from an older local schema and see schema-push prompts/errors, remove the old SQLite file and restart:

`rm -f data/nam-le-portfolio.db`

## Core routes

- Frontend listing: `http://localhost:3000`
- Admin panel: `http://localhost:3000/admin`
- REST API: `http://localhost:3000/api/projects`
- GraphQL API: `http://localhost:3000/api/graphql`

## Docker (optional)

`docker-compose up`

This starts the app with SQLite and media storage mounted to local volumes for persistence.

## Scripts

- `pnpm dev` start in development
- `pnpm build` production build
- `pnpm start` run production server
- `pnpm lint` run ESLint
- `pnpm test:int` run integration tests
- `pnpm test:e2e` run Playwright tests
