"use client";
import { use } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CircularLoader from "@/app/productVideos/loading";
import {
  FaUser,
  FaPhone,
  FaBoxOpen,
  FaCalendarAlt,
  FaRupeeSign,
} from "react-icons/fa";
import UploadFile from "./components/uploadFile";
import Image from "next/image";
import UploadPVideo from "./components/uploadPVideo";
import AlreadyUploaded from "./components/alreadyUploaded";
export default function DetailsPage({ params }) {
  const [videos, setVideos] = useState([]);

  const orderId = params.orderId;
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phoneNumber");
  const [user, setUser] = useState(null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!phoneNumber || !orderId) {
      setError("Missing phone number or order ID.");
      setLoading(false);
      return;
    }
    fetch(`/api/getOrderDetails?phoneNumber=${phoneNumber}&orderId=${orderId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.data.user);
          setOrder(data.data.order);
        } else {
          setError(data.message || "Details not found.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch details.");
        setLoading(false);
      });
  }, [phoneNumber, orderId]);

  useEffect(() => {
    async function fetchVideos() {
      if (order?.orderId && order?.products?.length) {
        const productIds = order.products.map((p) => p.productId).join(",");
        const res = await fetch(
          `/api/alreadyUploaded?orderId=${order.orderId}&productIds=${productIds}`
        );
        const data = await res.json();
        setVideos(data.videos || []);
      }
    }
    fetchVideos();
  }, [order]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularLoader />
      </div>
    );
  if (error)
    return <div className="text-red-700 text-center mt-10">{error}</div>;

  return (
    <div
      className="w-full min-h-screen bg-no-repeat bg-cover bg-center pt-18 pb-15"
      style={{
        backgroundImage: "url('/denim.jpg')",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      
      <div className="max-w-3xl mx-auto bg-gray-50 rounded-2xl shadow-lg p-6 mb-10 flex flex-col gap-2 border-l-8 border-[rgb(185,10,10)] mt-3`">
        <h1 className="text-3xl font-extrabold mb-2 text-[rgb(185,10,10)] flex items-center gap-2">
          <FaUser className="text-[rgb(185,10,10)]" /> User Details
        </h1>
        <div className="flex flex-col gap-1 text-lg">
          <div className="flex items-center gap-2">
            <span className="font-semibold">User ID:</span>
            <span>{user.userID}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Name:</span>
            <span>{user.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Phone:</span>
            <span>{user.phone}</span>
          </div>
        </div>
      </div>
      {/* Order Details Card */}
      <div className="max-w-3xl mx-auto bg-gray-50 rounded-2xl shadow-lg p-6 border-l-8 border-[rgb(185,10,10)]">
        <h1 className="text-3xl font-extrabold mb-4 text-[rgb(185,10,10)] flex items-center gap-2">
          <FaBoxOpen className="text-[rgb(185,10,10)]" /> Order Details
        </h1>
        <div className="flex flex-col sm:flex-row sm:gap-12 gap-2 mb-6">
          <div className="flex flex-col gap-1 text-lg">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Order ID:</span>
              <span>{order.orderId}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Date of Purchase:</span>
              <span>{order.date}</span>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-[rgb(185,10,10)]">
          Product Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {order.products.map((product, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-xl shadow p-4 flex justify-between"
            >
              <div className="flex-shrink-0">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.category}
                    className="w-32 h-32 object-cover rounded-lg border-2 border-[rgb(185,10,10)] bg-white"
                  />
                ) : (
                  <div className="w-32 h-32 flex items-center justify-center bg-gray-200 rounded-lg text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <div className="w-full flex flex-col gap-1 text-base ml-7">
                <div>
                  <span className="font-semibold">Category:</span>{" "}
                  {product.category}
                </div>
                <div>
                  <span className="font-semibold">Quantity:</span> {product.qty}
                </div>
                <div>
                  <span className="font-semibold">Unit Price:</span>{" "}
                  {product.price}
                </div>
                <div>
                  <UploadPVideo
                    productId={product.productId}
                    username={user.name}
                    userId={user.userID}
                    orderId={order.orderId}
                    videos={videos}
                    setVideos={setVideos}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr className="w-1/4 ml-0 my-6 border-[rgb(185,10,10)]" />
        <div className="flex items-center gap-2 text-xl font-bold">
          <FaRupeeSign className="text-[rgb(185,10,10)]" />
          <span>Total Amount:</span>
          <span className="text-[rgb(185,10,10)]">{order.totalAmount}</span>
        </div>
      </div>
      <AlreadyUploaded
        orderId={order.orderId}
        products={order.products}
        videos={videos}
        setVideos={setVideos}
      />
    </div>
  );
}
