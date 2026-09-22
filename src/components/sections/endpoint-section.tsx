import { TriangleAlert } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CopyButton } from "@/components/common/copy-button"
import { FormattedText } from "@/components/common/formatted-text"
import { SectionHeading } from "@/components/common/section-heading"
import { ToolMark } from "@/components/common/tool-mark"
import { useI18n } from "@/i18n"

interface EndpointSectionProps {
  openaiUrl: string
  anthropicUrl: string
}

export function EndpointSection({ openaiUrl, anthropicUrl }: EndpointSectionProps) {
  const { t } = useI18n()

  return (
    <section className="content-section" id="endpoint">
      <SectionHeading
        number={t.endpoint.number}
        eyebrow={t.endpoint.eyebrow}
        title={t.endpoint.title}
        description={t.endpoint.description}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="relative overflow-hidden rounded-3xl">
          <div className="absolute -right-12 -top-12 size-44 rounded-full bg-lime-100/80" />
          <CardHeader className="relative">
            <div className="mb-5 flex items-center justify-between">
              <ToolMark tone="lime">O</ToolMark>
              <Badge variant="outline" className="bg-background/70">
                {t.endpoint.openaiBadge}
              </Badge>
            </div>
            <p className="eyebrow">{t.endpoint.openaiEyebrow}</p>
            <CardTitle className="text-2xl tracking-tight">{t.endpoint.openaiTitle}</CardTitle>
            <CardDescription>{t.endpoint.openaiDescription}</CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex min-w-0 items-center gap-2 rounded-xl bg-[#121310] p-2 pl-3 text-zinc-100">
              <code className="min-w-0 flex-1 truncate text-[11px]">{openaiUrl}</code>
              <CopyButton value={openaiUrl} />
            </div>
            <ul className="mt-5 grid gap-2 text-[11px] text-muted-foreground">
              <li>? <code>POST /v1/chat/completions</code></li>
              <li>? <code>POST /v1/responses</code></li>
              <li>? <code>GET /v1/models</code></li>
            </ul>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden rounded-3xl">
          <div className="absolute -right-12 -top-12 size-44 rounded-full bg-violet-100/80" />
          <CardHeader className="relative">
            <div className="mb-5 flex items-center justify-between">
              <ToolMark tone="purple">A</ToolMark>
              <Badge variant="outline" className="bg-background/70">
                {t.endpoint.anthropicBadge}
              </Badge>
            </div>
            <p className="eyebrow">{t.endpoint.anthropicEyebrow}</p>
            <CardTitle className="text-2xl tracking-tight">{t.endpoint.anthropicTitle}</CardTitle>
            <CardDescription>{t.endpoint.anthropicDescription}</CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex min-w-0 items-center gap-2 rounded-xl bg-[#121310] p-2 pl-3 text-zinc-100">
              <code className="min-w-0 flex-1 truncate text-[11px]">{anthropicUrl}</code>
              <CopyButton value={anthropicUrl} />
            </div>
            <ul className="mt-5 grid gap-2 text-[11px] text-muted-foreground">
              <li>? <code>POST /v1/messages</code></li>
              <li>? <code>ANTHROPIC_BASE_URL</code></li>
              <li>? <code>ANTHROPIC_AUTH_TOKEN</code></li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Alert variant="warning" className="mt-5">
        <TriangleAlert />
        <AlertTitle>{t.endpoint.warningTitle}</AlertTitle>
        <AlertDescription>
          <FormattedText text={t.endpoint.warningDescription} />
        </AlertDescription>
      </Alert>
    </section>
  )
}
