import { ArrowUp, KeyRound, Link2, Network, Server } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeading } from "@/components/common/section-heading"
import { useI18n } from "@/i18n"

const errorIcons = [KeyRound, Link2, Server, Network]

export function TroubleshootingSection() {
  const { t } = useI18n()
  const { troubleshooting } = t

  return (
    <section className="content-section" id="troubleshooting">
      <SectionHeading
        number={troubleshooting.number}
        eyebrow={troubleshooting.eyebrow}
        title={troubleshooting.title}
        description={troubleshooting.description}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {troubleshooting.items.map((item, index) => {
          const Icon = errorIcons[index] || KeyRound
          return (
            <Card className="gap-4 rounded-2xl py-5 shadow-none" key={item.code}>
              <CardHeader className="gap-4 px-5">
                <span className="grid h-8 w-11 place-items-center rounded-lg bg-muted font-mono text-xs font-bold text-muted-foreground">
                  <Icon className="size-3.5" />
                </span>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          )
        })}
      </div>

      <Card className="grid-surface mt-16 flex-col items-stretch justify-between gap-8 rounded-3xl px-7 py-10 sm:flex-row sm:items-end sm:px-12">
        <div>
          <p className="eyebrow">{troubleshooting.cta.eyebrow}</p>
          <h2 className="text-3xl font-bold leading-tight tracking-[-0.045em] sm:text-4xl whitespace-pre-line">
            {troubleshooting.cta.title}
          </h2>
        </div>
        <Button size="lg" asChild>
          <a href="#konfigurasi">
            {troubleshooting.cta.button} <ArrowUp />
          </a>
        </Button>
      </Card>
    </section>
  )
}
