import "reveal.js/dist/reveal.css"
import "reveal.js/dist/theme/white.css"

const SlideLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1000,
        background: "#fff",
      }}
    >
      {children}
    </div>
  )
}

export default SlideLayout
