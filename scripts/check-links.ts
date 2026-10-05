// scripts/check-links.ts — Weekly link validation

import { supabase } from '../lib/supabase'

type Resource = {
  id: number
  name: string
  resource_url: string
}

type CheckResult = {
  ok: boolean
  status: number
  reason: 'ok' | 'broken' | 'blocked' | 'rate-limited' | 'timeout' | 'error'
}

async function checkLink(url: string): Promise<CheckResult> {
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: AbortSignal.timeout(15_000),
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; CorpusStackLinkCheck/1.0; +https://github.com/heuristicslab/corpus-stack)',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    })

    const status = res.status

    // 2xx = ok
    if (status >= 200 && status < 300) {
      return { ok: true, status, reason: 'ok' }
    }

    // 403, 405, 429 = blocked or rate-limited, not broken
    if (status === 403 || status === 405 || status === 429) {
      return { ok: true, status, reason: 'blocked' }
    }

    // 404, 410 = genuinely gone
    if (status === 404 || status === 410) {
      return { ok: false, status, reason: 'broken' }
    }

    // 5xx = server error, flag for review
    if (status >= 500) {
      return { ok: false, status, reason: 'error' }
    }

    // 3xx that didn't resolve (shouldn't happen with redirect: follow)
    return { ok: true, status, reason: 'ok' }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    if (msg.includes('timeout') || msg.includes('aborted')) {
      return { ok: false, status: 0, reason: 'timeout' }
    }
    return { ok: false, status: 0, reason: 'error' }
  }
}

async function main() {
  const { data, error } = await supabase
    .from('resources')
    .select('id, name, resource_url')

  if (error) {
    console.error('Failed to fetch resources:', error)
    process.exit(1)
  }

  const resources = (data as Resource[]) ?? []
  console.log(`Checking ${resources.length} resources...\n`)

  const broken: Resource[] = []
  const blocked: Resource[] = []
  let checked = 0

  for (const r of resources) {
    const result = await checkLink(r.resource_url)
    checked++

    if (!result.ok) {
      broken.push(r)
      console.log(`✗ [${result.status}] ${r.name} — ${r.resource_url}`)
    } else if (result.reason === 'blocked') {
      blocked.push(r)
    }

    if (checked % 20 === 0) {
      console.log(`  ... ${checked}/${resources.length} checked`)
    }

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  console.log(`\nChecked ${checked} resources.`)
  console.log(`Broken: ${broken.length}`)
  console.log(`Blocked/rate-limited (not broken): ${blocked.length}`)

  if (broken.length > 0) {
    console.log('\nBroken resources:')
    for (const f of broken) {
      console.log(`- #${f.id} ${f.name} (${f.resource_url})`)
    }
    process.exit(1)
  }

  console.log('\nAll resources are accessible.')
}

main()
