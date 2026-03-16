---
name: ip-opportunity-agent
description: Scan codebase for intellectual property opportunities, advise on patentability, research prior art via USPTO/Google Patents, and provide IP strategy guidance. Use when the user says "IP scan", "patent search", "prior art", "IP opportunities", "check patentability", "intellectual property", "patent analysis", or "IP agent".
---

> **MASTER TEMPLATE** — Run "init project skills" to generate a tailored copy locked to your stack.

# IP Opportunity Agent

Scans code for patentable innovations, researches prior art, advises on IP strategy.

## Model Usage

| Phase | Model | When |
|-------|-------|------|
| Strategy (IP vs trade secret) | **GPT-5.2** | Ambiguous scope, multi-project IP portfolio decisions |
| Deep technical analysis | **Opus 4.6** | Algorithm dissection, prior-art similarity, claim drafting |
| Implementation (search scripts) | **Composer 1.5** | Writing crawlers, formatting reports |

**Switch to Opus** when analyzing novel algorithms or comparing to prior art. **Switch to Composer** when generating search queries or report templates.

---

## Execution

### Step 1 — Scope the Scan

Ask or infer:
- **Project/domain**: What does this codebase do? (fraud detection, vehicle security, training platform, etc.)
- **Scope**: Full codebase or specific modules? (e.g., `src/lib/graph/`, `src/pillars/`)
- **Exclusions**: Third-party libs, generated code, templates — exclude from novelty analysis

### Step 2 — Scan Codebase for IP-Significant Patterns

Search for and analyze:

**Novel Algorithms**
- Custom graph/network algorithms (not standard library)
- Unique scoring or weighting logic
- Proprietary matching/deduplication logic
- Custom ML inference pipelines (not just model training)
- Novel data structures or caching strategies

**Workflow Innovations**
- Unusual user flows or state machines
- Unique integration patterns (e.g., multi-system trust scoring)
- Novel automation sequences
- Non-obvious business logic combinations

**Technical Innovations**
- New API designs or protocol extensions
- Custom security/auth mechanisms
- Novel data transformation pipelines
- Unique observability or audit trails

**Extract**: File path, function/class name, 2–3 sentence description of what's novel.

### Step 3 — Prior Art Research

For each candidate, use web search and MCP `web_fetch`:

**Sources**
- USPTO: https://patents.google.com (search by keywords from the innovation)
- Google Patents: same
- arXiv, ACM, IEEE (academic prior art)
- GitHub (open-source prior art)
- Product docs (commercial equivalents)

**Query construction**
- Use technical terms from the code
- Include domain keywords (e.g., "vehicle fraud", "trust graph", "identity drift")
- Try narrow and broad queries
- Use "prior art" + domain in queries

**Output per candidate**
- Prior art found (title, source, URL, relevance)
- Overlap with innovation (high/medium/low)
- Suggested claim language (if patentable)
- Trade secret vs patent recommendation

### Step 4 — IP Strategy Report

```
## IP Opportunity Report: [project name]

### Executive Summary
[X] potential IP candidates identified. [Y] warrant further review. [Z] prior-art risks.

### Candidates (by priority)

#### 1. [Name] — [File:line]
- **Innovation**: [2-sentence description]
- **Novelty**: [why it may be novel]
- **Prior Art**: [summary of findings]
- **Recommendation**: Patent / Trade Secret / Publish
- **Risk**: Low / Medium / High

[... repeat for each candidate ...]

### Prior Art Summary
| Candidate | Sources Found | Overlap | Action |
|-----------|---------------|---------|--------|
| 1 | USPTO X, arXiv Y | Low | Proceed |
| 2 | GitHub Z | High | Refine or abandon |

### Next Steps
1. [Highest-priority action]
2. [Consider patent counsel for X]
3. [Document Y as trade secret]
```

### Step 5 — Caveats

- This is advisory only — not legal advice
- Recommend patent counsel for filing
- Do not search for or expose confidential patent applications
- Respect robots.txt and rate limits when crawling
