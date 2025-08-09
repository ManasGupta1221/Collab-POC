"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = ({ setShowOtpForm, saveOrderId, savePhoneNumber }) => {
  const router = useRouter();
  const [orderId, setOrderId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState(""); // <-- Add message state
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    if (!orderId.trim() || !phoneNumber.trim()) {
      setMessage("Both fields are required!");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/verify-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, phoneNumber }),
      });
      setLoading(false)

      const data = await res.json();

      if (data.success) {
        setMessage(""); // Clear message on success
        const orderId = data.order.orderId;
        saveOrderId(orderId);
        savePhoneNumber(phoneNumber);
        setShowOtpForm(true);
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      setMessage("Error connecting to server");
    }
  };

  return (
    <form
      className="w-[30vw] min-w-[320px] mx-auto bg-[rgb(185,0,0)] border-2 border-red-800 rounded-2xl shadow-lg flex flex-col gap-8 p-8 items-center"
      style={{ minHeight: "350px" }}
    >
      <div className="w-full flex flex-col gap-2">
        <label className="text-white font-semibold" htmlFor="orderId">
          Order ID:
        </label>
        <input
          className="border-1 bg-gray-100 border-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-900 shadow"
          type="text"
          id="orderId"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          required
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <label className="text-white font-semibold" htmlFor="phoneNumber">
          Phone Number:
        </label>
        <input
          className="border-1 bg-gray-100 border-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-900 shadow"
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      {message && (
        <div className="w-full bg-red-200 border border-red-700 text-red-900 px-4 py-3 mt-3 mb-2 text-center">
          {message}
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="select-none mt-4 text-[rgb(205,0,0)] font-bold px-6 py-2 rounded-lg shadow-md border border-red-800 hover:bg-red-200 hover:cursor-pointer transition bg-gray-100 disabled:cursor-default disabled:opacity-60 disabled:hover:bg-gray-100 flex items-center gap-2 justify-center"
        type="submit"
        disabled={loading}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading ? "Get OTP" : ""}
      </button>
    </form>
  );
};

export default LoginForm;
