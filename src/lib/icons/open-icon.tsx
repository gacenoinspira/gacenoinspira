import React from "react";

interface OpenIconProps {
  className?: string;
  open: boolean;
  width?: string;
  height?: string;
}

export function OpenIcon({ className, open, width, height }: OpenIconProps) {
  return (
    <>
      {open ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width || 24}
          height={height || 24}
          viewBox="0 0 24 24"
          className={className}
        >
          <path
            fill="#fff"
            fillRule="evenodd"
            d="M17 15a1 1 0 0 0 .707-1.707l-5-5a1 1 0 0 0-1.414 0l-5 5A1 1 0 0 0 7 15z"
            clipRule="evenodd"
          ></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width || 24}
          height={height || 24}
          viewBox="0 0 24 24"
          className={className}
        >
          <path
            fill="#fff"
            d="M12 17a1.72 1.72 0 0 1-1.33-.64l-4.21-5.1a2.1 2.1 0 0 1-.26-2.21A1.76 1.76 0 0 1 7.79 8h8.42a1.76 1.76 0 0 1 1.59 1.05a2.1 2.1 0 0 1-.26 2.21l-4.21 5.1A1.72 1.72 0 0 1 12 17"
          ></path>
        </svg>
      )}
    </>
  );
}
