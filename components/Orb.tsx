// components/Orb.tsx — Corpus Stack brand mark

type OrbProps = {
  size?: number
  className?: string
}

export function Orb({ size = 28, className = '' }: OrbProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Filled sphere */}
      <circle cx="50" cy="50" r="48" fill="#18181B" />

      {/* Dot pattern — sizes vary to simulate depth/sphere */}
      {/* Larger dots center, smaller edges */}
      <g fill="#FAFAF9">
        {/* Center cluster — largest dots */}
        <circle cx="50" cy="50" r="2.6" />
        <circle cx="58" cy="46" r="2.4" />
        <circle cx="42" cy="54" r="2.4" />
        <circle cx="54" cy="58" r="2.2" />
        <circle cx="46" cy="42" r="2.2" />
        <circle cx="62" cy="54" r="2.0" />
        <circle cx="38" cy="46" r="2.0" />

        {/* Mid ring — medium dots */}
        <circle cx="66" cy="42" r="1.8" />
        <circle cx="34" cy="58" r="1.8" />
        <circle cx="50" cy="64" r="1.8" />
        <circle cx="50" cy="36" r="1.8" />
        <circle cx="70" cy="50" r="1.6" />
        <circle cx="30" cy="50" r="1.6" />
        <circle cx="56" cy="68" r="1.6" />
        <circle cx="44" cy="32" r="1.6" />
        <circle cx="68" cy="62" r="1.5" />
        <circle cx="32" cy="38" r="1.5" />
        <circle cx="72" cy="44" r="1.4" />
        <circle cx="28" cy="56" r="1.4" />
        <circle cx="60" cy="30" r="1.4" />
        <circle cx="40" cy="70" r="1.4" />

        {/* Outer ring — small dots */}
        <circle cx="76" cy="54" r="1.2" />
        <circle cx="24" cy="46" r="1.2" />
        <circle cx="64" cy="72" r="1.2" />
        <circle cx="36" cy="28" r="1.2" />
        <circle cx="80" cy="48" r="1.0" />
        <circle cx="20" cy="52" r="1.0" />
        <circle cx="72" cy="70" r="1.0" />
        <circle cx="28" cy="30" r="1.0" />
        <circle cx="46" cy="78" r="1.0" />
        <circle cx="54" cy="22" r="1.0" />
        <circle cx="78" cy="40" r="0.9" />
        <circle cx="22" cy="60" r="0.9" />
        <circle cx="60" cy="80" r="0.9" />
        <circle cx="40" cy="20" r="0.9" />
        <circle cx="82" cy="56" r="0.8" />
        <circle cx="18" cy="44" r="0.8" />
        <circle cx="68" cy="78" r="0.8" />
        <circle cx="32" cy="22" r="0.8" />
        <circle cx="84" cy="46" r="0.7" />
        <circle cx="16" cy="54" r="0.7" />

        {/* Edge dots — smallest, suggest sphere curve */}
        <circle cx="88" cy="50" r="0.6" />
        <circle cx="12" cy="50" r="0.6" />
        <circle cx="50" cy="88" r="0.6" />
        <circle cx="50" cy="12" r="0.6" />
        <circle cx="86" cy="60" r="0.6" />
        <circle cx="14" cy="40" r="0.6" />
        <circle cx="72" cy="84" r="0.6" />
        <circle cx="28" cy="16" r="0.6" />
      </g>

      {/* Signature indigo dot */}
      <circle cx="60" cy="60" r="3.2" fill="#6366F1" />
    </svg>
  )
}