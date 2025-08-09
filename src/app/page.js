"use client";
import { useRouter } from "next/navigation";
import { FaSignInAlt, FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen text-gray-100 relative"
      style={{
        backgroundImage: "url('/denim.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Custom Cursor Follower */}
      <div
        className="fixed pointer-events-none z-[10] mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: 'translate(0, 0)',
        }}
      >
        <div className="w-4 h-4 bg-[rgb(185,10,10)] rounded-full shadow-lg "></div>
      </div>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/85 to-black/50"></div>

      <div className="absolute inset-0">
        {/* Animated Circles */}
        <div className="absolute top-38 right-18 w-24 h-24 bg-[rgb(185,10,10)]/20 rounded-full blur-md animate-bounce delay-1000"></div>

        {/* Geometric Shapes */}
        <div className="absolute top-1/3 right-12 w-16 h-16 border border-white/20 rotate-45 animate-[spin_4s_linear_infinite]"></div>
      </div>

      <div className="relative z-10 text-center px-6 select-none">
        <div className="mb-15 mt-18">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[rgb(175,5,10)] to-[rgb(255,40,9)]">
              Collab
            </span>
          </h1>
        </div>

        <div className="mb-12">
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed drop-shadow">
            Share your <span className="font-bold text-[rgb(185,10,10)]">Levi's</span> product experience through video — quick, simple,
            and personal.
          </p>
        </div>

        {/* Beautiful Login Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center z-[9999]">
          <button
            onClick={handleLoginClick}
            className="select-none group bg-gradient-to-r from-[rgb(185,10,10)] to-[rgb(155,0,0)] hover:from-[rgb(205,10,0)] hover:to-[rgb(120,0,0)] text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-3 min-w-[200px]"
          >
            <FaSignInAlt className="text-lg" />
            Login to Continue
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:border-[rgb(185,10,10)]/30 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-2">
              🎥 Video Reviews
            </h3>
            <p className="text-gray-300 text-sm">Share authentic experiences</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:border-[rgb(185,10,10)]/30 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-2">
              👥 Community
            </h3>
            <p className="text-gray-300 text-sm">Influencers influencing your style</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:border-[rgb(185,10,10)]/30 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-2">
              🏆 Rewards
            </h3>
            <p className="text-gray-300 text-sm">Earn vouchers for sharing</p>
          </div>
        </div>
      </div>
    </div>
  );
}
