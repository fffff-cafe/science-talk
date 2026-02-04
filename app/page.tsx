import fs from "fs"
import path from "path"
import Link from "next/link"

type SlideItem = {
  slug: string
  title: string
  date: string
  author: string
}

const getSlides = (): SlideItem[] => {
  const slidesDir = path.join(process.cwd(), "slides")

  if (!fs.existsSync(slidesDir)) {
    return []
  }

  const files = fs.readdirSync(slidesDir)
  const mdFiles = files.filter((file) => file.endsWith(".md"))

  return mdFiles.map((file) => {
    const slug = file.replace(/\.md$/, "")
    const filePath = path.join(slidesDir, file)
    const content = fs.readFileSync(filePath, "utf-8")

    const lines = content.split("\n")
    const titleLine = lines.find((line) => line.startsWith("# "))
    const title = titleLine ? titleLine.replace(/^#\s*/, "") : slug

    const match = slug.match(/^(\d{4})(\d{2})(\d{2})_(.+)$/)
    const date = match ? `${match[1]}/${match[2]}/${match[3]}` : ""
    const author = match ? match[4] : ""

    return { slug, title, date, author }
  })
}

const Page = () => {
  const slides = getSlides()

  return (
    <div>
      {slides.length === 0 ? (
        <p>スライドがありません</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1rem",
          }}
        >
          {slides.map((slide) => (
            <Link
              key={slide.slug}
              href={`/slides/${slide.slug}`}
              style={{
                display: "block",
                padding: "1.5rem",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                textDecoration: "none",
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
            >
              <h2
                style={{
                  margin: "0 0 0.75rem 0",
                  fontSize: "1.125rem",
                  color: "#333",
                }}
              >
                {slide.title}
              </h2>
              <div style={{ fontSize: "0.875rem", color: "#666" }}>
                {slide.date && <span>{slide.date}</span>}
                {slide.date && slide.author && <span> / </span>}
                {slide.author && <span>@{slide.author}</span>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Page
