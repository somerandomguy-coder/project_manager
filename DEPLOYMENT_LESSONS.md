# Portfolio Deployment Reflection & Lessons Learned

This document serves as a reference for database, container, and permission constraints encountered during the setup and deployment of this Next.js + Payload CMS (SQLite) portfolio catalog on Fly.io.

---

## 🚀 Technical Reflections

### 1. Ephemeral vs. Persistent Filesystems (SQLite on Fly.io)
*   **The Gotcha:** Fly.io micro-VMs run on ephemeral filesystems by default. Any local files (like a SQLite database file at `/app/data/portfolio.db` or uploads at `/app/public/media`) are completely wiped out when the machine restarts, scale events occur, or when it automatically sleeps due to inactivity.
*   **The Solution:** 
    1.  We created a **Fly Volume** (a block storage drive mounted at `/data`).
    2.  We pointed the database connection string (`DATABASE_URL`) to `file:/data/nam-le-portfolio.db` (persistent volume path).
    3.  We scaled the application to exactly **1 machine** (`fly scale count 1`) because SQLite is a local file-based database. Scaling to multiple machines would result in "split-brain" syndrome, where different web requests route to separate machines with isolated database files.

### 2. Container User Permission Denials
*   **The Gotcha:** To maintain security, Next.js's production Docker configuration runs under an unprivileged user named `nextjs` instead of `root`. When we copied static assets into the container via `COPY --from=builder /app/public ./public`, the folder defaulted to `root` ownership.
    At boot, our startup script tried to delete `/app/public/media` to symlink it to the persistent volume path at `/data/media`. Because the `nextjs` user did not own `/app/public/media`, it threw:
    `rm: can't remove '/app/public/media/.gitkeep': Permission denied`
    This crash loop occurred before Next.js even initialized.
*   **The Solution:** We updated the `Dockerfile` instructions to explicitly assign folder permissions during the build phase:
    ```dockerfile
    COPY --from=builder --chown=nextjs:nodejs /app/public ./public
    ```
    This allowed the unprivileged `nextjs` user to safely delete and modify the public subfolders on boot.

### 3. Production Database Initialization (`push` vs `migrations`)
*   **The Gotcha:** In local development, the Payload SQLite adapter uses Drizzle ORM to automatically push and sync schema changes to the database. However, Drizzle completely disables the automatic schema-push feature when running under `NODE_ENV=production` to prevent accidental data loss. As a result, deploying the app to a fresh production database resulted in `SQLITE_ERROR: no such table: settings` because no tables were ever created.
*   **The Solution:**
    1.  We generated formal migration files locally using the Payload CLI:
        ```bash
        pnpm run payload migrate:create --name init
        ```
    2.  We registered the generated migrations list inside the `src/payload.config.ts` adapter under `prodMigrations`:
        ```typescript
        import { migrations } from './migrations'
        // ...
        db: sqliteAdapter({
          client: { url: process.env.DATABASE_URL || '' },
          prodMigrations: migrations, // Runs automatically in production!
        })
        ```
    3.  Now, on container startup, Payload detects the production environment, reads the migrations, and automatically creates or updates the database tables safely.

### 4. TypeScript Strict Mode Mismatches
*   **The Gotcha:** During local development, the dev server compiles on-the-fly and often ignores subtle implicit type mismatches. However, during Next.js production builds (`next build`), strict type check compilation runs. 
    1.  The mock projects array in `seed.ts` defined categories as plain strings instead of the strict union literals (`"AI" | "MLOps" | "Backend" | ...`).
    2.  Custom URL validators in `src/collections/Projects.ts` lacked explicit types on the validation parameters, throwing `Parameter 'value' implicitly has an 'any' type` errors and failing the build.
*   **The Solution:** We cast the local seed objects to `any` (`data: proj as any`) to bypass unnecessary compile-time validations for script tools, and added explicit `any` typings to validator parameters (`validate: (value: any) => ...`).

---

## 🛠️ Essential Scripts & Commands

-   `pnpm run dev` - Start development server locally.
-   `pnpm run devsafe` - Safe restart (wipes Next.js cache and launches dev).
-   `pnpm run seed` - Re-seeds local database with projects and admin user.
-   `pnpm run generate:types` - Compile Payload schema changes to `src/payload-types.ts`.
-   `pnpm run payload migrate:create --name <migration-name>` - Create a database migration when collection schema changes.
-   `fly deploy` - Deploy latest code changes to production.
