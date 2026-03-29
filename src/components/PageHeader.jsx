export default function PageHeader({ title, subtitle, badge }) {
  return (
    <div className="text-center mb-10">
      {badge && (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-rose-500 bg-rose-50 border border-rose-100 px-3 py-1.5 rounded-full mb-4 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse-soft" />
          {badge}
        </span>
      )}
      <h1
        className="font-display text-4xl md:text-5xl font-bold text-gradient leading-tight mb-3 opacity-0 animate-fade-up"
        style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
      >
        {title}
      </h1>
      <p
        className="text-plum/55 font-body text-base max-w-md mx-auto opacity-0 animate-fade-up"
        style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
      >
        {subtitle}
      </p>
    </div>
  )
}
