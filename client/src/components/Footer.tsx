import { Link } from "react-router-dom";
import { FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-[#0C0F1A] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand + About */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-5 group">
              <div className="w-9 h-9 bg-[#155DFC] rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-2xl font-bold text-white group-hover:text-[#155DFC] transition-colors duration-300">
                SARAL AI
              </span>
            </Link>

            <p className="text-gray-400 max-w-xl mb-5 leading-relaxed">
              AI-powered recruitment platform that helps you find the perfect candidates
              across multiple platforms. Hire smarter, not harder.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#155DFC] transition-all duration-300 transform hover:scale-110"
              >
                <FaTwitter className="text-gray-400 hover:text-white transition" size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#155DFC] transition-all duration-300 transform hover:scale-110"
              >
                <FaLinkedinIn className="text-gray-400 hover:text-white transition" size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#155DFC] transition-all duration-300 transform hover:scale-110"
              >
                <FaGithub className="text-gray-400 hover:text-white transition" size={18} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Product</h3>
            <ul className="space-y-3">
              {["Features", "Customers", "Pricing", "Case Studies"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-400 hover:text-[#155DFC] transition flex items-center group"
                  >
                    {item}
                    <FiArrowUpRight className="opacity-0 group-hover:opacity-100 ml-1 -translate-y-px transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-3">
              {["Help Center", "Documentation", "API Status", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-[#155DFC] transition flex items-center group"
                  >
                    {item}
                    <FiArrowUpRight className="opacity-0 group-hover:opacity-100 ml-1 -translate-y-px transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} SARAL AI. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-[#155DFC] transition">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-[#155DFC] transition">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-[#155DFC] transition">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
