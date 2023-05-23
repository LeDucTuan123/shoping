import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BiSun, BiMoon, BiCart } from "react-icons/bi";

import { ThemeContext } from "../GlobalCombonents/ThemeProvider";
import { useContext, useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import { NavDropdown } from "react-bootstrap";

const Header = () => {
  const { theme, setThemeMode } = useContext(ThemeContext);
  const [darkMode, setDarkMode] = useState(theme);

  useEffect(() => {
    setThemeMode(darkMode);
  }, [darkMode]);

  const { isEmpty, totalItems } = useCart();

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="md"
        variant={darkMode ? "dark" : "light"}
        className={
          darkMode ? "bg-light-black boder-bottom " : "bg-light boder-bottom"
        }
        style={{ width: "100%", position: "fixed", zIndex: 100 }}
      >
        <Container>
          <Link to="/">
            <Navbar.Brand
              className={darkMode ? "text-dark-primary" : "text-light-primary"}
            >
              <b>Shopping</b>
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                className={
                  darkMode ? "text-dark-primary" : "text-light-primary"
                }
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? (
                  <BiSun size={"1.7rem"} />
                ) : (
                  <BiMoon size={"1.7rem"} />
                )}
              </Nav.Link>
              <Link
                to="/cart"
                className={`${
                  darkMode ? "text-dark-primary" : "text-light-primary"
                } d-flex align-item-center`}
              >
                <BiCart
                  size={"2rem"}
                  style={{ display: "flex", alignItems: "center" }}
                />
                {!isEmpty && (
                  <span // số lượng sản phấm trên giỏ hàng
                    style={{
                      position: "relative",
                      // left: "2px",
                      top: "-10px",
                      color: "red",
                      fontWeight: 600,
                      fontSize: "1.2rem",
                    }}
                  >
                    {totalItems}
                  </span>
                )}
                <span
                  style={{
                    marginLeft: !isEmpty ? "-13px" : 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  cart
                </span>
              </Link>
              <NavDropdown title="Setting" className="mx-2">
                <NavDropdown.Item href="#action/3.1">
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    Login
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
