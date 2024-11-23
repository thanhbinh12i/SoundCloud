"use client"
import { useState, useEffect } from 'react';
import MainSlider from "@/components/main/main.slider";
import { get } from "@/utils/request";
import { Container } from '@mui/material';

const HomePage = () => {
  const [chills, setChills] = useState<any[]>([]);
  const [sads, setSads] = useState<any[]>([]);
  const [genZs, setGenZs] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [chillsData, sadsData, genZsData] = await Promise.all([
          get("tracks?category=Chill"),
          get("tracks?category=Sad"),
          get("tracks?category=GenZ")
        ]);

        setChills(Array.isArray(chillsData) ? chillsData : []);
        setSads(Array.isArray(sadsData) ? sadsData : []);
        setGenZs(Array.isArray(genZsData) ? genZsData : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Container>
        <MainSlider
          title={"Top Nhạc Hot"}
          data={genZs ?? []}
        />
        <MainSlider
          title={"Top Chill"}
          data={chills ?? []}
        />
        <MainSlider
          title={"Top Nhạc Buồn"}
          data={sads ?? []}
        />
      </Container>
    </>
  );
};

export default HomePage;
