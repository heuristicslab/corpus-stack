// scripts/check-links.ts — Weekly link validation

import { supabase } from '../lib/supabase'

type Resource = {
  id: number
  name: string
  resource_url: string
}

async function checkLink(url: string): Promise<{ ok: boolean; status: number }> {
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: AbortSignal.timeout(10_000),
    })
    return { ok: res.ok, status: res.status }
  } catch {
    return { ok: false, status: 0 }
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

  const failures: Resource[] = []
  let checked = 0

  for (const r of resources) {
    const result = await checkLink(r.resource_url)
    checked++
    if (!result.ok) {
      failures.push(r)
      console.log(`✗ [${result.status}] ${r.name} — ${r.resource_url}`)
    }
    if (checked % 20 === 0) {
      console.log(`  ... ${checked}/${resources.length} checked`)
    }
  }

  console.log(`\nChecked ${checked} resources.`)
  console.log(`Failed: ${failures.length}`)

  if (failures.length > 0) {
    console.log('\nBroken resources:')
    for (const f of failures) {
      console.log(`- #${f.id} ${f.name} (${f.resource_url})`)
    }
    process.exit(1)
  }
}

main()