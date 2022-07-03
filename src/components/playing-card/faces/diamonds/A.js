const DiamondsA = () => (
  <>
    <defs>
      <radialGradient
        href="#diamonds-a"
        id="diamonds-d"
        cx="171.487"
        cy="511.223"
        r="81.903"
        fx="171.487"
        fy="511.223"
        gradientTransform="matrix(1.15299 -.67392 .39482 .67549 -233.633 270.4)"
        gradientUnits="userSpaceOnUse"
      />
      <radialGradient
        href="#diamonds-b"
        id="diamonds-c"
        cx="0"
        cy="-3.234"
        r="8"
        fx="0"
        fy="-3.234"
        gradientTransform="matrix(-1.12242 .00551 -.00909 -1.85031 -.03 -10.228)"
        gradientUnits="userSpaceOnUse"
      />
      <linearGradient id="diamonds-b">
        <stop offset="0" stopColor="#df0000" />
        <stop offset="1" stopColor="#df0000" stopOpacity=".641" />
      </linearGradient>
      <linearGradient id="diamonds-a">
        <stop offset="0" stopColor="#fff" stopOpacity=".435" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
      <filter
        id="diamonds-e"
        width="1.279"
        height="1.325"
        x="-.139"
        y="-.162"
        colorInterpolationFilters="sRGB"
      >
        <feGaussianBlur stdDeviation="9.511" />
      </filter>
    </defs>
    <path
      fill="#fff"
      stroke="#000"
      strokeWidth=".5"
      d="M166.837 235.548c0 3.777-3.087 6.869-6.871 6.869H7.11c-3.775 0-6.861-3.092-6.861-6.87V7.12C.25 3.343 3.336.25 7.11.25h152.856c3.784 0 6.87 3.093 6.87 6.87v228.428z"
    />
    <text
      x="6.246"
      y="28.013"
      fill="#df0000"
      fontFamily="Bitstream Vera Sans"
      fontSize="32"
      fontWeight="400"
      letterSpacing="0"
      wordSpacing="0"
    >
      <tspan x="6.246" y="28.013" fontFamily="Arial">
        A
      </tspan>
    </text>
    <text
      x="-161.088"
      y="-213.515"
      fill="#df0000"
      fontFamily="Bitstream Vera Sans"
      fontSize="32"
      fontWeight="400"
      letterSpacing="0"
      transform="scale(-1)"
      wordSpacing="0"
    >
      <tspan x="-161.088" y="-213.515" fontFamily="Arial">
        A
      </tspan>
    </text>
    <path
      fill="url(#diamonds-c)"
      d="M3.243-4.725C1.126-7.59 0-10.5 0-10.5s-1.126 2.91-3.243 5.775C-5.361-1.862-8 0-8 0s2.639 1.861 4.757 4.726C-1.126 7.59 0 10.5 0 10.5s1.126-2.91 3.243-5.774C5.361 1.861 8 0 8 0S5.361-1.862 3.243-4.725z"
      transform="translate(82.284 116.888) scale(5.95137)"
    />
    <path
      fill="url(#diamonds-d)"
      d="M117.301 604.266s-8.067-94.95 22.857-122.857c34.761-31.369 140-11.429 140-11.429s-71.54 24.838-100 48.572c-27.21 22.692-62.857 85.714-62.857 85.714z"
      filter="url(#diamonds-e)"
      transform="matrix(-.2491 .04028 -.04172 -.25798 131.779 225.09)"
    />
    <path
      fill="#df0000"
      d="M21.758 37.257c-3.126-4.23-4.79-8.528-4.79-8.528s-1.663 4.298-4.79 8.528c-3.128 4.229-7.025 6.98-7.025 6.98s3.897 2.748 7.025 6.98c3.127 4.228 4.79 8.527 4.79 8.527s1.664-4.3 4.79-8.527c3.128-4.232 7.025-6.98 7.025-6.98s-3.897-2.751-7.025-6.98zm133.653 154.268c-3.127-4.23-4.79-8.53-4.79-8.53s-1.664 4.3-4.79 8.53c-3.128 4.228-7.025 6.978-7.025 6.978s3.897 2.75 7.025 6.98c3.126 4.23 4.79 8.528 4.79 8.528s1.663-4.299 4.79-8.527c3.128-4.232 7.025-6.98 7.025-6.98s-3.897-2.751-7.025-6.98z"
    />
  </>
);

export default DiamondsA;
