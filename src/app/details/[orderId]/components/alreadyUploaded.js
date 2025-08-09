"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { FaTrash, FaCloudUploadAlt } from "react-icons/fa";

export default function AlreadyUploaded({
  orderId,
  products,
  videos,
  setVideos,
  category,
}) {
  // const [videos, setVideos] = useState([]);
  const [deleting, setDeleting] = useState(null);

  // useEffect(() => {
  //   async function fetchVideos() {
  //     if (orderId && products?.length) {
  //       const productIds = products.map((p) => p.productId).join(",");
  //       const res = await fetch(
  //         `/api/alreadyUploaded?orderId=${orderId}&productIds=${productIds}`
  //       );
  //       const data = await res.json();
  //       setVideos(data.videos || []);
  //     }
  //   }
  //   fetchVideos();
  // }, [orderId, products]);

  const handleDelete = async (video) => {
    if (
      !confirm("Are you sure you want to delete this video from the database?")
    )
      return;
    setDeleting(video._id);
    try {
      const res = await fetch(
        `/api/deleteUploadedVideo?id=${video._id}&productId=${video.productId}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        setVideos((prev) => prev.filter((v) => v._id !== video._id));
      } else {
        alert("Failed to delete video");
      }
    } catch (err) {
      alert("Error deleting video");
    }
    setDeleting(null);
  };
  if (!videos || videos.length === 0) return null;

  return (
    <div
      id="yourUploads"
      className="max-w-3xl mx-auto bg-gray-50 rounded-2xl shadow-lg p-6  flex flex-col gap-2 border-l-8 border-[rgb(185,10,10)] mt-10"
    >
      <h1 className="text-3xl font-extrabold mb-2 text-[rgb(185,10,10)] flex items-center gap-2">
        <FaCloudUploadAlt />
        Your Uploads
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {products.map((product) => {
          const video = videos.find((v) => v.productId === product.productId);
          if (!video) return null; // Skip rendering if no video
          return (
            <div
              key={product.productId}
              className="bg-gray-200 rounded-lg p-4 shadow flex flex-col justify-between gap-2"
            >
              <div className="font-semibold mb-3">{product.category}</div>
              <video
                controls
                src={`/api/streamAlreadyUploadedVideo?id=${video._id}&productId=${product.productId}`}
                className="w-full rounded border-2 border-[rgb(185,10,10)]"
              />

              <div className="flex items-center justify-between mt-2">
                <Link
                  href={`/productVideos?ProductId=${product.productId}`}
                  className=" underline text-[rgb(185,10,10)] hover:text-red-400  transition-colors font-bold px-4 py-1"
                >
                  Influencers Column for {product.category}
                </Link>
                <button
                  className="ml-4 p-2 rounded-full hover:bg-red-300 hover:cursor-pointer transition"
                  title="Delete Video"
                  onClick={() => handleDelete(video)}
                  type="button"
                  disabled={deleting === video._id}
                >
                  <FaTrash className="text-[rgb(185,10,10)] text-lg hover:text-red-600 transition-colors" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
