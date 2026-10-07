// app/opengraph-image.tsx — Site-wide OG image

import { ImageResponse } from 'next/og'

export const alt = 'Corpus Stack'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAFAF9',
        fontFamily: 'system-ui, sans-serif',
        position: 'relative',
      }}
    >
      {/* Subtle grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(24,24,27,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(24,24,27,0.06) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Orb */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '40px',
          position: 'relative',
        }}
      >
        <svg width="120" height="120" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="#18181B" />
          <g fill="#FAFAF9">
            <circle cx="50" cy="50" r="3" />
            <circle cx="58" cy="46" r="3" />
            <circle cx="42" cy="54" r="3" />
            <circle cx="54" cy="58" r="2.5" />
            <circle cx="46" cy="42" r="2.5" />
            <circle cx="62" cy="54" r="2.2" />
            <circle cx="38" cy="46" r="2.2" />
            <circle cx="66" cy="42" r="2" />
            <circle cx="34" cy="58" r="2" />
            <circle cx="50" cy="64" r="2" />
            <circle cx="50" cy="36" r="2" />
            <circle cx="70" cy="50" r="1.8" />
            <circle cx="30" cy="50" r="1.8" />
            <circle cx="76" cy="54" r="1.5" />
            <circle cx="24" cy="46" r="1.5" />
          </g>
          <circle cx="60" cy="60" r="3.5" fill="#6366F1" />
        </svg>
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: '72px',
          fontWeight: 500,
          color: '#18181B',
          letterSpacing: '-0.02em',
          marginBottom: '20px',
          position: 'relative',
        }}
      >
        Corpus Stack
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: '32px',
          color: '#71717A',
          maxWidth: '800px',
          textAlign: 'center',
          lineHeight: 1.4,
          position: 'relative',
        }}
      >
        Curated. Verified. Free.
      </div>

      {/* URL */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          fontSize: '20px',
          color: '#71717A',
          fontFamily: 'monospace',
        }}
      >
        corpus-stack.vercel.app
      </div>
    </div>,
    {
      ...size,
    },
  )
}
