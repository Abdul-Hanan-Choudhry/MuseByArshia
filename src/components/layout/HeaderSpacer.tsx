'use client'
import { useEffect, useState } from 'react'

export function HeaderSpacer() {
  const [height, setHeight] = useState(64)

  useEffect(() => {
    const el = document.getElementById('site-header')
    if (!el) return
    const obs = new ResizeObserver((entries) => {
      setHeight(entries[0].contentRect.height)
    })
    obs.observe(el)
    setHeight(el.getBoundingClientRect().height)
    return () => obs.disconnect()
  }, [])

  return <div style={{ height }} aria-hidden="true" />
}
