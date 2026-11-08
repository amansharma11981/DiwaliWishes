import { useEffect, useRef } from 'react'

export default function FireworksCanvas() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Particle {
      constructor(x, y, color) {
        this.x = x
        this.y = y
        this.color = color
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 6 + 2
        this.vx = Math.cos(angle) * speed
        this.vy = Math.sin(angle) * speed
        this.alpha = 1
        this.radius = Math.random() * 3 + 1
        this.gravity = 0.1
        this.decay = Math.random() * 0.015 + 0.01
        this.trail = []
      }
      update() {
        this.trail.push({ x: this.x, y: this.y, alpha: this.alpha })
        if (this.trail.length > 5) this.trail.shift()
        this.vy += this.gravity
        this.x += this.vx
        this.y += this.vy
        this.alpha -= this.decay
        this.vx *= 0.99
      }
      draw(ctx) {
        this.trail.forEach((t, i) => {
          ctx.beginPath()
          ctx.arc(t.x, t.y, this.radius * (i / this.trail.length), 0, Math.PI * 2)
          ctx.fillStyle = this.color.replace('1)', `${t.alpha * 0.5})`)
          ctx.fill()
        })
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color.replace('1)', `${this.alpha})`)
        ctx.shadowBlur = 10
        ctx.shadowColor = this.color
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    const colors = [
      'rgba(255,215,0,1)',
      'rgba(255,107,0,1)',
      'rgba(255,69,0,1)',
      'rgba(255,105,180,1)',
      'rgba(147,112,219,1)',
      'rgba(0,206,209,1)',
      'rgba(255,255,100,1)',
    ]

    let launchTimer = 0
    const launchInterval = 90 // frames

    const animate = () => {
      animRef.current = requestAnimationFrame(animate)
      ctx.fillStyle = 'rgba(10,10,46,0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      launchTimer++
      if (launchTimer >= launchInterval) {
        launchTimer = 0
        const x = Math.random() * canvas.width * 0.8 + canvas.width * 0.1
        const y = Math.random() * canvas.height * 0.5 + canvas.height * 0.05
        const color = colors[Math.floor(Math.random() * colors.length)]
        const count = Math.floor(Math.random() * 40) + 60
        for (let i = 0; i < count; i++) {
          particlesRef.current.push(new Particle(x, y, color))
        }
      }

      particlesRef.current = particlesRef.current.filter(p => p.alpha > 0.01)
      particlesRef.current.forEach(p => {
        p.update()
        p.draw(ctx)
      })
    }

    animate()
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full opacity-40"
      style={{ zIndex: 0 }}
    />
  )
}
