import { ArrowRight } from 'lucide-react'

export function DifficultyLabel({ value }: { value: string | null }) {
  if (!value) return null
  if (value.includes('→')) {
    const [from, to] = value.split('→').map((s) => s.trim())
    return (
      <span className="inline-flex items-center gap-1">
        {from}
        <ArrowRight className="w-3 h-3" />
        {to}
      </span>
    )
  }
  return <span>{value}</span>
}

export function Meta({ items }: { items: (string | null | undefined)[] }) {
  const clean = items.filter(Boolean) as string[]
  return (
    <span className="inline-flex items-center gap-1.5 flex-wrap">
      {clean.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-1.5">
          {item.includes('→') ? <DifficultyLabel value={item} /> : item}
          {i < clean.length - 1 && <span className="text-muted">·</span>}
        </span>
      ))}
    </span>
  )
}