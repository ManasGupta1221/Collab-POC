"use client";

import { FaCloudUploadAlt } from "react-icons/fa"; // Import upload icon
import { useState } from "react"; // Import React state hook
import { useRouter } from "next/navigation"; // Import Next.js router

export default function UploadFile({ orderId }) {
  const router = useRouter(); // Initialize router
  const [file, setFile] = useState(null); // State for selected file
  const [status, setStatus] = useState(""); // State for upload status message

  // Handle form submission for file upload
  const handleUpload = async (e) => {
    e.preventDefault(); // Prevent default form submit
    setStatus(""); // Clear previous messages

    if (!file) {
      setStatus("❗ Please select a video file."); // Show error if no file
      return;
    }

    try {
      const formData = new FormData(); // Create FormData object
      formData.append("file", file); // Append file to form data
      formData.append("orderId", orderId); // Append orderId to form data

      const res = await fetch("/api/uploadVideos", {
        method: "POST",
        body: formData, // Send form data to API
      });

      const data = await res.json(); // Parse response JSON
      console.log("Upload your content,data");

      if (res.ok) {
        setStatus("✅ " + data.message); // Show success message
        console.log("File ID:", data.fileId); // Log file ID
        // router.push(`/videos/${data.fileId}}`); // (Optional) Redirect after upload
      } else {
        setStatus("❌ Upload failed: " + (data.error || "Unknown error")); // Show error message
      }
    } catch (err) {
      setStatus("❌ Network error: " + err.message); // Show network error
    }
  };

  return (
    <>
      {/* Heading with upload icon */}
      <h2 className="text-3xl font-extrabold mb-2 text-[rgb(185,10,10)] flex items-center gap-2">
        <FaCloudUploadAlt />
        Upload File
      </h2>

      {/* Upload form */}
      <form
        onSubmit={handleUpload}
        className="flex flex-col items-center gap-6 p-6 bg-gray-50 rounded-xl w-full max-w-md mx-auto"
      >
        <label className="text-lg font-semibold text-[rgb(185,0,0)]">
          Select a video file to upload
        </label>

        {/* File input */}
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files[0])} // Update file state on change
          className="w-full cursor-pointer px-4 py-3 text-sm border-2 border-[rgb(185,0,0)] rounded-lg bg-gray-100 text-[rgb(185,0,0)] hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-[rgb(185,0,0)] transition"
        />

        {/* Upload button */}
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-3 bg-[rgb(185,0,0)] text-white text-lg font-semibold rounded-lg hover:bg-red-800 transition duration-200 shadow-md"
        >
          <FaCloudUploadAlt size={22} />
          Upload Video
        </button>
        {/* Status message */}
        {status && <p className="mt-4 text-green-700 text-center">{status}</p>}
      </form>
    </>
  );
}
