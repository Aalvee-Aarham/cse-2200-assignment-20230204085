const ratingColors = ['', 'rose', 'orange', 'amber', 'teal', 'teal']
const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent']

export default function FeedbackCard({ feedback, index }) {
  const initials = `${feedback.firstName[0]}${feedback.lastName[0]}`.toUpperCase()
  const hueIndex = (feedback.firstName.charCodeAt(0) + feedback.lastName.charCodeAt(0)) % 6
  const palettes = [
    'from-rose-400 to-rose-600',
    'from-amber-400 to-orange-500',
    'from-teal-400 to-teal-600',
    'from-violet-400 to-purple-600',
    'from-pink-400 to-rose-500',
    'from-cyan-400 to-teal-500',
  ]

  return (
    <div
      className="glass-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 opacity-0 animate-fade-up"
      style={{ animationDelay: `${index * 0.08}s`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${palettes[hueIndex]} flex items-center justify-center text-white font-display font-semibold text-sm shadow-warm flex-shrink-0`}>
            {initials}
          </div>
          <div>
            <h3 className="font-display font-semibold text-plum text-[15px]">
              {feedback.firstName} {feedback.lastName}
            </h3>
            <p className="text-xs text-plum/50 font-mono mt-0.5">{feedback.email}</p>
          </div>
        </div>
        <RatingBadge rating={feedback.rating} />
      </div>

      <div className="border-t border-rose-50 pt-4 mb-4">
        <div className="flex items-center gap-2 mb-1">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FDA4AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span className="text-xs text-plum/50 font-mono">{feedback.phone}</span>
        </div>
        <div className="flex flex-wrap gap-3 mt-3">
          <Chip icon={
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          } label={feedback.eventDate} />
          <Chip icon={
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          } label={feedback.eventName} highlight />
        </div>
      </div>

      <blockquote className="text-sm text-plum/70 leading-relaxed font-body italic border-l-2 border-rose-200 pl-3">
        "{feedback.message}"
      </blockquote>
    </div>
  )
}

function RatingBadge({ rating }) {
  const colors = ['', 'bg-rose-100 text-rose-600', 'bg-orange-100 text-orange-600', 'bg-amber-100 text-amber-600', 'bg-teal-100 text-teal-600', 'bg-teal-200 text-teal-700']
  const labels = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent']
  return (
    <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${colors[rating]}`}>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
      {rating} · {labels[rating]}
    </div>
  )
}

function Chip({ icon, label, highlight }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg font-medium
      ${highlight ? 'bg-rose-50 text-rose-600' : 'bg-sand text-plum/60'}`}>
      {icon}
      {label}
    </span>
  )
}
