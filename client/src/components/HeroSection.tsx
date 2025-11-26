// components/HeroSection.tsx
import { Link } from "react-router-dom";
import { IoStarSharp } from "react-icons/io5";

const HeroSection = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 pt-24 px-6 relative overflow-hidden">

      {/* ===== SOFT BLOB BACKGROUND ===== */}
      <div className="absolute top-16 left-24 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute top-60 right-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-30 animate-pulse delay-500" />
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-30 animate-pulse delay-700" />

      {/* ===== FULLSCREEN DOT GRID ===== */}
      <div className="absolute inset-0 opacity-10 pointer-events-none grid grid-cols-20 gap-4">
        {Array.from({ length: 400 }).map((_, i) => (
          <span key={i} className="w-1 h-1 rounded-full bg-blue-400" />
        ))}
      </div>

      {/* ===== DIAGONAL DOT TRAIL (BOTTOM-RIGHT) ===== */}
      <div className="absolute bottom-16 right-10 rotate-[-14deg] flex gap-3 opacity-25 pointer-events-none">
        {[...Array(14)].map((_, i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_6px_rgba(90,70,255,0.5)] animate-[pulse_2.4s_infinite]"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </div>

      {/* ===== SPINNING DOTTED CIRCLE ===== */}
      <div className="absolute left-[48%] top-[45%] w-44 h-44 rounded-full border border-dotted border-blue-500 opacity-40 animate-[spin_14s_linear_infinite]" />

      {/* ===== GLASS SPHERE ===== */}
      <div className="absolute left-[18%] top-[62%] w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-[inset_0_0_20px_rgba(255,255,255,0.8),0_0_45px_rgba(0,0,0,0.1)] animate-[float_6s_ease-in-out_infinite]" />

      {/* ===== CONTENT ===== */}
      <div className="max-w-7xl mx-auto relative z-10 text-center">

        {/* VERSION BADGE */}
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-blue-200 text-blue-800 text-sm px-4 py-2 rounded-full mb-10 hover:shadow-lg transition cursor-pointer group">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          v.0.6 now live
          <span className="group-hover:translate-x-1 transition duration-200">→</span>
        </div>

        {/* TITLES */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
          Hire{" "}
          <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            smarter
          </span>
          , not harder.
        </h1>

        <h2 className="text-2xl md:text-4xl text-gray-800 font-semibold mb-8 bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text">
          SARAL finds the talent.
        </h2>

        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-14 leading-relaxed">
          AI-powered candidate sourcing across{" "}
          <span className="font-semibold text-blue-600">LinkedIn</span>,{" "}
          <span className="font-semibold text-gray-800">GitHub</span>, and{" "}
          <span className="font-semibold text-pink-600">Behance</span>.  
          Stop searching manually — start connecting instantly.
        </p>

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link
            to="/search"
            className="group relative bg-linear-to-r from-[#155DFC] to-[#194CE9] text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Searching Free
              <span className="group-hover:translate-x-1 duration-200">→</span>
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-[#194CE9] to-[#0E3ECF] rounded-xl opacity-0 group-hover:opacity-100 duration-300"></div>
          </Link>

          <button
            className="group relative cursor-pointer select-none px-8 py-4 rounded-xl font-semibold text-lg
              text-gray-700 border border-gray-300 bg-white/70 backdrop-blur-md
              transition-all duration-300
              hover:text-[#155DFC] hover:border-[#155DFC]/50
              shadow-[0_6px_18px_rgba(0,0,0,0.05),inset_0_-4px_10px_rgba(0,0,0,0.09),inset_0_4px_8px_rgba(255,255,255,0.12)]
              hover:shadow-[0_8px_22px_rgba(0,0,0,0.08),inset_0_-6px_14px_rgba(0,0,0,0.12),inset_0_6px_10px_rgba(255,255,255,0.15)]"
          >
            <span className="flex items-center gap-2">
              Book a Demo
              <span className="group-hover:translate-x-1 duration-200">→</span>
            </span>
          </button>
        </div>

        {/* TRUST BADGE */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <img
                  key={i}
                  src={`https://randomuser.me/api/portraits/men/${i}.jpg`}
                  alt="avatar"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <span>Used by 500+ companies</span>
          </div>

          <div className="hidden sm:block w-px h-6 bg-gray-300"></div>

          <div className="flex mb-3 items-center">
            {[1,2,3,4,5].map(i => (
              <IoStarSharp key={i} className="text-yellow-400 text-3xl p-1" />
            ))}
            <span className="mx-2">4.9/5 from 2k+ reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
