import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

const RoomDetailsContent = ({ room }) => {
  const summaryText =
    room?.description?.[0] ||
    "Elevate your stay with a spacious room designed for relaxation and productivity. Enjoy premium amenities, thoughtful details, and a tranquil environment in the heart of the city.";
  const details = room?.description?.slice(1) || [];
  const amenities = room?.amenities || [
    "Free Ultra-Fast WiFi",
    '65" Smart TV',
    "24/7 Power Supply",
    "Room Service",
    "Premium Mini Bar",
    "24/7 Security",
  ];
  const roomSize = room?.size || "65 sqm";
  const pricePerNight = room?.price_per_night ?? 125000;
  const availability = room?.available ?? true;
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [dateError, setDateError] = useState("");
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkIn || !checkOut) {
      setDateError("");
      return;
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      setDateError("Please choose valid dates.");
      return;
    }

    if (checkOutDate <= checkInDate) {
      setDateError("Check-out must be after check-in.");
      return;
    }

    setDateError("");
  }, [checkIn, checkOut]);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) {
      return 0;
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = (end.getTime() - start.getTime()) / 86400000;
    return diff > 0 ? Math.floor(diff) : 0;
  }, [checkIn, checkOut]);

  const subtotal = nights * pricePerNight;
  const serviceCharge = Math.round(subtotal * 0.05);
  const total = subtotal + serviceCharge;
  const validBooking = nights > 0 && !dateError;

  const today = new Date().toISOString().split("T")[0];

  const handleBookingSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (room?._id) {
      params.set("roomId", room._id);
    }
    if (checkIn) {
      params.set("checkIn", checkIn);
    }
    if (checkOut) {
      params.set("checkOut", checkOut);
    }
    navigate(`/booking?${params.toString()}`);
  };

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12"
      data-purpose="room-content-grid"
    >
      <div className="lg:col-span-2">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-heading font-bold mb-6 text-luxuryText">
              {room?.name || "The Luxe Experience"}
            </h2>
            <p className="text-gray-500 leading-relaxed text-lg">
              {summaryText}
            </p>
            {details.length > 0 && (
              <div
                className="mt-6 overflow-hidden text-gray-500 leading-relaxed transition-all duration-300"
                style={{ maxHeight: showMore ? "1000px" : "0px" }}
              >
                <div className="space-y-4">
                  {details.map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            )}
            {details.length > 0 && (
              <button
                type="button"
                onClick={() => setShowMore((prev) => !prev)}
                className="mt-4 text-sm font-semibold text-mutedGold hover:text-black transition-colors"
              >
                {showMore ? "Show less" : "Show more"}
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-black/5">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 bg-white luxury-card-shadow rounded-full flex items-center justify-center mb-3">
                <svg
                  className="h-6 w-6 text-mutedGold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <span className="text-xs uppercase tracking-tighter text-gray-500">
                Guests
              </span>
              <p className="font-bold text-luxuryText">2 Persons</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 bg-white luxury-card-shadow rounded-full flex items-center justify-center mb-3">
                <svg
                  className="h-6 w-6 text-mutedGold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <span className="text-xs uppercase tracking-tighter text-gray-500">
                Bed Type
              </span>
              <p className="font-bold text-luxuryText">King Size</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 bg-white luxury-card-shadow rounded-full flex items-center justify-center mb-3">
                <svg
                  className="h-6 w-6 text-mutedGold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <span className="text-xs uppercase tracking-tighter text-gray-500">
                Size
              </span>
              <p className="font-bold text-luxuryText">{roomSize}</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 bg-white luxury-card-shadow rounded-full flex items-center justify-center mb-3">
                <svg
                  className="h-6 w-6 text-mutedGold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-7h.01"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <span className="text-xs uppercase tracking-tighter text-gray-500">
                View
              </span>
              <p className="font-bold text-luxuryText">City Skyline</p>
            </div>
          </div>

          <div data-purpose="amenities-section">
            <h3 className="text-2xl font-heading font-bold mb-8 text-luxuryText">
              Amenities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4">
              {amenities.map((amenity, index) => (
                <div
                  key={`${amenity}-${index}`}
                  className="flex items-center space-x-3 group"
                >
                  <div className="p-2 bg-white luxury-card-shadow rounded-lg text-mutedGold">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-500 group-hover:text-luxuryText transition-colors">
                    {amenity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <aside className="relative">
        <div
          className="sticky sticky-card bg-white p-8 rounded-luxury border border-black/5 luxury-card-shadow"
          data-purpose="booking-card"
        >
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-3xl font-bold font-heading text-luxuryText">
                {formatPrice(pricePerNight)}
              </span>
              <span className="text-gray-500 text-sm ml-1">/ Night</span>
            </div>
            <span
              className={`text-xs font-bold uppercase tracking-wider ${availability ? "text-green-600" : "text-red-600"}`}
            >
              {availability ? "Available" : "Sold Out"}
            </span>
          </div>

          <form className="space-y-4" onSubmit={handleBookingSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-2">
                  Check-In
                </label>
                <input
                  min={today}
                  value={checkIn}
                  onChange={(event) => setCheckIn(event.target.value)}
                  className="w-full bg-luxuryBg border-none rounded-xl p-4 text-sm text-luxuryText focus:ring-2 focus:ring-mutedGold"
                  type="date"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-2">
                  Check-Out
                </label>
                <input
                  min={checkIn || today}
                  value={checkOut}
                  onChange={(event) => setCheckOut(event.target.value)}
                  className="w-full bg-luxuryBg border-none rounded-xl p-4 text-sm text-luxuryText focus:ring-2 focus:ring-mutedGold"
                  type="date"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-2">
                  Guests
                </label>
                <select
                  value={guests}
                  onChange={(event) => setGuests(event.target.value)}
                  className="w-full bg-luxuryBg border-none rounded-xl p-4 text-sm text-luxuryText focus:ring-2 focus:ring-mutedGold"
                >
                  {[1, 2, 3, 4].map((count) => (
                    <option key={count} value={count}>
                      {count} Guest{count > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {dateError && <p className="text-sm text-red-600">{dateError}</p>}

            <div className="pt-4 border-t border-black/5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  {nights > 0
                    ? `${formatPrice(pricePerNight)} x ${nights} night${nights > 1 ? "s" : ""}`
                    : "Select dates"}
                </span>
                <span className="text-luxuryText font-medium">
                  {nights > 0 ? formatPrice(subtotal) : "—"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Service Charge (5%)</span>
                <span className="text-luxuryText font-medium">
                  {nights > 0 ? formatPrice(serviceCharge) : "—"}
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 text-luxuryText">
                <span>Total</span>
                <span className="text-mutedGold">
                  {nights > 0 ? formatPrice(total) : formatPrice(pricePerNight)}
                </span>
              </div>
            </div>

            <button
              className="w-full bg-mutedGold text-black font-bold py-4 rounded-xl hover:bg-mutedGold/90 transition-all shadow-lg shadow-mutedGold/20"
              type="submit"
            >
              Book this room
            </button>
            <p className="text-[10px] text-center text-gray-500 uppercase tracking-widest pt-2">
              Complete your reservation on the booking page.
            </p>
          </form>
        </div>
      </aside>
    </section>
  );
};
export default RoomDetailsContent;
