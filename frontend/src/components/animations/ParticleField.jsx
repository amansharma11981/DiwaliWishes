import { useEffect, useRef } from 'react'

export default function ParticleField() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const particles = []
    const count = 50

    for (let i = 0; i < count; i++) {
      const dot = document.createElement('div')
      const size = Math.random() * 3 + 1
      const x = Math.random() * 100
      const y = Math.random() * 100
      const delay = Math.random() * 6
      const duration = Math.random() * 4 + 4
      const opacity = Math.random() * 0.6 + 0.1
      const colors = ['#FFD700', '#FF6B00', '#FF69B4', '#9B59B6', '#00CED1', '#fff']
      const color = colors[Math.floor(Math.random() * colors.length)]

      dot.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        opacity: ${opacity};
        animation: twinkle ${duration}s ${delay}s ease-in-out infinite alternate;
        box-shadow: 0 0 ${size * 2}px ${color};
        pointer-events: none;
      `
      container.appendChild(dot)
      particles.push(dot)
    }

    return () => {
      particles.forEach(p => p.remove())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden"
      style={{ zIndex: 1 }}
    />
  )
}
