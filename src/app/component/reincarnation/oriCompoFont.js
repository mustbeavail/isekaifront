import localFont from "next/font/local";

export const hungeul = localFont({
    src: [
      { path: "../../fonts/hungeul.woff2", weight: "400"}
    ],
    display: "swap",
});