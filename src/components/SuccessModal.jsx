import { useEffect } from 'react'

export default function SuccessModal({ onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-plum/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass-card rounded-3xl p-10 max-w-sm w-full text-center shadow-warm-lg animate-scale-in">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center mx-auto mb-5 shadow-lg animate-float">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-semibold text-plum mb-2">Thank You!</h3>
        <p className="text-plum/60 text-sm font-body">Your feedback has been saved successfully.</p>
        <div className="mt-6 h-1 bg-rose-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-teal-400 to-rose-400 rounded-full animate-[shimmer_3s_ease_forwards]"
            style={{ width: '100%', animation: 'progressBar 3s linear forwards' }}
          />
        </div>
        <style>{`@keyframes progressBar { from { width: 100%; } to { width: 0%; } }`}</style>
      </div>
    </div>
  )
}
