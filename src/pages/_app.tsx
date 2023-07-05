import {useEffect} from 'react'
import AOS from "aos";
import { theme } from "@/components/Button/ButtonThemeProvider";
import "@/styles/globals.css";
import "aos/dist/aos.css";

import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";

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
