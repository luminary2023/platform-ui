import React from "react";
import Image from "next/image";
import Error from "../../assets/images/error.svg";
import Success from "../../assets/images/toastsucess.svg";

const styles = {
  main: {
    display: "flex",
    borderRadius: "12px",
    padding: "8px 16px",
    border: "1px solid #DF1111",
    color: "#DF1111",
    fontFamily: "Satoshi Regular",
    alignItems: "center",
    width: "fit-content",
    marginBottom: "20px",
  },
};

interface ToastProp {
  text: string;
  marginBottom?: number;
  color?: string;
  border?: string;
  success?: boolean;
}

const Toast: React.FC<ToastProp> = ({
  text,
  marginBottom,
  color,
  border,
  success = false,
}) => {
  return (
    <div
      style={
        marginBottom
          ? {
              ...styles.main,
              marginBottom: marginBottom,
              color: color,
              border: border,
            }
          : styles.main
      }
    >
      <Image
        src={success ? Success : Error}
        alt="error"
        style={{ marginRight: 9 }}
      />
      <p>{text}</p>
    </div>
  );
};

export default Toast;
