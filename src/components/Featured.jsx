import { Link } from "react-router-dom";
import { nairaFormatter } from "../services/formatPrice";

const Featured = ({ rooms, loading, error }) => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto" id="rooms">
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl font-bold mb-4">
          Our Finest Rooms &amp; Suites
        </h2>
        <div className="w-20 h-1 bg-mutedGold mx-auto rounded-full"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Room Card  */}
        {rooms
          .slice(0, 3)
          .map(
            ({
              _id: id,
              name,
              category,
              slug,
              tagline,
              description,
              size,
              price_per_night,
              amenities,
              images,
            }) => (
              <div
                key={id}
                className="bg-white rounded-luxury overflow-hidden luxury-card-shadow transition-transform hover:-translate-y-2"
              >
                <div className="h-64 relative">
                  <img
                    alt={name}
                    className="w-full h-full object-cover"
                    src={images[0]?.url}
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-luxuryBrown">
                    {nairaFormatter.format(price_per_night)}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading font-bold text-xl">{name}</h3>
                    <div className="flex text-mutedGold text-sm">★★★★★</div>
                  </div>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                    {description[0]}
                  </p>
                  <Link
                    to={`/${category.toLowerCase().split(" ").join("-")}/${slug}`}
                    className="cursor-pointer"
                  >
                    <button className="w-full py-3 border border-luxuryBrown text-luxuryBrown font-bold rounded-lg hover:bg-luxuryBrown hover:text-white transition-all">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ),
          )}
      </div>
    </section>
  );
};
export default Featured;
