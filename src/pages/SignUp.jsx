import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/api";
import { useAuth } from "../context/AuthContext";
import gymImg from "../assets/images/gym-1.png";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
      const data = await register(firstName, lastName, email, password);
      authLogin({ ...data.user, token: data.token });
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] flex flex-col lg:flex-row">
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
            Experience world-class elegance. Sign up to manage your reservations
            and explore curated luxury experiences tailored just for you.
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
      </section>

      <section className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-24 bg-white">
        <div className="w-full max-w-md space-y-8 fade-in" id="auth-container">
          <header className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-semibold text-gray-900 mb-2">
              Create Account
            </h2>
            <p className="text-gray-500">
              Join our exclusive circle of travelers.
            </p>
          </header>

          {error && (
            <div
              className="p-4 rounded-luxury text-red-800 text-sm"
              style={{ backgroundColor: "#fee" }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="first-name"
                >
                  First Name
                </label>
                <input
                  className="w-full px-4 py-3 rounded-luxury border border-gray-200 focus:ring-primary focus:border-primary transition-colors"
                  id="first-name"
                  name="first-name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="last-name"
                >
                  Last Name
                </label>
                <input
                  className="w-full px-4 py-3 rounded-luxury border border-gray-200 focus:ring-primary focus:border-primary transition-colors"
                  id="last-name"
                  name="last-name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="signup-email"
              >
                Email Address
              </label>
              <input
                className="w-full px-4 py-3 rounded-luxury border border-gray-200 focus:ring-primary focus:border-primary transition-colors"
                id="signup-email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="signup-password"
              >
                Password
              </label>
              <input
                className="w-full px-4 py-3 rounded-luxury border border-gray-200 focus:ring-primary focus:border-primary transition-colors"
                id="signup-password"
                name="password"
                placeholder="Min. 8 characters"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="flex items-center">
              <input
                className="h-4 w-4 text-luxuryBrown focus:ring-primary border-gray-300 rounded"
                id="terms"
                name="terms"
                type="checkbox"
                required
                disabled={loading}
              />
              <label
                className="ml-2 block text-xs text-gray-500"
                htmlFor="terms"
              >
                I agree to the{" "}
                <a className="text-luxuryBrown hover:underline" href="#">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a className="text-luxuryBrown hover:underline" href="#">
                  Privacy Policy
                </a>
                .
              </label>
            </div>
            <button
              className="w-full bg-luxuryBrown text-white py-3 rounded-luxury font-semibold shadow-lg shadow-primary/20 hover:bg-[#7a5234] transition-all transform active:scale-[0.98] disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <footer className="text-center pt-4">
            <p className="text-sm text-gray-600">
              <span>Already have an account?</span>
              <Link
                to="/login"
                className="text-luxuryBrown font-bold hover:text-mutedGold ml-1 focus:outline-none underline-offset-4 hover:underline"
              >
                Log In
              </Link>
            </p>
          </footer>
        </div>
      </section>
    </main>
  );
};
export default SignUp;
