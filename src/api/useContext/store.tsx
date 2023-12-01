"use client";
import {
  createContext,
  useState,
  useEffect,
  FC,
  useContext,
  Dispatch,
} from "react";
import { userAccountDetails } from "../userAccountDetails";
import { profileRequest } from "../profile";

interface Props {
  children: React.ReactNode;
}

type ThemeContext = {
  bankDetails: [];
  setBankDetails: any;
  profileData: any;
  setProfileData: Dispatch<any>;
};
export const GlobalContext = createContext<ThemeContext | null>(null);

export const GlobalContextProvider: FC<Props> = ({ children }) => {
  const [bankDetails, setBankDetails] = useState<[]>([]);
  const [profileData, setProfileData] = useState<any>();

  const fetchProfile = async () => {
    try {
      const res = await profileRequest();
      setProfileData(res);
    } catch (error: any) {
      error?.response?.data;
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  const handleBankDetails = async () => {
    try {
      const response = await userAccountDetails();
      setBankDetails(response);
    } catch (error: any) {
      return error?.response?.data;
    }
  };
  useEffect(() => {
    handleBankDetails();
  }, []);
  return (
    <GlobalContext.Provider
      value={{ bankDetails, setBankDetails, profileData, setProfileData }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export function useThemeContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useThemeContext must be used with a GlobalContextProvider"
    );
  }
  return context;
}
