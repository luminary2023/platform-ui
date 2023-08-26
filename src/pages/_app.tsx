import { useEffect } from "react";
import AOS from "aos";
import { theme } from "@/components/Button/ButtonThemeProvider";
import "@/styles/globals.css";
import "aos/dist/aos.css";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
// import axios from "axios";
// import { getCookie } from "cookies-next";

// axios.interceptors.request.use((config) => {
//   const token = getCookie("token");
//   if (token) {
//     config.headers.Authorization = `BearerToken ${getCookie("token")}`;
//   }
//   return config;
// });

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
