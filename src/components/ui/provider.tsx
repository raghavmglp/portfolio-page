"use client"

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"

// ← swap this to "'DM Mono', monospace" to revert
const FONT = "'DM Mono', monospace"

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: FONT },
        body:    { value: FONT },
        mono:    { value: "'DM Mono', monospace" },
      }
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: { value: { base: "#ffffff", _dark: "#2e3440" } },
          subtle:  { value: { base: "#f5f5f5", _dark: "#3b4252" } },
        },
        fg: {
          DEFAULT: { value: { base: "#111111", _dark: "#eceff4" } },
          muted:   { value: { base: "#666666", _dark: "#d8dee9" } },
        },
        border: {
          DEFAULT: { value: { base: "#e2e2e2", _dark: "#434c5e" } },
        },
      }
    }
  }
})

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
