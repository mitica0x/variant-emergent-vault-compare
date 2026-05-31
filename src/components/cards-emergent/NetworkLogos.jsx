// Network logos rendered as SVG so they always crisp
import React from "react";

export const VisaLogo = ({ size = 28, color = "#ffffff" }) => (
  <svg
    width={size * 3}
    height={size}
    viewBox="0 0 1000 324"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Visa"
    style={{ display: "block" }}
  >
    <path
      fill={color}
      d="M433.4 318.3h-78.3L405 6h78.3l-49.9 312.3zM213.1 6L138 220.1l-8.9-44.8L100.3 31.6S96.7 6 64.6 6H-58.5l-1.4 4.6c40.4 10.3 76.6 25.1 108.7 43.7l68 263.9h80.7L323.8 6h-110.7zm596.1 0L744.9 161.5 738.6 130 715.8 18.6c-3.7-15-14.5-19.4-27.9-19.4l-115.5 0-1.4 4c43.9 11.1 81.9 27.2 116.1 48.3L749.2 318.3H830L935 6H809.2zM621.8 6c-13.6 0-20.7 7.4-25.8 16.4l-128.6 295.9h74.7l16.7-45.7h94.7l9.7 45.7H731L621.8 6zm-44.3 204.5l36.7-100.4 20.6 100.4h-57.3z"
      transform="translate(80 0)"
    />
  </svg>
);

// Mastercard interlocking circles
export const MastercardLogo = ({ size = 34 }) => (
  <svg
    width={size * 1.6}
    height={size}
    viewBox="0 0 80 50"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Mastercard"
    style={{ display: "block" }}
  >
    <circle cx="30" cy="25" r="22" fill="#EB001B" />
    <circle cx="50" cy="25" r="22" fill="#F79E1B" />
    <path
      d="M40 8.6a22 22 0 0 0 0 32.8 22 22 0 0 0 0-32.8z"
      fill="#FF5F00"
    />
  </svg>
);

export const NetworkLogo = ({ network, color }) =>
  network === "mastercard" ? <MastercardLogo /> : <VisaLogo color={color} />;
