import WaveTrack from '@/components/track/wave.track'
import { get } from '@/utils/request';
import { Container } from '@mui/material'

const DetailTrackPage = async (props: any) => {
      const { params } = props;
      const data = await get<ITrackTop[]>(`tracks?id=${params.slug}`)
      return (
            <>
                  <Container>
                        <WaveTrack track={data[0]} />
                  </Container>
            </>
      )
}
export default DetailTrackPage