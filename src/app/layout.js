import React from "react";
import { cookies } from "next/headers";
import {
  Work_Sans,
  Spline_Sans_Mono,
  Redacted_Script,
} from "next/font/google";
import clsx from "clsx";

import {
  LIGHT_TOKENS,
  DARK_TOKENS,
  BLOG_TITLE,
  DESCRIPTION,
} from "@/constants";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./styles.css";

const mainFont = Work_Sans({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family",
});
const monoFont = Spline_Sans_Mono({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family-mono",
});
const loadingFont = Redacted_Script({
  weight: ["400"],
  subsets: ["latin"],
  display: "block",
  variable: "--font-family-loading",
});

export const metadata = {
  title: BLOG_TITLE,
  description: DESCRIPTION,
};

function RootLayout({ children }) {
  // TODO: Dynamic theme depending on user preference
  const savedTheme = cookies().get("color-theme");
  const theme = savedTheme?.value || "dark";

  return (
    <html
      lang="en"
      className={clsx(
        mainFont.variable,
        monoFont.variable,
        loadingFont.variable
      )}
      data-color-theme={theme}
      style={theme === "light" ? LIGHT_TOKENS : DARK_TOKENS}
    >
      <body>
        <Header theme={theme} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

export default RootLayout;
