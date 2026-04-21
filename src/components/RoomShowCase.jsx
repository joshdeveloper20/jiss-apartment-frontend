import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { nairaFormatter } from "../services/formatPrice";

const RoomShowCase = ({ rooms, loading, error }) => {
  const [activeTab, setActiveTab] = useState("all");

  const categories = ["all", "Room", "Serviced Apartment"];

  const filteredRooms =
    activeTab === "all"
      ? rooms
      : rooms.filter((item) => item.category === activeTab);

  const counts = {
    all: rooms.length,
    Room: rooms.filter((item) => item.category === "Room").length,
    "Serviced Apartment": rooms.filter(
      (item) => item.category === "Serviced Apartment",
    ).length,
  };

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-20 py-16">
      <div className="mb-10">
        <h2 className="text-luxuryBrown text-3xl font-bold mb-2">
          Our Accommodations
        </h2>
        <p className="text-slate-600">
          Sophisticated spaces tailored for the discerning business traveler.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2 rounded-full cursor-pointer capitalize transition-all duration-300 ${
                activeTab === cat
                  ? "bg-mutedGold text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <span>{cat}</span>
              <span
                className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                  activeTab === cat
                    ? "bg-luxuryBrown text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {counts[cat]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <motion.div layout>
        <div className="space-y-12">
          {loading ? (
            <p className="text-center text-gray-500">Loading rooms...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : filteredRooms.length === 0 ? (
            <p className="text-center text-gray-500">No rooms available.</p>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredRooms.map(
                ({
                  _id: id,
                  name,
                  category,
                  tagline,
                  description,
                  size,
                  price_per_night,
                  amenities,
                  images,
                  slug,
                }) => (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col lg:flex-row bg-white rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 transition-all hover:shadow-2xl"
                  >
                    <div className="lg:w-2/5 relative h-72 lg:h-80">
                      <img
                        alt={name}
                        className="w-full h-full object-cover"
                        src={images?.[0]?.url}
                      />
                    </div>

                    <div className="lg:w-3/5 p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-2xl font-bold text-slate-900">
                            {name}
                          </h3>
                          <div className="flex items-center gap-1 text-mutedGold">
                            <span className="material-symbols-outlined fill-1">
                              star
                            </span>
                            <span className="font-bold text-slate-800">
                              4.9
                            </span>
                          </div>
                        </div>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                          {description?.[0] || tagline}
                        </p>

                        <div className="flex flex-wrap gap-6 mb-8">
                          <div className="flex items-center gap-2 text-slate-500">
                            <span className="material-symbols-outlined text-luxuryBrown">
                              king_bed
                            </span>
                            <span className="text-sm">King Bed</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-500">
                            <span className="material-symbols-outlined text-luxuryBrown">
                              group
                            </span>
                            <span className="text-sm">2 Guests</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-500">
                            <span className="material-symbols-outlined text-luxuryBrown">
                              square_foot
                            </span>
                            <span className="text-sm">{size || "N/A"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
                        <div>
                          <span className="text-sm text-slate-500 uppercase tracking-tighter">
                            Starting from
                          </span>
                          <div className="text-2xl font-bold text-luxuryBrown">
                            {nairaFormatter.format(price_per_night) || "0"}{" "}
                            <span className="text-sm font-normal text-slate-500">
                              / night
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                          <Link
                            to={`/${category.toLowerCase().split(" ").join("-")}/${slug}`}
                            className="flex-1 sm:flex-none px-6 py-3 border-2 border-luxuryBrown text-luxuryBrown font-bold rounded-xl hover:bg-luxuryBrown/5 transition-colors whitespace-nowrap"
                          >
                            View Details
                          </Link>
                          <button className="flex-1 sm:flex-none px-6 py-3 bg-luxuryBrown text-white font-bold rounded-xl hover:bg-luxuryBrown/90 transition-shadow shadow-lg shadow-luxuryBrown/20 whitespace-nowrap">
                            Check Availability
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ),
              )}
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default RoomShowCase;
