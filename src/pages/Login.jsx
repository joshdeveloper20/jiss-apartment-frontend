import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { useAuth } from "../context/AuthContext";
import gymImg from "../assets/images/gym-1.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(email, password);
      authLogin({ ...data.user, token: data.token });
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-80px)] w-full">
      <section
        className="hidden lg:flex lg:w-1/2 relative items-end p-12 text-white"
        data-purpose="brand-visual"
        style={{
          backgroundImage: `url(${gymImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="z-10 bg-black/20 backdrop-blur-md p-8 rounded-luxury border border-white/10">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">
            Jiss Apartment
          </h1>
          <p className="text-lg font-light leading-relaxed max-w-md">
            Experience world-class elegance. Log in to manage your reservations
            and explore curated luxury experiences tailored just for you.
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
      </section>

      <section
        className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 overflow-y-auto"
        data-purpose="form-container"
      >
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <h1 className="text-3xl font-bold text-luxuryBrown tracking-widest">
              LUXENIGERIA
            </h1>
          </div>

          <div
            className="form-transition active-state"
            data-purpose="login-view"
            id="login-section"
          >
            <header className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-500">
                Please enter your details to access your account.
              </p>
            </header>

            {error && (
              <div
                className="mb-6 p-4 rounded-luxury text-red-800 text-sm"
                style={{ backgroundColor: "#fee" }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="login-email"
                >
                  Email Address
                </label>
                <input
                  className="w-full px-4 py-3 rounded-luxury border border-gray-200 focus:ring-primary focus:border-primary transition-colors"
                  id="login-email"
                  name="email"
                  placeholder="alex@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="login-password"
                  >
                    Password
                  </label>
                  <a
                    className="text-xs font-semibold text-luxuryBrown hover:underline"
                    href="#"
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  className="w-full px-4 py-3 rounded-luxury border border-gray-200 focus:ring-primary focus:border-primary transition-colors"
                  id="login-password"
                  name="password"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <button
                className="w-full bg-luxuryBrown text-white py-3 rounded-luxury font-semibold shadow-lg shadow-primary/20 hover:bg-[#7a5234] transition-all transform active:scale-[0.98] disabled:opacity-50"
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>

            <footer className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Don't have an account?
                <Link
                  className="text-luxuryBrown font-bold hover:underline ml-1"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </p>
            </footer>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Login;
