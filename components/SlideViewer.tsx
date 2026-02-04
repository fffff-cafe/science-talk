"use client"

import { useEffect, useRef } from "react"

type SlideViewerProps = {
  content: string
}

export const SlideViewer = ({ content }: SlideViewerProps) => {
  const deckRef = useRef<HTMLDivElement>(null)
  const revealRef = useRef<{ destroy: () => void } | null>(null)

  useEffect(() => {
    if (!deckRef.current || revealRef.current) return

    const initReveal = async () => {
      const Reveal = (await import("reveal.js")).default
      const Markdown = (await import("reveal.js/plugin/markdown/markdown")).default

      const deck = new Reveal(deckRef.current!, {
        plugins: [Markdown],
        embedded: true,
        hash: true,
        slideNumber: true,
      })

      deck.initialize()
      revealRef.current = deck
    }

    initReveal()

    return () => {
      if (revealRef.current) {
        revealRef.current.destroy()
        revealRef.current = null
      }
    }
  }, [])

  return (
    <div
      className="reveal"
      ref={deckRef}
      style={{ width: "100%", height: "100dvh" }}
    >
      <div className="slides">
        <section data-markdown="" data-separator="^---$">
          <script type="text/template">{content}</script>
        </section>
      </div>
    </div>
  )
}
