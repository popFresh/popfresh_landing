export default function Makhana({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="makhanaGradient" cx="35%" cy="30%">
          <stop offset="0%" stopColor="#FFFDF6" />
          <stop offset="60%" stopColor="#F6E8C5" />
          <stop offset="100%" stopColor="#D8BD84" />
        </radialGradient>

        <filter id="makhanaShadow">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodOpacity="0.15" />
        </filter>
      </defs>

      <g filter="url(#makhanaShadow)">
        <path
          d="
            M100 20
            C138 15 172 40 180 78
            C189 118 166 156 130 174
            C96 191 54 178 29 144
            C8 115 8 72 35 42
            C52 24 76 17 100 20Z
          "
          fill="url(#makhanaGradient)"
        />

        <circle cx="65" cy="65" r="4" fill="#6F5430" />
        <circle cx="135" cy="58" r="3.5" fill="#6F5430" />
        <circle cx="110" cy="120" r="4" fill="#6F5430" />
        <circle cx="75" cy="128" r="3.5" fill="#6F5430" />
        <circle cx="98" cy="92" r="2.5" fill="#6F5430" />

        <ellipse
          cx="72"
          cy="55"
          rx="24"
          ry="12"
          fill="white"
          opacity="0.28"
          transform="rotate(-20 72 55)"
        />
      </g>
    </svg>
  );
}
