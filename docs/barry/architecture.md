# Barry architecture foundation

Barry is developed in this repository as a product based on the Rakazo platform. The foundation deliberately keeps the existing Rakazo applications and package identifiers intact. This document records current boundaries and guides future changes; it does not prescribe designs for features that do not yet exist.

## Current repository shape

This is a pnpm workspace and Turborepo monorepo. `pnpm-workspace.yaml` includes `apps/*`, `packages/*`, and selected infrastructure packages; root scripts delegate builds, checks, and tests to Turbo and Biome. Packages are ESM TypeScript workspace packages. The root and packages currently use Apache-2.0 licensing.

- `apps/web` is the web client. `apps/desktop` packages the web experience in Electron. `apps/mobile` is the Expo application.
- `apps/api` owns the HTTP/API process; `apps/worker` owns background and agent execution. Runtime configuration and provider construction are wired in application composition roots, notably `apps/worker/src/index.ts`.
- `packages/contracts` and `packages/core` provide shared contracts and core logic. `packages/adapter-kit` defines provider-neutral interfaces; `packages/adapters` contains implementations. `packages/db` owns Prisma schema and persistence.
- `packages/ui-tokens` is the shared token source; `packages/ui-web` and other shared UI packages provide reusable frontend components.
- `infra/compose`, `infra/railway`, `infra/sandboxes`, and `infra/updater` describe deployment, sandbox, and update infrastructure. `scripts/` contains repository-level development/build helpers.
- `.env.example` documents the shared runtime configuration surface. Values are read and translated by applications and provider adapters; do not copy it into Barry-specific parallel configuration.

## Barry extension policy

Prefer, in order:

1. Compose existing Rakazo behavior through existing app composition roots and configuration.
2. Implement provider-specific integration behind a relevant existing provider-neutral contract and register it through existing adapter wiring.
3. Add a `packages/barry-*` package only when a real capability has reusable behavior or contracts that justify a package boundary.
4. Modify an upstream-owned module only when no suitable seam exists. Keep the change narrow, avoid duplicated behavior, add regression coverage, and record the reason and touched upstream paths.

Do not create empty packages or speculative plugin frameworks. No new external service, credential, or production configuration is part of this foundation. Keep `@rakazo/*` identifiers and Apache-2.0 notices/attribution unless a later, reviewed product decision establishes otherwise.

## Source-backed future integration points

- Visual identity can be investigated through `packages/ui-tokens` and the existing UI composition; no rebrand or token change is made here.
- Provider integrations can be investigated through `packages/adapter-kit`, `packages/adapters`, and the API/worker composition roots. An interface belongs in a shared contract only when a concrete integration needs that boundary.
- Web, Electron, and mobile share the monorepo, but their current platform-specific composition differs. A feature should identify applicable surfaces and reuse shared packages where practical.
- Business workflows, agent-specific identities, human approval policy, tenant isolation, commercial billing, and an animated mascot have no decided design in this foundation. Investigate ownership, security, persistence, and cross-platform behavior when a concrete feature is proposed; do not infer that existing adapters solve those domain problems.

## Upstream ownership and review

Treat Rakazo behavior and files as upstream-owned by default. Keep Barry changes modular and avoid unrelated formatting or refactoring in upstream files, because broad diffs increase merge conflicts and obscure behavior changes. The current `packages/adapter-kit`, `packages/adapters`, shared UI packages, and app composition roots are candidate seams, not permission to extend them without a real requirement.

See [upstream-sync.md](./upstream-sync.md) for remotes, branch workflow, merge procedure, and conflict handling. The current Git remotes are `origin` at `barry-dev-ops/barry` and `upstream` at `elie222/rakazo`; `upstream` is configured with a push URL, but must never be used for pushes.

## Commercial distribution and release risk

Commercial capabilities and independently branded builds are not implemented. Existing GitHub release workflows include triggers and assumptions tied to Rakazo release tags and product identity (including `v*` tag workflows). Independent Barry tags or binaries could therefore invoke unintended existing publishing behavior or require changes in upstream-owned workflows. Before creating Barry releases, audit every relevant workflow, image namespace, updater, app identifier, and release credential scope; design release isolation as a separate, reviewed change. This document does not establish a release pipeline or authorize publishing.
