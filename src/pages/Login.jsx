import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Background from "../components/Background";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigate("/admin");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="!min-h-screen !flex !flex-col lg:!flex-row">
      <div className="!relative !w-full lg:!w-3/5 !min-h-[40vh] lg:!min-h-screen !overflow-hidden">
        <div className="!absolute !inset-0 !z-0">
          <Background />
        </div>
      </div>

      <div className="!w-full lg:!w-2/5 !min-h-[60vh] lg:!min-h-screen !bg-[#1a1225] !flex !items-center !justify-center !p-6 sm:!p-8 lg:!p-12">
        <div className="!w-full !max-w-md">
          <div className="lg:!hidden !text-center !mb-8">
            <h2
              className="!text-2xl !font-bold !text-[#DFEFE9]"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Welcome Div
            </h2>
          </div>

          <div className="!hidden lg:!block !mb-10">
            <h2
              className="!text-3xl !font-bold !text-[#DFEFE9] !mb-2"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Welcome Divii
            </h2>
            <p
              className="!text-[#DFEFE9]/50"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="!space-y-6">
            {error && (
              <div className="!bg-red-500/10 !border !border-red-500/30 !rounded-xl !px-4 !py-3 !text-red-400 !text-sm !text-center">
                {error}
              </div>
            )}

            <div className="!space-y-2">
              <label
                htmlFor="email"
                className="!block !text-sm !font-medium !text-[#DFEFE9]/80"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Email
              </label>
              <div className="!relative !group">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="!w-full !px-5 !py-4 !bg-[#2B1F39]/50 !border-2 !border-[#DFEFE9]/10 !rounded-2xl !text-[#DFEFE9] !placeholder-[#DFEFE9]/25 focus:!outline-none focus:!border-[#00B4D8] focus:!bg-[#2B1F39]/70 !transition-all !duration-300"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                />
                <div className="!absolute !inset-0 !rounded-2xl !bg-gradient-to-r !from-[#00B4D8]/0 !via-[#00B4D8]/0 !to-[#00B4D8]/0 group-focus-within:!from-[#00B4D8]/5 group-focus-within:!to-transparent !transition-all !duration-500 !pointer-events-none" />
              </div>
            </div>

            <div className="!space-y-2">
              <label
                htmlFor="password"
                className="!block !text-sm !font-medium !text-[#DFEFE9]/80"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Password
              </label>
              <div className="!relative !group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="!w-full !px-5 !py-4 !pr-14 !bg-[#2B1F39]/50 !border-2 !border-[#DFEFE9]/10 !rounded-2xl !text-[#DFEFE9] !placeholder-[#DFEFE9]/25 focus:!outline-none focus:!border-[#00B4D8] focus:!bg-[#2B1F39]/70 !transition-all !duration-300"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="!absolute !right-4 !top-1/2 !-translate-y-1/2 !text-[#DFEFE9]/40 hover:!text-[#00B4D8] !transition-colors !p-1"
                >
                  {showPassword ? (
                    <svg
                      className="!w-5 !h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="!w-5 !h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="!relative !w-full !py-4 !px-6 !bg-[#00B4D8] !text-white !font-semibold !rounded-2xl !shadow-lg !shadow-[#00B4D8]/20 hover:!shadow-[#00B4D8]/40 hover:!bg-[#00B4D8]/90 active:!scale-[0.98] !transition-all !duration-300 disabled:!opacity-60 disabled:!cursor-not-allowed !overflow-hidden !group"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              <span
                className={`!flex !items-center !justify-center !gap-2 !transition-opacity ${
                  isLoading ? "!opacity-0" : "!opacity-100"
                }`}
              >
                Sign In
                <svg
                  className="!w-5 !h-5 group-hover:!translate-x-1 !transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
              {isLoading && (
                <div className="!absolute !inset-0 !flex !items-center !justify-center">
                  <svg
                    className="!animate-spin !h-6 !w-6 !text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="!opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="!opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </div>
              )}
            </button>
          </form>

          <div className="!mt-8 !text-center">
            <Link
              to="/"
              className="!inline-flex !items-center !gap-2 !text-sm !text-[#DFEFE9]/40 hover:!text-[#00B4D8] !transition-colors !group"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              <svg
                className="!w-4 !h-4 group-hover:!-translate-x-1 !transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
          </div>

          <p
            className="!text-center !mt-8 !text-xs !text-[#DFEFE9]/20"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            © 2026 Divyam's Blog. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
