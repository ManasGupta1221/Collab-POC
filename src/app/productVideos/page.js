"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaPlay, FaStar, FaUsers } from "react-icons/fa";
import Loading from "./loading";
import CircularLoader from "./loading";

export default function ProductVideosPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get("ProductId");
  const orderId = searchParams.get("orderId");
  const phoneNumber = searchParams.get("phoneNumber");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imgLoading, setImgLoading] = useState(true);
  const [productImg, setProductImg] = useState(productId);
  const [productCategory, setProductCategory] = useState("");

  useEffect(() => {
    if (!productId) return;
    fetch(`/api/productVideos?ProductId=${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.files || []);
        setLoading(false);
      });
  }, [productId]);

  useEffect(() => {
    if (!productId) return;

    fetch(`/api/productCategoryImg?ProductId=${productId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.image) {
          setProductImg(data.image);
          setImgLoading(false);

        }
      })
      .catch((error) => {
        console.error("Error fetching product image:", error);
      });
  }, [productId]);

  const handleGoBack = () => {
    if (orderId && phoneNumber) {
      router.push(`/details/${orderId}?phoneNumber=${phoneNumber}`);
    } else {
      router.back();
    }
  };

  if (!productId)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-red-600 text-xl font-semibold bg-white rounded-xl shadow-lg px-8 py-6">
          No ProductId provided.
        </div>
      </div>
    );

  return (
    <div
      className="w-full min-h-screen bg-no-repeat bg-cover bg-center bg-fixed select-none relative"
      style={{
        backgroundImage: "url('/denim.jpg')",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>

      <div className="relative z-10">
        {/* Go Back Button */}
        <div className="fixed top-5 right-6 z-20">
          <button
            onClick={handleGoBack}
            className="select-none group flex items-center gap-3 px-6 py-3 rounded-2xl shadow-2xl border-2 border-[rgb(185,10,10)]/60 bg-gradient-to-r from-black/80 via-gray-900/90 to-black/80 backdrop-blur-xl hover:shadow-[0_4px_32px_0_rgba(185,10,10,0.15)] hover:border-[rgb(185,10,10)]/80 transition-all duration-200 transform hover:-translate-y-1 relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[rgb(185,10,10)]/15 via-transparent to-[rgb(185,10,10)]/15 rounded-2xl animate-pulse pointer-events-none"></span>
            <span className="relative z-10 flex items-center gap-3">
              <FaArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform duration-200 text-[rgb(185,10,10)]" />
              <span className="text-sm font-bold tracking-wide text-white">Go Back</span>
            </span>
          </button>
        </div>

        {/* Creative Header Section */}
        <div className="pt-20 pb-10">
          <div className="max-w-5xl mx-auto px-20">
            <div className="relative bg-gradient-to-r from-black/80 via-gray-900/90 to-black/80 backdrop-blur-xl rounded-3xl px-8 py-4 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-[rgb(185,10,10)]/15 via-transparent to-[rgb(185,10,10)]/15 rounded-3xl animate-pulse pointer-events-none"></div>
              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
                {/* Product Image Section */}
                <div className="flex-shrink-0">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-[rgb(185,10,10)]/30 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500 pointer-events-none"></div>
                    <div className="relative w-30 h-30 lg:w-45 lg:h-45 rounded-2xl overflow-hidden border-4 border-[rgb(185,10,10)]/70 shadow-2xl transform transition-all duration-500 flex justify-center items-center">
                      {productImg && productImg !== productId && !imgLoading ? (
                        <Image
                          src={productImg}
                          alt={productCategory || "Product"}
                          fill
                          className="object-cover"
                          priority
                        />
                      ) : (
                        <div>
                          <CircularLoader containerClass="" className="h-7 w-7"/>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* Text Content Section */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="mb-1 lg:mb-4">
                    <h1 className="text-2xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-white leading-tight">
                      Influencer
                    </h1>
                    <h1 className="text-2xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[rgb(185,10,10)] via-red-400 to-[rgb(185,10,10)] leading-tight">
                      Column
                    </h1>
                  </div>
                  <div className="mb-1 lg:mb-3">
                    <p className="text-sm lg:text-xl text-gray-300 font-light">
                      Featuring{" "}
                      <span className="font-bold text-[rgb(185,10,10)] uppercase tracking-wider">
                        {productCategory || "Premium Collection"}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-gray-300">
                    <div className="flex items-center gap-2">
                      <FaUsers className="text-[rgb(185,10,10)]" />
                      <span className="text-sm font-medium">
                        {videos.length} Influencers
                      </span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="h-1 bg-gradient-to-r from-transparent via-[rgb(185,10,10)] to-transparent rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgb(185,10,10)]/50 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Videos Section */}
        <div className="pb-16">
          {videos.length === 0 && !loading ? (
            <div className="max-w-3xl mx-auto px-4">
              <div className="select-none rounded-xl shadow-lg p-10 text-center text-gray-300 text-lg bg-white/10 backdrop-blur border border-gray-700/50">
                <div className="text-6xl mb-4">🎬</div>
                <p className="text-xl font-semibold mb-2">No videos found</p>
                <p className="text-gray-400">
                  Be the first to share your experience!
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {loading ? (
                  <div className="col-span-full flex justify-center">
                    <CircularLoader containerClass="" className="h-20 w-20"/>
                  </div>
                ) : (
                  videos.map((file) => (
                    <div
                      key={file._id}
                      className="group relative bg-gray-900/80 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-700/50 hover:border-[rgb(185,10,10)]/100 hover:shadow-xl hover:shadow-[rgb(185,10,10)]/20 transition-all duration-250 transform hover:scale-105"
                    >
                      <div className="aspect-video relative overflow-visible">
                        
                        <video
                          controls
                          playsInline
                          src={`/api/streamVideo?ProductId=${productId}&filename=${encodeURIComponent(
                            file.filename
                          )}`}
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 bg-black rounded-t-2xl"
                          style={{ zIndex: 10, position: "relative" }}
                        />
                        {/* Remove overlays that block controls */}
                        {/* Influencer name overlay, moved above video controls */}
                        <div className="absolute top-3 left-3 right-4 z-20 pointer-events-none">
                          <p
                            className="text-white text-sm font-semibold flex items-center gap-2 drop-shadow px-3 py-1 rounded-lg bg-gradient-to-r from-black/80 to-gray-800/80 backdrop-blur-xl"
                            style={{
                              width: "fit-content",
                              maxWidth: "80%",
                              backdropFilter: "blur(2px)",
                            }}
                            
                          >
                            {/* <span className="absolute inset-0 bg-gradient-to-r from-[rgb(185,10,10)]/15 via-transparent to-[rgb(185,10,10)]/15 rounded-2xl animate-pulse pointer-events-none"></span> */}
                            {/* <FaUsers className="text-[rgb(185,10,10)] text-xs" /> */}
                            {file.metadata?.uploadedBy || "Unknown Influencer"}
                          </p>
                        </div>
                        {/* Remove or reduce bottom overlays that block controls */}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
