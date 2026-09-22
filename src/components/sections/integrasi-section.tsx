import { Braces, TriangleAlert } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/common/code-block"
import { FormattedText } from "@/components/common/formatted-text"
import { SectionHeading } from "@/components/common/section-heading"
import { SettingGrid } from "@/components/common/setting-grid"
import { Steps } from "@/components/common/steps"
import { ToolTitle } from "@/components/common/tool-mark"
import { toolNavigation } from "@/components/layout/sidebar"
import { useI18n } from "@/i18n"
import type { CodeSnippets } from "@/types"

interface IntegrasiSectionProps {
  openaiUrl: string
  anthropicUrl: string
  resolvedKey: string
  resolvedModel: string
  codes: CodeSnippets
}

export function IntegrasiSection({
  openaiUrl,
  anthropicUrl: _anthropicUrl,
  resolvedKey,
  resolvedModel,
  codes,
}: IntegrasiSectionProps) {
  const { t } = useI18n()
  const { integrasi } = t

  const toolShortcuts = ["9R", "CC", "CX", "OC", "CU", "{}"]

  return (
    <section className="content-section" id="integrasi">
      <SectionHeading
        number={integrasi.number}
        eyebrow={integrasi.eyebrow}
        title={integrasi.title}
        description={integrasi.description}
      />
      <div className="mb-5 flex flex-wrap gap-2" aria-label="Pintasan integrasi">
        {toolNavigation.map(([id, label], index) => (
          <Button variant="outline" size="sm" className="rounded-full" asChild key={id}>
            <a href={`#${id}`}>
              <span className="grid size-5 place-items-center rounded-full bg-muted font-mono text-[8px]">
                {toolShortcuts[index]}
              </span>
              {label}
            </a>
          </Button>
        ))}
      </div>

      <Accordion type="multiple" defaultValue={["9router"]} className="grid gap-3">
        {/* 9Router */}
        <AccordionItem value="9router" id="tool-9router" className="scroll-mt-28 rounded-2xl border bg-card px-4 shadow-sm">
          <AccordionTrigger className="hover:no-underline">
            <ToolTitle
              mark="9R"
              name={integrasi.router.name}
              description={integrasi.router.description}
              protocol={integrasi.router.protocol}
            />
          </AccordionTrigger>
          <AccordionContent className="border-t px-0 pt-5 sm:px-14">
            <p className="text-sm text-muted-foreground">{integrasi.router.intro}</p>
            <Steps items={integrasi.router.steps.map((step, idx) => <FormattedText key={idx} text={step} />)} />
            <SettingGrid
              items={[
                ["Name", "Obersai AI"],
                ["Base URL", openaiUrl],
                ["API Key", resolvedKey],
                ["Model", resolvedModel],
              ]}
            />
            <p className="mt-3 text-[11px] text-muted-foreground">{integrasi.router.note}</p>
          </AccordionContent>
        </AccordionItem>

        {/* Claude Code */}
        <AccordionItem value="claude" id="tool-claude" className="scroll-mt-28 rounded-2xl border bg-card px-4 shadow-sm">
          <AccordionTrigger className="hover:no-underline">
            <ToolTitle
              mark="CC"
              name={integrasi.claude.name}
              description={integrasi.claude.description}
              protocol={integrasi.claude.protocol}
              tone="purple"
            />
          </AccordionTrigger>
          <AccordionContent className="border-t px-0 pt-5 sm:px-14">
            <p className="mb-5 text-sm text-muted-foreground">
              <FormattedText text={integrasi.claude.intro} />
            </p>
            <Tabs defaultValue="windows">
              <TabsList className="h-auto max-w-full flex-wrap justify-start">
                <TabsTrigger value="windows">{integrasi.claude.tabs.windows}</TabsTrigger>
                <TabsTrigger value="unix">{integrasi.claude.tabs.unix}</TabsTrigger>
                <TabsTrigger value="json">{integrasi.claude.tabs.json}</TabsTrigger>
              </TabsList>
              <TabsContent value="windows"><CodeBlock title="PowerShell" code={codes.claudeWindows} /></TabsContent>
              <TabsContent value="unix"><CodeBlock title="Terminal" code={codes.claudeUnix} /></TabsContent>
              <TabsContent value="json"><CodeBlock title="~/.claude/settings.json" code={codes.claudeJson} /></TabsContent>
            </Tabs>
            <p className="mt-3 text-[11px] text-muted-foreground">
              <FormattedText text={integrasi.claude.note} />
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Codex CLI */}
        <AccordionItem value="codex" id="tool-codex" className="scroll-mt-28 rounded-2xl border bg-card px-4 shadow-sm">
          <AccordionTrigger className="hover:no-underline">
            <ToolTitle
              mark="CX"
              name={integrasi.codex.name}
              description={integrasi.codex.description}
              protocol={integrasi.codex.protocol}
              tone="lime"
            />
          </AccordionTrigger>
          <AccordionContent className="border-t px-0 pt-5 sm:px-14">
            <p className="mb-5 text-sm text-muted-foreground">
              <FormattedText text={integrasi.codex.intro} />
            </p>
            <CodeBlock title="~/.codex/config.toml" code={codes.codexConfig} />
            <CodeBlock className="mt-3" title="PowerShell" code={codes.codexRun} />
            <p className="mt-3 text-[11px] text-muted-foreground">
              <FormattedText text={integrasi.codex.note} />
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* OpenCode */}
        <AccordionItem value="opencode" id="tool-opencode" className="scroll-mt-28 rounded-2xl border bg-card px-4 shadow-sm">
          <AccordionTrigger className="hover:no-underline">
            <ToolTitle
              mark="OC"
              name={integrasi.opencode.name}
              description={integrasi.opencode.description}
              protocol={integrasi.opencode.protocol}
            />
          </AccordionTrigger>
          <AccordionContent className="border-t px-0 pt-5 sm:px-14">
            <p className="mb-5 text-sm text-muted-foreground">
              <FormattedText text={integrasi.opencode.intro} />
            </p>
            <CodeBlock title="opencode.jsonc ? OpenCode v2" code={codes.opencode} />
            <p className="mt-3 text-[11px] text-muted-foreground">
              <FormattedText text={integrasi.opencode.note} />
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Cursor */}
        <AccordionItem value="cursor" id="tool-cursor" className="scroll-mt-28 rounded-2xl border bg-card px-4 shadow-sm">
          <AccordionTrigger className="hover:no-underline">
            <ToolTitle
              mark="CU"
              name={integrasi.cursor.name}
              description={integrasi.cursor.description}
              protocol={integrasi.cursor.protocol}
              tone="purple"
            />
          </AccordionTrigger>
          <AccordionContent className="border-t px-0 pt-5 sm:px-14">
            <Steps items={integrasi.cursor.steps.map((step, idx) => <FormattedText key={idx} text={step} />)} />
            <SettingGrid
              className="sm:grid-cols-3"
              items={[
                ["OpenAI API Key", resolvedKey],
                ["Override Base URL", openaiUrl],
                ["Model", resolvedModel],
              ]}
            />
            <Alert variant="warning" className="mt-4">
              <TriangleAlert />
              <AlertTitle>{integrasi.cursor.warningTitle}</AlertTitle>
              <AlertDescription>
                <FormattedText text={integrasi.cursor.warningDescription} />
              </AlertDescription>
            </Alert>
          </AccordionContent>
        </AccordionItem>

        {/* SDK & cURL */}
        <AccordionItem value="sdk" id="tool-sdk" className="scroll-mt-28 rounded-2xl border bg-card px-4 shadow-sm">
          <AccordionTrigger className="hover:no-underline">
            <ToolTitle
              mark={<Braces className="size-4" />}
              name={integrasi.sdk.name}
              description={integrasi.sdk.description}
              protocol={integrasi.sdk.protocol}
              tone="lime"
            />
          </AccordionTrigger>
          <AccordionContent className="border-t px-0 pt-5 sm:px-14">
            <Tabs defaultValue="curl">
              <TabsList className="h-auto max-w-full flex-wrap justify-start">
                <TabsTrigger value="curl">cURL</TabsTrigger>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="anthropic">Anthropic</TabsTrigger>
              </TabsList>
              <TabsContent value="curl"><CodeBlock title="Chat Completions" code={codes.curl} /></TabsContent>
              <TabsContent value="javascript"><CodeBlock title="JavaScript ? openai" code={codes.javascript} /></TabsContent>
              <TabsContent value="python"><CodeBlock title="Python ? openai" code={codes.python} /></TabsContent>
              <TabsContent value="anthropic"><CodeBlock title="cURL ? Anthropic Messages" code={codes.anthropic} /></TabsContent>
            </Tabs>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}
