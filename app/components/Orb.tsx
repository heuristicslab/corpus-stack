type OrbProps = {
  size?: number
  className?: string
}

export function Orb({ size = 28, className = '' }: OrbProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1" />
      <path d="M3 10.5 H25" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <path d="M2.5 14 H25.5" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
      <path d="M3 17.5 H25" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <path
        d="M3 10.5 C 10 8, 18 8, 25 10.5"
        stroke="#6366F1"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  )
}