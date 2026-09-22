import { CopyButton } from "./copy-button"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  title: string
  code: string
  className?: string
}

export function CodeBlock({ title, code, className }: CodeBlockProps) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-zinc-950 bg-[#121310] text-zinc-100 shadow-sm", className)}>
      <div className="flex min-h-11 items-center justify-between border-b border-white/10 bg-[#1b1c18] px-3.5 font-mono text-[11px] text-zinc-400">
        <span>{title}</span>
        <CopyButton value={code} />
      </div>
      <pre className="overflow-x-auto p-4 text-left">
        <code className="block min-w-max font-mono text-[11px] leading-7 text-zinc-100 sm:text-xs">{code}</code>
      </pre>
    </div>
  )
}
