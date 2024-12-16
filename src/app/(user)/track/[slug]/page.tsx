import WaveTrack from '@/components/track/wave.track'
import { get } from '@/utils/request';
import { Container } from '@mui/material'

const DetailTrackPage = async (props: any) => {
      const { params } = props;
      const data = await get<ITrackTop[]>(`tracks?id=${params.slug}`)
      const comments = await get<ITrackComment[]>(`comments?track=${params.slug}&limit=10`)
      return (
            <>
                  <Container>
                        <WaveTrack track={data[0]} comments={comments} />
                  </Container>
            </>
      )
}
export default DetailTrackPage