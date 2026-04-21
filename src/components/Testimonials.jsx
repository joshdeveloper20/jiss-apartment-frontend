import testimonialImg from "../assets/images/testimonial-1.png";

const Testimonials = () => {
  return (
    <section className="py-24 bg-luxuryBrown text-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="font-heading text-3xl font-bold mb-16">
          Guest Experiences
        </h2>
        <div className="relative px-12">
          {/* Quote Icon */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-8xl text-white/10 font-heading font-bold">
            “
          </div>
          <div className="carousel-container overflow-hidden">
            <div className="text-2xl italic font-light mb-8 leading-relaxed">
              "The level of service at LuxeNigeria is unparalleled. From the
              moment I stepped into the lobby in Victoria Island, I felt like
              royalty. The attention to detail in the Presidential Suite was
              remarkable."
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-mutedGold">
                <img
                  alt="Guest"
                  className="w-full h-full object-cover"
                  src={testimonialImg}
                />
              </div>
              <h5 className="font-bold text-mutedGold">Chidi Okafor</h5>
              <p className="text-sm opacity-60 uppercase">CEO, TechAfrica</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
