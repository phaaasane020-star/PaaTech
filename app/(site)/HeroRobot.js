'use client'
import { useEffect, useRef, useState } from 'react'

// 3D robot for the home hero, shown with Google's free <model-viewer> (no watermark).
// Model: "RobotExpressive" by Tomás Laulhé, CC0 1.0 (public domain) — file lives at /public/models/robot.glb.
// On load: the whole robot is re-coloured black (glossy body, matte joints), it waves, then idles.
const GLOSS_BLACK = [0.03, 0.03, 0.03, 1]
const MATTE_BLACK = [0.01, 0.01, 0.01, 1]

export default function HeroRobot({ className = '' }) {
  const ref = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    import('@google/model-viewer') // registers the <model-viewer> element in the browser only
    const el = ref.current
    if (!el) return

    const onLoad = () => {
      // make the whole robot black: bright parts become glossy black (light still shows the shape),
      // darker parts become matte black so the joints read as separate pieces
      for (const m of el.model?.materials || []) {
        const pbr = m.pbrMetallicRoughness
        const [r, g, b] = pbr.baseColorFactor
        const bright = (r + g + b) / 3 > 0.25
        pbr.setBaseColorFactor(bright ? GLOSS_BLACK : MATTE_BLACK)
        pbr.setMetallicFactor(bright ? 0.7 : 0.2)
        pbr.setRoughnessFactor(bright ? 0.22 : 0.6)
      }
      const names = el.availableAnimations || []
      if (names.includes('Wave')) {
        el.animationName = 'Wave'
        el.play({ repetitions: 2 })
      } else if (names.includes('Idle')) {
        el.animationName = 'Idle'
        el.play()
      }
      setReady(true)
    }
    const onFinished = () => {
      if ((el.availableAnimations || []).includes('Idle')) {
        el.animationName = 'Idle'
        el.play()
      }
    }

    el.addEventListener('load', onLoad)
    el.addEventListener('finished', onFinished)
    return () => {
      el.removeEventListener('load', onLoad)
      el.removeEventListener('finished', onFinished)
    }
  }, [])

  return (
    <model-viewer
      ref={ref}
      src="/models/robot.glb"
      alt="3D robot waving"
      camera-controls=""
      disable-zoom=""
      disable-pan=""
      touch-action="pan-y"
      interaction-prompt="none"
      camera-orbit="15deg 80deg auto"
      field-of-view="28deg"
      environment-image="neutral"
      exposure="1.35"
      shadow-intensity="1"
      shadow-softness="0.8"
      loading="eager"
      class={`${className} transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
      style={{ backgroundColor: 'transparent', '--poster-color': 'transparent', '--progress-bar-height': '0px' }}
    />
  )
}
