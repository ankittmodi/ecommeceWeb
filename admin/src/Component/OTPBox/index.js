import React, { useState, useRef, useEffect } from "react";
import "./style.css";

export const OTPBox = ({ length, onChange }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  // Whenever otp changes, call onChange if all filled
  useEffect(() => {
    const otpValue = otp.join("");
    if (otpValue.length === length && !otp.includes("")) {
      onChange(otpValue);
    } else {
      onChange(""); // clear if not all boxes filled
    }
  }, [otp, length, onChange]);

  // Handle input change
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next box
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault(); // prevent default browser behavior
      const newOtp = [...otp];

      if (otp[index]) {
        // If current box has value, clear it
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // If current box empty, move left and clear
        inputRefs.current[index - 1].focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <div className="otp-container">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={digit}
          ref={(el) => (inputRefs.current[index] = el)}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="otp-input"
        />
      ))}
    </div>
  );
};


