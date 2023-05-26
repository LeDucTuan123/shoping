import classname from "classnames/bind";
import style from "./Login.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import { useThemeHook } from "../../GlobalCombonents/ThemeProvider";
import { memo, useState } from "react";
import axios from "axios";

const cx = classname.bind(style);

const Login = (props) => {
  const { token, setToken } = props;
  // const USER_URL = "https://fakestoreapi.com/users";
  // const { setAuth } = useContext(AuthContext);

  const [theme] = useThemeHook();

  const [userName, setUserName] = useState("tuan");
  const [passWord, setPassWord] = useState("123");
  const [errMassage, setErrMassage] = useState("");

  const LoginHandler = () => {
    setErrMassage("");
    setPassWord("");
    setUserName("");
    axios({
      url: "https://fakestoreapi.com/auth/login",
      method: "POST",
      data: {
        userName: userName,
        passWord: passWord,
      },
    })
      .then((res) => {
        console.log(res.data.token);
        setToken(res.data.token);
        localStorage.setItem("userToken", res.data.token);
      })
      .catch((err) => {
        console.log(err.response);
        setErrMassage(err.response.data);
      });
  };

  // useEffect(() => {
  //   setErrMassage("");
  // }, [userName, passWord]);

  // const handleSubmit = async (e) => {
  //   try {
  //     const res = await axios.post(
  //       USER_URL,
  //       JSON.stringify({ userName, passWord }),
  //       {
  //         headers: { "Content-Type": "application/json" },
  //         withCredentials: true,
  //       }
  //     );
  //     console.log(JSON.stringify(res?.data));
  //     // console.log(JSON.stringify(res));
  //     const accessToken = res?.data?.accessToken;
  //     const roles = res?.data?.roles;
  //     setAuth({ userName, passWord, roles, accessToken });
  //   } catch (err) {
  //     if (!err.res) {
  //       setErrMassage("no Server Response");
  //     } else if (err.res?.statas === 400) {
  //       setErrMassage("Missing UserName or Password");
  //     } else if (err.res?.status === 401) {
  //       setErrMassage("Unauthorized");
  //     } else {
  //       setErrMassage("Login Failed");
  //     }
  //   }
  //   e.preventDefault();
  // };

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
              <div className={cx("title")}>
                <span>Log in</span>
              </div>
              <div className={cx("text")}>
                <label>Email or username</label>
              </div>
              <input
                type="text"
                placeholder="Email..."
                className={cx("text-input")}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password..."
                className={cx("text-input")}
                value={passWord}
                onChange={(e) => setPassWord(e.target.value)}
              />
              <p
                className={errMassage ? "err-msg" : "offscreen"}
                aria-live="assertive"
              >
                {errMassage && (
                  <small style={{ color: "red" }}>{errMassage}</small>
                )}
              </p>

              <button
                className={cx(
                  `${theme ? "bg-dark-primary text-light" : "bg-light"}`,
                  "btn-login"
                )}
                onClick={LoginHandler}
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

export default memo(Login);
