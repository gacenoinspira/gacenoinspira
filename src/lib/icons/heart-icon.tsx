import React from "react";

interface Props {
  width?: number;
  height?: number;
  isLike?: boolean;
}

export function HeartIcon({ width, height, isLike }: Props) {
  return (
    <>
      {isLike ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width || 48}
          height={height || 48}
          viewBox="0 0 48 48"
        >
          <path
            fill="#ee0b0b"
            d="M34 9c-4.2 0-7.9 2.1-10 5.4C21.9 11.1 18.2 9 14 9C7.4 9 2 14.4 2 21c0 11.9 22 24 22 24s22-12 22-24c0-6.6-5.4-12-12-12"
          ></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width || 48}
          height={height || 48}
          viewBox="0 0 48 48"
        >
          <path
            fill="none"
            stroke="#ee0b0b"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={4}
            d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.99 10.99 0 0 0 15 8"
          ></path>
        </svg>
      )}
    </>
  );
}
