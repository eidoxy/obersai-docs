import { cn } from "@/lib/utils"

export function SettingGrid({ items, className }: { items: Array<[string, string]>; className?: string }) {
  return (
    <div className={cn("grid gap-2 sm:grid-cols-2", className)}>
      {items.map(([label, value]) => (
        <div className="min-w-0 rounded-lg border bg-muted/70 p-3" key={label}>
          <span className="block text-[9px] font-bold uppercase tracking-[0.08em] text-muted-foreground">{label}</span>
          <code className="mt-1 block truncate text-xs">{value}</code>
        </div>
      ))}
    </div>
  )
}
