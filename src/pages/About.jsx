import outsideImg from "../assets/images/jiss_view.jpeg";
import room1 from "../assets/images/room1.png";
import Amenities from "../components/Amenities";
import Facilities from "../components/Facilities";
import { Wifi, Zap, Shield, MapPin, Plane, Heart } from "lucide-react";

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
      <Amenities />
      <Facilities />

      {/* Amenities Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-luxuryText mb-4">
              We Also Provide
            </h2>
            <div className="w-24 h-1 bg-mutedGold mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <Wifi className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-heading text-xl font-bold text-luxuryText mb-3">
                Complimentary High-Speed Wi-Fi
              </h3>
              <p className="text-textSecondary leading-relaxed">
                Stay connected with blazing fast internet access throughout your
                stay. Perfect for business travelers and streaming enthusiasts.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-amber-50 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-heading text-xl font-bold text-luxuryText mb-3">
                24-Hour Uninterrupted Power
              </h3>
              <p className="text-textSecondary leading-relaxed">
                Enjoy seamless comfort with our reliable backup power systems.
                Never worry about outages during your stay.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-heading text-xl font-bold text-luxuryText mb-3">
                Secure & Comfortable Environment
              </h3>
              <p className="text-textSecondary leading-relaxed">
                Your safety is our priority. We provide round-the-clock security
                and a peaceful atmosphere for your peace of mind.
              </p>
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-luxuryText rounded-3xl p-10 md:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-mutedGold opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-mutedGold opacity-10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-mutedGold/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Plane className="w-10 h-10 text-mutedGold" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-mutedGold mb-2">
                    <MapPin className="w-5 h-5" />
                    <span className="font-semibold uppercase tracking-wider text-sm">
                      Prime Location
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
                    Just 10 Minutes from Port Harcourt International Airport
                  </h3>
                  <p className="text-white/70 text-lg leading-relaxed max-w-xl">
                    Conveniently located, we are easily accessible for
                    travelers. Whether you're arriving or departing, our
                    proximity to the airport ensures stress-free transportation.
                  </p>
                </div>
              </div>
              <div className="hidden md:block w-1px h-32 bg-white/20"></div>
              <div className="text-center md:text-left">
                <div className="w-16 h-16 bg-mutedGold/20 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
                  <Heart className="w-8 h-8 text-mutedGold" />
                </div>
                <p className="text-white/80 text-lg font-medium italic">
                  "At Jiss Apartment & Hotel, we don't just offer accommodation
                  — we create an experience defined by comfort, quality, and
                  excellence."
                </p>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .bg-luxuryText {
              background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            }
          }
        `}</style>
      </section>
    </>
  );
};
export default About;
