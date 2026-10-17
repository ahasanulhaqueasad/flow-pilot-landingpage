import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "../firebase";
import {
  FaBars,
  FaTimes,
  FaArrowRight,
  FaLayerGroup,
  FaThLarge,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ];

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      closeMenu();
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout করা যায়নি। আবার চেষ্টা করো।");
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-lg"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <FaLayerGroup size={20} />
          </span>

          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            Flow<span className="text-indigo-600">Pilot</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-4 md:flex">
          {!authLoading && user ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-indigo-600"
              >
                <FaThLarge />
                Dashboard
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-red-600"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold text-slate-700 transition hover:text-indigo-600"
              >
                Log in
              </Link>

              <Link
                to="/register"
                className="btn border-0 bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700"
              >
                Get Started
                <FaArrowRight />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className="font-medium text-slate-700 hover:text-indigo-600"
              >
                {link.name}
              </a>
            ))}

            {!authLoading && user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="flex items-center gap-2 font-semibold text-indigo-600"
                >
                  <FaThLarge />
                  Dashboard
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-left font-semibold text-red-600"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="font-semibold text-slate-700"
                >
                  Log in
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="btn border-0 bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Get Started
                  <FaArrowRight />
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </motion.header>
  );
};

export default Navbar;
