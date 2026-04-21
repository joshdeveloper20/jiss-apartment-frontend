import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const getRooms = async () => {
  const response = await api.get("/rooms");
  return response.data;
};

export const getRoomById = async (id) => {
  const response = await api.get(`/rooms/${id}`);
  return response.data;
};

export const getRoomBookings = async (roomId) => {
  const response = await api.get(`/bookings/room/${roomId}`);
  return response.data;
};

export const getRoomBySlug = async (slug) => {
  const rooms = await getRooms();
  const room = rooms.find((item) => item.slug === slug);

  if (!room) {
    throw new Error("Room not found");
  }

  return room;
};

// Admin APIs
export const createRoom = async (roomData) => {
  const response = await api.post("/rooms", roomData);
  return response.data;
};

export const getBookingStats = async () => {
  const response = await api.get("/bookings/stats/dashboard");
  return response.data;
};

export const getBookings = async () => {
  const response = await api.get("/bookings");
  return response.data;
};

export const getBookingByCode = async (code) => {
  const response = await api.get(`/bookings/search/${code}`);
  return response.data;
};

export const createBooking = async (bookingData) => {
  const response = await api.post("/bookings", bookingData);
  return response.data;
};

export const updateBooking = async (bookingId, updateData) => {
  const response = await api.put(`/bookings/${bookingId}`, updateData);
  return response.data;
};

export const deleteBooking = async (bookingId) => {
  const response = await api.delete(`/bookings/${bookingId}`);
  return response.data;
};

export const getBookingsPaginated = async (page = 1, limit = 10) => {
  const response = await api.get(`/bookings?page=${page}&limit=${limit}`);
  return response.data;
};

// Auth APIs
export const login = async (email, password) => {
  const response = await api.post("/users/login", { email, password });
  return response.data;
};

export const register = async (firstName, lastName, email, password) => {
  const response = await api.post("/users/register", {
    firstName,
    lastName,
    email,
    password,
  });
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};


