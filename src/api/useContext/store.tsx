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
import { CryptoAsset } from "../cryptoAsset";
import { cryptoTable } from "../cryptoTable";

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
  handleAsset: any;
  assets: any;
  cryptoTransactions: any;
  cryptoTableData: any;
  loading: any;
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
  const [assets, setAssets] = useState<any[]>([]);
  const [cryptoTableData, setCryptoTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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
  const handleAsset = async () => {
    const response = await CryptoAsset();
    setAssets(response);
  };

  const handleBankAccount = async () => {
    try {
      const response = await userAccountDetails();
      setBankAccount(response);
    } catch (error: any) {
      return error?.response?.data;
    }
  };

  const cryptoTransactions = async () => {
    // setLoading(true);
    const response = await cryptoTable();
    setCryptoTableData(response);
    // setLoading(false);
  };

  useEffect(() => {
    handleAsset();
    cryptoTransactions();
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
        handleAsset,
        loading,
        assets,
        cryptoTableData,
        cryptoTransactions,
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
