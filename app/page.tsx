'use client';

import HeroSection from '@/components/HeroSection';
import HomePageDresses from '@/components/HomePageDress';
import TrendCards from '@/components/TrendCards';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <TrendCards />
      <HomePageDresses />
    </div>
  );
};

export default Home;
