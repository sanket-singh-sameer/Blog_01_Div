import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Background from "../components/Background";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
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
    <div className="!min-h-screen !flex !flex-col lg:!flex-row !overflow-hidden">
      {/* Left Side - Background */}
      <div className="!relative !w-full lg:!w-3/5 !min-h-[30vh] lg:!min-h-screen !overflow-hidden">
        <div className="!absolute !inset-0 !z-0">
          <Background />
        </div>
        
        {/* Decorative gradient overlay */}
        <div className="!absolute !inset-0 !bg-gradient-to-r !from-transparent !via-transparent !to-[#1a1225]/50 !z-10 !hidden lg:!block" />
      </div>

      {/* Right Side - Login Form */}
      <div className="!w-full lg:!w-2/5 !min-h-[70vh] lg:!min-h-screen !bg-[#1a1225] !flex !items-center !justify-center !p-6 sm:!p-8 lg:!p-12 !relative !overflow-hidden">
        {/* Background decorative elements */}
        <div className="!absolute !top-0 !right-0 !w-96 !h-96 !bg-[#00B4D8]/5 !rounded-full !blur-3xl !-translate-y-1/2 !translate-x-1/2 !pointer-events-none" />
        <div className="!absolute !bottom-0 !left-0 !w-80 !h-80 !bg-[#2B1F39]/50 !rounded-full !blur-3xl !translate-y-1/2 !-translate-x-1/2 !pointer-events-none" />
        
        <div className="!w-full !max-w-md !relative !z-10"> 

          <div className="!text-center !mb-10">
            <h2
              className="!text-3xl lg:!text-4xl !font-bold !text-[#DFEFE9] !mb-3 !tracking-tight"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Welcome Back
            </h2>
            <p
              className="!text-[#DFEFE9]/50 !text-base"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              Enter your credentials to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="!space-y-6">
            {error && (
              <div className="!bg-red-500/10 !border !border-red-500/30 !rounded-2xl !px-5 !py-4 !text-red-400 !text-sm !text-center !animate-pulse">
                <div className="!flex !items-center !justify-center !gap-2">
                  <svg className="!w-5 !h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            <div className="!space-y-2">
              <label
                htmlFor="email"
                className={`!block !text-sm !font-medium !transition-colors !duration-300 ${
                  focusedField === 'email' ? '!text-[#00B4D8]' : '!text-[#DFEFE9]/70'
                }`}
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Email Address
              </label>
              <div className="!relative">
                <div className={`!absolute !left-5 !top-1/2 !-translate-y-1/2 !transition-all !duration-300 ${
                  focusedField === 'email' ? '!text-[#00B4D8] !scale-110' : '!text-[#DFEFE9]/30'
                }`}>
                  <svg className="!w-5 !h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="divyam@example.com"
                  required
                  className="!w-full !pl-14 !pr-5 !py-4 !bg-[#2B1F39]/40 !border-2 !border-[#DFEFE9]/10 !rounded-2xl !text-[#DFEFE9] !placeholder-[#DFEFE9]/20 focus:!outline-none focus:!border-[#00B4D8] focus:!bg-[#2B1F39]/60 focus:!shadow-lg focus:!shadow-[#00B4D8]/10 !transition-all !duration-300"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                />
                <div className={`!absolute !inset-0 !rounded-2xl !pointer-events-none !transition-opacity !duration-500 ${
                  focusedField === 'email' ? '!opacity-100' : '!opacity-0'
                }`} style={{ boxShadow: 'inset 0 0 20px rgba(0, 180, 216, 0.05)' }} />
              </div>
            </div>

            <div className="!space-y-2">
              <label
                htmlFor="password"
                className={`!block !text-sm !font-medium !transition-colors !duration-300 ${
                  focusedField === 'password' ? '!text-[#00B4D8]' : '!text-[#DFEFE9]/70'
                }`}
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Password
              </label>
              <div className="!relative">
                <div className={`!absolute !left-5 !top-1/2 !-translate-y-1/2 !transition-all !duration-300 ${
                  focusedField === 'password' ? '!text-[#00B4D8] !scale-110' : '!text-[#DFEFE9]/30'
                }`}>
                  <svg className="!w-5 !h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  required
                  className="!w-full !pl-14 !pr-14 !py-4 !bg-[#2B1F39]/40 !border-2 !border-[#DFEFE9]/10 !rounded-2xl !text-[#DFEFE9] !placeholder-[#DFEFE9]/20 focus:!outline-none focus:!border-[#00B4D8] focus:!bg-[#2B1F39]/60 focus:!shadow-lg focus:!shadow-[#00B4D8]/10 !transition-all !duration-300"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="!absolute !right-4 !top-1/2 !-translate-y-1/2 !text-[#DFEFE9]/40 hover:!text-[#00B4D8] !transition-all !duration-300 !p-2 !rounded-xl hover:!bg-[#00B4D8]/10 hover:!scale-110 active:!scale-95"
                >
                  {showPassword ? (
                    <svg className="!w-5 !h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="!w-5 !h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="!relative !w-full !py-4 !px-6 !mt-8 !bg-gradient-to-r !from-[#00B4D8] !to-[#00B4D8]/80 !text-white !font-semibold !rounded-2xl !shadow-xl !shadow-[#00B4D8]/25 hover:!shadow-[#00B4D8]/50 hover:!from-[#00B4D8]/90 hover:!to-[#00B4D8] hover:!scale-[1.02] active:!scale-[0.98] !transition-all !duration-300 disabled:!opacity-60 disabled:!cursor-not-allowed disabled:hover:!scale-100 !overflow-hidden !group"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {/* Shine effect */}
              <div className="!absolute !inset-0 !bg-gradient-to-r !from-transparent !via-white/20 !to-transparent !-translate-x-full group-hover:!translate-x-full !transition-transform !duration-700 !ease-out" />
              
              <span className={`!relative !flex !items-center !justify-center !gap-3 !transition-all !duration-300 ${isLoading ? "!opacity-0" : "!opacity-100"}`}>
                Sign In
                <svg
                  className="!w-5 !h-5 group-hover:!translate-x-2 !transition-transform !duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              
              {isLoading && (
                <div className="!absolute !inset-0 !flex !items-center !justify-center">
                  <div className="!relative">
                    <svg className="!animate-spin !h-6 !w-6 !text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="!opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="!opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          </form>

          <div className="!relative !my-8">
            <div className="!absolute !inset-0 !flex !items-center">
              <div className="!w-full !h-px !bg-gradient-to-r !from-transparent !via-[#DFEFE9]/20 !to-transparent" />
            </div>
          </div>

          <div className="!text-center py-4">
            <Link
              to="/"
              className="!inline-flex !items-center !gap-3 !px-6 !py-3 !text-sm !text-[#DFEFE9]/50 hover:!text-[#00B4D8] !transition-all !duration-300 !group !rounded-xl hover:!bg-[#00B4D8]/5"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              <svg
                className="!w-5 !h-5 group-hover:!-translate-x-2 !transition-transform !duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="group-hover:!underline !underline-offset-4">Not an Admin? Back to Home</span>
            </Link>
          </div>

          <p
            className="!text-center !mt-10 !text-xs !text-[#DFEFE9]/20"
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
