# Upstream synchronization

This repository is Barry's product fork of Rakazo. `origin` is `barry-dev-ops/barry`; `upstream` is `elie222/rakazo`. Keep `main` as Barry's long-lived primary branch. Use short-lived `feature/*` branches for changes and `sync/upstream-*` branches for upstream integration. Create Barry release tags independently when a release process is deliberately established. Never push to upstream.

## Prepare and merge an upstream release

1. Check that the worktree is clean and current, then fetch both remotes: `git fetch origin` and `git fetch upstream`.
2. Create a sync branch from the current Barry `main`, for example `git switch -c sync/upstream-YYYY-MM-DD origin/main`.
3. Review the incoming range before merging: `git log --oneline --decorate HEAD..upstream/main` and `git diff --stat HEAD...upstream/main`. Identify upstream release notes, migrations, dependency/toolchain changes, and changes affecting deployment or supported platforms.
4. Merge normally: `git merge --no-ff upstream/main`. Do not rebase or rewrite `main`.
5. Resolve conflicts by understanding both versions' intent. Preserve Barry behavior and upstream behavior where compatible; do not mechanically choose one side. Keep resolutions narrow. If the conflict implies a breaking API, data, security, or architectural change whose policy is unsettled, stop and get review before proceeding.
6. Run the relevant local checks and regression tests, and ensure CI checks the sync branch/PR. Do not merge based only on a clean textual merge. If dependencies or tools are unavailable, report that validation was not performed; do not claim it passed.
7. Open a synchronization PR to Barry `main`. Summarize the upstream range, notable changes, conflict resolutions, tests/checks run or blocked, and any remaining breaking-change decisions. Review the full diff for unrelated changes, secrets, and licensing/attribution. Merge only after review and required checks.

If upstream's default branch changes, verify it from upstream's repository metadata before changing this procedure; do not silently sync a different branch.

## Reduce conflict risk

- Put new reusable Barry functionality in a justified Barry-specific package; use existing provider contracts and composition roots where they fit.
- Avoid edits to upstream-owned files unless a concrete capability has no existing seam. Record each necessary exception and why it cannot be isolated.
- Avoid moving/renaming upstream files, broad formatting, and opportunistic refactors in sync-sensitive areas.
- Keep product changes isolated in small, focused commits/PRs. Do not duplicate existing functionality in a Barry fork.
- Revisit the list of upstream touch points during every sync; ownership can shift as Rakazo evolves.

## Releases and breaking changes

Barry-specific tags are independent identifiers, not proof that existing release workflows are isolated. Existing workflows include `v*` triggers and Rakazo product assumptions. Before tagging/publishing Barry, audit workflow triggers, release titles, image repositories/tags, updater configuration, app identifiers, signing, and credentials; establish a separate reviewed release design first. No synchronization automation or release automation is introduced by this guide.

When an upstream change is breaking, pause rather than silently adapting product behavior. Describe the upstream change, affected Barry contracts/data/deployments, compatibility options, and required migration or rollback. Review migration compatibility with releases that may still be running. Record durable architectural choices as ADRs; leave feature-specific choices to the feature design.
