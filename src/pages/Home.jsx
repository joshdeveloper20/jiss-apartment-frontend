import About from "../components/About";
import Amenities from "../components/Amenities";
import Blogs from "../components/Blogs";
import CTA from "../components/CTA";
import Featured from "../components/Featured";
import Hero from "../components/Hero";
import LocationSection from "../components/LocationSection";
import SpecialOffers from "../components/SpecialOffers";
import Testimonials from "../components/Testimonials";
import { useRooms } from "../hooks/useRooms";

const Home = () => {
  const { rooms, loading, error } = useRooms();
  return (
    <>
      <Hero />
      <Featured rooms={rooms} loading={loading} error={error} />
      <About />
      <Amenities />
      {/* <SpecialOffers /> */}
      <Testimonials />
      {/* <Blogs /> */}
      <LocationSection />
      <CTA />
    </>
  );
};
export default Home;
