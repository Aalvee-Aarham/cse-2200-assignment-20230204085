import { useState } from 'react'
import Navbar from '../components/Navbar'
import InputField from '../components/InputField'
import RatingInput from '../components/RatingInput'
import SuccessModal from '../components/SuccessModal'
import PageHeader from '../components/PageHeader'

const emptyForm = {
  firstName: '', lastName: '', phone: '', email: '',
  eventName: '', eventDate: '', rating: 0, message: ''
}

export default function SubmissionPage() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)

  const set = (field) => (e) =>
    setForm(f => ({ ...f, [field]: e.target ? e.target.value : e }))

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'First name is required'
    if (!form.lastName.trim()) e.lastName = 'Last name is required'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    else if (!/^\d+$/.test(form.phone)) e.phone = 'Phone must contain digits only'
    if (!form.email.trim()) e.email = 'Email address is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address'
    else {
      const existing = JSON.parse(localStorage.getItem('cfp_feedbacks') || '[]')
      if (existing.some(f => f.email.toLowerCase() === form.email.toLowerCase()))
        e.email = 'This email has already submitted feedback'
    }
    if (!form.eventName.trim()) e.eventName = 'Event name is required'
    if (!form.eventDate) e.eventDate = 'Event date is required'
    if (!form.rating || form.rating < 1 || form.rating > 5) e.rating = 'Please select a rating (1–5)'
    if (!form.message.trim()) e.message = 'Feedback message is required'
    return e
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    const existing = JSON.parse(localStorage.getItem('cfp_feedbacks') || '[]')
    existing.push({ ...form, id: Date.now(), submittedAt: new Date().toISOString() })
    localStorage.setItem('cfp_feedbacks', JSON.stringify(existing))
    setForm(emptyForm)
    setErrors({})
    setShowSuccess(true)
  }

  return (
    <div className="min-h-screen bg-cream bg-mesh">
      <Navbar />
      <div className="pt-28 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <PageHeader
            badge="Share Your Experience"
            title="Community Feedback"
            subtitle="Help us improve by sharing your thoughts on recent community events."
          />

          <div
            className="glass-card rounded-3xl shadow-card p-8 md:p-10 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
          >
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="opacity-0 animate-slide-in delay-100" style={{ animationFillMode: 'forwards' }}>
                  <InputField
                    label="First Name"
                    type="text"
                    placeholder="Jane"
                    value={form.firstName}
                    onChange={set('firstName')}
                    error={errors.firstName}
                    icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
                  />
                </div>
                <div className="opacity-0 animate-slide-in delay-200" style={{ animationFillMode: 'forwards' }}>
                  <InputField
                    label="Last Name"
                    type="text"
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={set('lastName')}
                    error={errors.lastName}
                    icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
                  />
                </div>
                <div className="opacity-0 animate-slide-in delay-300" style={{ animationFillMode: 'forwards' }}>
                  <InputField
                    label="Phone Number"
                    type="tel"
                    placeholder="01711234567"
                    value={form.phone}
                    onChange={set('phone')}
                    error={errors.phone}
                    icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>}
                  />
                </div>
                <div className="opacity-0 animate-slide-in delay-400" style={{ animationFillMode: 'forwards' }}>
                  <InputField
                    label="Email Address"
                    type="email"
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={set('email')}
                    error={errors.email}
                    icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
                  />
                </div>
                <div className="opacity-0 animate-slide-in delay-500" style={{ animationFillMode: 'forwards' }}>
                  <InputField
                    label="Event Name"
                    type="text"
                    placeholder="Community Spring Fair"
                    value={form.eventName}
                    onChange={set('eventName')}
                    error={errors.eventName}
                    icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>}
                  />
                </div>
                <div className="opacity-0 animate-slide-in delay-600" style={{ animationFillMode: 'forwards' }}>
                  <InputField
                    label="Event Date"
                    type="date"
                    value={form.eventDate}
                    onChange={set('eventDate')}
                    error={errors.eventDate}
                    icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>}
                  />
                </div>
              </div>

              <div className="mt-5 opacity-0 animate-slide-in delay-700" style={{ animationFillMode: 'forwards' }}>
                <RatingInput value={form.rating} onChange={set('rating')} error={errors.rating} />
              </div>

              <div className="mt-5 opacity-0 animate-slide-in" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
                <label className="label-text">Feedback Message</label>
                <textarea
                  rows={4}
                  placeholder="Share your experience with this event…"
                  value={form.message}
                  onChange={set('message')}
                  className={`input-field resize-none ${errors.message ? 'input-error' : ''}`}
                />
                {errors.message && (
                  <p className="text-rose-500 text-xs font-medium mt-0.5 flex items-center gap-1 animate-fade-in">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-plum text-white font-semibold text-base
                    shadow-warm hover:shadow-warm-lg hover:from-rose-600 hover:to-plum
                    active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover:translate-x-1">
                    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                  Save Feedback
                </button>
              </div>
            </form>
          </div>

          <div className="mt-6 text-center opacity-0 animate-fade-in" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
            <p className="text-xs text-plum/40 font-mono">
              Data stored locally · No backend · Privacy preserved
            </p>
          </div>
        </div>
      </div>

      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
    </div>
  )
}
