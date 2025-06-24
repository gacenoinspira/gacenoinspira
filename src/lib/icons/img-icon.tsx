import React from "react";

interface Props {
  width?: number;
  height?: number;
}

export function ImgIcon({ width, height }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 28}
      height={height || 28}
      viewBox="0 0 28 28"
    >
      <g fill="none">
        <path
          fill="url(#fluentColorImage282)"
          d="M3 6.75A3.75 3.75 0 0 1 6.75 3h14.5A3.75 3.75 0 0 1 25 6.75v14.5A3.75 3.75 0 0 1 21.25 25H6.75A3.75 3.75 0 0 1 3 21.25z"
        ></path>
        <path
          fill="url(#fluentColorImage280)"
          d="m24.368 23.334l-8.97-8.767a2 2 0 0 0-2.796 0l-8.97 8.767A3.75 3.75 0 0 0 6.75 25h14.5c1.3 0 2.445-.661 3.118-1.666"
        ></path>
        <path
          fill="url(#fluentColorImage281)"
          d="M19 12a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
        ></path>
        <defs>
          <linearGradient
            id="fluentColorImage280"
            x1={11.038}
            x2={13.526}
            y1={13.998}
            y2={25.579}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#b3e0ff"></stop>
            <stop offset={1} stopColor="#8cd0ff"></stop>
          </linearGradient>
          <linearGradient
            id="fluentColorImage281"
            x1={18.2}
            x2={19.661}
            y1={7.556}
            y2={12.816}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#fdfdfd"></stop>
            <stop offset={1} stopColor="#b3e0ff"></stop>
          </linearGradient>
          <radialGradient
            id="fluentColorImage282"
            cx={0}
            cy={0}
            r={1}
            gradientTransform="matrix(37.7143 47.73215 -43.41556 34.30366 -5.643 -9.375)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.338} stopColor="#0fafff"></stop>
            <stop offset={0.529} stopColor="#367af2"></stop>
          </radialGradient>
        </defs>
      </g>
    </svg>
  );
}
