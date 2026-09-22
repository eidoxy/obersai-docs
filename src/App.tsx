import { useState } from "react"
import { Toaster } from "@/components/ui/sonner"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { MobileNav } from "@/components/layout/mobile-nav"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { ConfigSection } from "@/components/sections/config-section"
import { EndpointSection } from "@/components/sections/endpoint-section"
import { IntegrasiSection } from "@/components/sections/integrasi-section"
import { TroubleshootingSection } from "@/components/sections/troubleshooting-section"
import { useActiveSection } from "@/hooks/use-active-section"
import { useCodeSnippets } from "@/hooks/use-code-snippets"
import { I18nProvider, useI18n } from "@/i18n"

const sectionIds = ["mulai", "endpoint", "integrasi", "troubleshooting"]

function AppContent() {
  const [gatewayUrl, setGatewayUrl] = useState("http://localhost:3000")
  const [apiKey, setApiKey] = useState("sk-obersai-api-key")
  const [model, setModel] = useState("your-model-id")
  const [showKey, setShowKey] = useState(false)

  const activeSection = useActiveSection(sectionIds)
  const { anthropicUrl, openaiUrl, resolvedKey, resolvedModel, codes } = useCodeSnippets({
    gatewayUrl,
    apiKey,
    model,
  })
  const { t } = useI18n()

  return (
    <>
      <a
        className="sr-only z-[200] rounded-md bg-foreground px-4 py-2 text-background focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
        href="#content"
      >
        {t.common.skipToContent}
      </a>
      <Header />

      <div className="page-shell mx-auto grid lg:grid-cols-[248px_minmax(0,1fr)]">
        <Sidebar activeSection={activeSection} />

        <main id="content" className="min-w-0">
          <HeroSection heroCode={codes.hero} />
          <MobileNav />
          <ConfigSection
            gatewayUrl={gatewayUrl}
            setGatewayUrl={setGatewayUrl}
            apiKey={apiKey}
            setApiKey={setApiKey}
            model={model}
            setModel={setModel}
            showKey={showKey}
            setShowKey={setShowKey}
          />
          <EndpointSection openaiUrl={openaiUrl} anthropicUrl={anthropicUrl} />
          <IntegrasiSection
            openaiUrl={openaiUrl}
            anthropicUrl={anthropicUrl}
            resolvedKey={resolvedKey}
            resolvedModel={resolvedModel}
            codes={codes}
          />
          <TroubleshootingSection />
          <Footer />
        </main>
      </div>
      <Toaster />
    </>
  )
}

function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  )
}

export default App
