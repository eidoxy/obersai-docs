import { Button } from "@/components/ui/button"
import { useI18n } from "@/i18n"

export function MobileNav() {
  const { t } = useI18n()

  return (
    <nav className="sticky top-[68px] z-40 flex gap-2 overflow-x-auto border-b bg-background/95 px-4 py-2.5 backdrop-blur lg:hidden" aria-label="Navigasi dokumentasi seluler">
      {t.nav.main.map(({ id, label }) => (
        <Button variant="outline" size="sm" asChild key={id}>
          <a href={`#${id}`}>{label}</a>
        </Button>
      ))}
    </nav>
  )
}
