import classname from "classnames/bind";
import style from "./Login.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import { useThemeHook } from "../../GlobalCombonents/ThemeProvider";

const cx = classname.bind(style);

const Login = () => {
  const [theme] = useThemeHook();
  return (
    <>
      <Container>
        <Row>
          <Col className="m-auto" sm="8" md="6" xl={4} xs={10}>
            <div
              className={cx(
                "login-container",
                `${theme ? "text-light" : "text-black"}`
              )}
            >
              <div className={cx("title")}>Log in</div>
              <div className={cx("text")}>Email or username</div>
              <input
                type="text"
                placeholder="Email..."
                className={cx("text-input")}
              />
              <input
                type="password"
                placeholder="Password..."
                className={cx("text-input")}
              />

              <button
                className={cx(
                  `${theme ? "bg-dark-primary text-light" : "bg-light"}`,
                  "btn-login"
                )}
              >
                Login
              </button>
              <div className={cx("go-back")}>
                <span>Go back</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
