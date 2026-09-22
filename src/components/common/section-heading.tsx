interface SectionHeadingProps {
  number: string
  eyebrow: string
  title: string
  description: string
}

export function SectionHeading({ number, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-9 grid items-start gap-3 sm:grid-cols-[46px_minmax(0,1fr)] sm:gap-5">
      <span className="grid size-10 place-items-center rounded-xl border bg-card font-mono text-[11px] text-muted-foreground shadow-xs">
        {number}
      </span>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="max-w-3xl text-3xl font-bold leading-[1.06] tracking-[-0.045em] sm:text-4xl lg:text-[46px]">{title}</h2>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
