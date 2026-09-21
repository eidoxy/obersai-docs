import { useEffect, useMemo, useState, type ReactNode } from "react"
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Braces,
  Check,
  Code2,
  Copy,
  Eye,
  EyeOff,
  Info,
  KeyRound,
  Link2,
  Network,
  Server,
  Terminal,
  TriangleAlert,
} from "lucide-react"
import { toast } from "sonner"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Toaster } from "@/components/ui/sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const mainNavigation = [
  ["mulai", "01", "Mulai"],
  ["endpoint", "02", "Base URL"],
  ["integrasi", "03", "Integrasi"],
  ["troubleshooting", "04", "Troubleshooting"],
] as const

const toolNavigation = [
  ["tool-9router", "9Router"],
  ["tool-claude", "Claude Code"],
  ["tool-codex", "Codex CLI"],
  ["tool-opencode", "OpenCode"],
  ["tool-cursor", "Cursor"],
  ["tool-sdk", "SDK & cURL"],
] as const

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a className="inline-flex items-center gap-2.5 font-semibold tracking-tight" href="#mulai" aria-label="Obersai AI Gateway">
      <img src="/logo.png" alt="Obersai AI" className={cn("rounded-lg object-contain", compact ? "size-7" : "size-8")} />
      <span className={compact ? "text-sm" : "text-lg"}>Obersa</span>
    </a>
  )
}

function SectionHeading({ number, eyebrow, title, description }: { number: string; eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-9 grid items-start gap-3 sm:grid-cols-[46px_minmax(0,1fr)] sm:gap-5">
      <span className="grid size-10 place-items-center rounded-xl border bg-card font-mono text-[11px] text-muted-foreground shadow-xs">{number}</span>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="max-w-3xl text-3xl font-bold leading-[1.06] tracking-[-0.045em] sm:text-4xl lg:text-[46px]">{title}</h2>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

async function writeClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const textarea = document.createElement("textarea")
    textarea.value = text
    textarea.style.cssText = "position:fixed;opacity:0"
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand("copy")
    textarea.remove()
  }
}

function CopyButton({ value, className }: { value: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await writeClipboard(value)
    setCopied(true)
    toast.success("Tersalin ke clipboard")
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Button type="button" variant="ghost" size="sm" className={cn("h-7 px-2 text-xs text-zinc-400 hover:bg-white/10 hover:text-white", className)} onClick={copy}>
      {copied ? <Check /> : <Copy />}
      {copied ? "Tersalin" : "Salin"}
    </Button>
  )
}

function CodeBlock({ title, code, className }: { title: string; code: string; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-zinc-950 bg-[#121310] text-zinc-100 shadow-sm", className)}>
      <div className="flex min-h-11 items-center justify-between border-b border-white/10 bg-[#1b1c18] px-3.5 font-mono text-[11px] text-zinc-400">
        <span>{title}</span>
        <CopyButton value={code} />
      </div>
      <pre className="overflow-x-auto p-4 text-left"><code className="block min-w-max font-mono text-[11px] leading-7 text-zinc-100 sm:text-xs">{code}</code></pre>
    </div>
  )
}

function ToolMark({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "lime" | "purple" }) {
  return <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl border font-mono text-[11px] font-bold", tone === "lime" && "bg-lime-100", tone === "purple" && "bg-violet-100", tone === "neutral" && "bg-muted")}>{children}</span>
}

function ToolTitle({ mark, name, description, protocol, tone }: { mark: ReactNode; name: string; description: string; protocol: string; tone?: "neutral" | "lime" | "purple" }) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-3">
      <ToolMark tone={tone}>{mark}</ToolMark>
      <span className="grid min-w-0 text-left">
        <strong className="text-sm">{name}</strong>
        <small className="truncate text-[11px] font-normal text-muted-foreground">{description}</small>
      </span>
      <Badge variant="secondary" className="ml-auto hidden font-mono text-[9px] sm:inline-flex">{protocol}</Badge>
    </div>
  )
}

function Steps({ items }: { items: ReactNode[] }) {
  return (
    <ol className="my-5 grid gap-2.5">
      {items.map((item, index) => (
        <li className="flex items-center gap-3 text-xs text-muted-foreground" key={index}>
          <span className="grid size-6 shrink-0 place-items-center rounded-md border bg-muted font-mono text-xs text-foreground">{index + 1}</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  )
}

function SettingGrid({ items, className }: { items: Array<[string, string]>; className?: string }) {
  return (
    <div className={cn("grid gap-2 sm:grid-cols-2", className)}>
      {items.map(([label, value]) => (
        <div className="min-w-0 rounded-lg border bg-muted/70 p-3" key={label}>
          <span className="block text-[9px] font-bold uppercase tracking-[0.08em] text-muted-foreground">{label}</span>
          <code className="mt-1 block truncate text-xs">{value}</code>
        </div>
      ))}
    </div>
  )
}

function App() {
  const [gatewayUrl, setGatewayUrl] = useState("http://localhost:3000")
  const [apiKey, setApiKey] = useState("sk-obersai-api-key")
  const [model, setModel] = useState("your-model-id")
  const [showKey, setShowKey] = useState(false)
  const [activeSection, setActiveSection] = useState("mulai")

  const anthropicUrl = gatewayUrl.trim().replace(/\/+$/, "") || "http://localhost:3000"
  const openaiUrl = `${anthropicUrl}/v1`
  const resolvedKey = apiKey.trim() || "sk-obersai-api-key"
  const resolvedModel = model.trim() || "your-model-id"

  const codes = useMemo(() => ({
    hero: `curl ${openaiUrl}/chat/completions \\\n  -H "Authorization: Bearer ${resolvedKey}" \\\n  -H "Content-Type: application/json" \\\n  -d '{"model":"${resolvedModel}","messages":[{"role":"user","content":"Halo!"}]}'`,
    claudeWindows: `$env:ANTHROPIC_BASE_URL="${anthropicUrl}"\n$env:ANTHROPIC_AUTH_TOKEN="${resolvedKey}"\n$env:ANTHROPIC_MODEL="${resolvedModel}"\nclaude`,
    claudeUnix: `export ANTHROPIC_BASE_URL="${anthropicUrl}"\nexport ANTHROPIC_AUTH_TOKEN="${resolvedKey}"\nexport ANTHROPIC_MODEL="${resolvedModel}"\nclaude`,
    claudeJson: `{\n  "env": {\n    "ANTHROPIC_BASE_URL": "${anthropicUrl}",\n    "ANTHROPIC_AUTH_TOKEN": "${resolvedKey}",\n    "ANTHROPIC_MODEL": "${resolvedModel}"\n  }\n}`,
    codexConfig: `model = "${resolvedModel}"\nmodel_provider = "obersai"\n\n[model_providers.obersai]\nname = "Obersai AI"\nbase_url = "${openaiUrl}"\nenv_key = "OBERSAI_API_KEY"\nwire_api = "responses"`,
    codexRun: `$env:OBERSAI_API_KEY="${resolvedKey}"\ncodex`,
    opencode: `{\n  "$schema": "https://opencode.ai/config.json",\n  "model": "obersai/${resolvedModel}",\n  "providers": {\n    "obersai": {\n      "name": "Obersai AI",\n      "env": ["OBERSAI_API_KEY"],\n      "package": "@opencode/ai/providers/openai-compatible",\n      "settings": { "baseURL": "${openaiUrl}" },\n      "models": { "${resolvedModel}": { "name": "${resolvedModel}" } }\n    }\n  }\n}`,
    curl: `curl ${openaiUrl}/chat/completions \\\n  -H "Authorization: Bearer ${resolvedKey}" \\\n  -H "Content-Type: application/json" \\\n  -d '{"model":"${resolvedModel}","messages":[{"role":"user","content":"Halo!"}]}'`,
    javascript: `import OpenAI from "openai";\n\nconst client = new OpenAI({\n  apiKey: "${resolvedKey}",\n  baseURL: "${openaiUrl}",\n});\n\nconst response = await client.chat.completions.create({\n  model: "${resolvedModel}",\n  messages: [{ role: "user", content: "Halo!" }],\n});\n\nconsole.log(response.choices[0].message.content);`,
    python: `from openai import OpenAI\n\nclient = OpenAI(\n    api_key="${resolvedKey}",\n    base_url="${openaiUrl}",\n)\n\nresponse = client.chat.completions.create(\n    model="${resolvedModel}",\n    messages=[{"role": "user", "content": "Halo!"}],\n)\n\nprint(response.choices[0].message.content)`,
    anthropic: `curl ${anthropicUrl}/v1/messages \\\n  -H "Authorization: Bearer ${resolvedKey}" \\\n  -H "anthropic-version: 2023-06-01" \\\n  -H "Content-Type: application/json" \\\n  -d '{"model":"${resolvedModel}","max_tokens":1024,"messages":[{"role":"user","content":"Halo!"}]}'`,
  }), [anthropicUrl, openaiUrl, resolvedKey, resolvedModel])

  useEffect(() => {
    const sections = mainNavigation.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: "-20% 0px -65%", threshold: [0.05, 0.25, 0.5] })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <a className="sr-only z-[200] rounded-md bg-foreground px-4 py-2 text-background focus:not-sr-only focus:fixed focus:left-3 focus:top-3" href="#content">Lewati ke dokumentasi</a>
      <header className="sticky top-0 z-50 h-[68px] border-b bg-background/90 backdrop-blur-xl">
        <div className="navbar-frame mx-auto flex h-full items-center justify-between px-4 lg:px-0">
          <Brand />
          <nav className="flex items-center gap-5 text-xs font-semibold text-muted-foreground" aria-label="Navigasi utama">
            <a className="hidden hover:text-foreground sm:block" href="#integrasi">Integrasi</a>
            <a className="hidden hover:text-foreground sm:block" href="http://localhost:3000" target="_blank" rel="noreferrer">Dashboard</a>
            <Button size="sm" asChild><a href="#konfigurasi">Mulai <ArrowUpRight /></a></Button>
          </nav>
        </div>
      </header>

      <div className="page-shell mx-auto grid lg:grid-cols-[248px_minmax(0,1fr)]">
        <aside className="relative hidden border-r lg:block" aria-label="Daftar isi">
          <div className="sticky top-[68px] flex h-[calc(100vh-68px)] flex-col px-7 py-9">
            <p className="eyebrow">Dokumentasi</p>
            <nav className="grid gap-1">
              {mainNavigation.map(([id, number, label]) => (
                <a className={cn("flex min-h-10 items-center gap-2.5 rounded-lg px-3 text-[13px] font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground", activeSection === id && "bg-muted text-foreground")} href={`#${id}`} key={id}>
                  <span className="font-mono text-xs text-muted-foreground">{number}</span>{label}
                </a>
              ))}
            </nav>
            <p className="mb-2 mt-8 text-xs font-bold uppercase tracking-[0.13em] text-muted-foreground">AI Agent & Tools</p>
            <nav className="grid gap-0.5">
              {toolNavigation.map(([id, label]) => <a className="min-h-8 rounded-lg px-3 py-1.5 text-[13px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground" href={`#${id}`} key={id}>{label}</a>)}
            </nav>
          </div>
        </aside>

        <main id="content" className="min-w-0">
          <section className="hero-surface relative flex min-h-[720px] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center sm:px-[3vw]" id="mulai">
            <div className="relative z-10 flex w-full flex-col items-center">
              <Badge variant="outline" className="mb-6 gap-2 bg-background/90 px-3 py-1.5 shadow-sm"><span className="size-1.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" /> New API compatible</Badge>
              <h1 className="max-w-5xl text-[clamp(3rem,6.3vw,5.5rem)] font-extrabold leading-[0.98] tracking-[-0.065em]">Obersa.<br /><span className="font-bold text-muted-foreground">Dokumentasi Lengkap</span></h1>
              <p className="mt-7 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">Hubungkan aplikasi dan coding agent ke Obersai AI melalui endpoint OpenAI-compatible atau Anthropic-compatible.</p>
              <div className="mt-8 flex w-full max-w-sm flex-col gap-2 sm:w-auto sm:max-w-none sm:flex-row">
                <Button size="lg" asChild><a href="#konfigurasi">Siapkan koneksi <ArrowDown /></a></Button>
                <Button size="lg" variant="outline" asChild><a href="#integrasi">Lihat integrasi <ArrowUpRight /></a></Button>
              </div>
              <CodeBlock className="mt-14 w-full max-w-6xl text-left shadow-2xl" title="quick-start.sh" code={codes.hero} />
            </div>
          </section>

          <nav className="sticky top-[68px] z-40 flex gap-2 overflow-x-auto border-b bg-background/95 px-4 py-2.5 backdrop-blur lg:hidden" aria-label="Navigasi dokumentasi seluler">
            {mainNavigation.map(([id, , label]) => <Button variant="outline" size="sm" asChild key={id}><a href={`#${id}`}>{label}</a></Button>)}
          </nav>

          <section className="content-section" id="konfigurasi">
            <SectionHeading number="01" eyebrow="Konfigurasi cepat" title="Isi sekali, semua contoh ikut berubah." description="Data hanya dipakai di halaman ini. Tidak ada request ke gateway dan tidak disimpan." />
            <Card className="gap-5 rounded-3xl py-6 shadow-lg">
              <CardContent className="grid gap-5 px-6 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2"><Label htmlFor="gateway-url">Alamat gateway</Label><div className="relative"><Link2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input id="gateway-url" className="pl-10 font-mono text-xs" type="url" value={gatewayUrl} onChange={(event) => setGatewayUrl(event.target.value)} spellCheck={false} /></div><p className="text-[11px] text-muted-foreground">Ganti ke domain HTTPS saat gateway sudah online.</p></div>
                <div className="space-y-2"><Label htmlFor="api-key">API key</Label><div className="relative"><KeyRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input id="api-key" className="px-10 font-mono text-xs" type={showKey ? "text" : "password"} value={apiKey} onChange={(event) => setApiKey(event.target.value)} spellCheck={false} /><Button type="button" variant="ghost" size="icon-sm" className="absolute right-1 top-1" onClick={() => setShowKey((value) => !value)} aria-label={showKey ? "Sembunyikan API key" : "Tampilkan API key"}>{showKey ? <EyeOff /> : <Eye />}</Button></div></div>
                <div className="space-y-2"><Label htmlFor="model-id">Model ID</Label><div className="relative"><Code2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input id="model-id" className="pl-10 font-mono text-xs" value={model} onChange={(event) => setModel(event.target.value)} spellCheck={false} /></div></div>
              </CardContent>
            </Card>
            <Alert className="mt-5 bg-muted/70"><Info /><AlertTitle>Daftar model belum ditampilkan.</AlertTitle><AlertDescription>Gunakan Model ID aktif di dashboard New API.</AlertDescription></Alert>
          </section>

          <section className="content-section" id="endpoint">
            <SectionHeading number="02" eyebrow="Base URL" title="Pilih protokol sesuai aplikasi." description="New API menyediakan endpoint OpenAI dan Anthropic dari gateway yang sama." />
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="relative overflow-hidden rounded-3xl"><div className="absolute -right-12 -top-12 size-44 rounded-full bg-lime-100/80" /><CardHeader className="relative"><div className="mb-5 flex items-center justify-between"><ToolMark tone="lime">O</ToolMark><Badge variant="outline" className="bg-background/70">Pakai <code>/v1</code></Badge></div><p className="eyebrow">OpenAI-compatible</p><CardTitle className="text-2xl tracking-tight">Untuk mayoritas aplikasi</CardTitle><CardDescription>Codex CLI, OpenCode, Cursor, 9Router, OpenAI SDK, dan cURL.</CardDescription></CardHeader><CardContent className="relative"><div className="flex min-w-0 items-center gap-2 rounded-xl bg-[#121310] p-2 pl-3 text-zinc-100"><code className="min-w-0 flex-1 truncate text-[11px]">{openaiUrl}</code><CopyButton value={openaiUrl} /></div><ul className="mt-5 grid gap-2 text-[11px] text-muted-foreground"><li>• <code>POST /v1/chat/completions</code></li><li>• <code>POST /v1/responses</code></li><li>• <code>GET /v1/models</code></li></ul></CardContent></Card>
              <Card className="relative overflow-hidden rounded-3xl"><div className="absolute -right-12 -top-12 size-44 rounded-full bg-violet-100/80" /><CardHeader className="relative"><div className="mb-5 flex items-center justify-between"><ToolMark tone="purple">A</ToolMark><Badge variant="outline" className="bg-background/70">Tanpa <code>/v1</code></Badge></div><p className="eyebrow">Anthropic-compatible</p><CardTitle className="text-2xl tracking-tight">Untuk Claude Code</CardTitle><CardDescription>Base URL berhenti di domain. Claude Code menambahkan path Messages API.</CardDescription></CardHeader><CardContent className="relative"><div className="flex min-w-0 items-center gap-2 rounded-xl bg-[#121310] p-2 pl-3 text-zinc-100"><code className="min-w-0 flex-1 truncate text-[11px]">{anthropicUrl}</code><CopyButton value={anthropicUrl} /></div><ul className="mt-5 grid gap-2 text-[11px] text-muted-foreground"><li>• <code>POST /v1/messages</code></li><li>• <code>ANTHROPIC_BASE_URL</code></li><li>• <code>ANTHROPIC_AUTH_TOKEN</code></li></ul></CardContent></Card>
            </div>
            <Alert variant="warning" className="mt-5"><TriangleAlert /><AlertTitle>Kesalahan yang paling sering terjadi</AlertTitle><AlertDescription>Jangan tambahkan <code>/v1</code> ke <code>ANTHROPIC_BASE_URL</code>. SDK Anthropic sudah menambahkan <code>/v1/messages</code>.</AlertDescription></Alert>
          </section>

          <section className="content-section" id="integrasi">
            <SectionHeading number="03" eyebrow="AI Agent & Tools" title="Hubungkan tools yang kamu pakai." description="Pilih panduan, tempel konfigurasi, lalu ganti Model ID bila diperlukan." />
            <div className="mb-5 flex flex-wrap gap-2" aria-label="Pintasan integrasi">
              {toolNavigation.map(([id, label], index) => <Button variant="outline" size="sm" className="rounded-full" asChild key={id}><a href={`#${id}`}><span className="grid size-5 place-items-center rounded-full bg-muted font-mono text-[8px]">{["9R", "CC", "CX", "OC", "CU", "{}"][index]}</span>{label}</a></Button>)}
            </div>

            <Accordion type="multiple" defaultValue={["9router"]} className="grid gap-3">
              <AccordionItem value="9router" id="tool-9router" className="scroll-mt-28 rounded-2xl border bg-card px-4 shadow-sm">
                <AccordionTrigger className="hover:no-underline"><ToolTitle mark="9R" name="9Router" description="Custom provider · OpenAI-compatible" protocol="/v1" /></AccordionTrigger>
                <AccordionContent className="border-t px-0 pt-5 sm:px-14">
                  <p className="text-sm text-muted-foreground">Tambahkan Obersai AI sebagai provider kompatibel OpenAI di dashboard 9Router.</p>
                  <Steps items={[<>Buka <strong className="text-foreground">9Router Dashboard → Providers</strong>.</>, <>Pilih <strong className="text-foreground">Add Provider</strong>, lalu <strong className="text-foreground">OpenAI Compatible</strong>.</>, <>Isi konfigurasi berikut dan simpan.</>]} />
                  <SettingGrid items={[["Name", "Obersai AI"], ["Base URL", openaiUrl], ["API Key", resolvedKey], ["Model", resolvedModel]]} />
                  <p className="mt-3 text-[11px] text-muted-foreground">Nama menu bisa sedikit berbeda antar versi 9Router. Pilih provider custom dengan format OpenAI-compatible.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="claude" id="tool-claude" className="scroll-mt-28 rounded-2xl border bg-card px-4 shadow-sm">
                <AccordionTrigger className="hover:no-underline"><ToolTitle mark="CC" name="Claude Code" description="Terminal · Anthropic-compatible" protocol="tanpa /v1" tone="purple" /></AccordionTrigger>
                <AccordionContent className="border-t px-0 pt-5 sm:px-14">
                  <p className="mb-5 text-sm text-muted-foreground">Gunakan token Bearer dan alamat Anthropic tanpa <code>/v1</code>.</p>
                  <Tabs defaultValue="windows">
                    <TabsList className="h-auto max-w-full flex-wrap justify-start"><TabsTrigger value="windows">Windows</TabsTrigger><TabsTrigger value="unix">macOS / Linux</TabsTrigger><TabsTrigger value="json">settings.json</TabsTrigger></TabsList>
                    <TabsContent value="windows"><CodeBlock title="PowerShell" code={codes.claudeWindows} /></TabsContent>
                    <TabsContent value="unix"><CodeBlock title="Terminal" code={codes.claudeUnix} /></TabsContent>
                    <TabsContent value="json"><CodeBlock title="~/.claude/settings.json" code={codes.claudeJson} /></TabsContent>
                  </Tabs>
                  <p className="mt-3 text-[11px] text-muted-foreground">Konfigurasi terminal hanya aktif selama jendela terminal terbuka. Gunakan <code>settings.json</code> untuk setelan tetap.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="codex" id="tool-codex" className="scroll-mt-28 rounded-2xl border bg-card px-4 shadow-sm">
                <AccordionTrigger className="hover:no-underline"><ToolTitle mark="CX" name="Codex CLI" description="Terminal · OpenAI Responses API" protocol="/v1" tone="lime" /></AccordionTrigger>
                <AccordionContent className="border-t px-0 pt-5 sm:px-14">
                  <p className="mb-5 text-sm text-muted-foreground">Tambahkan provider di konfigurasi pengguna, bukan <code>.codex/config.toml</code> milik proyek.</p>
                  <CodeBlock title="~/.codex/config.toml" code={codes.codexConfig} />
                  <CodeBlock className="mt-3" title="PowerShell" code={codes.codexRun} />
                  <p className="mt-3 text-[11px] text-muted-foreground">Di macOS/Linux gunakan <code>export OBERSAI_API_KEY=&quot;...&quot;</code>.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="opencode" id="tool-opencode" className="scroll-mt-28 rounded-2xl border bg-card px-4 shadow-sm">
                <AccordionTrigger className="hover:no-underline"><ToolTitle mark="OC" name="OpenCode" description="Terminal · custom OpenAI provider" protocol="/v1" /></AccordionTrigger>
                <AccordionContent className="border-t px-0 pt-5 sm:px-14">
                  <p className="mb-5 text-sm text-muted-foreground">Daftarkan provider dan satu Model ID yang aktif di gateway.</p>
                  <CodeBlock title="opencode.jsonc · OpenCode v2" code={codes.opencode} />
                  <p className="mt-3 text-[11px] text-muted-foreground">Set variabel <code>OBERSAI_API_KEY</code>, lalu jalankan <code>opencode</code>. OpenCode v1 memakai format berbeda.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cursor" id="tool-cursor" className="scroll-mt-28 rounded-2xl border bg-card px-4 shadow-sm">
                <AccordionTrigger className="hover:no-underline"><ToolTitle mark="CU" name="Cursor" description="Editor · OpenAI Base URL override" protocol="HTTPS" tone="purple" /></AccordionTrigger>
                <AccordionContent className="border-t px-0 pt-5 sm:px-14">
                  <Steps items={[<>Buka <strong className="text-foreground">Cursor Settings → Models</strong>.</>, <>Aktifkan <strong className="text-foreground">OpenAI API Key</strong>, lalu isi API key Obersai.</>, <>Aktifkan <strong className="text-foreground">Override OpenAI Base URL</strong> dan isi URL OpenAI-compatible.</>, <>Pilih atau tambahkan Model ID yang tersedia di gateway.</>]} />
                  <SettingGrid className="sm:grid-cols-3" items={[["OpenAI API Key", resolvedKey], ["Override Base URL", openaiUrl], ["Model", resolvedModel]]} />
                  <Alert variant="warning" className="mt-4"><TriangleAlert /><AlertTitle>Cursor memerlukan endpoint publik.</AlertTitle><AlertDescription><code>localhost</code> tidak dapat dijangkau dari layanan Cursor. Gunakan domain HTTPS atau tunnel aman. Override juga dapat memengaruhi model bawaan Cursor.</AlertDescription></Alert>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="sdk" id="tool-sdk" className="scroll-mt-28 rounded-2xl border bg-card px-4 shadow-sm">
                <AccordionTrigger className="hover:no-underline"><ToolTitle mark={<Braces className="size-4" />} name="SDK & cURL" description="JavaScript, Python, dan request langsung" protocol="API" tone="lime" /></AccordionTrigger>
                <AccordionContent className="border-t px-0 pt-5 sm:px-14">
                  <Tabs defaultValue="curl">
                    <TabsList className="h-auto max-w-full flex-wrap justify-start"><TabsTrigger value="curl">cURL</TabsTrigger><TabsTrigger value="javascript">JavaScript</TabsTrigger><TabsTrigger value="python">Python</TabsTrigger><TabsTrigger value="anthropic">Anthropic</TabsTrigger></TabsList>
                    <TabsContent value="curl"><CodeBlock title="Chat Completions" code={codes.curl} /></TabsContent>
                    <TabsContent value="javascript"><CodeBlock title="JavaScript · openai" code={codes.javascript} /></TabsContent>
                    <TabsContent value="python"><CodeBlock title="Python · openai" code={codes.python} /></TabsContent>
                    <TabsContent value="anthropic"><CodeBlock title="cURL · Anthropic Messages" code={codes.anthropic} /></TabsContent>
                  </Tabs>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <section className="content-section" id="troubleshooting">
            <SectionHeading number="04" eyebrow="Troubleshooting" title="Cek empat hal ini lebih dulu." description="Mayoritas error integrasi berasal dari URL, token, model, atau protokol." />
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["401", "Unauthorized", "Pastikan token dibuat di New API dan dikirim sebagai Bearer token.", KeyRound],
                ["404", "Endpoint salah", "OpenAI memakai /v1. Claude Code memakai base URL tanpa /v1.", Link2],
                ["400", "Model tidak aktif", "Samakan Model ID dengan model yang diizinkan untuk token dan grup pengguna.", Server],
                ["NET", "Tidak terjangkau", "localhost hanya bisa dipakai oleh aplikasi yang berjalan di mesin sama.", Network],
              ].map(([code, title, description, Icon]) => (
                <Card className="gap-4 rounded-2xl py-5 shadow-none" key={String(code)}>
                  <CardHeader className="gap-4 px-5"><span className="grid h-8 w-11 place-items-center rounded-lg bg-muted font-mono text-xs font-bold text-muted-foreground"><Icon className="size-3.5" /></span><CardTitle>{String(title)}</CardTitle><CardDescription>{String(description)}</CardDescription></CardHeader>
                </Card>
              ))}
            </div>

            <Card className="grid-surface mt-16 flex-col items-stretch justify-between gap-8 rounded-3xl px-7 py-10 sm:flex-row sm:items-end sm:px-12">
              <div><p className="eyebrow">Siap dipakai</p><h2 className="text-3xl font-bold leading-tight tracking-[-0.045em] sm:text-4xl">Gateway tetap milikmu.<br />Client bebas pilihanmu.</h2></div>
              <Button size="lg" asChild><a href="#konfigurasi">Ulangi konfigurasi <ArrowUp /></a></Button>
            </Card>
          </section>

          <footer className="content-footer mt-20 flex flex-col items-start justify-between gap-5 border-t py-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
            <Brand compact />
            <p>© 2026 Obersa. All rights reserved.</p>
          </footer>
        </main>
      </div>
      <Toaster />
    </>
  )
}

export default App
