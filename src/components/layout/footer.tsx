import { Brand } from "@/components/common/brand"
import { useI18n } from "@/i18n"

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="content-footer mt-20 flex flex-col items-start justify-between gap-5 border-t py-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
      <Brand compact />
      <p>{t.footer.copyright}</p>
    </footer>
  )
}
