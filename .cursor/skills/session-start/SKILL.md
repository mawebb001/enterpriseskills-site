---
name: session-start
description: Initialize a coding session with full project context. Loads from .project-ai/ authority pack (if exists) for deterministic doc loading, or falls back to scanning for authoritative files. Use when the user says "start session", "begin session", "init session", "load context", or "session start".
---

> **MASTER TEMPLATE** — This is the generic version. Run "init project skills" in your project to generate a tailored copy locked to your specific stack. Project-local skills in `.cursor/skills/` override this master.

# Session Start

## Execution

### Step 1 — Identify Project

Read project root to determine:
- Project name (from `package.json`, `go.mod`, `pyproject.toml`, or folder name)
- Primary stack (Next.js, Go, Python, React Native, etc.)
- Git branch and status

Run: `git status` and `git log --oneline -5`

### Step 2 — Load Authority Pack or Authoritative Files

**Check if `.project-ai/` exists at the project root.**

#### If `.project-ai/` exists (deterministic loading):

Read these files in order — this is the project's operating contract:

1. `.project-ai/PROJECT_PROFILE.yaml` — project classification, stack, commands, paths, patterns
2. `.project-ai/ACTIVE_SKILLS.yaml` — which skills are active for this project
3. `.project-ai/SESSION_POLICY.yaml` — session lifecycle behavior
4. `.project-ai/MODEL_ROUTING.yaml` — model routing for task types
5. `.project-ai/AUTHORITATIVE_DOCS.yaml` — load order for governance/architecture docs

Then load documents listed under `session_start` in `AUTHORITATIVE_DOCS.yaml`, in the order specified. Only load files marked as `required: true` (skip missing optional files).

Report which authority pack files were loaded and their key values:
- Governance profile: [from PROJECT_PROFILE]
- Active skills: [count from ACTIVE_SKILLS]
- Session policy: [from SESSION_POLICY]
- Model routing: [from MODEL_ROUTING]

#### If `.project-ai/` does NOT exist (file scanning fallback):

Scan for and read these files (if they exist). These define the project's truth — read ALL before any work:

**Tier 1 — Governance (read first)**
- `docs/AI_RULES_GLOBAL.md` or `docs/AI_GOVERNANCE.md`
- `docs/CHANGE_CONTROL.md`
- `docs/MODEL_USAGE.md`
- `.cursor/rules/*.mdc` (all rule files)

**Tier 2 — Product Authority**
- `*_CONTRACT.md`, `*_BUILD_CONTRACT.md`
- `*_ROADMAP.md`
- `docs/LAYER_CONTRACT.md`

**Tier 3 — State**
- `docs/PROJECT_STATE.md`
- `*SESSION_CHECKPOINT.md` or `*SESSION_STATE.md`
- `docs/DRIFT_CHECKLIST.md`

**Tier 4 — Technical**
- `docs/adr/*.md` (Architecture Decision Records)
- `docs/ENTERPRISE_MIGRATION.md`
- `docs/TESTING_STANDARD.md`

**Recommend:** "No authority pack found. Run 'init project skills' to generate .project-ai/ for deterministic governance."

### Step 3 — Quick Health Check

Run fast checks (< 10 seconds total):
- `git status` — any uncommitted changes?
- Type check if available (`tsc --noEmit` / `go vet` / `mypy`)
- Check if tests exist and last passed

### Step 4 — Preflight Status

**If `.project-ai/PREFLIGHT.yaml` exists:**
- Report preflight status: enabled/disabled
- Report enforcement level from `.project-ai/NEW_SKILL_POLICY.yaml`
- Report decision logging status

**If no authority pack:** Skip this step.

### Step 5 — Report

```
## Session Started: [project name]

### Project
- **Stack**: [detected stack or from PROJECT_PROFILE.yaml]
- **Branch**: [branch name]
- **Git State**: [clean / X uncommitted changes]

### Authority Pack
- **Status**: [loaded / not found — recommend "init project skills"]
- **Governance Profile**: [from PROJECT_PROFILE or "none"]
- **Active Skills**: [count or "all (no authority pack)"]
- **Session Policy**: [policy name or "default"]
- **Preflight**: [enabled / disabled / not configured]

### Loaded Authoritative Files
- [list each file loaded, grouped by source]

### Current State
- [summary from SESSION_CHECKPOINT or PROJECT_STATE if available]

### Quick Health
- Types: [PASS/FAIL/SKIP]
- Git: [clean/dirty]
- Tests: [last result if known]

### Ready to Work
[Any warnings or notes before starting]
```

### Step 6 — Acknowledge

Confirm to the user:
> Session loaded. [X] authoritative files read. Working on [branch].
> Authority pack: [loaded with {profile} profile / not found].
> [Any warnings about uncommitted changes, failing types, etc.]
