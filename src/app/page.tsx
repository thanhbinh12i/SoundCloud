
import { Container } from '@mui/material';
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import HomePageSlider from '@/components/main/homepage.slider';

export default async function HomePage() {
  const session = await getServerSession(authOptions)


  return (
    <>
      <Container>
        <HomePageSlider />
      </Container>
    </>
  )
}

