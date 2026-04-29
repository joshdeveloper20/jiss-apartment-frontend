import { useState, useEffect } from "react";
import outside1 from "../assets/images/outside-1.png";
import outside2 from "../assets/images/outside-2.png";
import outside3 from "../assets/images/outside-3.png";
import outside4 from "../assets/images/outside-4.png";
import pool from "../assets/images/pool-1.png";
import snoker1 from "../assets/images/snoker-1.png";
import snoker2 from "../assets/images/snoker-2.png";
import gym1 from "../assets/images/gym-1.png";
import lounge1 from "../assets/images/lounge-1.png";
import compound1 from "../assets/images/compound-1.png";
import reception from "../assets/images/reception.png";
import jissView from "../assets/images/jiss_view.jpeg";

const Hero = () => {
  const images = [
    jissView,
    outside1,
    outside2,
    outside3,
    outside4,
    pool,
    snoker1,
    snoker2,
    gym1,
    lounge1,
    compound1,
    reception,
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageUrl, setImageUrl] = useState(images[0]);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      const timeout = setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setIsFading(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }, 8000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    setImageUrl(images[currentImageIndex]);
  }, [currentImageIndex, images]);

  return (
    <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0">
        <div
          className={`w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out ${isFading ? "opacity-0 scale-105" : "opacity-100 scale-100"}`}
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div className="max-w-4xl text-center text-white relative z-10">
        <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest mb-6">
          World className Hospitality
        </span>
        <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Experience Luxury <span className="text-mutedGold">Redefined</span> in
          Nigeria
        </h1>
        <p className="text-lg md:text-xl font-light opacity-90 mb-10 max-w-2xl mx-auto">
          Discover an oasis of elegance and comfort in the heart of West Africa.
          From Lagos shores to Abuja's hills, experience the gold standard of
          African luxury.
        </p>
        {/* Search Bar Card */}
        {/* <div className="bg-white p-6 md:p-8 rounded-luxury shadow-2xl flex flex-wrap lg:flex-nowrap gap-4 items-end text-luxuryText text-left relative z-10">
          <div className="w-full lg:w-1/4">
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Location</label>
            <select className="w-full border-gray-100 rounded-lg focus:ring-mutedGold focus:border-mutedGold">
              <option>Victoria Island, Lagos</option>
              <option>Maitama, Abuja</option>
              <option>Port Harcourt</option>
            </select>
          </div> 
          <div className="w-full sm:w-1/2 lg:w-1/6">
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2">
              Check-in
            </label>
            <input
              className="w-full border-gray-100 rounded-lg focus:ring-mutedGold focus:border-mutedGold"
              type="date"
            />
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/6">
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2">
              Check-out
            </label>
            <input
              className="w-full border-gray-100 rounded-lg focus:ring-mutedGold focus:border-mutedGold"
              type="date"
            />
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/6">
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2">
              Guests
            </label>
            <select className="w-full border-gray-100 rounded-lg focus:ring-mutedGold focus:border-mutedGold">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/6">
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2">
              Children
            </label>
            <select className="w-full border-gray-100 rounded-lg focus:ring-mutedGold focus:border-mutedGold">
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="w-full lg:w-1/4">
            <button className="w-full bg-mutedGold text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2">
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewbox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  fill-rule="evenodd"
                ></path>
              </svg>
              Search Rooms
            </button>
          </div>
        </div> */}
        {/* Trust Badges */}
        {/* <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-80">
          <div className="flex items-center gap-2">
            <span className="text-mutedGold">★</span>
            <span className="text-sm font-medium">Top-rated in Lagos 2024</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-mutedGold">✔</span>
            <span className="text-sm font-medium">
              Trusted by 5,000+ guests
            </span>
          </div>
        </div> */}
      </div>
    </section>
  );
};
export default Hero;
