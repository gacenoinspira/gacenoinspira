import React from "react";

interface Props {
  width?: string;
  height?: string;
  isActive?: boolean;
}

export function StarIcon({ width, height, isActive }: Props) {
  return (
    <>
      {isActive ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width || 24}
          height={height || 24}
          viewBox={`0 0 ${width || 24} ${height || 24}`}
        >
          <path
            fill="#e6e20b"
            d="m12 17.275l-4.15 2.5q-.275.175-.575.15t-.525-.2t-.35-.437t-.05-.588l1.1-4.725L3.775 10.8q-.25-.225-.312-.513t.037-.562t.3-.45t.55-.225l4.85-.425l1.875-4.45q.125-.3.388-.45t.537-.15t.537.15t.388.45l1.875 4.45l4.85.425q.35.05.55.225t.3.45t.038.563t-.313.512l-3.675 3.175l1.1 4.725q.075.325-.05.588t-.35.437t-.525.2t-.575-.15z"
          ></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width || 24}
          height={height || 24}
          viewBox={`0 0 ${width || 24} ${height || 24}`}
        >
          <path
            fill="#e6e20b"
            d="m8.85 16.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425zm3.15.45l-4.15 2.5q-.275.175-.575.15t-.525-.2t-.35-.437t-.05-.588l1.1-4.725L3.775 10.8q-.25-.225-.312-.513t.037-.562t.3-.45t.55-.225l4.85-.425l1.875-4.45q.125-.3.388-.45t.537-.15t.537.15t.388.45l1.875 4.45l4.85.425q.35.05.55.225t.3.45t.038.563t-.313.512l-3.675 3.175l1.1 4.725q.075.325-.05.588t-.35.437t-.525.2t-.575-.15zm0-5.025"
          ></path>
        </svg>
      )}
    </>
  );
}
