import { ArrowUpRight } from "lucide-react"
import { Brand } from "@/components/common/brand"
import { LanguageSwitcher } from "./language-switcher"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/i18n"
import { DEFAULT_ENDPOINT } from "@/config"

interface HeaderProps {
  dashboardUrl?: string
}

export function Header({ dashboardUrl = DEFAULT_ENDPOINT }: HeaderProps) {
  const { t } = useI18n()

  return (
    <header className="sticky top-0 z-50 h-[68px] border-b bg-background/90 backdrop-blur-xl">
      <div className="navbar-frame mx-auto flex h-full items-center justify-between px-4 lg:px-0">
        <Brand />
        <nav className="flex items-center gap-3 sm:gap-5 text-xs font-semibold text-muted-foreground" aria-label="Navigasi utama">
          <a className="hidden hover:text-foreground sm:block" href="#integrasi">
            {t.header.integrations}
          </a>
          <a className="hidden hover:text-foreground sm:block" href={dashboardUrl} target="_blank" rel="noreferrer">
            {t.header.dashboard}
          </a>
          <LanguageSwitcher />
          <Button size="sm" asChild>
            <a href="#konfigurasi">
              {t.header.getStarted} <ArrowUpRight />
            </a>
          </Button>
        </nav>
      </div>
    </header>
  )
}
