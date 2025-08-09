import React, { useState } from "react";
import { FaCheck, FaArrowDown} from "react-icons/fa";
import Link from "next/link";

export default function UploadPVideo({
  productId,
  username,
  userId,
  orderId,
  videos,
  setVideos,
}) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Check if a video for this product is already uploaded
  const alreadyUploaded = videos?.some((v) => v.productId === productId);

  const handleUpload = async (e) => {
    e.preventDefault();
    setStatus("");
    if (!file) {
      setStatus("❗ Please select a video file.");
      return;
    }
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("productId", productId);
      formData.append("username", username);
      formData.append("userId", userId);
      formData.append("orderId", orderId);

      const res = await fetch("/api/uploadPVideo", {
        method: "POST",
        body: formData, // Send form data to API
      });

      const data = await res.json();
      console.log("Upload your content,data");

      if (res.ok && data.video) {
        // setStatus("Video uploaded successfully!");
        setVideos((prev) => [...prev, { ...data.video, productId }]);
        setFile(null);
      } else {
        setStatus("❌ Upload failed: " + (data.error || "Unknown error")); // Show error message
      }
    } catch (err) {
      setStatus("❌ Network error: " + err.message); // Show network error
    }
    setIsUploading(false);
  };

  const inputId = `video-upload-${productId}`;

  return (
    <form onSubmit={handleUpload} className="flex flex-col gap-2 w-full">
      <div className="relative w-full">
        {alreadyUploaded ? (
          <div>
            <div className="text-green-600 font-semibold py-1 flex items-center justify-between  pr-4">
              Video Uploaded <FaCheck className="text-green-600" />
            </div>
            <div className="text-green-600   hover:text-red-600 hover:cursor-pointer text-sm">
              <Link href="#yourUploads" className="underline">Your Uploads </Link>
            </div>
          </div>
        ) : (
          <>
            <input
              id={inputId}
              type="file"
              accept="video/*"
              onChange={(e) => {
                const f = e.target.files[0];
                if (f && f.name.length > 10) {
                  // Truncate filename to 10 letters (excluding extension)
                  const ext = f.name.slice(f.name.lastIndexOf('.'));
                  const base = f.name.slice(0, f.name.lastIndexOf('.')).slice(0, 10);
                  const newName = base + ext;
                  const file = new File([f], newName, { type: f.type });
                  setFile(file);
                } else {
                  setFile(f);
                }
              }}
              className="hidden"
              disabled={isUploading}
            />
            {!file ? (
              <label
                htmlFor={inputId}
                className="block w-full text-center cursor-pointer bg-gray-100 border border-gray-300 rounded-lg py-2 text-[rgb(185,10,10)] font-semibold hover:bg-red-100 transition"
              >
                Choose Video
              </label>
            ) : (
              <button
                type="submit"
                className="block w-full mt-1 bg-[rgb(185,10,10)] text-white font-semibold py-2 rounded-lg hover:bg-red-700 hover:cursor-pointer transition-colors select-none"
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Upload Video"}
              </button>
            )}
            {file && (
              <span className="block text-xs text-gray-600 mt-1 truncate">
                {file.name}
              </span>
            )}
          </>
        )}
      </div>
      {status && <p className="mt-4 text-green-700 text-center">{status}</p>}
    </form>
  );
}
