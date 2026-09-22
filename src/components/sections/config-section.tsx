import { Code2, Eye, EyeOff, Info, KeyRound, Link2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SectionHeading } from "@/components/common/section-heading"
import { useI18n } from "@/i18n"

interface ConfigSectionProps {
  gatewayUrl: string
  setGatewayUrl: (url: string) => void
  apiKey: string
  setApiKey: (key: string) => void
  model: string
  setModel: (model: string) => void
  showKey: boolean
  setShowKey: React.Dispatch<React.SetStateAction<boolean>>
}

export function ConfigSection({
  gatewayUrl,
  setGatewayUrl,
  apiKey,
  setApiKey,
  model,
  setModel,
  showKey,
  setShowKey,
}: ConfigSectionProps) {
  const { t } = useI18n()

  return (
    <section className="content-section" id="konfigurasi">
      <SectionHeading
        number={t.config.number}
        eyebrow={t.config.eyebrow}
        title={t.config.title}
        description={t.config.description}
      />
      <Card className="gap-5 rounded-3xl py-6 shadow-lg">
        <CardContent className="grid gap-5 px-6 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="gateway-url">{t.config.gatewayLabel}</Label>
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="gateway-url"
                className="pl-10 font-mono text-xs"
                type="url"
                value={gatewayUrl}
                onChange={(event) => setGatewayUrl(event.target.value)}
                spellCheck={false}
              />
            </div>
            <p className="text-[11px] text-muted-foreground">{t.config.gatewayHint}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="api-key">{t.config.apiKeyLabel}</Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="api-key"
                className="px-10 font-mono text-xs"
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(event) => setApiKey(event.target.value)}
                spellCheck={false}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="absolute right-1 top-1"
                onClick={() => setShowKey((value) => !value)}
                aria-label={showKey ? t.config.hideKey : t.config.showKey}
              >
                {showKey ? <EyeOff /> : <Eye />}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="model-id">{t.config.modelLabel}</Label>
            <div className="relative">
              <Code2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="model-id"
                className="pl-10 font-mono text-xs"
                value={model}
                onChange={(event) => setModel(event.target.value)}
                spellCheck={false}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Alert className="mt-5 bg-muted/70">
        <Info />
        <AlertTitle>{t.config.alertTitle}</AlertTitle>
        <AlertDescription>{t.config.alertDescription}</AlertDescription>
      </Alert>
    </section>
  )
}
