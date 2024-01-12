import { useEffect, useState } from "react";
import AOS from "aos";
import { theme } from "@/components/Button/ButtonThemeProvider";
import "@/styles/globals.css";
import "aos/dist/aos.css";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { GlobalContextProvider } from "@/api/useContext/store";
import { profileRequest } from "@/api/profile";
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
  // const [profileData, setProfileData] = useState<any>({});

  // const fetchProfile = async () => {
  //   try {
  //     const res = await profileRequest();
  //     setProfileData(res);
  //   } catch (error: any) {
  //     error?.response?.data;
  //   }
  // };

  useEffect(() => {
    AOS.init();
    AOS.refresh();
    // fetchProfile();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalContextProvider>
        <Component
          {...pageProps}
          // profileData={profileData}
        />
      </GlobalContextProvider>
    </ThemeProvider>
  );
}
