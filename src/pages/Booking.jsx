import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { createBooking, getRoomBookings, getRooms } from "../services/api";
import { initializePayment } from "../services/paystack";

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (value) => {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [blockedRanges, setBlockedRanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [bookingForm, setBookingForm] = useState({
    roomId: searchParams.get("roomId") || "",
    checkInDate: searchParams.get("checkIn") || "",
    checkOutDate: searchParams.get("checkOut") || "",
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    specialRequests: "",
    paymentMethod: "pay_on_arrival",
  });

  const minDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsData = await getRooms();
        setRooms(roomsData);
      } catch (error) {
        console.error(error);
        setErrorMessage("Unable to load rooms. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    if (!bookingForm.roomId) {
      setBlockedRanges([]);
      return;
    }

    const fetchBlockedDates = async () => {
      try {
        const bookings = await getRoomBookings(bookingForm.roomId);
        setBlockedRanges(
          bookings.map((booking) => ({
            checkInDate: booking.checkInDate,
            checkOutDate: booking.checkOutDate,
          })),
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlockedDates();
  }, [bookingForm.roomId]);

  const selectedRoom = useMemo(
    () => rooms.find((room) => room._id === bookingForm.roomId),
    [rooms, bookingForm.roomId],
  );

  const checkInDate = bookingForm.checkInDate
    ? new Date(bookingForm.checkInDate)
    : null;
  const checkOutDate = bookingForm.checkOutDate
    ? new Date(bookingForm.checkOutDate)
    : null;

  const dateError = useMemo(() => {
    if (!bookingForm.checkInDate || !bookingForm.checkOutDate) {
      return "";
    }

    if (checkOutDate <= checkInDate) {
      return "Check-out date must be after check-in date.";
    }

    return "";
  }, [
    checkInDate,
    checkOutDate,
    bookingForm.checkInDate,
    bookingForm.checkOutDate,
  ]);

  const isOverlappingBlockedDates = useMemo(() => {
    if (!checkInDate || !checkOutDate || !blockedRanges.length) {
      return false;
    }

    return blockedRanges.some((range) => {
      const blockedStart = new Date(range.checkInDate);
      const blockedEnd = new Date(range.checkOutDate);
      return checkInDate < blockedEnd && checkOutDate > blockedStart;
    });
  }, [blockedRanges, checkInDate, checkOutDate]);

  const nights = useMemo(() => {
    if (!checkInDate || !checkOutDate) {
      return 0;
    }

    const diff = (checkOutDate.getTime() - checkInDate.getTime()) / 86400000;
    return diff > 0 ? Math.floor(diff) : 0;
  }, [checkInDate, checkOutDate]);

  const subtotal = selectedRoom ? nights * selectedRoom.price_per_night : 0;
  const serviceCharge = Math.round(subtotal * 0.05);
  const totalPrice = subtotal + serviceCharge;
  const canSubmit =
    bookingForm.roomId &&
    bookingForm.checkInDate &&
    bookingForm.checkOutDate &&
    bookingForm.guestName &&
    bookingForm.guestEmail &&
    bookingForm.guestPhone &&
    !dateError &&
    !isOverlappingBlockedDates;

  const updateBookingForm = (field, value) => {
    setBookingForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!canSubmit) {
      setErrorMessage(
        isOverlappingBlockedDates
          ? "Selected dates overlap with existing bookings. Please choose a different range."
          : "Please complete the form with valid booking dates.",
      );
      return;
    }

    setSubmitting(true);
    try {
      const response = await createBooking({
        roomId: bookingForm.roomId,
        checkInDate: bookingForm.checkInDate,
        checkOutDate: bookingForm.checkOutDate,
        numberOfNights: nights,
        totalPrice,
        guestName: bookingForm.guestName,
        guestEmail: bookingForm.guestEmail,
        guestPhone: bookingForm.guestPhone,
        specialRequests: bookingForm.specialRequests,
        paymentMethod: bookingForm.paymentMethod,
      });

      // If payment method is "pay_now", redirect to Paystack
      if (bookingForm.paymentMethod === "pay_now") {
        initializePayment({
          email: bookingForm.guestEmail,
          amount: totalPrice,
          bookingCode: response.booking.bookingCode,
          onSuccess: () => {
            setSuccessMessage(
              `Payment successful! Your booking ${response.booking.bookingCode} has been confirmed. A confirmation email has been sent to ${response.booking.guestEmail}.`,
            );
            setBookingForm((prev) => ({
              ...prev,
              guestName: "",
              guestEmail: "",
              guestPhone: "",
              specialRequests: "",
            }));
            setBlockedRanges((current) => [
              ...current,
              {
                checkInDate: response.booking.checkInDate,
                checkOutDate: response.booking.checkOutDate,
              },
            ]);
          },
          onError: (error) => {
            setErrorMessage(`Payment failed: ${error}`);
          },
        });
      } else {
        // Pay on arrival
        setSuccessMessage(
          `Booking confirmed! Your booking code is ${response.booking.bookingCode}. A confirmation email has been sent to ${response.booking.guestEmail}.\n\nPayment will be collected upon arrival.`,
        );
        setBookingForm((prev) => ({
          ...prev,
          guestName: "",
          guestEmail: "",
          guestPhone: "",
          specialRequests: "",
        }));
        setBlockedRanges((current) => [
          ...current,
          {
            checkInDate: response.booking.checkInDate,
            checkOutDate: response.booking.checkOutDate,
          },
        ]);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to create booking. Please try again with different dates.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <p className="text-center text-lg font-medium">Loading booking page…</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-heading font-bold text-luxuryText">
            Book your stay
          </h1>
          <p className="mt-3 max-w-2xl text-gray-500">
            Choose a room, select available dates, and complete your reservation
            without logging in.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full border border-luxuryBrown px-5 py-3 text-sm font-semibold text-luxuryBrown transition-colors hover:bg-luxuryBrown hover:text-white"
        >
          Back to home
        </Link>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.6fr_1fr]">
        <section className="space-y-8 rounded-3xl border border-black/5 bg-white p-8 shadow-lg shadow-black/5">
          <div className="grid gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-600">
                Select room
              </label>
              <select
                className="w-full rounded-3xl border border-gray-200 bg-luxuryBg p-4 text-sm text-luxuryText focus:border-mutedGold focus:outline-none"
                value={bookingForm.roomId}
                onChange={(event) =>
                  updateBookingForm("roomId", event.target.value)
                }
              >
                <option value="">Choose a room</option>
                {rooms.map((room) => (
                  <option key={room._id} value={room._id}>
                    {room.name} - {formatPrice(room.price_per_night)} / night
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-600">
                  Check-in
                </label>
                <input
                  type="date"
                  min={minDate}
                  value={bookingForm.checkInDate}
                  onChange={(event) =>
                    updateBookingForm("checkInDate", event.target.value)
                  }
                  className="w-full rounded-3xl border border-gray-200 bg-luxuryBg p-4 text-sm text-luxuryText focus:border-mutedGold focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-600">
                  Check-out
                </label>
                <input
                  type="date"
                  min={bookingForm.checkInDate || minDate}
                  value={bookingForm.checkOutDate}
                  onChange={(event) =>
                    updateBookingForm("checkOutDate", event.target.value)
                  }
                  className="w-full rounded-3xl border border-gray-200 bg-luxuryBg p-4 text-sm text-luxuryText focus:border-mutedGold focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-600">
                Guest name
              </label>
              <input
                type="text"
                value={bookingForm.guestName}
                onChange={(event) =>
                  updateBookingForm("guestName", event.target.value)
                }
                placeholder="Enter your name"
                className="w-full rounded-3xl border border-gray-200 bg-luxuryBg p-4 text-sm text-luxuryText focus:border-mutedGold focus:outline-none"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  value={bookingForm.guestEmail}
                  onChange={(event) =>
                    updateBookingForm("guestEmail", event.target.value)
                  }
                  placeholder="john@example.com"
                  className="w-full rounded-3xl border border-gray-200 bg-luxuryBg p-4 text-sm text-luxuryText focus:border-mutedGold focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-600">
                  Phone
                </label>
                <input
                  type="tel"
                  value={bookingForm.guestPhone}
                  onChange={(event) =>
                    updateBookingForm("guestPhone", event.target.value)
                  }
                  placeholder="080 1234 5678"
                  className="w-full rounded-3xl border border-gray-200 bg-luxuryBg p-4 text-sm text-luxuryText focus:border-mutedGold focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-600">
                Payment method
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="rounded-3xl border border-gray-200 bg-white p-4 text-sm text-luxuryText transition-shadow hover:shadow-lg">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="pay_on_arrival"
                    checked={bookingForm.paymentMethod === "pay_on_arrival"}
                    onChange={(event) =>
                      updateBookingForm("paymentMethod", event.target.value)
                    }
                    className="mr-2"
                  />
                  Pay on Arrival
                </label>
                <label className="rounded-3xl border border-gray-200 bg-white p-4 text-sm text-luxuryText transition-shadow hover:shadow-lg">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="pay_now"
                    checked={bookingForm.paymentMethod === "pay_now"}
                    onChange={(event) =>
                      updateBookingForm("paymentMethod", event.target.value)
                    }
                    className="mr-2"
                  />
                  Pay Now
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-600">
                Special requests
              </label>
              <textarea
                value={bookingForm.specialRequests}
                onChange={(event) =>
                  updateBookingForm("specialRequests", event.target.value)
                }
                rows={4}
                placeholder="Add any additional notes or requests"
                className="w-full rounded-3xl border border-gray-200 bg-luxuryBg p-4 text-sm text-luxuryText focus:border-mutedGold focus:outline-none"
              />
            </div>

            {(dateError || isOverlappingBlockedDates || errorMessage) && (
              <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {dateError ||
                  (isOverlappingBlockedDates
                    ? "Selected dates are blocked by an existing booking."
                    : errorMessage)}
              </div>
            )}

            {successMessage && (
              <div className="rounded-3xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                {successMessage}
              </div>
            )}

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={submitting || !bookingForm.roomId}
              className="inline-flex w-full items-center justify-center rounded-3xl bg-mutedGold px-6 py-4 text-sm font-bold text-black transition hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Booking…" : "Confirm Booking"}
            </button>
          </div>
        </section>

        <aside className="space-y-6 rounded-3xl border border-black/5 bg-white p-8 shadow-lg shadow-black/5">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-luxuryText">
              Reservation summary
            </h2>
            <p className="text-sm text-gray-500">
              Use the summary to review the selected room, dates, and payment
              preference.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-luxuryBg p-6">
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>Selected room</span>
                <span className="font-semibold text-luxuryText">
                  {selectedRoom ? selectedRoom.name : "None"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Check-in</span>
                <span>{formatDate(bookingForm.checkInDate)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Check-out</span>
                <span>{formatDate(bookingForm.checkOutDate)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Nights</span>
                <span>{nights}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Payment option</span>
                <span>
                  {bookingForm.paymentMethod === "pay_now"
                    ? "Pay Now"
                    : "Pay on Arrival"}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-luxuryBg p-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Service fee</span>
                <span>{formatPrice(serviceCharge)}</span>
              </div>
              <div className="flex items-center justify-between text-sm font-semibold text-luxuryText">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-luxuryBg p-6">
            <h3 className="text-base font-semibold text-luxuryText">
              Booked dates
            </h3>
            {blockedRanges.length > 0 ? (
              <div className="space-y-3 pt-3">
                {blockedRanges.map((range, index) => (
                  <div
                    key={`${range.checkInDate}-${range.checkOutDate}-${index}`}
                    className="rounded-3xl border border-gray-200 bg-white p-4 text-sm text-gray-500 line-through"
                  >
                    {formatDate(range.checkInDate)} —{" "}
                    {formatDate(range.checkOutDate)}
                  </div>
                ))}
              </div>
            ) : (
              <p className="pt-3 text-sm text-gray-500">
                No unavailable dates for this room yet.
              </p>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Booking;
