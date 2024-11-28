"use client"
import WaveTrack from '@/components/track/wave.track'
import { Container } from '@mui/material'
import { useSearchParams } from 'next/navigation'

const DetailTrackPage = ({ params }: { params: { slug: string } }) => {
      const searchParams = useSearchParams()

      const search = searchParams.get('search')
      return (
            <>
                  <Container>
                        <WaveTrack />
                  </Container>
            </>
      )
}
export default DetailTrackPage