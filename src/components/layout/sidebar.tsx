import { useI18n } from "@/i18n"
import { cn } from "@/lib/utils"

export const toolNavigation = [
  ["tool-9router", "9Router"],
  ["tool-claude", "Claude Code"],
  ["tool-codex", "Codex CLI"],
  ["tool-opencode", "OpenCode"],
  ["tool-cursor", "Cursor"],
  ["tool-sdk", "SDK & cURL"],
] as const

interface SidebarProps {
  activeSection: string
}

export function Sidebar({ activeSection }: SidebarProps) {
  const { t } = useI18n()

  return (
    <aside className="relative hidden border-r lg:block" aria-label="Daftar isi">
      <div className="sticky top-[68px] flex h-[calc(100vh-68px)] flex-col px-7 py-9">
        <p className="eyebrow">{t.nav.documentation}</p>
        <nav className="grid gap-1">
          {t.nav.main.map(({ id, number, label }) => (
            <a
              className={cn(
                "flex min-h-10 items-center gap-2.5 rounded-lg px-3 text-[13px] font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                activeSection === id && "bg-muted text-foreground"
              )}
              href={`#${id}`}
              key={id}
            >
              <span className="font-mono text-xs text-muted-foreground">{number}</span>
              {label}
            </a>
          ))}
        </nav>
        <p className="mb-2 mt-8 text-xs font-bold uppercase tracking-[0.13em] text-muted-foreground">
          {t.nav.toolsHeading}
        </p>
        <nav className="grid gap-0.5">
          {toolNavigation.map(([id, label]) => (
            <a
              className="min-h-8 rounded-lg px-3 py-1.5 text-[13px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              href={`#${id}`}
              key={id}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}
