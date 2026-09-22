import type { ReactNode } from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type ToolTone = "neutral" | "lime" | "purple"

export function ToolMark({ children, tone = "neutral" }: { children: ReactNode; tone?: ToolTone }) {
  return (
    <span
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-xl border font-mono text-[11px] font-bold",
        tone === "lime" && "bg-lime-100",
        tone === "purple" && "bg-violet-100",
        tone === "neutral" && "bg-muted"
      )}
    >
      {children}
    </span>
  )
}

interface ToolTitleProps {
  mark: ReactNode
  name: string
  description: string
  protocol: string
  tone?: ToolTone
}

export function ToolTitle({ mark, name, description, protocol, tone }: ToolTitleProps) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-3">
      <ToolMark tone={tone}>{mark}</ToolMark>
      <span className="grid min-w-0 text-left">
        <strong className="text-sm">{name}</strong>
        <small className="truncate text-[11px] font-normal text-muted-foreground">{description}</small>
      </span>
      <Badge variant="secondary" className="ml-auto hidden font-mono text-[9px] sm:inline-flex">
        {protocol}
      </Badge>
    </div>
  )
}
