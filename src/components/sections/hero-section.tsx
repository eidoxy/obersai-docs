import { ArrowDown, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/common/code-block"
import { useI18n } from "@/i18n"

interface HeroSectionProps {
  heroCode: string
}

export function HeroSection({ heroCode }: HeroSectionProps) {
  const { t } = useI18n()

  return (
    <section className="hero-surface relative flex min-h-220 flex-col items-center justify-center overflow-hidden px-4 py-20 text-center sm:px-[3vw]" id="mulai">
      <div className="relative z-10 flex w-full flex-col items-center">
        <Badge variant="outline" className="mb-6 gap-2 bg-background/90 px-3 py-1.5 shadow-sm">
          <span className="size-1.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" /> {t.hero.badge}
        </Badge>
        <h1 className="max-w-5xl text-[clamp(3rem,6.3vw,5.5rem)] font-extrabold leading-[0.98] tracking-[-0.065em]">
          {t.hero.titleMain}
          <br />
          <span className="font-bold text-muted-foreground">{t.hero.titleSub}</span>
        </h1>
        <p className="mt-7 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t.hero.description}
        </p>
        <div className="mt-8 flex w-full max-w-sm flex-col gap-2 sm:w-auto sm:max-w-none sm:flex-row">
          <Button size="lg" asChild>
            <a href="#konfigurasi">
              {t.hero.setupCta} <ArrowDown />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#integrasi">
              {t.hero.integrationsCta} <ArrowUpRight />
            </a>
          </Button>
        </div>
        <CodeBlock className="mt-14 w-full max-w-6xl text-left shadow-2xl" title="quick-start.sh" code={heroCode} />
      </div>
    </section>
  )
}
