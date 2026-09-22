import { useMemo } from "react"
import type { CodeSnippets } from "@/types"
import { useI18n } from "@/i18n"
import { DEFAULT_ENDPOINT } from "@/config"

interface SnippetParams {
  gatewayUrl: string
  apiKey: string
  model: string
}

export function useCodeSnippets({ gatewayUrl, apiKey, model }: SnippetParams): {
  anthropicUrl: string
  openaiUrl: string
  resolvedKey: string
  resolvedModel: string
  codes: CodeSnippets
} {
  const { language } = useI18n()

  const anthropicUrl = gatewayUrl.trim().replace(/\/+$/, "") || DEFAULT_ENDPOINT
  const openaiUrl = `${anthropicUrl}/v1`
  const resolvedKey = apiKey.trim() || "sk-obersai-api-key"
  const resolvedModel = model.trim() || "your-model-id"
  const sampleMessage = language === "en" ? "Hello!" : "Halo!"

  const codes = useMemo(
    () => ({
      hero: `curl ${openaiUrl}/chat/completions \\\
  -H "Authorization: Bearer ${resolvedKey}" \\\
  -H "Content-Type: application/json" \\\
  -d '{"model":"${resolvedModel}","messages":[{"role":"user","content":"${sampleMessage}"}]}'`,
      claudeWindows: `$env:ANTHROPIC_BASE_URL="${anthropicUrl}"
$env:ANTHROPIC_AUTH_TOKEN="${resolvedKey}"
$env:ANTHROPIC_MODEL="${resolvedModel}"
claude`,
      claudeUnix: `export ANTHROPIC_BASE_URL="${anthropicUrl}"
export ANTHROPIC_AUTH_TOKEN="${resolvedKey}"
export ANTHROPIC_MODEL="${resolvedModel}"
claude`,
      claudeJson: `{\
  "env": {\
    "ANTHROPIC_BASE_URL": "${anthropicUrl}",\
    "ANTHROPIC_AUTH_TOKEN": "${resolvedKey}",\
    "ANTHROPIC_MODEL": "${resolvedModel}"\
  }\
}`,
      codexConfig: `model = "${resolvedModel}"
model_provider = "obersai"

[model_providers.obersai]
name = "Obersai AI"
base_url = "${openaiUrl}"
env_key = "OBERSAI_API_KEY"
wire_api = "responses"`,
      codexRun: `$env:OBERSAI_API_KEY="${resolvedKey}"
codex`,
      opencode: `{\
  "$schema": "https://opencode.ai/config.json",\
  "model": "obersai/${resolvedModel}",\
  "providers": {\
    "obersai": {\
      "name": "Obersai AI",\
      "env": ["OBERSAI_API_KEY"],\
      "package": "@opencode/ai/providers/openai-compatible",\
      "settings": { "baseURL": "${openaiUrl}" },\
      "models": { "${resolvedModel}": { "name": "${resolvedModel}" } }\
    }\
  }\
}`,
      curl: `curl ${openaiUrl}/chat/completions \\\
  -H "Authorization: Bearer ${resolvedKey}" \\\
  -H "Content-Type: application/json" \\\
  -d '{"model":"${resolvedModel}","messages":[{"role":"user","content":"${sampleMessage}"}]}'`,
      javascript: `import OpenAI from "openai";

const client = new OpenAI({\
  apiKey: "${resolvedKey}",\
  baseURL: "${openaiUrl}",\
});

const response = await client.chat.completions.create({\
  model: "${resolvedModel}",\
  messages: [{ role: "user", content: "${sampleMessage}" }],\
});

console.log(response.choices[0].message.content);`,
      python: `from openai import OpenAI

client = OpenAI(\
    api_key="${resolvedKey}",\
    base_url="${openaiUrl}",\
)

response = client.chat.completions.create(\
    model="${resolvedModel}",\
    messages=[{"role": "user", "content": "${sampleMessage}"}],\
)

print(response.choices[0].message.content)`,
      anthropic: `curl ${anthropicUrl}/v1/messages \\\
  -H "Authorization: Bearer ${resolvedKey}" \\\
  -H "anthropic-version: 2023-06-01" \\\
  -H "Content-Type: application/json" \\\
  -d '{"model":"${resolvedModel}","max_tokens":1024,"messages":[{"role":"user","content":"${sampleMessage}"}]}'`,
    }),
    [anthropicUrl, openaiUrl, resolvedKey, resolvedModel, sampleMessage]
  )

  return { anthropicUrl, openaiUrl, resolvedKey, resolvedModel, codes }
}
