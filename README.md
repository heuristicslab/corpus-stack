# Corpus Stack

[![Test](https://github.com/heuristicslab/corpus-stack/actions/workflows/test.yml/badge.svg)](https://github.com/heuristicslab/corpus-stack/actions/workflows/test.yml)
[![Link check](https://github.com/heuristicslab/corpus-stack/actions/workflows/link-check.yml/badge.svg)](https://github.com/heuristicslab/corpus-stack/actions/workflows/link-check.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Data: CC-BY-4.0](https://img.shields.io/badge/Data-CC--BY--4.0-lightgrey.svg)](./DATA-LICENSE.md)

The curated archive of free technical education.

**Browse:** [corpus-stack.vercel.app](https://corpus-stack.vercel.app)

---

## What this is

Corpus Stack is an open archive of free technical resources. Every entry is
verified against three non-negotiable criteria before it earns a place:

1. **Strictly free** - no paywalls, no trials, no hidden costs
2. **Location-agnostic** - accessible globally without regional restrictions
3. **High utility** - actionable material, not filler

The goal is to eliminate curation fatigue. Instead of another list of links,
Corpus Stack provides a vetted path. A living archive maintained by its
community.

## How the archive works

### Curation

Resources are added by hand. Every suggestion, whether from a maintainer or
a community contributor, goes through the same process:

1. **Discovery** - a candidate resource is found or suggested
2. **Review** - checked against the three tenets
3. **Categorization** - assigned a section, stack, type, and difficulty
4. **Editorial** - described in plain language that helps a learner decide
5. **Verification** - the URL is tested, the resource is confirmed free and
   accessible, and metadata is reviewed
6. **Publication** - added to the archive

The process is manual on purpose. Automated scraping produces noise. Manual
curation produces signal.

### Verification

Verified resources carry a `last_verified` date. Verification checks:

- The URL resolves
- The resource is still free
- The content is still accessible globally
- The metadata still matches reality

A weekly automated workflow checks every URL in the archive for broken links.
Broken resources are flagged in a GitHub issue and reviewed manually.

### Maintenance

- **Daily:** Automated SQL backup to this repository
- **Weekly:** Link validation across all resources
- **Monthly:** Manual review of flagged resources, addition of new ones
- **Quarterly:** Taxonomy review of sections, stacks, and categories

## What you'll find here

The archive covers:

- Web Development, Computer Science, Software Development
- AI & Machine Learning, Data & Databases
- Cloud & DevOps, Cybersecurity, Systems & Infrastructure
- Design & Creative Technology

Organized across ten sections: **Learn, Build, AI, Research, Discover,
Communities**, plus specialized categories for **Low-Code/No-Code,
Web-scape, Mentors & Creators,** and **Productivity**.

## Contribute

Anyone can suggest a resource, report a broken link, or improve the site.

- Read the [contribution guide](./CONTRIBUTING.md) first
- If you're suggesting a resource, [search the archive](https://corpus-stack.vercel.app/browse) to make sure we don't already have it
- [Open an issue](https://github.com/heuristicslab/corpus-stack/issues/new/choose) with a resource suggestion or bug report

By participating, you agree to uphold the [Code of Conduct](./CODE_OF_CONDUCT.md).

## Follow

- **GitHub:** [heuristicslab/corpus-stack](https://github.com/heuristicslab/corpus-stack)
- **Changelog:** [corpus-stack.vercel.app/changelog](https://corpus-stack.vercel.app/changelog)

## Copyright and licensing

### The code

MIT. See [LICENSE](./LICENSE).

### The curated data

The resource descriptions, categorizations, and metadata that make up the
Corpus Stack archive are licensed under [CC-BY-4.0](./DATA-LICENSE.md).

### The linked resources

Corpus Stack does not host or own any of the resources it links to. Every
resource (MDN, freeCodeCamp, CS50, and all others) remains the property of
its respective creators and is subject to its own license, terms of use,
and copyright.

Linking to publicly available content is standard practice. A listing in
Corpus Stack is not an endorsement by the resource's creators, nor does it
imply any affiliation.

If you are the owner of a linked resource and would like it removed, or
would like its metadata corrected, please
[open an issue](https://github.com/heuristicslab/corpus-stack/issues/new).

---

*Built for the curious. For builders. For internet explorers.*