export default function BrainIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="30"
      height="30"
      fill="none"
    >
      {/* Background */}
      <rect
        width="64"
        height="64"
        rx="18"
        fill="currentColor"
        className="text-purple-600"
      />

      {/* Brain Shape */}
      <path
        d="M22 24C22 17 27 12 34 12C40 12 45 15 47 21C49 20 51 19 54 19C59 19 63 23 63 29C63 33 61 36 58 38C61 41 63 45 63 50C63 58 57 64 49 64H24C15 64 8 57 8 48C8 42 11 37 16 34C13 31 12 28 12 24C12 17 17 12 24 12C26 12 28 13 30 14"
        fill="white"
        transform="scale(0.65) translate(10 10)"
      />

      {/* Nodes */}
      <circle cx="23" cy="25" r="3" fill="#7C3AED" />

      <circle cx="32" cy="21" r="3" fill="#7C3AED" />

      <circle cx="41" cy="27" r="3" fill="#7C3AED" />

      <circle cx="29" cy="38" r="3" fill="#7C3AED" />

      {/* Connections */}
      <path
        d="M23 25L32 21L41 27L29 38L23 25"
        stroke="#7C3AED"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
