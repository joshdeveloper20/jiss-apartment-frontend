const amenitiesData = [
  {
    icon: "📶",
    name: "Free High-Speed WiFi",
  },
  {
    icon: "🏊",
    name: "Infinity Pool",
  },
  {
    icon: "🏋️",
    name: "Modern Gym",
  },
  {
    icon: "🛐",
    name: "Executive Lounge",
  },
  {
    icon: "🍽️",
    name: "Fine Restaurant",
  },
  {
    icon: "✈️",
    name: "Airport Pickup",
  },
  {
    icon: "⚡",
    name: "24/7 Power Supply",
  },
  {
    icon: "🍹",
    name: "Pool Bar",
  },
];

const Amenities = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Unmatched Amenities
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            We provide the highest level of amenities to ensure your stay is as
            comfortable and productive as possible.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {amenitiesData.map(({ icon, name }) => (
            <div className="flex flex-col items-center p-8 border border-gray-100 rounded-luxury hover:bg-softCream transition-colors group">
              <div className="w-16 h-16 mb-4 flex items-center justify-center bg-luxuryBg rounded-full group-hover:bg-white transition-colors">
                <span className="text-3xl">{icon}</span>
              </div>
              <span className="font-bold text-sm uppercase tracking-wide">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Amenities;
