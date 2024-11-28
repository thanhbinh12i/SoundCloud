import { Container } from '@mui/material';
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { get } from '@/utils/request';
import MainSlider from '@/components/main/main.slider';

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  const chillsData = await get("tracks?category=Chill")
  const sadsData = await get("tracks?category=Sad")
  const genZsData = await get("tracks?category=GenZ")
  return (
    <>
      <Container sx={{
        marginBottom: '100px'
      }}>
        <MainSlider
          title={"Top Nhạc Hot"}
          //@ts-ignore
          data={genZsData ?? []}
        />
        <MainSlider
          title={"Top Chill"}
          //@ts-ignore
          data={chillsData}
        />
        <MainSlider
          title={"Top Nhạc Buồn"}
          //@ts-ignore
          data={sadsData}
        />
      </Container>
    </>
  )
}

