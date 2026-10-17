import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

import auth from "../firebase";

import {
  FaLayerGroup,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaGoogle,
  FaCheckCircle,
  FaRocket,
  FaShieldAlt,
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(
    location.state?.registered ? "Your account is ready! Please sign in." : "",
  );

  const getErrorMessage = (err) => {
    switch (err.code) {
      case "auth/invalid-credential":
      case "auth/invalid-login-credentials":
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "Incorrect email or password.";

      case "auth/invalid-email":
        return "Please enter a valid email address.";

      case "auth/too-many-requests":
        return "Too many attempts. Please try again later.";

      case "auth/user-disabled":
        return "This account has been disabled.";

      case "auth/popup-closed-by-user":
        return "Google sign-in was cancelled.";

      case "auth/popup-blocked":
        return "Your browser blocked the Google sign-in popup.";

      case "auth/unauthorized-domain":
        return "This domain is not authorized in Firebase.";

      case "auth/operation-not-allowed":
        return "This sign-in method is not enabled in Firebase.";

      case "auth/network-request-failed":
        return "Network error. Check your internet connection.";

      default:
        return err.message || "Something went wrong. Please try again.";
    }
  };

  // Email and password login
  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);

      navigate("/", { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      await signInWithPopup(auth, provider);

      navigate("/", { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // Password reset
  const handleForgotPassword = async () => {
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Enter your email address first.");
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email.trim());

      setMessage(
        "If an account exists for this email, a reset link will be sent. Please check your inbox and spam folder.",
      );
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const features = [
    "All your projects in one place",
    "Stay focused and organized",
    "Work better with your team",
  ];

  return (
    <div className="min-h-screen bg-[#f6f7ff] text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left: Premium branding section */}
        <motion.section
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65 }}
          className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-700 p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14"
        >
          {/* Decorative shapes */}
          <div className="absolute -right-28 -top-28 h-96 w-96 rounded-full border border-white/15" />
          <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full border border-white/15" />
          <div className="absolute -bottom-40 -left-28 h-[30rem] w-[30rem] rounded-full bg-violet-400/20 blur-3xl" />
          <div className="absolute right-10 top-1/2 h-44 w-44 rounded-full bg-indigo-300/20 blur-3xl" />

          {/* Brand */}
          <Link to="/" className="relative z-10 flex w-fit items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl text-indigo-600 shadow-lg shadow-indigo-950/20">
              <FaLayerGroup />
            </span>

            <span className="text-2xl font-extrabold tracking-tight">
              FlowPilot
            </span>
          </Link>

          {/* Main content */}
          <div className="relative z-10 my-12 max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md">
              <FaRocket className="text-amber-300" />
              Your workspace, reimagined
            </div>

            <h1 className="text-5xl font-extrabold leading-[1.12] tracking-tight xl:text-6xl">
              Make every day
              <br />
              <span className="text-indigo-200">count.</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-8 text-indigo-100 xl:text-lg">
              Bring your tasks, projects, and team together. Everything you need
              to move your work forward starts right here.
            </p>

            <div className="mt-9 space-y-4">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 text-sm text-white/90"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                    <FaCheckCircle className="text-xs text-emerald-300" />
                  </span>
                  {feature}
                </div>
              ))}
            </div>

            {/* Decorative preview card */}
            <div className="mt-10 max-w-sm rounded-2xl border border-white/20 bg-white/10 p-5 shadow-2xl shadow-indigo-950/20 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-indigo-100">YOUR WORKSPACE</p>
                  <p className="mt-1 text-lg font-bold">Project overview</p>
                </div>

                <span className="rounded-xl bg-white/15 p-3">
                  <FaLayerGroup className="text-xl" />
                </span>
              </div>

              <div className="mt-5 flex gap-2">
                <div className="h-2 flex-1 rounded-full bg-emerald-300" />
                <div className="h-2 flex-1 rounded-full bg-indigo-200" />
                <div className="h-2 flex-1 rounded-full bg-white/25" />
              </div>

              <p className="mt-3 text-xs text-indigo-100">
                A little progress every day adds up.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between gap-4 text-xs text-indigo-100/80">
            <span>© {new Date().getFullYear()} FlowPilot</span>
            <span>Built for better workdays.</span>
          </div>
        </motion.section>

        {/* Right: Login form */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 sm:px-8 lg:px-10">
          {/* Mobile decorative background */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl lg:hidden" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-violet-200/40 blur-3xl lg:hidden" />

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="relative z-10 w-full max-w-md"
          >
            {/* Mobile brand */}
            <Link
              to="/"
              className="mb-10 flex items-center justify-center gap-3 lg:hidden"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-lg text-white shadow-lg shadow-indigo-200">
                <FaLayerGroup />
              </span>

              <span className="text-2xl font-extrabold">
                Flow<span className="text-indigo-600">Pilot</span>
              </span>
            </Link>

            <div className="rounded-[2rem] border border-white bg-white/90 p-6 shadow-2xl shadow-indigo-100/70 backdrop-blur-xl sm:p-9">
              {/* Heading */}
              <div className="mb-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-2xl text-indigo-600 ring-1 ring-indigo-100">
                  <FaLock />
                </div>

                <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-indigo-600">
                  Welcome back
                </p>

                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Sign in to FlowPilot
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Pick up where you left off. Your next great workday starts
                  here.
                </p>
              </div>

              {/* Success message */}
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status"
                  className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm leading-6 text-emerald-800"
                >
                  {message}
                </motion.div>
              )}

              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                  className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm leading-6 text-red-700"
                >
                  {error}
                </motion.div>
              )}

              {/* Email and password */}
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label
                    htmlFor="login-email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email address
                  </label>

                  <div className="group relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-indigo-600" />

                    <input
                      id="login-email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      disabled={loading}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 disabled:opacity-60"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label
                      htmlFor="login-password"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleForgotPassword}
                      className="text-xs font-semibold text-indigo-600 transition hover:text-indigo-800 disabled:opacity-50"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="group relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-indigo-600" />

                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                      disabled={loading}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3.5 pl-11 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 disabled:opacity-60"
                    />

                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      disabled={loading}
                      onClick={() => setShowPassword((previous) => !previous)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-indigo-600"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-indigo-200 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm" />
                      Please wait...
                    </>
                  ) : (
                    <>
                      Sign in to your account
                      <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs font-medium text-slate-400">
                  OR CONTINUE WITH
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Google login */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50/50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <FaGoogle className="text-lg text-red-500" />
                )}
                Continue with Google
              </button>

              {/* Register link */}
              <p className="mt-7 text-center text-sm text-slate-500">
                New to FlowPilot?{" "}
                <Link
                  to="/register"
                  className="font-bold text-indigo-600 transition hover:text-indigo-800"
                >
                  Create an account
                </Link>
              </p>

              {/* Security note */}
              <div className="mt-7 flex items-center justify-center gap-2 border-t border-slate-100 pt-5 text-xs text-slate-400">
                <FaShieldAlt className="text-emerald-500" />
                Secure authentication powered by Firebase
              </div>
            </div>

            <Link
              to="/"
              className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
            >
              <FaArrowRight className="rotate-180" />
              Back to homepage
            </Link>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

export default Login;
