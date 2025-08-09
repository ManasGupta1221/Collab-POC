"use client";
import { useRouter } from "next/navigation";
import { FaSignInAlt, FaArrowRight, FaPlay, FaStar, FaUsers, FaVideo, FaTrophy, FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    { icon: FaVideo, title: "Authentic Reviews", desc: "Real experiences, real impact" },
    { icon: FaUsers, title: "Influencer Network", desc: "Connect with style leaders" },
    { icon: FaTrophy, title: "Exclusive Rewards", desc: "Earn while you share" }
  ];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background with Multiple Layers */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('/denim.jpg')",
        }}
      />
      
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-[rgb(185,10,10)]/20"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0">
        {/* Animated Circles */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-[rgb(185,10,10)]/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/5 rounded-full blur-lg animate-bounce delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-[rgb(185,10,10)]/15 rounded-full blur-md animate-pulse delay-500"></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-1/3 right-10 w-16 h-16 border border-white/20 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-12 h-12 border border-[rgb(185,10,10)]/30 rotate-12 animate-pulse"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-6">
        {/* Hero Section */}
        <div className={`text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[rgb(185,10,10)]/20 to-red-900/20 backdrop-blur-xl border border-[rgb(185,10,10)]/30 rounded-full px-4 py-2 mb-6">
            <FaStar className="text-yellow-400 text-sm" />
            <span className="text-white/90 text-sm font-medium">Premium Experience</span>
            <FaStar className="text-yellow-400 text-sm" />
          </div>

          {/* Main Heading with Enhanced Typography */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-black mb-4 leading-none">
              <span className="text-white drop-shadow-2xl">Welcome to</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[rgb(185,10,10)] via-red-400 to-[rgb(255,40,9)] animate-gradient-x">
                Collab
              </span>
            </h1>
            
            {/* Animated Subtitle */}
            <div className="relative">
              <p className="text-xl md:text-3xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-light">
                Where <span className="font-bold text-[rgb(185,10,10)]">authentic voices</span> meet 
                <span className="font-bold text-white"> premium style</span>
              </p>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[rgb(185,10,10)] to-transparent rounded-full"></div>
            </div>
          </div>

          {/* Enhanced Description */}
          <div className="mb-12 max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Join an exclusive community of influencers and style enthusiasts. 
              Share your <span className="text-[rgb(185,10,10)] font-semibold">Levi's journey</span> through 
              compelling video content and earn premium rewards.
            </p>
          </div>

          {/* Premium CTA Section */}
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {/* Primary Button - Enhanced */}
              <button
                onClick={handleLoginClick}
                className="group relative overflow-hidden bg-gradient-to-r from-[rgb(185,10,10)] via-red-600 to-[rgb(155,0,0)] hover:from-[rgb(205,20,20)] hover:via-red-500 hover:to-[rgb(175,10,10)] text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-[0_20px_50px_rgba(185,10,10,0.4)] flex items-center gap-4 min-w-[280px] border border-red-700/50"
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                
                <FaSignInAlt className="text-xl z-10" />
                <span className="z-10">Start Your Journey</span>
                <FaArrowRight className="text-xl z-10 group-hover:translate-x-2 transition-transform duration-300" />
              </button>

              {/* Secondary Button */}
              <button className="group bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white px-8 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 border border-white/30 hover:border-[rgb(185,10,10)]/50 min-w-[200px] flex items-center gap-3">
                <FaPlay className="text-lg group-hover:scale-110 transition-transform duration-300" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Feature Cards */}
        <div className={`w-full max-w-6xl transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = currentFeature === index;
              
              return (
                <div
                  key={index}
                  className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border transition-all duration-700 hover:scale-105 hover:rotate-1 ${
                    isActive 
                      ? 'border-[rgb(185,10,10)]/60 shadow-[0_0_30px_rgba(185,10,10,0.3)]' 
                      : 'border-white/20 hover:border-[rgb(185,10,10)]/40'
                  }`}
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 rounded-3xl transition-opacity duration-700 ${
                    isActive ? 'bg-[rgb(185,10,10)]/5 opacity-100' : 'opacity-0'
                  }`}></div>
                  
                  {/* Icon */}
                  <div className={`relative mb-6 transition-all duration-500 ${
                    isActive ? 'scale-110' : 'group-hover:scale-105'
                  }`}>
                    <div className="w-16 h-16 bg-gradient-to-br from-[rgb(185,10,10)] to-red-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <Icon className="text-white text-2xl" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[rgb(185,10,10)] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>

                  {/* Hover Arrow */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <FaArrowRight className="text-[rgb(185,10,10)] text-lg" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Stats/Social Proof */}
        <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl w-full transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { number: "10K+", label: "Active Creators", icon: FaUsers },
            { number: "50K+", label: "Videos Shared", icon: FaVideo },
            { number: "95%", label: "Satisfaction Rate", icon: FaHeart },
            { number: "$100K+", label: "Rewards Earned", icon: FaTrophy }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="mb-3 flex justify-center">
                  <Icon className="text-[rgb(185,10,10)] text-2xl group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-3xl font-black text-white mb-1">{stat.number}</div>
                <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
