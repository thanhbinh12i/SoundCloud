"use client"
import { useState, useEffect } from 'react';
import MainSlider from "@/components/main/main.slider";
import { get } from "@/utils/request";

const HomePage = () => {
  const [chills, setChills] = useState<any[]>([]);
  const [sads, setSads] = useState<any[]>([]);
  const [genZs, setGenZs] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chillsData = await get("tracks?category=Chill");
        const sadsData = await get('tracks?category=Sad');
        const genZsData = await get('tracks?category=GenZ');
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
      <MainSlider
        title={"Top Chill"}
        data={chills ?? []}
      />
      <MainSlider
        title={"Top Nhạc Buồn"}
        data={sads ?? []}
      />
      <MainSlider
        title={"Top Nhạc GenZ"}
        data={genZs ?? []}
      />
    </>
  );
};

export default HomePage;
