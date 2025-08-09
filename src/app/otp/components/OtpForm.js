import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
const OtpForm = ({ orderId, phoneNumber }) => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 4) {
      setMessage("Please enter a valid 4-digit OTP");
      return;
    }
    if (otp === "1234") {
      setLoading(true);
      router.push(`/details/${orderId}?phoneNumber=${phoneNumber}`);
    } else {
      setMessage("Entered OTP is invalid");
    }
  };

  return (
    <form
      className="w-[30vw] min-w-[320px] mx-auto bg-[rgb(185,0,0)] border-2 border-red-800 rounded-2xl shadow-lg flex flex-col gap-8 p-8 items-center"
      style={{ minHeight: "250px" }}
    >
      <div className="w-full flex flex-col gap-2">
        <label className="text-white font-semibold" htmlFor="otp">
          OTP:
        </label>
        <input
          className="border bg-gray-100 border-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-900 shadow"
          type="text"
          value={otp}
          id="otp"
          onChange={(e) => setOtp(e.target.value)}
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
        className="select-none mt-4 bg-white text-[rgb(205,0,0)] font-bold px-6 py-2 rounded-lg shadow-md border border-red-800 hover:bg-red-100 hover:cursor-pointer transition disabled:cursor-default disabled:opacity-60 disabled:hover:bg-white flex items-center gap-2 justify-center"
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
        {(!loading) ? "Login" : ""}
      </button>
    </form>
  );
};
export default OtpForm;
