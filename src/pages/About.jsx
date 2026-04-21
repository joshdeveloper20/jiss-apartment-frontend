import outsideImg from "../assets/images/outside-1.png";
import room1 from "../assets/images/room1.png";

const About = () => {
  return (
    <>
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img
          alt="Jiss Apartment Exterior"
          className="absolute inset-0 w-full h-full object-cover"
          src={outsideImg}
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="font-heading text-5xl md:text-7xl text-white font-bold mb-6 leading-tight">
            About Our Hotel
          </h1>
          <p className="text-white/90 text-lg md:text-xl tracking-wide max-w-2xl mx-auto font-medium">
            Welcome to Jiss Apartment & Hotel, where comfort meets elegance in
            the heart of Port Harcourt.
          </p>
        </div>
      </section>

      <section className="mt-40 mb-20 bg-bgPrimary">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <img
              alt="Luxenigeria Detail"
              className="rounded-luxury shadow-2xl h-[600px] w-full object-cover"
              src={room1}
            />
          </div>
          <div className="order-1 md:order-2 space-y-8">
            <span className="text-mutedGold font-semibold uppercase tracking-widest text-sm">
              Since 2015
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-luxuryText leading-snug">
              About Jiss Apartment & Hotel
            </h2>
            <p className="text-textSecondary text-lg leading-relaxed">
              Welcome to Jiss Apartment & Hotel, where comfort meets elegance in
              the heart of Port Harcourt. Designed to offer a perfect blend of
              relaxation and sophistication, our hotel provides a serene
              environment for both business and leisure travelers.
            </p>
            <p className="text-textSecondary text-lg leading-relaxed">
              We proudly offer 34 cozy and tastefully furnished rooms, each
              thoughtfully designed to ensure a comfortable and memorable stay.
              Guests can unwind at our exquisite poolside bar, the perfect spot
              to relax, socialize, and enjoy refreshing drinks.
            </p>
            <p className="text-textSecondary text-lg leading-relaxed">
              Our fully equipped gym caters to your fitness needs, while our
              signature restaurant delights guests with a rich selection of both
              continental and African cuisines, prepared by experienced chefs.
            </p>
            <p className="text-textSecondary text-lg leading-relaxed">
              At Jiss Apartment & Hotel, hospitality is our priority. Our
              well-trained and courteous staff are dedicated to delivering
              exceptional service at all times. The luxury lounge offers a wide
              variety of premium liquors, creating an ideal setting for
              relaxation and entertainment.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
export default About;
