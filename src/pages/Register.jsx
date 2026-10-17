import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import auth from "../firebase";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaLayerGroup,
} from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getErrorMessage = (error) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "This email is already registered. Please log in.";

      case "auth/invalid-email":
        return "Please enter a valid email address.";

      case "auth/weak-password":
        return "Your password is too weak. Please choose a stronger one.";

      case "auth/popup-closed-by-user":
        return "Google sign-up was cancelled.";

      case "auth/popup-blocked":
        return "Your browser blocked the Google sign-in popup.";

      case "auth/unauthorized-domain":
        return "This domain is not authorized in Firebase.";

      case "auth/operation-not-allowed":
        return "This sign-in method is not enabled in Firebase.";

      case "auth/network-request-failed":
        return "Network error. Please check your internet connection.";

      default:
        return error.message || "Something went wrong. Please try again.";
    }
  };

  // Email and password registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agreed) {
      setError("Please accept the Terms and Privacy Policy.");
      return;
    }

    setLoading(true);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      await updateProfile(result.user, {
        displayName: name.trim(),
      });

      navigate("/login", {
        replace: true,
        state: { registered: true },
      });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // Google registration
  const handleGoogleRegister = async () => {
    setError("");
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });

      await signInWithPopup(auth, provider);

      navigate("/", { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left branding section */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative hidden overflow-hidden bg-primary p-12 text-primary-content lg:flex lg:flex-col lg:justify-between"
        >
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/20" />
          <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full border border-white/20" />

          <Link to="/" className="relative z-10 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl text-primary">
              <FaLayerGroup />
            </span>
            <span className="text-2xl font-extrabold">FlowPilot</span>
          </Link>

          <div className="relative z-10 max-w-lg">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-primary-content/70">
              Work smarter, together
            </p>

            <h1 className="text-5xl font-extrabold leading-tight xl:text-6xl">
              Turn your ideas into real progress.
            </h1>

            <p className="mt-6 max-w-md text-lg leading-8 text-primary-content/80">
              Bring your projects, tasks, and team together in one simple
              workspace.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Organize all your projects",
                "Collaborate with your team",
                "Track your progress easily",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <FaCheckCircle className="shrink-0 text-xl" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="relative z-10 text-sm text-primary-content/70">
            © {new Date().getFullYear()} FlowPilot. Portfolio demo.
          </p>
        </motion.div>

        {/* Right registration section */}
        <div className="flex items-center justify-center px-4 py-10 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            {/* Mobile logo */}
            <Link
              to="/"
              className="mb-8 flex items-center justify-center gap-2 text-2xl font-extrabold text-primary lg:hidden"
            >
              <FaLayerGroup />
              FlowPilot
            </Link>

            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-sm text-base-content/60 transition hover:text-primary"
            >
              <FaArrowLeft />
              Back to home
            </Link>

            <div className="card border border-base-300 bg-base-100 shadow-xl">
              <div className="card-body p-6 sm:p-8">
                {/* Heading */}
                <div className="mb-2">
                  <h2 className="text-3xl font-extrabold tracking-tight">
                    Create account
                  </h2>

                  <p className="mt-2 text-sm text-base-content/60">
                    Get started with FlowPilot today.
                  </p>
                </div>

                {/* Error message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                    className="alert alert-error mt-3 text-sm"
                  >
                    <span>{error}</span>
                  </motion.div>
                )}

                {/* Registration form */}
                <form onSubmit={handleRegister} className="mt-4 space-y-4">
                  {/* Full name */}
                  <div className="form-control">
                    <label htmlFor="register-name" className="label">
                      <span className="label-text font-semibold">
                        Full name
                      </span>
                    </label>

                    <label className="input input-bordered flex items-center gap-3">
                      <FaUser className="text-base-content/40" />

                      <input
                        id="register-name"
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        className="grow"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        minLength={2}
                        required
                      />
                    </label>
                  </div>

                  {/* Email */}
                  <div className="form-control">
                    <label htmlFor="register-email" className="label">
                      <span className="label-text font-semibold">
                        Email address
                      </span>
                    </label>

                    <label className="input input-bordered flex items-center gap-3">
                      <FaEnvelope className="text-base-content/40" />

                      <input
                        id="register-email"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        className="grow"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </label>
                  </div>

                  {/* Password */}
                  <div className="form-control">
                    <label htmlFor="register-password" className="label">
                      <span className="label-text font-semibold">Password</span>
                    </label>

                    <label className="input input-bordered flex items-center gap-3">
                      <FaLock className="text-base-content/40" />

                      <input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="At least 6 characters"
                        className="grow"
                        autoComplete="new-password"
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />

                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={() => setShowPassword((previous) => !previous)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </label>
                  </div>

                  {/* Confirm password */}
                  <div className="form-control">
                    <label
                      htmlFor="register-confirm-password"
                      className="label"
                    >
                      <span className="label-text font-semibold">
                        Confirm password
                      </span>
                    </label>

                    <label className="input input-bordered flex items-center gap-3">
                      <FaLock className="text-base-content/40" />

                      <input
                        id="register-confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Enter password again"
                        className="grow"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />

                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={() =>
                          setShowConfirmPassword((previous) => !previous)
                        }
                        aria-label={
                          showConfirmPassword
                            ? "Hide confirm password"
                            : "Show confirm password"
                        }
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </label>
                  </div>

                  {/* Terms and conditions */}
                  <label className="flex cursor-pointer items-start gap-3 py-1">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary checkbox-sm mt-1"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      required
                    />

                    <span className="text-xs leading-5 text-base-content/70">
                      I agree to the{" "}
                      <Link to="/terms" className="link link-primary">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="link link-primary">
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner loading-sm" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create account
                        <FaArrowRight />
                      </>
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="divider my-2 text-xs text-base-content/50">
                  OR CONTINUE WITH
                </div>

                {/* Google sign-up */}
                <button
                  type="button"
                  onClick={handleGoogleRegister}
                  disabled={loading}
                  className="btn btn-outline w-full"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <FaGoogle className="text-lg text-red-500" />
                  )}
                  Continue with Google
                </button>

                {/* Login link */}
                <p className="mt-5 text-center text-sm text-base-content/70">
                  Already have an account?{" "}
                  <Link to="/login" className="link link-primary font-bold">
                    Log in
                  </Link>
                </p>

                <p className="mt-3 text-center text-xs text-base-content/50">
                  Your account is managed by Firebase Authentication.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
