"use client"

import { useEffect, useRef } from "react"
import Reveal from "reveal.js"
import Markdown from "reveal.js/plugin/markdown/markdown"

type SlideViewerProps = {
  content: string
}

export const SlideViewer = ({ content }: SlideViewerProps) => {
  const deckRef = useRef<HTMLDivElement>(null)
  const revealRef = useRef<Reveal.Api | null>(null)

  useEffect(() => {
    if (!deckRef.current || revealRef.current) return

    const deck = new Reveal(deckRef.current, {
      plugins: [Markdown],
      embedded: true,
      hash: true,
      slideNumber: true,
    })

    deck.initialize()
    revealRef.current = deck

    return () => {
      deck.destroy()
      revealRef.current = null
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
