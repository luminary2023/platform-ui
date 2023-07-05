import React from "react";
import { useRouter } from "next/router";
import styles from "./Navbar.module.css";
import { Button } from "../Button/Button";

const { Links, NavbarContainer } = styles;

const links = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Convert",
    path: "/converter",
  },
];

const Navbar = () => {
  const router = useRouter();
  const currentRoute = router.pathname;

  const handleClick = (href: string) => {
    router.push(href);
  };

  return (
    <div>
      <div className={NavbarContainer}>
        <p>LumiApp</p>
        <div className={Links}>
          {links.map((link, index) => {
            const style = {
              color: currentRoute === link.path ? "#FFC600" : "#ffff",
              marginLeft: "24px",
              cursor: "pointer",
              textDecoration: "none",
              fontFamily: "Satoshi Light",
            };
            return (
              <div key={index}>
                <a
                  // href={link.path}
                  onClick={() => handleClick(link.path)}
                  key={index}
                  style={style}
                >
                  {link.title}
                </a>
              </div>
            );
          })}
        </div>
        <div className={Links}>
          <div style={{ marginRight: 13 }}>
            <Button
              color="primary"
              variant="contained"
              sx={{
                borderRadius: "29px",
                textTransform: "capitalize",
                border: "1px solid #fff",
              }}
              onClick={() => router.push("/signin")}
            >
              Login
            </Button>
          </div>
          <Button
            color="secondary"
            variant="contained"
            sx={{ borderRadius: "29px", textTransform: "initial" }}
            onClick={() => router.push("/signup")}
          >
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
