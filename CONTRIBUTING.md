# Contributing to Corpus Stack

Thank you for wanting to help. Corpus Stack is community-driven, and every
contribution makes the archive better.

You don't need to write code to contribute.

---

## Suggest a resource

The most valuable contribution is a good resource we don't have yet.

### Before suggesting

Check that the resource satisfies **all three tenets**:

1. **Strictly free** - no paywalls, no trials, no hidden costs
2. **Location-agnostic** - accessible globally, no regional restrictions
3. **High utility** - actionable educational material, not filler

If it fails any of these, it doesn't belong.

Also check that we don't already have it. Use the
[search](https://corpus-stack.vercel.app/browse). If the resource is
already there, no need to suggest it.

### How to suggest

[Open an issue](https://github.com/heuristicslab/corpus-stack/issues/new?template=resource_suggestion.md)
using the **Resource suggestion** template.

Include:

- Resource name
- URL
- A short description
- Which three tenets it satisfies
- Suggested section, stack, and type

A maintainer will review it against the criteria. If approved, it enters the
archive.

---

## Report a broken link

Broken links are the archive's biggest enemy. If you find one:

[Open an issue](https://github.com/heuristicslab/corpus-stack/issues/new?template=bug_report.md)
using the **Bug report** template.

We also run a weekly automated link check across every resource, but human
reports catch things automation misses.

---

## Report incorrect metadata

Sometimes a resource is categorized wrong, or its description is outdated.

Same process: open a **Bug report** with the specific correction.

---

## Contribute code

For bugs, accessibility issues, or site features.

### Setup

```bash
git clone https://github.com/heuristicslab/corpus-stack.git
cd corpus-stack
pnpm install
cp .env.example .env.local
pnpm dev
```

Fill in .env.local with your Supabase URL and anon key (Project Settings
→ API in Supabase).

### Before opening a PR

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm format:check
pnpm test
pnpm test:e2e
```

All must pass. CI runs the same checks on your PR.
Commit conventions

### We use Conventional Commits:

    feat: - new feature

    fix: - bug fix

    chore: - tooling, dependencies

    docs: - documentation

    test: - tests

    refactor: - code restructuring

### The three tenets in detail

Every resource must satisfy all three. This is non-negotiable.

Strictly free

- No paywalls
- No "first month free" trials
- No hidden costs
- No required account for access

Location-agnostic

- Accessible from any country
- No regional restrictions
- No institution-only content (no .edu email requirements)
- Works without a VPN

High utility

- Actionable educational content
- Documentation, courses, tutorials, books, interactive tools
- Not link aggregators or directories
- Not AI-generated filler

**Resources that don't meet all three aren't included, no matter how
well-known they are.**
