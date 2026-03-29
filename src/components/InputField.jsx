export default function InputField({ label, error, icon, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="label-text">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-rose-300 pointer-events-none">
            {icon}
          </span>
        )}
        <input
          {...props}
          className={`input-field ${icon ? 'pl-10' : ''} ${error ? 'input-error' : ''}`}
        />
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
