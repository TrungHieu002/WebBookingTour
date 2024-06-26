import { GoogleLogin } from "@react-oauth/google";
import logoWeb from "@/assets/LogoWeb.png";
import { Col, Row, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { GetTokenUser } from "@/lib/api/login-api";
import { useUserContext } from "@/contexts/UserContext";
import { useState } from "react";

interface GoogleCredential {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  nbf: number;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
}
const SignIn = () => {
  const [, setUser] = useUserContext();
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate();
  return (
    <Spin spinning={loading}>
      <div className="loginPage">
        <Row className="loginBox">
          <Col span={12} className="loginBox_listImage">
            <img
              width={"100%"}
              style={{ objectFit: "cover" }}
              src="https://demos.themeselection.com/sneat-mui-react-nextjs-admin-template/demo-1/images/pages/boy-with-rocket-light.png"
              alt="imgLogin"
            />
          </Col>
          <Col
            span={12}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Row className="login__title">Welcome Back!</Row>
            <Row>
              <img
                src={logoWeb}
                alt="imgLogin"
                style={{ paddingBottom: "24px" }}
              />
            </Row>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const credential = credentialResponse.credential ?? '';
                localStorage.setItem("tokenGoogle", credential);
                console.log(credentialResponse);
                setLoading(true);
                GetTokenUser(credential)
                  .then((res) => {
                    if (res == "USER_NOT_REGISTER") {
                      try {
                        const credentialResponseDecode = jwtDecode<GoogleCredential>(credential)
                        localStorage.setItem("avatarUrl", credentialResponseDecode.picture)
                        localStorage.setItem("email", credentialResponseDecode.email)
                        alert("Tài khoản chưa được đăng ký!")
                      } catch (error) {
                        console.error('Failed to decode JWT', error);
                      }
                      navigate("/signup");
                    }
                    else if (res == "USER_WAITING") {
                      alert("Tài khoản đang chờ xét duyệt!")
                    }
                    else {
                      setUser({ token: res.data.token, role: res.data.role })
                      setLoading(false)
                      navigate("/home")
                    }
                  })
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </Col>
        </Row>
      </div>
    </Spin>
  );
};

export default SignIn;
