import { cn } from "@/lib/utils"

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a className="inline-flex items-center gap-2.5 font-semibold tracking-tight" href="#mulai" aria-label="Obersai AI Gateway">
      <img src="/logo.png" alt="Obersai AI" className={cn("rounded-lg object-contain", compact ? "size-7" : "size-8")} />
      <span className={compact ? "text-sm" : "text-lg"}>Obersa</span>
    </a>
  )
}
