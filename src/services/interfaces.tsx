export interface CardProps {
  image: string;
  title: string;
  description: string;
}
export interface ChangeTransactionPinProps {
  newPin: number;
  currentPin: number;
  confirmPin: number;
}
export interface ChangePasswordProps {
  newPassword: string;
  currentPassword: string;
  confirmPassword: string;
}

export interface PageTitleProps {
  title: string;
  subtitle: string;
}

export interface InputProps {
  defaultCountry?: string;
  placeholder?: string;
  type: string;
  label?: string;
  marginBottom?: string;
  bgColor?: string;
  labelColor?: string;
  labelSize?: string;
  register?: any;
  borderColor?: string;
  marginTop?: string;
  readOnly?: boolean;
  maxLength?: string;
  searchInput?: boolean;
  inputStyles?: any;
  value?: any;
  onKeyPress?: any;
  name?: string;
}

export interface EmailVerifiedProps {
  title: string;
  subTitle: string;
  backToText?: string;
  actionType?: string;
  routerPath: string;
  btnOnClick: any;
  icon: string;
  btnText?: string;
}

export interface SignupProps {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

export interface BankDetailsProps {
  bankId: string;
  accountNumber: string;
  accountName: string;
}

export interface TransactionPinProps {
  pin: number;
  confirmPin: number;
}

export interface Props extends React.PropsWithChildren {
  title: string;
  subtitle?: string;
}

export interface ErrorProps {
  status: string;
  message: string;
  statusCode: number;
  errors?: any;
}

export interface phoneNumberProps {
  phoneNumber: string;
  verificationCode?: string;
}

export interface cryptoProps {
  asset: string;
  pay: any;
  pin: any;
  network: string;
  comment: string;
}

export interface giftcardProps {
  currency: string;
  giftcardType: string;
  SubCategory: string;
  cardAmount: string;
  quantity: number;
}
