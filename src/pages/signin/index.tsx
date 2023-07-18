import React, {useState} from "react";
import styles from "./Signin.module.css";
import PageTitle from "@/components/PageTitle";
import Input from "@/components/InputField";
import PageTitleStyles from "@/components/PageTitle/PageTitle.module.css";
import { Button } from "@/components/Button/Button";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Login } from "@/services/schemaVarification";
import { zodResolver } from "@hookform/resolvers/zod";
import { Password } from "@mui/icons-material";

interface LoginProps {
  password: string;
  email: string;
}

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('')
  const [inputs, setInputs] = useState<LoginProps>({
    email: '',
    password: '',
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginProps>({
    resolver: zodResolver(Login),
  });

  const handleLogin = (data: any) => {
    console.log(data);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };


  console.log(inputs, 'inputs')

  return (
    <div className={styles.signinContainer}>
      <div className={styles.signinLeftWrapper}>
        {/* <Toast text="Password or email is incorrect please try again" marginBottom={40}/> */}
        <div style={{ marginBottom: 32 }}>
          <PageTitle
            title={"Welcome back"}
            subtitle={"Welcome back! Please enter your details."}
          />
        </div>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Input
            placeholder="Jondoe@mail"
            type="text"
            inputValue={inputs.email}
            label="Email"
            name="email"
            onChange={handleInputChange}
            register={{ ...register("email") }}
            marginBottom="24px"
            borderColor={errors?.email?.message ? "#DF1111" : ""}
          />

          <Input
            placeholder=""
            type="password"
            label="Password"
            name="password"
            inputValue={inputs.password}
            onChange={handleInputChange}
            marginBottom="24px"
            register={{ ...register("password") }}
            borderColor={errors?.password?.message ? "#DF1111" : ""}
          />

          <p
            className={styles.forgotPasswordText}
            onClick={() => router.push("/forgotPassword")}
          >
            Forgot password
          </p>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              textTransform: "capitalize",
            }}
          >
            Sign-In
          </Button>
        </form>
        <p className={`${PageTitleStyles.subtitle} ${styles.createAccount}`}>
          Don’t have an account?{" "}
          <span
            className={styles.createText}
            onClick={() => router.push("/signup")}
          >
            {" "}
            Create account
          </span>
        </p>
      </div>
      <div className={styles.signinRightWrapper}></div>
    </div>
  );
};

export default SignIn;
