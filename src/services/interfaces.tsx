export interface CardProps {
  image: string;
  title: string;
  description: string;
}

export interface PageTitleProps {
  title: string;
  subtitle: string;
}

export interface InputProps {
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
  value?: string;
  maxlength?: string;
}

export interface EmailVerifiedProps {
  title: string;
  subTitle: string;
  backToText: string;
  actionType?: string;
  routerPath: string;
  btnOnClick: any;
  icon: string;
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

export interface Props extends React.PropsWithChildren {
  title: string;
  subtitle?: string;
}

export interface ErrorProps {
  status: string;
  message: string;
  statusCode: number;
  errors: any;
}
