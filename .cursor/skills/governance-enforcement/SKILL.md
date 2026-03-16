---
name: governance-enforcement
description: MANDATORY - Enforces Pre-Code Gate, Model Roles, Preflight Resolution, and Mid-Session Handoff. Reads the project's authority pack (.project-ai/) for deterministic enforcement. Falls back to governance file if no authority pack exists. Use at session start, before any code work, when the user sends any task prompt, or when Strategy/Architecture work is detected.
---

> **MASTER TEMPLATE** — This is the generic version. Run "init project skills" in your project to generate a tailored copy locked to your specific stack. Project-local skills in `.cursor/skills/` override this master.

# Governance Enforcement (MANDATORY)

This skill ensures the project's AI governance is applied on every session. **No code or design work may proceed until compliance.**

## When to Apply

- **Session start** — First message in a session
- **Any task prompt** — User asks to complete work, fix something, add a feature
- **Before code changes** — Before writing, editing, or designing code
- **Before skill creation** — Before creating any new skill
- **Strategy/Architecture suspected** — Schema design, ADRs, layer boundaries, cross-domain decisions

## Step 1: Load Authority Pack (Preferred) or Governance File

**Check if `.project-ai/` exists at the project root.**

### If `.project-ai/` exists (v2 flow):

Read these files in order:

1. `.project-ai/PREFLIGHT.yaml` — Is preflight enabled? What checks are required?
2. `.project-ai/ACTIVE_SKILLS.yaml` — What skills are available in this project?
3. `.project-ai/SESSION_POLICY.yaml` — What session behavior is required?
4. `.project-ai/MODEL_ROUTING.yaml` — What model handles each task type?
5. `.project-ai/AUTHORITATIVE_DOCS.yaml` — What docs must be loaded, in what order?
6. `.project-ai/NEW_SKILL_POLICY.yaml` — Can new skills be created? Under what conditions?

Then load the authoritative documents listed in `AUTHORITATIVE_DOCS.yaml` under `session_start` (in order).

### If `.project-ai/` does NOT exist (v1 fallback):

Read the project's governance file. Look for (in order):
- `docs/AI_GOVERNANCE.md`
- `docs/AI_RULES_GLOBAL.md`

Use the Read tool. Extract from it:
- The **Pre-Code Gate** or **Required reading** list
- The **Model Roles** (Strategy / Architecture / Implementation)
- The **Mid-Session Model Handoff** procedure

**If no governance file and no authority pack exists:** Alert the user. Recommend "init project skills" to generate the authority pack, or "bootstrap AI governance" to create governance docs. Do NOT proceed with code.

## Step 2: Pre-Code Gate (Required Reading)

### With authority pack:
Read all documents listed under `before_code_changes` in `.project-ai/AUTHORITATIVE_DOCS.yaml`.

### Without authority pack:
From the governance file, get the full required reading list (Tier 0–4 or equivalent). Read those files in order using the Read tool.

**If any required file is missing or unreadable:** Alert the user. Do NOT proceed with code.

## Step 3: Preflight Resolution

**If `.project-ai/PREFLIGHT.yaml` exists and `enabled: true`:**

Before executing the task, resolve:

1. **Skill availability** — Is there a canonical skill for this task?
   - Check `.project-ai/ACTIVE_SKILLS.yaml` first
   - Check `.project-ai/REGISTRY_SNAPSHOT.yaml` if no match
   - Check `.project-ai/SKILL_ALIASES.yaml` for alias matches
   - If a matching skill exists → **use it** instead of ad-hoc execution
   - If a matching skill is inactive → inform the user, offer to activate

2. **Task classification** — Classify the request (see Step 4)

3. **Model routing** — Check `.project-ai/MODEL_ROUTING.yaml` for the appropriate model

4. **New skill gate** — If the task implies creating a new skill:
   - Read `.project-ai/NEW_SKILL_POLICY.yaml`
   - Search `REGISTRY_SNAPSHOT.yaml` for matching skill_id, aliases, or category
   - If a match exists → **do not create a duplicate**. Use the existing skill.
   - If no match and creation is allowed → require rationale, log to DECISION_LOG.md
   - If no match and creation is blocked → inform the user

**If preflight not available:** Skip to Step 4.

## Step 4: Task Type Classification

Classify the user's task:

| Type | Examples | Action |
|------|----------|--------|
| **Strategy** | "Should we use X or Y?", platform direction, cross-domain decisions | → Handoff (Step 5) |
| **Architecture** | Schema design, ADRs, layer boundaries, structural refactors | → Handoff (Step 5) |
| **Implementation** | Edits, refactors, tests, following existing patterns | → Proceed with work |

**With authority pack:** Use the model mappings from `.project-ai/MODEL_ROUTING.yaml` for classification rules.

**Without authority pack:** Use the governance file's model roles.

## Step 5: Model Handoff (Strategy or Architecture)

If task is Strategy or Architecture:

1. **Stop.** Do not attempt the task.
2. **Clarify.** "This requires [Strategy/Architecture] work. It is outside Implementation scope."
3. **Propose.** Write the exact prompt for the Strategy/Architecture model.
4. **Write handoff.** Add to session checkpoint and `.project-ai/DECISION_LOG.md` (if it exists):

```markdown
### Model handoff [YYYY-MM-DD HH:MM]
- **Why:** [e.g. "Schema design for multi-tenant billing — architecture task"]
- **Ask Strategy/Architecture model:** [exact prompt]
- **Bring back:** [e.g. "ADR in docs/adr/"]
```

5. **Tell user explicitly:**

> **Switch to [model name from MODEL_ROUTING.yaml] (or the Strategy/Architecture model from your governance).** Paste this prompt:
> [exact prompt]

6. Do NOT proceed with the task.

## Step 6: Implementation Proceed

If task is Implementation: proceed with work, following LAYER_CONTRACT and ADRs if they exist.

**Log to DECISION_LOG.md** (if `.project-ai/` exists and `log_decisions: true` in PREFLIGHT.yaml):

```markdown
## [date time] Task Executed
- **Task:** [brief description]
- **Type:** implementation
- **Skills used:** [list any canonical skills invoked]
- **Preflight:** resolved — [summary]
```

## Step 7: Execution Logging

After every skill execution (including this one), append an entry to `.project-ai/EXECUTION_LOG.yaml` if it exists:

```yaml
- timestamp: "YYYY-MM-DDTHH:MM:SSZ"
  session_id: "<current session identifier>"
  skill_id: "<canonical skill ID>"
  trigger: "<user command | automated | delegated>"
  classification: "<strategy | architecture | implementation | audit>"
  duration_seconds: <estimated>
  result: "<success | partial | failure | skipped>"
  output_summary: "<1-2 sentence summary>"
  files_affected: ["<list of files touched>"]
  delegated_to: ["<sub-skills invoked>"]
  user_overrides: <count of user corrections during execution>
  notes: "<optional context>"
```

**When to log:** After every skill completes, before returning results to the user.
**Skip logging if:** `.project-ai/EXECUTION_LOG.yaml` does not exist, or governance profile is `lightweight` with execution logging set to `optional` and the user hasn't opted in.

## Step 8: Feedback Capture

When the user corrects, overrides, or enhances a skill's output during a session, append to `.project-ai/FEEDBACK_LOG.yaml` if it exists:

```yaml
- timestamp: "YYYY-MM-DDTHH:MM:SSZ"
  session_id: "<current session identifier>"
  skill_id: "<skill that produced the output>"
  check_id: "<specific check, if applicable>"
  feedback_type: "<correction | override | false_positive | enhancement | praise>"
  severity: "<minor | moderate | significant>"
  original_output: "<what the skill said>"
  user_correction: "<what the user said instead>"
  context: "<why the correction was needed>"
  pattern_tag: "<reusable tag if pattern is recurring>"
  applied_to_session: true
```

**Feedback triggers:**
- User says "that's wrong" or corrects agent output → `correction`
- User says "ignore that" or dismisses a finding → `override`
- User says "that's not a real issue" → `false_positive`
- User says "also check for X" or suggests improvement → `enhancement`
- User says "good catch" or praises a finding → `praise`

## Step 9: Session-End Metrics Update

At session end (triggered by session-end skill), recompute `.project-ai/SKILL_METRICS.yaml` from the execution and feedback logs:

1. Read all entries from `EXECUTION_LOG.yaml`
2. Read all entries from `FEEDBACK_LOG.yaml`
3. For each skill that was executed this session, update its metrics entry:
   - Increment run counters
   - Recompute success_rate, override_rate
   - Update feedback_by_type counts
   - Recompute trend (compare last 5 sessions to previous 5)
   - Update last_run timestamp

## Compliance Checklist

Before any code change, confirm:

- [ ] Authority pack loaded (`.project-ai/`) OR governance file read
- [ ] Authoritative docs loaded (from AUTHORITATIVE_DOCS.yaml or Pre-Code Gate)
- [ ] Task classified (Strategy / Architecture / Implementation)
- [ ] If Strategy or Architecture: handoff triggered
- [ ] If Implementation: LAYER_CONTRACT and relevant ADRs consulted (if they exist)
- [ ] If creating a new skill: registry checked, policy verified, rationale logged
- [ ] Preflight resolved (if enabled)

After every skill execution, confirm:

- [ ] Execution logged to `EXECUTION_LOG.yaml` (if it exists)
- [ ] User corrections captured to `FEEDBACK_LOG.yaml` (if any)
- [ ] Metrics updated at session end (via session-end skill)

## Anti-Pattern: Skipping Governance

**Never** respond to a task prompt by diving into code without:
1. Loading the authority pack or reading the governance file
2. Checking task type
3. Running preflight (if enabled)
4. Triggering handoff if Strategy/Architecture

Failure to follow this skill violates authoritative governance. Alert the user if files are missing.

## Anti-Pattern: Duplicate Skill Creation

**Never** create a new skill without:
1. Checking `.project-ai/ACTIVE_SKILLS.yaml` for existing match
2. Checking `.project-ai/REGISTRY_SNAPSHOT.yaml` for canonical match
3. Checking `.project-ai/SKILL_ALIASES.yaml` for alias match
4. Verifying creation is allowed by `NEW_SKILL_POLICY.yaml`
5. Writing a rationale and logging the decision
