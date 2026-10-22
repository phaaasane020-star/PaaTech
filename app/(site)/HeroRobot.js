'use client'
import { useState } from 'react'
import Spline from '@splinetool/react-spline'

// 3D robot for the home hero. The scene's own background is light grey, so it is switched to near-black (#0B1A14, the site's ink)
// as soon as it loads, and the robot fades in only after that (no grey flash).
export default function HeroRobot({ className = '' }) {
  const [ready, setReady] = useState(false)
  return (
    <Spline
      scene="https://prod.spline.design/XThLyGfkOJs22brj/scene.splinecode"
      className={`${className} transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
      onLoad={(app) => {
        app.setBackgroundColor?.('#0B1A14')
        setReady(true)
      }}
    />
  )
}
