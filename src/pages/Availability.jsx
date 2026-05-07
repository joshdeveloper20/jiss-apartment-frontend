import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { checkRoomAvailability, getRoomById } from "../services/api";

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

const Availability = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availabilityData, setAvailabilityData] = useState(null);
  const [room, setRoom] = useState(null);

  const roomId = searchParams.get("roomId");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");

  useEffect(() => {
    const checkAvailability = async () => {
      try {
        setLoading(true);
        setError(null);

        // Validate parameters
        if (!roomId || !checkIn || !checkOut) {
          setError(
            "Missing required parameters. Please select dates and try again.",
          );
          return;
        }

        // Fetch room and availability data
        const [availData, roomData] = await Promise.all([
          checkRoomAvailability(roomId, checkIn, checkOut),
          getRoomById(roomId),
        ]);
        console.log(roomData);

        setAvailabilityData(availData);
        setRoom(roomData);
      } catch (err) {
        console.error("Error checking availability:", err);
        setError(
          err.response?.data?.message ||
            "Failed to check availability. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    checkAvailability();
  }, [roomId, checkIn, checkOut]);

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mutedGold mx-auto mb-4"></div>
          <p className="text-gray-600">Checking availability...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 min-h-screen flex items-center justify-center">
        <div className="relative overflow-hidden rounded-[32px] border border-luxuryBrown/20 bg-gradient-to-br from-luxuryBrown/10 via-white to-mutedGold/10 shadow-2xl shadow-luxuryBrown/20 p-8 sm:p-12 w-full max-w-2xl">
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-mutedGold/30 blur-3xl"></div>
          <div className="absolute -left-10 bottom-10 h-24 w-24 rounded-full bg-luxuryBrown/20 blur-3xl"></div>

          <div className="relative z-10 flex flex-col items-center text-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-luxuryBrown text-white shadow-xl shadow-luxuryBrown/30">
              <svg
                className="h-10 w-10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 8v4m0 4v.01" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-luxuryBrown font-semibold mb-2">
                Oops! Something went wrong
              </p>
              <h2 className="text-4xl font-heading font-bold text-luxuryBrown">
                Unable to load availability
              </h2>
            </div>

            <p className="max-w-xl text-slate-600 text-lg">{error}</p>

            <div className="grid gap-3 sm:grid-cols-2 w-full">
              <Link
                to="/rooms"
                className="inline-flex items-center justify-center rounded-2xl bg-mutedGold text-white px-6 py-3 font-bold transition hover:bg-mutedGold/90"
              >
                Browse rooms
              </Link>
              <button
                type="button"
                onClick={() => {
                  navigate(-1);
                }}
                className="inline-flex items-center justify-center rounded-2xl border border-luxuryBrown/20 bg-white px-6 py-3 font-semibold text-luxuryBrown transition hover:bg-luxuryBrown/5"
              >
                Try again
              </button>
            </div>

            <div className="mt-4 rounded-3xl border border-luxuryBrown/20 bg-white/90 p-4 text-left text-sm text-slate-600 shadow-sm">
              <p className="font-semibold text-luxuryBrown">Need help?</p>
              <p className="mt-1">
                If the issue persists, refresh the page or contact our support
                team for assistance.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const isAvailable = availabilityData?.isAvailable;
  const pricePerNight = room?.price_per_night ?? 0;
  const numberOfNights = availabilityData?.numberOfNights || 0;
  const subtotal = numberOfNights * pricePerNight;
  const serviceCharge = Math.round(subtotal * 0.05);
  const total = subtotal + serviceCharge;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Status */}
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            {isAvailable ? (
              <>
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-10 h-10 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h1 className="text-4xl font-heading font-bold text-green-600 mb-4">
                  Available!
                </h1>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-10 h-10 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <h1 className="text-4xl font-heading font-bold text-red-600 mb-4">
                  Not Available
                </h1>
              </>
            )}

            <p className="text-lg text-gray-600 mb-8">
              {availabilityData?.message}
            </p>
          </div>

          {/* Booking Details */}
          <div className="bg-luxuryBg p-6 rounded-luxury mb-8">
            <h3 className="text-xl font-heading font-bold text-luxuryText mb-4">
              Booking Details
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Room:</span>
                <span className="font-semibold text-luxuryText">
                  {room?.name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Check-In:</span>
                <span className="font-semibold text-luxuryText">{checkIn}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Check-Out:</span>
                <span className="font-semibold text-luxuryText">
                  {checkOut}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Number of Nights:</span>
                <span className="font-semibold text-luxuryText">
                  {numberOfNights}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white border border-black/10 p-6 rounded-luxury mb-8">
            <h3 className="text-xl font-heading font-bold text-luxuryText mb-4">
              Pricing
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>
                  {formatPrice(pricePerNight)} x {numberOfNights} night
                  {numberOfNights > 1 ? "s" : ""}
                </span>
                <span className="font-semibold text-luxuryText">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Service Charge (5%)</span>
                <span className="font-semibold text-luxuryText">
                  {formatPrice(serviceCharge)}
                </span>
              </div>
              <div className="border-t border-black/10 pt-3 flex justify-between text-lg font-bold">
                <span className="text-luxuryText">Total</span>
                <span className="text-mutedGold">{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Link
              to={`/rooms/${room?.slug}`}
              className="flex-1 text-center bg-black/10 text-black font-bold px-6 py-3 rounded-xl hover:bg-black/20 transition-all border border-black/20 cursor-pointer"
            >
              Back
            </Link>
            {isAvailable && (
              <button
                onClick={() => {
                  const params = new URLSearchParams();
                  params.set("roomId", roomId);
                  params.set("checkIn", checkIn);
                  params.set("checkOut", checkOut);
                  navigate(`/booking?${params.toString()}`);
                }}
                className="flex-1 bg-mutedGold text-black font-bold px-6 py-3 rounded-xl hover:bg-mutedGold/90 transition-all shadow-lg shadow-mutedGold/20 cursor-pointer"
              >
                Book Now
              </button>
            )}
          </div>
        </div>

        {/* Right Column - Room Image */}
        <div>
          {room?.images && room.images.length > 0 ? (
            <img
              src={room.images[0].url}
              alt={room.name}
              className="w-full h-96 object-cover rounded-luxury shadow-lg"
            />
          ) : (
            <div className="w-full h-96 bg-gray-200 rounded-luxury flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
          <div className="mt-6">
            <h2 className="text-2xl font-heading font-bold text-luxuryText mb-3">
              {room?.name}
            </h2>
            <p className="text-gray-600">
              {room?.tagline || "Experience luxury accommodation"}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Availability;
