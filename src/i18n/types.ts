export type Language = "id" | "en"

export interface Translations {
  common: {
    skipToContent: string
    copy: string
    copied: string
    copiedToast: string
    switchLanguage: string
  }
  header: {
    integrations: string
    dashboard: string
    getStarted: string
  }
  nav: {
    documentation: string
    toolsHeading: string
    main: Array<{ id: string; number: string; label: string }>
  }
  hero: {
    badge: string
    titleMain: string
    titleSub: string
    description: string
    setupCta: string
    integrationsCta: string
  }
  config: {
    number: string
    eyebrow: string
    title: string
    description: string
    gatewayLabel: string
    gatewayHint: string
    apiKeyLabel: string
    showKey: string
    hideKey: string
    modelLabel: string
    alertTitle: string
    alertDescription: string
  }
  endpoint: {
    number: string
    eyebrow: string
    title: string
    description: string
    openaiBadge: string
    openaiEyebrow: string
    openaiTitle: string
    openaiDescription: string
    anthropicBadge: string
    anthropicEyebrow: string
    anthropicTitle: string
    anthropicDescription: string
    warningTitle: string
    warningDescription: string
  }
  integrasi: {
    number: string
    eyebrow: string
    title: string
    description: string
    router: {
      name: string
      description: string
      protocol: string
      intro: string
      steps: string[]
      note: string
    }
    claude: {
      name: string
      description: string
      protocol: string
      intro: string
      tabs: {
        windows: string
        unix: string
        json: string
      }
      note: string
    }
    codex: {
      name: string
      description: string
      protocol: string
      intro: string
      note: string
    }
    opencode: {
      name: string
      description: string
      protocol: string
      intro: string
      note: string
    }
    cursor: {
      name: string
      description: string
      protocol: string
      steps: string[]
      warningTitle: string
      warningDescription: string
    }
    sdk: {
      name: string
      description: string
      protocol: string
    }
  }
  troubleshooting: {
    number: string
    eyebrow: string
    title: string
    description: string
    items: Array<{ code: string; title: string; description: string }>
    cta: {
      eyebrow: string
      title: string
      button: string
    }
  }
  footer: {
    copyright: string
  }
}
