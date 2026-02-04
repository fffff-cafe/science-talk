import { notFound } from "next/navigation"
import { SlideViewer } from "components/SlideViewer"
import { getSlideContent, getSlideIds } from "utilities/slide"

export const generateStaticParams = () => {
  const ids = getSlideIds()
  return ids.map((id) => ({ id }))
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const content = getSlideContent(id)

  if (!content) {
    notFound()
  }

  return <SlideViewer content={content} />
}

export default Page
