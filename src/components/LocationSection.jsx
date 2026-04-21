import mapImg from "../assets/images/map.png";

const addressData = [
  {
    id: 1,
    icon: "📍",
    title: "Our Main Address",
    description:
      "No. 5, Jiss Drive, Industrial Gate, Radio Estate off NTA Road, Port Harcourt, Rivers State, Nigeria.",
  },
  {
    id: 2,
    icon: "📞",
    title: "Contact Number",
    description: "+234 916 763 0305",
  },
  {
    id: 3,
    icon: "🏢",
    title: "Key Landmarks",
    description: "Mountain of fire, Ozuoba or AIT industrial gate",
  },
];

const LocationSection = () => {
  return (
    <section className="py-24 bg-softCream" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-luxury overflow-hidden shadow-2xl flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-12">
            <h2 className="font-heading text-3xl font-bold mb-6">
              Visit Our Oasis
            </h2>
            <div className="space-y-6">
              {addressData.map(({ id, icon, title, description }) => (
                <div className="flex items-start gap-4">
                  <div className="text-mutedGold mt-1">{icon}</div>
                  <div>
                    <h4 className="font-bold">{title}</h4>
                    <p className="text-gray-500 text-sm">{description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 p-6 bg-luxuryBg rounded-xl border border-dashed border-mutedGold/30">
              <p className="text-sm font-medium italic">
                "The most secure and accessible luxury location in Port
                Harcourt." - Global Travel Review
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-80 md:h-auto bg-gray-200">
            {/* Map Placeholder */}
            <div className="w-full h-full flex items-center justify-center bg-gray-300 relative">
              {/* <img
                alt="Map View"
                className="w-full h-full object-cover opacity-60"
                src={mapImg}
              /> */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.4234892392315!2d6.948160273966305!3d4.8684982401821655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069cf0b6dd4a40d%3A0x2236b42fd74dd95b!2sJiss%20Apartments%20%26%20Hotel!5e0!3m2!1sen!2sng!4v1775222405399!5m2!1sen!2sng"
                className="border-0 w-full h-full"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute bg-white p-4 rounded-luxury shadow-xl flex items-center gap-3">
                <div className="w-4 h-4 bg-mutedGold rounded-full animate-ping"></div>
                <span className="font-bold text-xs uppercase tracking-widest">
                  Find us here
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LocationSection;
