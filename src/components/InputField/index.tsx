import React, { useState } from "react";
import styles from "./InputField.module.css";
import { InputProps } from "@/services/interfaces";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Input: React.FC<InputProps> = ({
  placeholder,
  type,
  label,
  marginBottom,
  bgColor,
  labelColor,
  labelSize,
  register,
  borderColor,
  marginTop,
  inputmode,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const handleTogglePassword = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <p
        className={styles.label}
        style={{ color: labelColor, fontSize: labelSize, marginTop: marginTop }}
      >
        {label}
      </p>
      <div style={{ position: "relative" }}>
        <input
          type={visible ? "text" : type}
          placeholder={placeholder}
          inputmode={inputmode}
          className={styles.inputForm}
          {...register}
          style={{
            marginBottom: marginBottom,
            background: bgColor,
            borderColor: borderColor,
          }}
        />
        {type === "password" && (
          <div
            className={styles.InputIconWrapper}
            onClick={handleTogglePassword}
          >
            {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
