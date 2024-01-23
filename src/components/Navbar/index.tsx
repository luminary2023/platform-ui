"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "../Button/Button";
import { MOBILE_RESPONSIVE_BREAKPOINT } from "@/utils";
import RightDrawer from "../drawer";
import styles from "./Navbar.module.css";

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
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const handleClick = (href: string) => {
    router.push(href);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_RESPONSIVE_BREAKPOINT);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className={NavbarContainer}>
        <p>LumiApp</p>
        {isMobile ? (
          <div className={styles.hamburger} onClick={() => setOpenDrawer(true)}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
          </div>
        ) : (
          <>
            <div className={Links}>
              {links.map((link) => {
                const style = {
                  color: currentRoute === link.path ? "#FFC600" : "#ffff",
                  marginLeft: "24px",
                  cursor: "pointer",
                  textDecoration: "none",
                  fontFamily: "Satoshi Light",
                };
                return (
                  <div key={link.title}>
                    <a
                      // href={link.path}
                      onClick={() => handleClick(link.path)}
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
          </>
        )}
      </div>

      <RightDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        title=""
        subTitle=""
        drawerWidth="100%"
        closeIcon
      >
        <div className={Links} style={{ flexDirection: "column", alignItems: "flex-start" }}>
          {links.map((link) => {
            const style = {
              color: currentRoute === link.path ? "#FFC600" : "#000",
              cursor: "pointer",
              textDecoration: "none",
              fontFamily: "Satoshi Light",
              fontSize: "24px",
            };
            return (
              <div key={link.title} style={{marginBottom: "20px"}}>
                <a
                  onClick={() => handleClick(link.path)}
                  style={style}
                >
                  {link.title}
                </a>
              </div>
            );
          })}
        </div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <Button
            color="primary"
            variant="contained"
            sx={{
              borderRadius: "29px",
              textTransform: "capitalize",
              border: "1px solid #fff",
              width: '50%',
              marginBottom: "20px"
            }}
            onClick={() => router.push("/signin")}
          >
            Login
          </Button>
          <Button
            color="secondary"
            variant="contained"
            sx={{ borderRadius: "29px", textTransform: "initial", width: '50%'}}
            onClick={() => router.push("/signup")}
          >
            Sign up
          </Button>
        </div>
      </RightDrawer>
    </div>
  );
};

export default Navbar;
