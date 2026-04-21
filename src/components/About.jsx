import aboutImg from "../assets/images/outside-1.png";

const About = () => {
  return (
    <section className="bg-softCream py-24 px-6 overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="w-full lg:w-1/2 relative">
          <div className="relative z-10 rounded-luxury overflow-hidden shadow-2xl">
            <img
              alt="Luxe Entrance"
              className="w-full aspect-square object-cover"
              src={aboutImg}
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-1/2 h-1/2 bg-mutedGold rounded-luxury -z-10"></div>
          <div className="absolute -top-6 -left-6 border-4 border-luxuryBrown w-1/4 h-1/4 rounded-luxury -z-10"></div>
        </div>
        <div className="w-full lg:w-1/2">
          <span className="text-mutedGold font-bold uppercase tracking-widest text-sm">
            Our Legacy
          </span>
          <h2 className="font-heading text-4xl font-bold mt-4 mb-8 leading-tight">
            Where Nigerian Heritage Meets Modern Sophistication
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Established as a beacon of high-end hospitality in West Africa,
            LuxeNigeria offers more than just a stay—we offer an experience that
            celebrates the vibrant culture of Nigeria through a lens of absolute
            luxury.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0">
                <svg
                  className="w-5 h-5 text-mutedGold"
                  fill="none"
                  stroke="currentColor"
                  viewbox="0 0 24 24"
                >
                  <path
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  ></path>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-luxuryBrown">Premium Security</h4>
                <p className="text-xs text-gray-500">
                  24/7 elite protection services.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0">
                <svg
                  className="w-5 h-5 text-mutedGold"
                  fill="none"
                  stroke="currentColor"
                  viewbox="0 0 24 24"
                >
                  <path
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  ></path>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-luxuryBrown">24/7 Concierge</h4>
                <p className="text-xs text-gray-500">Always at your service.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0">
                <svg
                  className="w-5 h-5 text-mutedGold"
                  fill="none"
                  stroke="currentColor"
                  viewbox="0 0 24 24"
                >
                  <path
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  ></path>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-luxuryBrown">Fine Dining</h4>
                <p className="text-xs text-gray-500">
                  Authentic local and global cuisine.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0">
                <svg
                  className="w-5 h-5 text-mutedGold"
                  fill="none"
                  stroke="currentColor"
                  viewbox="0 0 24 24"
                >
                  <path
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  ></path>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-luxuryBrown">Event Hosting</h4>
                <p className="text-xs text-gray-500">
                  World-className conference facilities.
                </p>
              </div>
            </div>
          </div>
          <button className="bg-luxuryBrown text-white px-8 py-4 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all">
            Learn More About Us
          </button>
        </div>
      </div>
    </section>
  );
};
export default About;
