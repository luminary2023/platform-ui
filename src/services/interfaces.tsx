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
  placeholder: string;
  type: string;
  label?: string;
  marginBottom?: string;
  bgColor?: string;
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

export interface Props extends React.PropsWithChildren {
  title: string;
  subtitle?: string;
}
