"use client";
import {
  createContext,
  useState,
  useEffect,
  FC,
  useContext,
  Dispatch,
  useMemo,
} from "react";
import { userAccountDetails } from "../userAccountDetails";
import { profileRequest } from "../profile";
import { DeleteAccount } from "../deleteAccount";

interface Props {
  children: React.ReactNode;
}

type ThemeContext = {
  bankDetails: [];
  setBankDetails: any;
  profileData: any;
  setProfileData: any;
  fetchProfile: any;
  bankInfo: [];
  setBankInfo: any;
  handleBankAccount: any;
  handleDeleteAccount: any;
  setBankId: any;
  openModal: any;
  setOpenModal: any;
  anchorEl: any;
  setAnchorEl: any;
  handleClose: any;
  handleCloseMenu: any;
  selectedBank: any;
  withdrawAmount: any;
  setWithdrawAmount: any;
  setSelectedBank: any;
  setSelectedBankDetails: any;
  selectedBankDetails: any;
  bankAccount: any;
};

interface WithdrawProps {
  accountNumber: string;
  accountName: string;
}

export const GlobalContext = createContext<ThemeContext | null>(null);

export const GlobalContextProvider: FC<Props> = ({ children }) => {
  const [bankDetails, setBankDetails] = useState<[]>([]);
  const [profileData, setProfileData] = useState("");
  const [selectedBankDetails, setSelectedBankDetails] = useState<any>({});
  const [bankAccount, setBankAccount] = useState<any>({});
  const [bankInfo, setBankInfo] = useState<any | []>([]);
  const [bankId, setBankId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedBank, setSelectedBank] = useState<any>(null);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const handleClose = () => {
    setBankId("");
    setOpenModal(false);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const fetchProfile = async () => {
    try {
      const res = await profileRequest();
      setProfileData(res);
    } catch (error: any) {
      error?.response?.data;
    }
  };

  const handleBankAccount = async () => {
    try {
      const response = await userAccountDetails();
      setBankAccount(response);
    } catch (error: any) {
      return error?.response?.data;
    }
  };
  useEffect(() => {
    fetchProfile();
    handleBankAccount();
  }, [handleBankAccount]);
  const handleDeleteAccount = async () => {
    try {
      const response = await DeleteAccount(bankId);
      setBankInfo(response);

      handleClose();
      handleCloseMenu();
    } catch (error: any) {
      return error?.response?.data;
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        bankDetails,
        setBankDetails,
        profileData,
        setProfileData,
        // bankAccount,
        handleBankAccount,
        bankInfo,
        setBankInfo,
        // handleBankInfo,
        handleDeleteAccount,
        setBankId,
        anchorEl,
        setAnchorEl,
        openModal,
        setOpenModal,
        handleClose,
        handleCloseMenu,
        selectedBank,
        setSelectedBank,
        selectedBankDetails,
        setSelectedBankDetails,
        withdrawAmount,
        setWithdrawAmount,
        fetchProfile,
        bankAccount,
      }}
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
