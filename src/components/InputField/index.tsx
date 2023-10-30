import React, { useState } from "react";
import styles from "./InputField.module.css";
import { InputProps } from "@/services/interfaces";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SearchIcon from "@mui/icons-material/Search";

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
  readOnly,
  value,
  maxLength,
  searchInput,
  inputStyles,
  width,
  onKeyPress,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const handleTogglePassword = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <p
        className={styles.label}
        style={{
          color: labelColor,
          fontSize: labelSize,
          marginTop: marginTop,
        }}
      >
        {label}
      </p>
      <div style={{ position: "relative" }}>
        {searchInput && (
          <SearchIcon
            style={{
              color: "#6F6C99",
              position: "absolute",
              top: 17,
              left: 10,
            }}
          />
        )}
        <input
          type={visible ? "text" : type}
          placeholder={placeholder}
          className={styles.inputForm}
          {...register}
          onKeyPress={onKeyPress}
          readOnly={readOnly}
          value={value}
          maxLength={maxLength}
          style={{
            marginBottom: marginBottom,
            background: bgColor,
            borderColor: borderColor,
            width: "100%",
            ...inputStyles,
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
