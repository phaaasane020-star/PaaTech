'use client'
import { useEffect, useRef, useState } from 'react'

// 3D robot for the home hero, shown with Google's free <model-viewer> (no watermark).
// Model: "RobotExpressive" by Tomás Laulhé, CC0 1.0 (public domain) — file lives at /public/models/robot.glb.
// On load: the yellow body is re-tinted to graphite to suit the dark hero, the robot waves once, then idles.
const GRAPHITE = [0.07, 0.09, 0.08, 1]

export default function HeroRobot({ className = '' }) {
  const ref = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    import('@google/model-viewer') // registers the <model-viewer> element in the browser only
    const el = ref.current
    if (!el) return

    const onLoad = () => {
      // re-tint the bright yellow parts to graphite with a soft metallic finish
      for (const m of el.model?.materials || []) {
        const pbr = m.pbrMetallicRoughness
        const [r, g, b] = pbr.baseColorFactor
        if (r > 0.5 && g > 0.35 && b < 0.35) {
          pbr.setBaseColorFactor(GRAPHITE)
          pbr.setMetallicFactor(0.55)
          pbr.setRoughnessFactor(0.35)
        }
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
      exposure="1.1"
      shadow-intensity="1"
      shadow-softness="0.8"
      loading="eager"
      class={`${className} transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
      style={{ backgroundColor: 'transparent', '--poster-color': 'transparent', '--progress-bar-height': '0px' }}
    />
  )
}
