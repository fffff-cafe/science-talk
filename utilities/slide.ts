import fs from "fs"
import path from "path"

const getSlidesDir = () => path.join(process.cwd(), "slides")

export const getSlideIds = (): string[] => {
  const slidesDir = getSlidesDir()
  if (!fs.existsSync(slidesDir)) {
    return []
  }
  const files = fs.readdirSync(slidesDir)
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""))
}

export const getSlideContent = (id: string) => {
  const filePath = path.join(getSlidesDir(), `${id}.md`)
  if (!fs.existsSync(filePath)) {
    return null
  }
  const content = fs.readFileSync(filePath, "utf-8")
  return content
}
