'use client';
import React, {useState} from 'react';
// 
import LoginForm from './LoginForm';
import OtpForm from '@/app/otp/components/OtpForm';

const LoginPage = () => {
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // <-- Add this
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      {showOtpForm ? (
        <OtpForm 
          setShowOtpForm={setShowOtpForm} 
          orderId={orderId}
          phoneNumber={phoneNumber} // <-- Pass phoneNumber
        />
      ) : (
        <LoginForm 
          setShowOtpForm={setShowOtpForm} 
          saveOrderId={setOrderId}
          savePhoneNumber={setPhoneNumber} // <-- Pass setter
        />
      )}
    </div>
  );
}
export default LoginPage;   