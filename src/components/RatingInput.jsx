import { useState } from 'react'

export default function RatingInput({ value, onChange, error }) {
  const [hovered, setHovered] = useState(0)
  const labels = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent']

  return (
    <div className="flex flex-col gap-1">
      <label className="label-text">Rating</label>
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              className="transition-all duration-150 hover:scale-110 active:scale-95 focus:outline-none"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill={star <= (hovered || value) ? '#FBBF24' : 'none'}
                stroke={star <= (hovered || value) ? '#FBBF24' : '#FDA4AF'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-150"
                style={{
                  filter: star <= (hovered || value) ? 'drop-shadow(0 0 4px rgba(251,191,36,0.5))' : 'none'
                }}
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </button>
          ))}
        </div>
        {(hovered || value) > 0 && (
          <span className="text-sm font-medium text-amber-500 font-mono transition-all duration-150 animate-fade-in">
            {labels[hovered || value]}
          </span>
        )}
      </div>
      {error && (
        <p className="text-rose-500 text-xs font-medium mt-0.5 flex items-center gap-1 animate-fade-in">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}
