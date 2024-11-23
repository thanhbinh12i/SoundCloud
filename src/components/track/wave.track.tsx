"use client"
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import WaveSurfer from 'wavesurfer.js'
const WaveTrack = () => {
      const searchParams = useSearchParams()
      const fileName = searchParams.get('audio');
      const containerRef = useRef<HTMLDivElement>(null)

      useEffect(() => {
            const wavesurfer = WaveSurfer.create({
                  container: containerRef.current!,
                  waveColor: 'rgb(200, 0, 200)',
                  progressColor: 'rgb(100, 0, 100)',
                  url: `/api?audio=${fileName}`
            })
      }, [])
      return (
            <>
                  <div ref={containerRef}>

                  </div>
            </>
      )
}
export default WaveTrack