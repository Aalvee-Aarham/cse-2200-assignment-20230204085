import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import FeedbackCard from '../components/FeedbackCard'
import PageHeader from '../components/PageHeader'

export default function DisplayPage() {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [filterRating, setFilterRating] = useState(0)

  const raw = JSON.parse(localStorage.getItem('cfp_feedbacks') || '[]')

  const feedbacks = useMemo(() => {
    let list = [...raw]
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(f =>
        f.firstName.toLowerCase().includes(q) ||
        f.lastName.toLowerCase().includes(q) ||
        f.eventName.toLowerCase().includes(q) ||
        f.email.toLowerCase().includes(q)
      )
    }
    if (filterRating > 0) list = list.filter(f => f.rating === filterRating)
    if (sortBy === 'newest') list.sort((a, b) => b.id - a.id)
    else if (sortBy === 'oldest') list.sort((a, b) => a.id - b.id)
    else if (sortBy === 'highest') list.sort((a, b) => b.rating - a.rating)
    else if (sortBy === 'lowest') list.sort((a, b) => a.rating - b.rating)
    return list
  }, [raw.length, search, sortBy, filterRating])

  const avgRating = raw.length > 0
    ? (raw.reduce((s, f) => s + f.rating, 0) / raw.length).toFixed(1)
    : '—'

  return (
    <div className="min-h-screen bg-cream bg-mesh">
      <Navbar />
      <div className="pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <PageHeader
            badge="Community Voices"
            title="All Feedback"
            subtitle="Explore what community members are saying about our events."
          />

          <div
            className="grid grid-cols-3 gap-4 mb-8 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}
          >
            <StatCard value={raw.length} label="Submissions" icon="📝" color="from-rose-400 to-rose-600" />
            <StatCard value={avgRating} label="Avg Rating" icon="⭐" color="from-amber-400 to-orange-500" />
            <StatCard
              value={raw.length > 0 ? [...new Set(raw.map(f => f.eventName))].length : '—'}
              label="Events" icon="🎪" color="from-teal-400 to-teal-600"
            />
          </div>

          {raw.length > 0 && (
            <div
              className="glass-card rounded-2xl p-4 mb-6 flex flex-wrap gap-3 items-center opacity-0 animate-fade-up"
              style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}
            >
              <div className="relative flex-1 min-w-[180px]">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search by name, event, email…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="input-field pl-9 text-sm"
                />
              </div>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="input-field w-auto text-sm py-2.5 cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3, 4, 5].map(r => (
                  <button
                    key={r}
                    onClick={() => setFilterRating(r === filterRating ? 0 : r)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150
                      ${filterRating === r && r > 0
                        ? 'bg-amber-400 text-white shadow-sm'
                        : r === 0
                          ? filterRating === 0
                            ? 'bg-rose-100 text-rose-600'
                            : 'bg-sand text-plum/50 hover:bg-sand/80'
                          : 'bg-sand text-plum/50 hover:bg-amber-50 hover:text-amber-600'
                      }`}
                  >
                    {r === 0 ? 'All' : `★ ${r}`}
                  </button>
                ))}
              </div>
            </div>
          )}

          {feedbacks.length === 0 ? (
            <EmptyState hasData={raw.length > 0} />
          ) : (
            <>
              <p className="text-xs text-plum/40 font-mono mb-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                Showing {feedbacks.length} of {raw.length} submission{raw.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {feedbacks.map((f, i) => <FeedbackCard key={f.id} feedback={f} index={i} />)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ value, label, icon, color }) {
  return (
    <div className="glass-card rounded-2xl p-5 text-center shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5">
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-2 text-lg`}>
        {icon}
      </div>
      <div className="font-display text-2xl font-bold text-plum">{value}</div>
      <div className="text-xs text-plum/50 font-medium tracking-wide mt-0.5">{label}</div>
    </div>
  )
}

function EmptyState({ hasData }) {
  return (
    <div className="glass-card rounded-3xl p-16 text-center animate-scale-in">
      <div className="text-5xl mb-4 animate-float inline-block">
        {hasData ? '🔍' : '💬'}
      </div>
      <h3 className="font-display text-2xl font-semibold text-plum mb-2">
        {hasData ? 'No Matches Found' : 'No Feedback Yet'}
      </h3>
      <p className="text-plum/50 text-sm font-body mb-6">
        {hasData
          ? 'Try adjusting your search or filters.'
          : 'Be the first to share your experience with a community event.'}
      </p>
      {!hasData && (
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-plum text-white font-semibold text-sm shadow-warm hover:shadow-warm-lg transition-all duration-200 hover:-translate-y-0.5"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
          Submit Feedback
        </Link>
      )}
    </div>
  )
}
