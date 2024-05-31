"use client";

import styles from "./CommonBtn.module.css";

interface ButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  isFull?: boolean;
  size?: "lg" | "md" | "sm";
  children: React.ReactNode;
}

export default function CommonBtn({
  onClick,
  type = "button",
  disabled = false,
  isFull = false,
  size = "md",
  className = "",
  children,
}: ButtonProps) {
  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`${styles.button} ${className} ${styles[size]}`}
      type={type}
      disabled={disabled}
      onClick={handleButtonClick}
      style={{ width: `${isFull ? "100%" : "auto"}` }}
    >
      {children}
    </button>
  );
}
