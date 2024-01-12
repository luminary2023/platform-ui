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
  // profileData: any;
  // setProfileData: Dispatch<any>;
  // walletBalance: any;
  bankAccount: any;
  bankInfo: [];
  setBankInfo: any;
  handleBankInfo: any;
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
  selectedBankDetails: any;
};

interface WithdrawProps {
  accountNumber: string;
  accountName: string;
}

export const GlobalContext = createContext<ThemeContext | null>(null);

export const GlobalContextProvider: FC<Props> = ({ children }) => {
  const [bankDetails, setBankDetails] = useState<[]>([]);
  // const [profileData, setProfileData] = useState("");
  const [bankAccount, setBankAccount] = useState<WithdrawProps | any | []>([]);

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

  // const fetchProfile = async () => {
  //   try {
  //     const res = await profileRequest();
  //     setProfileData(res);
  //   } catch (error: any) {
  //     error?.response?.data;
  //   }
  // };

  const handleBankDetails = async () => {
    try {
      const response = await userAccountDetails();
      setBankDetails(response);
    } catch (error: any) {
      return error?.response?.data;
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

  const handleBankInfo = async () => {
    try {
      const response = await userAccountDetails();
      setBankInfo(response);
    } catch (error: any) {
      return error?.response?.data;
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await DeleteAccount(bankId);
      setBankInfo(response);
      await handleBankInfo();
      handleClose();
      handleCloseMenu();
    } catch (error: any) {
      return error?.response?.data;
    }
  };
  useEffect(() => {
    // fetchProfile();
    // profile();
    handleBankAccount();
    handleBankInfo();
    handleBankDetails();
    // handleBankAccount();
  }, []);
  const selectedBankDetails = useMemo(() => {
    if (!selectedBank || (bankAccount?.length || 0) <= 0) {
      return {};
    }

    return (
      bankAccount?.find((b: any) => b.accountNumber === selectedBank) || {}
    );
  }, [selectedBank, bankAccount]);

  return (
    <GlobalContext.Provider
      value={{
        bankDetails,
        setBankDetails,
        // profileData,
        // setProfileData,
        bankAccount,
        bankInfo,
        setBankInfo,
        handleBankInfo,
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
        withdrawAmount,
        setWithdrawAmount,
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
