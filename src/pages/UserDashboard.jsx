import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/bookings/user/${user?._id}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError("Failed to load your bookings");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchUserBookings();
    }
  }, [user?._id]);

  return (
    <main
      className="min-h-screen pt-24 pb-12"
      style={{ backgroundColor: "#fafafa" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2" style={{ color: "#8b5e3c" }}>
            My Dashboard
          </h1>
          <p style={{ color: "#6b6b6b" }}>
            Welcome back, {user?.name}! View and manage your bookings.
          </p>
        </div>

        {error && (
          <div
            className="mb-6 p-4 rounded-luxury text-red-800"
            style={{ backgroundColor: "#fee" }}
          >
            {error}
          </div>
        )}

        {/* User Info Card */}
        <div
          className="p-8 rounded-luxury mb-8"
          style={{
            backgroundColor: "#ffffff",
            boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.08)",
          }}
        >
          <h2 style={{ color: "#8b5e3c" }} className="text-2xl font-bold mb-6">
            Account Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p
                style={{ color: "#6b6b6b" }}
                className="text-sm mb-1 font-medium"
              >
                Full Name
              </p>
              <p style={{ color: "#1a1a1a" }} className="text-lg font-semibold">
                {user?.name || `${user?.firstName} ${user?.lastName}`}
              </p>
            </div>
            <div>
              <p
                style={{ color: "#6b6b6b" }}
                className="text-sm mb-1 font-medium"
              >
                Email Address
              </p>
              <p style={{ color: "#1a1a1a" }} className="text-lg font-semibold">
                {user?.email}
              </p>
            </div>
            <div>
              <p
                style={{ color: "#6b6b6b" }}
                className="text-sm mb-1 font-medium"
              >
                Account Type
              </p>
              <p style={{ color: "#1a1a1a" }} className="text-lg font-semibold">
                User
              </p>
            </div>
            <div>
              <p
                style={{ color: "#6b6b6b" }}
                className="text-sm mb-1 font-medium"
              >
                Member Since
              </p>
              <p style={{ color: "#1a1a1a" }} className="text-lg font-semibold">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* My Bookings Section */}
        <div
          className="p-8 rounded-luxury"
          style={{
            backgroundColor: "#ffffff",
            boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.08)",
          }}
        >
          <h2 style={{ color: "#8b5e3c" }} className="text-2xl font-bold mb-6">
            My Bookings
          </h2>

          {loading ? (
            <p style={{ color: "#6b6b6b" }} className="text-center py-8">
              Loading your bookings...
            </p>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12">
              <p style={{ color: "#6b6b6b" }} className="mb-4">
                You don't have any bookings yet.
              </p>
              <button
                onClick={() => navigate("/rooms")}
                className="px-6 py-3 rounded-luxury font-semibold text-white transition-colors"
                style={{ backgroundColor: "#8b5e3c" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#6b4423")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#8b5e3c")
                }
              >
                Browse Rooms
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="p-6 rounded-luxury border"
                  style={{
                    backgroundColor: "#f5efe6",
                    borderColor: "#cba135",
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p
                        style={{ color: "#6b6b6b" }}
                        className="text-sm font-medium mb-1"
                      >
                        Booking Code
                      </p>
                      <p
                        style={{ color: "#8b5e3c" }}
                        className="font-mono font-bold text-lg"
                      >
                        {booking.bookingCode}
                      </p>
                    </div>
                    <div>
                      <p
                        style={{ color: "#6b6b6b" }}
                        className="text-sm font-medium mb-1"
                      >
                        Room
                      </p>
                      <p style={{ color: "#1a1a1a" }} className="font-semibold">
                        {booking.room?.name || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p
                        style={{ color: "#6b6b6b" }}
                        className="text-sm font-medium mb-1"
                      >
                        Check-In Date
                      </p>
                      <p style={{ color: "#1a1a1a" }} className="font-semibold">
                        {new Date(booking.checkInDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p
                        style={{ color: "#6b6b6b" }}
                        className="text-sm font-medium mb-1"
                      >
                        Check-Out Date
                      </p>
                      <p style={{ color: "#1a1a1a" }} className="font-semibold">
                        {new Date(booking.checkOutDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p
                        style={{ color: "#6b6b6b" }}
                        className="text-sm font-medium mb-1"
                      >
                        Number of Nights
                      </p>
                      <p style={{ color: "#1a1a1a" }} className="font-semibold">
                        {booking.numberOfNights}
                      </p>
                    </div>
                    <div>
                      <p
                        style={{ color: "#6b6b6b" }}
                        className="text-sm font-medium mb-1"
                      >
                        Total Price
                      </p>
                      <p
                        style={{ color: "#cba135" }}
                        className="font-semibold text-lg"
                      >
                        ₦{booking.totalPrice?.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p
                        style={{ color: "#6b6b6b" }}
                        className="text-sm font-medium mb-1"
                      >
                        Status
                      </p>
                      <span
                        className="px-3 py-1 rounded-full text-sm font-semibold"
                        style={{
                          color:
                            booking.status === "confirmed"
                              ? "#22c55e"
                              : booking.status === "pending"
                                ? "#f59e0b"
                                : "#ef4444",
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
                    </div>
                    {booking.specialRequests && (
                      <div className="md:col-span-2">
                        <p
                          style={{ color: "#6b6b6b" }}
                          className="text-sm font-medium mb-1"
                        >
                          Special Requests
                        </p>
                        <p style={{ color: "#1a1a1a" }}>
                          {booking.specialRequests}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default UserDashboard;
