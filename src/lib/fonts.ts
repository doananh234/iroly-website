import localFont from "next/font/local";

export const sfProDisplay = localFont({
  src: [
    { path: "../../public/fonts/SF-Pro-Display-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/SF-Pro-Display-Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/SF-Pro-Display-Semibold.otf", weight: "600", style: "normal" },
    { path: "../../public/fonts/SF-Pro-Display-Bold.otf", weight: "700", style: "normal" },
    { path: "../../public/fonts/SF-Pro-Display-Heavy.otf", weight: "800", style: "normal" },
    { path: "../../public/fonts/SF-Pro-Display-Black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

export const sfProText = localFont({
  src: [
    { path: "../../public/fonts/SF-Pro-Text-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/SF-Pro-Text-Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/SF-Pro-Text-Semibold.otf", weight: "600", style: "normal" },
    { path: "../../public/fonts/SF-Pro-Text-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});
