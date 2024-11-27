
import { useState, useEffect } from 'react';
import MainSlider from "@/components/main/main.slider";
import { get } from "@/utils/request";
import { Container } from '@mui/material';
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]/route';
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

