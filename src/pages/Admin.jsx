import { useState, useEffect, useCallback } from "react";
import {
  getBookingStats,
  getBookingByCode,
  createBooking,
  createRoom,
  getRooms,
  updateBooking,
  deleteBooking,
  getBookingsPaginated,
} from "../services/api";
import { useAuth } from "../context/AuthContext";

const Admin = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchCode, setSearchCode] = useState("");
  const [searchedBooking, setSearchedBooking] = useState(null);
  const [bookingError, setBookingError] = useState(null);
  const [rooms, setRooms] = useState([]);

  // View all bookings states
  const [allBookings, setAllBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBookings, setTotalBookings] = useState(0);
  const itemsPerPage = 10;

  // Form states
  const [roomForm, setRoomForm] = useState({
    name: "",
    slug: "",
    category: "",
    tagline: "",
    description: "",
    size: "",
    price_per_night: "",
    amenities: "",
    is_smart_home: false,
  });

  const [bookingForm, setBookingForm] = useState({
    roomId: "",
    checkInDate: "",
    checkOutDate: "",
    numberOfNights: 0,
    totalPrice: 0,
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    specialRequests: "",
  });

  const [roomSubmitting, setRoomSubmitting] = useState(false);
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch dashboard stats
  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getBookingStats();
      setStats(data);
    } catch (err) {
      setError("Failed to fetch dashboard data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "dashboard") {
      fetchStats();
    }
  }, [activeTab, fetchStats]);

  // Fetch rooms once on mount so booking room dropdown always has values
  useEffect(() => {
    const fetchRoomsData = async () => {
      try {
        const roomsData = await getRooms();
        setRooms(roomsData);
      } catch (err) {
        setError("Failed to load rooms");
        console.error(err);
      }
    };

    fetchRoomsData();
  }, []);

  // Search booking by code
  const handleSearchBooking = async (e) => {
    e.preventDefault();
    if (!searchCode.trim()) {
      setBookingError("Please enter a booking code");
      return;
    }

    try {
      setBookingError(null);
      const booking = await getBookingByCode(searchCode);
      setSearchedBooking(booking);
    } catch (err) {
      setBookingError("Booking not found");
      setSearchedBooking(null);
    }
  };

  // Handle room form submission
  const handleRoomSubmit = async (e) => {
    e.preventDefault();
    setRoomSubmitting(true);
    try {
      if (!user) {
        setError("User not authenticated");
        return;
      }

      const amenitiesArray = roomForm.amenities
        .split(",")
        .map((a) => a.trim())
        .filter((a) => a);

      const data = {
        ...roomForm,
        amenities: amenitiesArray,
        price_per_night: parseFloat(roomForm.price_per_night),
        userId: user._id, // Use authenticated user's ID
      };

      await createRoom(data);
      setSuccessMessage("Room created successfully!");
      setRoomForm({
        name: "",
        slug: "",
        category: "",
        tagline: "",
        description: "",
        size: "",
        price_per_night: "",
        amenities: "",
        is_smart_home: false,
      });

      if (activeTab === "dashboard") {
        await fetchStats();
      }

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Failed to create room");
      console.error(err);
    } finally {
      setRoomSubmitting(false);
    }
  };

  // Handle booking form submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingSubmitting(true);
    try {
      if (!bookingForm.roomId) {
        setError("Please select a room");
        return;
      }

      if (!user) {
        setError("User not authenticated");
        return;
      }

      const data = {
        ...bookingForm,
        roomId: bookingForm.roomId,
        numberOfNights: parseInt(bookingForm.numberOfNights),
        totalPrice: parseFloat(bookingForm.totalPrice),
        userId: user._id, // Use authenticated user's ID
      };

      await createBooking(data);
      setSuccessMessage("Booking created successfully!");
      setBookingForm({
        roomId: "",
        checkInDate: "",
        checkOutDate: "",
        numberOfNights: 0,
        totalPrice: 0,
        guestName: "",
        guestEmail: "",
        guestPhone: "",
        specialRequests: "",
      });

      if (activeTab === "dashboard") {
        await fetchStats();
      }

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Failed to create booking");
      console.error(err);
    } finally {
      setBookingSubmitting(false);
    }
  };

  // Update room form
  const updateRoomForm = (field, value) => {
    setRoomForm((prev) => ({ ...prev, [field]: value }));
  };

  // Calculate nights and total price
  const calculateBookingDetails = (checkInDate, checkOutDate, roomId) => {
    if (!checkInDate || !checkOutDate || !roomId)
      return { nights: 0, totalPrice: 0 };

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

    const selectedRoom = rooms.find((room) => room._id === roomId);
    const pricePerNight = selectedRoom ? selectedRoom.price_per_night : 0;
    const totalPrice = nights * pricePerNight;

    return { nights, totalPrice };
  };

  // Update booking form
  const updateBookingForm = (field, value) => {
    setBookingForm((prev) => {
      const updated = { ...prev, [field]: value };

      // If check-in or check-out date changed, recalculate nights and total price
      if (
        field === "checkInDate" ||
        field === "checkOutDate" ||
        field === "roomId"
      ) {
        const { nights, totalPrice } = calculateBookingDetails(
          updated.checkInDate,
          updated.checkOutDate,
          updated.roomId,
        );
        updated.numberOfNights = nights;
        updated.totalPrice = totalPrice;
      }

      return updated;
    });
  };

  // Fetch all bookings with pagination
  const fetchAllBookings = useCallback(async (page = 1) => {
    try {
      setBookingsLoading(true);
      const data = await getBookingsPaginated(page, 10);
      setAllBookings(data.bookings || []);
      setTotalPages(data.totalPages || 1);
      setTotalBookings(data.totalBookings || 0);
      setCurrentPage(page);
    } catch (err) {
      setError("Failed to fetch bookings");
      console.error(err);
    } finally {
      setBookingsLoading(false);
    }
  }, []);

  // Fetch bookings when viewBookings tab is active
  useEffect(() => {
    if (activeTab === "viewBookings") {
      fetchAllBookings(1);
    }
  }, [activeTab, fetchAllBookings]);

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchAllBookings(newPage);
  };

  // Delete booking
  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;

    try {
      await deleteBooking(bookingId);
      setSuccessMessage("Booking deleted successfully!");
      // Refresh current page or go to previous page if current page becomes empty
      if (allBookings.length === 1 && currentPage > 1) {
        handlePageChange(currentPage - 1);
      } else {
        fetchAllBookings(currentPage);
      }
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Failed to delete booking");
      console.error(err);
    }
  };

  // Update payment status
  const handleUpdatePaymentStatus = async (bookingId, newStatus) => {
    try {
      await updateBooking(bookingId, { paymentStatus: newStatus });
      setSuccessMessage("Payment status updated successfully!");
      fetchAllBookings(currentPage);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Failed to update payment status");
      console.error(err);
    }
  };

  return (
    <main
      className="min-h-screen pt-24 pb-12"
      style={{ backgroundColor: "#fafafa" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2" style={{ color: "#8b5e3c" }}>
            Admin Dashboard
          </h1>
          <p style={{ color: "#6b6b6b" }}>
            Manage bookings, rooms, and view statistics
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="mb-6 p-4 rounded-luxury text-red-800"
            style={{ backgroundColor: "#fee" }}
          >
            {error}
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div
            className="mb-6 p-4 rounded-luxury text-green-800"
            style={{ backgroundColor: "#efe" }}
          >
            {successMessage}
          </div>
        )}

        {/* Tab Navigation */}
        <div
          className="flex flex-wrap gap-2 md:gap-4 mb-8 border-b overflow-x-auto"
          style={{ borderColor: "#ddd" }}
        >
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-3 md:px-6 py-3 font-medium transition-colors text-sm md:text-base ${
              activeTab === "dashboard" ? "border-b-2" : ""
            }`}
            style={{
              color: activeTab === "dashboard" ? "#8b5e3c" : "#6b6b6b",
              borderColor:
                activeTab === "dashboard" ? "#8b5e3c" : "transparent",
            }}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("search")}
            className={`px-3 md:px-6 py-3 font-medium transition-colors text-sm md:text-base ${
              activeTab === "search" ? "border-b-2" : ""
            }`}
            style={{
              color: activeTab === "search" ? "#8b5e3c" : "#6b6b6b",
              borderColor: activeTab === "search" ? "#8b5e3c" : "transparent",
            }}
          >
            Search Bookings
          </button>
          <button
            onClick={() => setActiveTab("createRoom")}
            className={`px-3 md:px-6 py-3 font-medium transition-colors text-sm md:text-base ${
              activeTab === "createRoom" ? "border-b-2" : ""
            }`}
            style={{
              color: activeTab === "createRoom" ? "#8b5e3c" : "#6b6b6b",
              borderColor:
                activeTab === "createRoom" ? "#8b5e3c" : "transparent",
            }}
          >
            Create Room
          </button>
          <button
            onClick={() => setActiveTab("createBooking")}
            className={`px-3 md:px-6 py-3 font-medium transition-colors text-sm md:text-base ${
              activeTab === "createBooking" ? "border-b-2" : ""
            }`}
            style={{
              color: activeTab === "createBooking" ? "#8b5e3c" : "#6b6b6b",
              borderColor:
                activeTab === "createBooking" ? "#8b5e3c" : "transparent",
            }}
          >
            Create Booking
          </button>
          <button
            onClick={() => setActiveTab("viewBookings")}
            className={`px-3 md:px-6 py-3 font-medium transition-colors text-sm md:text-base ${
              activeTab === "viewBookings" ? "border-b-2" : ""
            }`}
            style={{
              color: activeTab === "viewBookings" ? "#8b5e3c" : "#6b6b6b",
              borderColor:
                activeTab === "viewBookings" ? "#8b5e3c" : "transparent",
            }}
          >
            View all Bookings
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div>
            {loading ? (
              <p style={{ color: "#6b6b6b" }} className="text-center py-8">
                Loading...
              </p>
            ) : (
              <div>
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {/* Total Bookings Card */}
                  <div
                    className="p-6 rounded-luxury"
                    style={{
                      backgroundColor: "#ffffff",
                      boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.08)",
                    }}
                  >
                    <p
                      style={{ color: "#6b6b6b" }}
                      className="text-sm font-medium mb-2"
                    >
                      Total Bookings
                    </p>
                    <p
                      style={{ color: "#8b5e3c" }}
                      className="text-3xl font-bold"
                    >
                      {stats?.totalBookings || 0}
                    </p>
                  </div>

                  {/* Total Rooms Card */}
                  <div
                    className="p-6 rounded-luxury"
                    style={{
                      backgroundColor: "#ffffff",
                      boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.08)",
                    }}
                  >
                    <p
                      style={{ color: "#6b6b6b" }}
                      className="text-sm font-medium mb-2"
                    >
                      Total Rooms
                    </p>
                    <p
                      style={{ color: "#cba135" }}
                      className="text-3xl font-bold"
                    >
                      {stats?.totalRooms || 0}
                    </p>
                  </div>

                  {/* Total Users Card */}
                  <div
                    className="p-6 rounded-luxury"
                    style={{
                      backgroundColor: "#ffffff",
                      boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.08)",
                    }}
                  >
                    <p
                      style={{ color: "#6b6b6b" }}
                      className="text-sm font-medium mb-2"
                    >
                      Total Users
                    </p>
                    <p
                      style={{ color: "#8b5e3c" }}
                      className="text-3xl font-bold"
                    >
                      {stats?.totalUsers || 0}
                    </p>
                  </div>

                  {/* Confirmed Bookings Card */}
                  <div
                    className="p-6 rounded-luxury"
                    style={{
                      backgroundColor: "#ffffff",
                      boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.08)",
                    }}
                  >
                    <p
                      style={{ color: "#6b6b6b" }}
                      className="text-sm font-medium mb-2"
                    >
                      Confirmed Bookings
                    </p>
                    <p
                      style={{ color: "#cba135" }}
                      className="text-3xl font-bold"
                    >
                      {stats?.confirmedBookings || 0}
                    </p>
                  </div>
                </div>

                {/* Recent Bookings */}
                <div
                  className="p-6 rounded-luxury"
                  style={{
                    backgroundColor: "#ffffff",
                    boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.08)",
                  }}
                >
                  <h2
                    style={{ color: "#8b5e3c" }}
                    className="text-xl font-bold mb-4"
                  >
                    Recent Bookings
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr
                          style={{
                            borderBottom: "1px solid #ddd",
                          }}
                        >
                          <th
                            className="text-left py-3 px-4"
                            style={{ color: "#8b5e3c" }}
                          >
                            Code
                          </th>
                          <th
                            className="text-left py-3 px-4"
                            style={{ color: "#8b5e3c" }}
                          >
                            Guest
                          </th>
                          <th
                            className="text-left py-3 px-4"
                            style={{ color: "#8b5e3c" }}
                          >
                            Room
                          </th>
                          <th
                            className="text-left py-3 px-4"
                            style={{ color: "#8b5e3c" }}
                          >
                            Status
                          </th>
                          <th
                            className="text-left py-3 px-4"
                            style={{ color: "#8b5e3c" }}
                          >
                            Total Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats?.recentBookings?.length > 0 ? (
                          stats.recentBookings.map((booking) => (
                            <tr
                              key={booking._id}
                              style={{
                                borderBottom: "1px solid #eee",
                              }}
                            >
                              <td
                                className="py-3 px-4"
                                style={{ color: "#1a1a1a" }}
                              >
                                {booking.bookingCode}
                              </td>
                              <td
                                className="py-3 px-4"
                                style={{ color: "#1a1a1a" }}
                              >
                                {booking.guestName}
                              </td>
                              <td
                                className="py-3 px-4"
                                style={{ color: "#1a1a1a" }}
                              >
                                {booking.room?.name || "N/A"}
                              </td>
                              <td
                                className="py-3 px-4"
                                style={{
                                  color:
                                    booking.status === "confirmed"
                                      ? "#22c55e"
                                      : booking.status === "pending"
                                        ? "#f59e0b"
                                        : "#ef4444",
                                }}
                              >
                                <span
                                  className="px-3 py-1 rounded-full text-sm font-medium"
                                  style={{
                                    backgroundColor:
                                      booking.status === "confirmed"
                                        ? "#dcfce7"
                                        : booking.status === "pending"
                                          ? "#fef3c7"
                                          : "#fee2e2",
                                  }}
                                >
                                  {booking.status}
                                </span>
                              </td>
                              <td
                                className="py-3 px-4"
                                style={{ color: "#1a1a1a" }}
                              >
                                ₦{booking.totalPrice?.toFixed(2)}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="5"
                              className="py-8 px-4 text-center"
                              style={{ color: "#6b6b6b" }}
                            >
                              No bookings found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Search Bookings Tab */}
        {activeTab === "search" && (
          <div
            className="p-8 rounded-luxury"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.08)",
            }}
          >
            <h2
              style={{ color: "#8b5e3c" }}
              className="text-2xl font-bold mb-6"
            >
              Search Booking by Code
            </h2>

            <form onSubmit={handleSearchBooking} className="mb-8">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Enter booking code (e.g., BK12345678ABC)"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-luxury border"
                  style={{
                    borderColor: "#ddd",
                  }}
                />
                <button
                  type="submit"
                  className="px-8 py-3 rounded-luxury font-medium text-white transition-colors"
                  style={{ backgroundColor: "#8b5e3c" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#6b4423")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#8b5e3c")
                  }
                >
                  Search
                </button>
              </div>
            </form>

            {bookingError && (
              <div
                className="p-4 rounded-luxury text-red-800 mb-4"
                style={{ backgroundColor: "#fee" }}
              >
                {bookingError}
              </div>
            )}

            {searchedBooking && (
              <div
                className="p-6 rounded-luxury"
                style={{
                  backgroundColor: "#f5efe6",
                  border: "1px solid #cba135",
                }}
              >
                <h3
                  style={{ color: "#8b5e3c" }}
                  className="text-xl font-bold mb-4"
                >
                  Booking Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p style={{ color: "#6b6b6b" }} className="text-sm mb-1">
                      Booking Code
                    </p>
                    <p style={{ color: "#1a1a1a" }} className="font-semibold">
                      {searchedBooking.bookingCode}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: "#6b6b6b" }} className="text-sm mb-1">
                      Guest Name
                    </p>
                    <p style={{ color: "#1a1a1a" }} className="font-semibold">
                      {searchedBooking.guestName}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: "#6b6b6b" }} className="text-sm mb-1">
                      Guest Email
                    </p>
                    <p style={{ color: "#1a1a1a" }} className="font-semibold">
                      {searchedBooking.guestEmail}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: "#6b6b6b" }} className="text-sm mb-1">
                      Guest Phone
                    </p>
                    <p style={{ color: "#1a1a1a" }} className="font-semibold">
                      {searchedBooking.guestPhone}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: "#6b6b6b" }} className="text-sm mb-1">
                      Room
                    </p>
                    <p style={{ color: "#1a1a1a" }} className="font-semibold">
                      {searchedBooking.room?.name || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: "#6b6b6b" }} className="text-sm mb-1">
                      Check-in Date
                    </p>
                    <p style={{ color: "#1a1a1a" }} className="font-semibold">
                      {new Date(
                        searchedBooking.checkInDate,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: "#6b6b6b" }} className="text-sm mb-1">
                      Check-out Date
                    </p>
                    <p style={{ color: "#1a1a1a" }} className="font-semibold">
                      {new Date(
                        searchedBooking.checkOutDate,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: "#6b6b6b" }} className="text-sm mb-1">
                      Number of Nights
                    </p>
                    <p style={{ color: "#1a1a1a" }} className="font-semibold">
                      {searchedBooking.numberOfNights}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: "#6b6b6b" }} className="text-sm mb-1">
                      Total Price
                    </p>
                    <p style={{ color: "#1a1a1a" }} className="font-semibold">
                      ₦{searchedBooking.totalPrice?.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: "#6b6b6b" }} className="text-sm mb-1">
                      Status
                    </p>
                    <p
                      style={{
                        color:
                          searchedBooking.status === "confirmed"
                            ? "#22c55e"
                            : searchedBooking.status === "pending"
                              ? "#f59e0b"
                              : "#ef4444",
                      }}
                      className="font-semibold"
                    >
                      {searchedBooking.status}
                    </p>
                  </div>
                </div>
                {searchedBooking.specialRequests && (
                  <div className="mt-4">
                    <p style={{ color: "#6b6b6b" }} className="text-sm mb-1">
                      Special Requests
                    </p>
                    <p style={{ color: "#1a1a1a" }}>
                      {searchedBooking.specialRequests}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Create Room Tab */}
        {activeTab === "createRoom" && (
          <div
            className="p-8 rounded-luxury"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.08)",
            }}
          >
            <h2
              style={{ color: "#8b5e3c" }}
              className="text-2xl font-bold mb-6"
            >
              Create New Room
            </h2>

            <form onSubmit={handleRoomSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    style={{ color: "#1a1a1a" }}
                    className="block text-sm font-medium mb-2"
                  >
                    Room Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Luxury Suite with Ocean View"
                    value={roomForm.name}
                    onChange={(e) => updateRoomForm("name", e.target.value)}
                    className="w-full px-4 py-3 rounded-luxury border"
                    style={{ borderColor: "#ddd" }}
                    required
                  />
                </div>

                <div>
                  <label
                    style={{ color: "#1a1a1a" }}
                    className="block text-sm font-medium mb-2"
                  >
                    Slug (URL-friendly)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., luxury-suite-ocean"
                    value={roomForm.slug}
                    onChange={(e) => updateRoomForm("slug", e.target.value)}
                    className="w-full px-4 py-3 rounded-luxury border"
                    style={{ borderColor: "#ddd" }}
                    required
                  />
                </div>

                <div>
                  <label
                    style={{ color: "#1a1a1a" }}
                    className="block text-sm font-medium mb-2"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Deluxe, Standard, Suite"
                    value={roomForm.category}
                    onChange={(e) => updateRoomForm("category", e.target.value)}
                    className="w-full px-4 py-3 rounded-luxury border"
                    style={{ borderColor: "#ddd" }}
                    required
                  />
                </div>

                <div>
                  <label
                    style={{ color: "#1a1a1a" }}
                    className="block text-sm font-medium mb-2"
                  >
                    Tagline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Elegant and sophisticated"
                    value={roomForm.tagline}
                    onChange={(e) => updateRoomForm("tagline", e.target.value)}
                    className="w-full px-4 py-3 rounded-luxury border"
                    style={{ borderColor: "#ddd" }}
                    required
                  />
                </div>

                <div>
                  <label
                    style={{ color: "#1a1a1a" }}
                    className="block text-sm font-medium mb-2"
                  >
                    Room Size
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 45m²"
                    value={roomForm.size}
                    onChange={(e) => updateRoomForm("size", e.target.value)}
                    className="w-full px-4 py-3 rounded-luxury border"
                    style={{ borderColor: "#ddd" }}
                    required
                  />
                </div>

                <div>
                  <label
                    style={{ color: "#1a1a1a" }}
                    className="block text-sm font-medium mb-2"
                  >
                    Price per Night (₦)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 150000"
                    value={roomForm.price_per_night}
                    onChange={(e) =>
                      updateRoomForm("price_per_night", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-luxury border"
                    style={{ borderColor: "#ddd" }}
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  style={{ color: "#1a1a1a" }}
                  className="block text-sm font-medium mb-2"
                >
                  Description
                </label>
                <textarea
                  placeholder="Enter room description"
                  value={roomForm.description}
                  onChange={(e) =>
                    updateRoomForm("description", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-luxury border"
                  style={{ borderColor: "#ddd" }}
                  rows="4"
                  required
                />
              </div>

              <div>
                <label
                  style={{ color: "#1a1a1a" }}
                  className="block text-sm font-medium mb-2"
                >
                  Amenities (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g., WiFi, Air Conditioning, Smart TV, Gym Access"
                  value={roomForm.amenities}
                  onChange={(e) => updateRoomForm("amenities", e.target.value)}
                  className="w-full px-4 py-3 rounded-luxury border"
                  style={{ borderColor: "#ddd" }}
                />
              </div>

              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  id="smartHome"
                  checked={roomForm.is_smart_home}
                  onChange={(e) =>
                    updateRoomForm("is_smart_home", e.target.checked)
                  }
                  className="w-4 h-4"
                />
                <label
                  htmlFor="smartHome"
                  style={{ color: "#1a1a1a" }}
                  className="font-medium"
                >
                  Smart Home Enabled
                </label>
              </div>

              <button
                type="submit"
                disabled={roomSubmitting}
                className="w-full py-3 rounded-luxury font-bold text-white transition-colors"
                style={{ backgroundColor: "#8b5e3c" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#6b4423")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#8b5e3c")
                }
              >
                {roomSubmitting ? "Creating..." : "Create Room"}
              </button>
            </form>
          </div>
        )}

        {/* Create Booking Tab */}
        {activeTab === "createBooking" && (
          <div
            className="p-8 rounded-luxury"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.08)",
            }}
          >
            <h2
              style={{ color: "#8b5e3c" }}
              className="text-2xl font-bold mb-6"
            >
              Create New Booking
            </h2>

            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    style={{ color: "#1a1a1a" }}
                    className="block text-sm font-medium mb-2"
                  >
                    Select Room
                  </label>
                  <select
                    value={bookingForm.roomId}
                    onChange={(e) =>
                      updateBookingForm("roomId", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-luxury border"
                    style={{ borderColor: "#ddd" }}
                    required
                  >
                    <option value="">Choose a room...</option>
                    {rooms.map((room) => (
                      <option key={room._id} value={room._id}>
                        {room.name} - ₦{room.price_per_night}/night
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    style={{ color: "#1a1a1a" }}
                    className="block text-sm font-medium mb-2"
                  >
                    Guest Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter guest name"
                    value={bookingForm.guestName}
                    onChange={(e) =>
                      updateBookingForm("guestName", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-luxury border"
                    style={{ borderColor: "#ddd" }}
                    required
                  />
                </div>

                <div>
                  <label
                    style={{ color: "#1a1a1a" }}
                    className="block text-sm font-medium mb-2"
                  >
                    Guest Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter guest email"
                    value={bookingForm.guestEmail}
                    onChange={(e) =>
                      updateBookingForm("guestEmail", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-luxury border"
                    style={{ borderColor: "#ddd" }}
                    required
                  />
                </div>

                <div>
                  <label
                    style={{ color: "#1a1a1a" }}
                    className="block text-sm font-medium mb-2"
                  >
                    Guest Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter guest phone"
                    value={bookingForm.guestPhone}
                    onChange={(e) =>
                      updateBookingForm("guestPhone", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-luxury border"
                    style={{ borderColor: "#ddd" }}
                    required
                  />
                </div>

                <div>
                  <label
                    style={{ color: "#1a1a1a" }}
                    className="block text-sm font-medium mb-2"
                  >
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    value={bookingForm.checkInDate}
                    onChange={(e) =>
                      updateBookingForm("checkInDate", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-luxury border"
                    style={{ borderColor: "#ddd" }}
                    required
                  />
                </div>

                <div>
                  <label
                    style={{ color: "#1a1a1a" }}
                    className="block text-sm font-medium mb-2"
                  >
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    value={bookingForm.checkOutDate}
                    onChange={(e) =>
                      updateBookingForm("checkOutDate", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-luxury border"
                    style={{ borderColor: "#ddd" }}
                    required
                  />
                </div>

                <div>
                  <label
                    style={{ color: "#1a1a1a" }}
                    className="block text-sm font-medium mb-2"
                  >
                    Number of Nights
                  </label>
                  <input
                    type="number"
                    placeholder="Calculated automatically"
                    value={bookingForm.numberOfNights}
                    readOnly
                    className="w-full px-4 py-3 rounded-luxury border bg-gray-50"
                    style={{ borderColor: "#ddd" }}
                    required
                  />
                </div>

                <div>
                  <label
                    style={{ color: "#1a1a1a" }}
                    className="block text-sm font-medium mb-2"
                  >
                    Total Price (₦)
                  </label>
                  <input
                    type="number"
                    placeholder="Calculated automatically"
                    value={bookingForm.totalPrice}
                    readOnly
                    className="w-full px-4 py-3 rounded-luxury border bg-gray-50"
                    style={{ borderColor: "#ddd" }}
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  style={{ color: "#1a1a1a" }}
                  className="block text-sm font-medium mb-2"
                >
                  Special Requests (Optional)
                </label>
                <textarea
                  placeholder="Enter any special requests"
                  value={bookingForm.specialRequests}
                  onChange={(e) =>
                    updateBookingForm("specialRequests", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-luxury border"
                  style={{ borderColor: "#ddd" }}
                  rows="3"
                />
              </div>

              <button
                type="submit"
                disabled={bookingSubmitting}
                className="w-full py-3 rounded-luxury font-bold text-white transition-colors"
                style={{ backgroundColor: "#8b5e3c" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#6b4423")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#8b5e3c")
                }
              >
                {bookingSubmitting ? "Creating..." : "Create Booking"}
              </button>
            </form>
          </div>
        )}

        {/* View all Bookings Tab */}
        {activeTab === "viewBookings" && (
          <div
            className="p-8 rounded-luxury"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 style={{ color: "#8b5e3c" }} className="text-2xl font-bold">
                All Bookings ({totalBookings})
              </h2>
              <button
                onClick={() => fetchAllBookings(currentPage)}
                className="px-4 py-2 rounded-luxury font-medium text-white transition-colors"
                style={{ backgroundColor: "#8b5e3c" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#6b4423")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#8b5e3c")
                }
              >
                Refresh
              </button>
            </div>

            {bookingsLoading ? (
              <p style={{ color: "#6b6b6b" }} className="text-center py-8">
                Loading bookings...
              </p>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-full">
                    <thead>
                      <tr
                        style={{
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        <th
                          className="text-left py-3 px-4"
                          style={{ color: "#8b5e3c" }}
                        >
                          Code
                        </th>
                        <th
                          className="text-left py-3 px-4"
                          style={{ color: "#8b5e3c" }}
                        >
                          Guest
                        </th>
                        <th
                          className="text-left py-3 px-4 hidden md:table-cell"
                          style={{ color: "#8b5e3c" }}
                        >
                          Room
                        </th>
                        <th
                          className="text-left py-3 px-4 hidden lg:table-cell"
                          style={{ color: "#8b5e3c" }}
                        >
                          Check-in
                        </th>
                        <th
                          className="text-left py-3 px-4 hidden lg:table-cell"
                          style={{ color: "#8b5e3c" }}
                        >
                          Check-out
                        </th>
                        <th
                          className="text-left py-3 px-4"
                          style={{ color: "#8b5e3c" }}
                        >
                          Status
                        </th>
                        <th
                          className="text-left py-3 px-4"
                          style={{ color: "#8b5e3c" }}
                        >
                          Payment
                        </th>
                        <th
                          className="text-left py-3 px-4 hidden sm:table-cell"
                          style={{ color: "#8b5e3c" }}
                        >
                          Total
                        </th>
                        <th
                          className="text-left py-3 px-4"
                          style={{ color: "#8b5e3c" }}
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allBookings.length > 0 ? (
                        allBookings.map((booking) => (
                          <tr
                            key={booking._id}
                            style={{
                              borderBottom: "1px solid #eee",
                            }}
                          >
                            <td
                              className="py-3 px-4"
                              style={{ color: "#1a1a1a" }}
                            >
                              {booking.bookingCode}
                            </td>
                            <td
                              className="py-3 px-4"
                              style={{ color: "#1a1a1a" }}
                            >
                              {booking.guestName}
                            </td>
                            <td
                              className="py-3 px-4 hidden md:table-cell"
                              style={{ color: "#1a1a1a" }}
                            >
                              {booking.room?.name || "N/A"}
                            </td>
                            <td
                              className="py-3 px-4 hidden lg:table-cell"
                              style={{ color: "#1a1a1a" }}
                            >
                              {new Date(
                                booking.checkInDate,
                              ).toLocaleDateString()}
                            </td>
                            <td
                              className="py-3 px-4 hidden lg:table-cell"
                              style={{ color: "#1a1a1a" }}
                            >
                              {new Date(
                                booking.checkOutDate,
                              ).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className="px-3 py-1 rounded-full text-sm font-medium"
                                style={{
                                  backgroundColor:
                                    booking.status === "confirmed"
                                      ? "#dcfce7"
                                      : booking.status === "pending"
                                        ? "#fef3c7"
                                        : "#fee2e2",
                                  color:
                                    booking.status === "confirmed"
                                      ? "#22c55e"
                                      : booking.status === "pending"
                                        ? "#f59e0b"
                                        : "#ef4444",
                                }}
                              >
                                {booking.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <select
                                value={booking.paymentStatus}
                                onChange={(e) =>
                                  handleUpdatePaymentStatus(
                                    booking._id,
                                    e.target.value,
                                  )
                                }
                                className="px-3 py-1 rounded text-sm border"
                                style={{ borderColor: "#ddd" }}
                              >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="failed">Failed</option>
                              </select>
                            </td>
                            <td
                              className="py-3 px-4 hidden sm:table-cell"
                              style={{ color: "#1a1a1a" }}
                            >
                              ₦{booking.totalPrice?.toFixed(2)}
                            </td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => handleDeleteBooking(booking._id)}
                                className="px-3 py-1 rounded text-sm font-medium text-white transition-colors"
                                style={{ backgroundColor: "#ef4444" }}
                                onMouseEnter={(e) =>
                                  (e.target.style.backgroundColor = "#dc2626")
                                }
                                onMouseLeave={(e) =>
                                  (e.target.style.backgroundColor = "#ef4444")
                                }
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="9"
                            className="py-8 px-4 text-center"
                            style={{ color: "#6b6b6b" }}
                          >
                            No bookings found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-6">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-luxury font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ backgroundColor: "#8b5e3c", color: "#ffffff" }}
                    >
                      Previous
                    </button>
                    <span style={{ color: "#6b6b6b" }}>
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-luxury font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ backgroundColor: "#8b5e3c", color: "#ffffff" }}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Admin;
