# Security Context

## Purpose

This file defines the security rules that apply during implementation. Read this alongside `code-standards.md` and `architecture-context.md` before writing any route handler, background task, or data access layer.

---

## Authentication and Authorization

- Every API route under `app/api/` is protected by default. Never skip the auth check to ship faster.
- Verify the Clerk session on the server using `auth()` from `@clerk/nextjs/server`. Do not trust user-supplied user IDs.
- After verifying identity, always verify ownership or membership before reading or mutating project data.
  - Owner check: `project.ownerId === userId`
  - Collaborator check: query the collaborator table for `(projectId, userId)`
- Liveblocks room tokens are issued only after both checks pass. A valid Clerk session alone is not enough.
- Do not expose internal user IDs, project IDs, or blob paths in client-facing error messages.

## Input Validation

- Parse and validate all incoming request bodies before any logic runs. Use `zod` or explicit type narrowing.
- Reject requests with unexpected fields, missing required fields, or wrong types at the boundary — do not pass raw `request.json()` output into Prisma or downstream functions.
- Treat path params (e.g., `projectId`) as untrusted until verified against the database.
- Strip or reject HTML and script content from any user-supplied string that will be stored or rendered.

## API Route Hardening

- Enforce HTTP method constraints. Return `405 Method Not Allowed` for unexpected methods.
- Return consistent, minimal error responses. Do not leak stack traces, Prisma errors, or internal paths to the client.
- For mutations (POST, PATCH, DELETE), always re-verify auth and ownership inside the handler — do not rely on middleware alone.
- Rate-limit sensitive endpoints (auth callbacks, token issuance, AI generation triggers) where possible. Clerk handles auth-level rate limiting; apply additional limits at the route level for generation triggers.

## Liveblocks Token Security

- Never issue a room token without first confirming the requesting user is an owner or collaborator on the project that maps to that room.
- Room IDs must be derived from verified project IDs — do not accept a room ID directly from the client without resolving it through the database.
- Tokens must be short-lived. Do not extend expiry beyond what Liveblocks defaults to.

## Background Tasks (Trigger.dev)

- Trigger.dev tasks are invoked from route handlers after auth and ownership are verified. Never invoke a task from a client component directly.
- Pass only the minimum payload needed: `userId`, `projectId`, and task-specific input. Do not pass raw request bodies.
- Task run IDs are relational data. Treat them as verified before issuing any status update or result retrieval.
- Tasks that write to Vercel Blob or Prisma must re-derive the blob path from the verified `projectId` — do not accept blob paths or URLs from client input.

## Vercel Blob Storage

- Blob paths follow a fixed schema: `canvas/{projectId}.json` and `specs/{projectId}/{specId}.md`. Construct these server-side only.
- Never accept a blob URL or path from the client as a write target. Construct the path from verified IDs.
- Blob reads are unauthenticated at the CDN level. Do not store sensitive data in blobs that should remain private. If this changes, revisit access controls.

## Database (Prisma + PostgreSQL)

- Never build raw SQL strings with user input. Use Prisma's query API only.
- Do not return full Prisma model objects to the client. Select only the fields the client needs.
- Soft-delete patterns or cascade rules must be defined explicitly in the schema — do not rely on implicit behavior.

## Secrets and Environment Variables

- Never hardcode secrets, API keys, or connection strings. All secrets live in environment variables.
- Do not log environment variables or secret values anywhere.
- Distinguish between server-only variables and client-safe variables. Only variables prefixed with `NEXT_PUBLIC_` are safe to expose to the browser. Clerk publishable keys follow this rule; secret keys do not.
- Audit new environment variables before adding them. If a secret is used in a Trigger.dev task, confirm it is available in the task runtime environment, not just the Next.js runtime.

## Dependency Safety

- Do not install packages from unfamiliar publishers without checking download counts and repository health.
- Pin major versions for security-sensitive packages (Clerk, Prisma, Liveblocks).
- When the Next.js or Clerk versions are bumped, review the changelog for breaking security changes before merging.

## Error Handling

- Catch errors at system boundaries and return safe, generic messages to the client.
- Log errors server-side with enough context to debug (request path, userId if available, error type) but without user content or secret values.
- A failed auth check returns `401`. A failed ownership check returns `403`. Do not return `404` to obscure existence if the auth failure is the real reason — but do return `404` for resources that genuinely do not exist to avoid enumeration.

## What Not To Do

- Do not trust `req.headers`, `searchParams`, or `req.body` values before validation.
- Do not pass `userId` received from the client to a database query — always derive it from the verified server session.
- Do not store canvas content or generated specs in the database directly — blob storage only, with the URL reference in Prisma.
- Do not expose Trigger.dev run IDs or Vercel Blob URLs in public-facing routes unless the user is confirmed to have access to the associated project.
