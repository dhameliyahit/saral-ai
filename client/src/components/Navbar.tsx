import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-[#155DFC] rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900 group-hover:text-[#155DFC] transition-colors duration-300">
                SARAL AI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/features" className="nav-link">Features</Link>
              <Link to="/customers" className="nav-link">Customers</Link>
              <Link to="/pricing" className="nav-link">Pricing</Link>
              <Link to="/email-campaigns" className="nav-link">Email Campaigns</Link>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-gray-700 cursor-pointer hover:text-[#155DFC] font-medium transition">Log in</button>
              <button className="bg-[#155DFC] cursor-pointer text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition shadow-lg hover:shadow-xl font-medium">
                Start Free
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 cursor-pointer rounded-lg hover:bg-gray-100 transition"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <FiMenu size={26} className="text-gray-800" />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE SIDEBAR OVERLAY */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* MOBILE LEFT SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-70 transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">
          <span className="text-xl font-semibold text-[#155DFC]">Menu</span>
          <button onClick={() => setIsMobileMenuOpen(false)}>
            <FiX size={28} className="text-gray-700" />
          </button>
        </div>

        <div className="flex flex-col px-6 py-6 space-y-6 text-lg">
          <Link to="/features" onClick={() => setIsMobileMenuOpen(false)} className="mobile-link">Features</Link>
          <Link to="/customers" onClick={() => setIsMobileMenuOpen(false)} className="mobile-link">Customers</Link>
          <Link to="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="mobile-link">Pricing</Link>
          <Link to="/email-campaigns" onClick={() => setIsMobileMenuOpen(false)} className="mobile-link">Email Campaigns</Link>

          <div className="pt-6 border-t border-gray-200 space-y-4">
            <button className="w-full text-left text-gray-700 hover:text-[#155DFC] transition font-medium">
              Log in
            </button>
            <button className="w-full bg-[#155DFC] text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-medium shadow-md hover:shadow-xl">
              Start Free
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
