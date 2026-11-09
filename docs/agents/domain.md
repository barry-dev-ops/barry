# Domain Docs

How engineering skills should consume this repo's domain documentation when exploring the codebase.

## Before exploring, read these

- **`GLOSSARY-MAP.md`** at the repo root: it points to one `GLOSSARY.md` per context. Read each one relevant to the topic.
- **`docs/adr/`**: read ADRs that touch the area you're about to work in.
- Context-scoped ADRs under a context's `docs/adr/` directory when present.

If any of these files don't exist, **proceed silently**. Don't flag their absence or suggest creating them upfront. The domain-modeling skill creates them lazily when terms or decisions actually get resolved.

## File structure

Multi-context repo:

```
/
├── GLOSSARY-MAP.md
├── docs/adr/                          ← system-wide decisions
└── packages/
    ├── <context>/
    │   ├── GLOSSARY.md
    │   └── docs/adr/                  ← context-specific decisions
```

Follow the actual paths listed in `GLOSSARY-MAP.md`; context glossaries and ADRs may live outside this illustrative layout.

## Use the glossary's vocabulary

When output names a domain concept (in an issue title, refactor proposal, hypothesis, or test name), use the term as defined in the relevant `GLOSSARY.md`. Don't drift to synonyms the glossary explicitly avoids.

If the concept you need isn't in a glossary yet, that's a signal: either you're inventing language the project doesn't use (reconsider) or there's a real gap (note it for domain modeling).

## Flag ADR conflicts

If output contradicts an existing ADR, surface it explicitly:

> _Contradicts ADR-0007 (event-sourced orders), but worth reopening because…_
