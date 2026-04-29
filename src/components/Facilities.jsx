import { useState, useEffect } from "react";
import pool1 from "../assets/images/pool-1.png";
import pool2 from "../assets/images/pool-2.png";
import pool3 from "../assets/images/pool-3.png";
import snoker1 from "../assets/images/snoker-1.png";
import snoker2 from "../assets/images/snoker-2.png";
import gym1 from "../assets/images/gym-1.png";
import gym2 from "../assets/images/gym-2.png";
import gym3 from "../assets/images/gym-3.png";
import gym4 from "../assets/images/gym-4.png";
import lounge1 from "../assets/images/lounge-1.png";
import lounge2 from "../assets/images/lounge-2.png";
import lounge3 from "../assets/images/lounge-3.png";
import lounge4 from "../assets/images/lounge-4.png";
import lounge5 from "../assets/images/lounge-5.png";

const facilities = [
  { name: "Swimming Pool", images: [pool1, pool2, pool3] },
  { name: "Snooker Room", images: [snoker1, snoker2] },
  { name: "Gym", images: [gym1, gym2, gym3, gym4] },
  { name: "Lounge", images: [lounge1, lounge2, lounge3, lounge4, lounge5] },
];

const Facilities = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const allImages = facilities.flatMap((facility) =>
    facility.images.map((img) => ({ img, name: facility.name })),
  );

  const totalSlides = allImages.length;

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const goToSlide = (index) => {
    setActiveSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrev = () => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="facilities-section">
      <div className="facilities-header">
        <h2>Our Facilities</h2>
        <p>
          Experience luxury and comfort with our world-class amenities designed
          for your relaxation and wellness. From sparkling swimming pools to
          state-of-the-art fitness centers, we have everything you need for an
          unforgettable stay.
        </p>
      </div>

      <div
        className="carousel-container"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <button className="carousel-arrow prev-arrow" onClick={goToPrev}>
          &#10094;
        </button>

        <div className="carousel-track">
          <div
            className="carousel-slides"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {allImages.map((item, index) => (
              <div key={index} className="carousel-slide">
                <img src={item.img} alt={`${item.name} ${index + 1}`} />
                <div className="slide-label">{item.name}</div>
              </div>
            ))}
          </div>
        </div>

        <button className="carousel-arrow next-arrow" onClick={goToNext}>
          &#10095;
        </button>

        <div className="carousel-dots">
          {allImages.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === activeSlide ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>

      <style>{`
        .facilities-section {
          padding: 60px 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .facilities-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .facilities-header h2 {
          font-size: 2.5rem;
          color: #1a1a1a;
          margin-bottom: 16px;
          font-weight: 700;
        }

        .facilities-header p {
          font-size: 1.1rem;
          color: #666;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.8;
        }

        .carousel-container {
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        }

        .carousel-track {
          overflow: hidden;
        }

        .carousel-slides {
          display: flex;
          transition: transform 0.5s ease-in-out;
        }

        .carousel-slide {
          min-width: 100%;
          position: relative;
        }

        .carousel-slide img {
          width: 100%;
          height: 500px;
          object-fit: cover;
        }

        .slide-label {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 10px 24px;
          border-radius: 30px;
          font-size: 1rem;
          font-weight: 500;
        }

        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.9);
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          font-size: 24px;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .carousel-arrow:hover {
          background: #fff;
          transform: translateY(-50%) scale(1.1);
        }

        .prev-arrow {
          left: 20px;
        }

        .next-arrow {
          right: 20px;
        }

        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 20px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          background: #ccc;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          background: #1a1a1a;
          transform: scale(1.2);
        }

        .dot:hover:not(.active) {
          background: #888;
        }

        @media (max-width: 768px) {
          .facilities-header h2 {
            font-size: 2rem;
          }

          .carousel-slide img {
            height: 300px;
          }

          .carousel-arrow {
            width: 40px;
            height: 40px;
            font-size: 18px;
          }

          .prev-arrow {
            left: 10px;
          }

          .next-arrow {
            right: 10px;
          }
        }
      `}</style>
    </section>
  );
};

export default Facilities;
