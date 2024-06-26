import logoWeb from "@/assets/LogoWeb.png";
import { Col, Row, Form, Input, DatePicker, Select, Button, Spin } from "antd";
import validationRulesInstance from "@/lib/validated/Rule";
import { SendOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { GetTokenUser, SignUpAPI } from "@/lib/api/login-api";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/contexts/UserContext";

interface Option {
  value: number;
  label: string;
}
interface OptionGender {
  value: boolean;
  label: string;
}
const SignUp = () => {
  const [, setUser] = useUserContext();
  const [formSignUp] = Form.useForm();
  const [loadingData, setLoadingData] = useState<boolean>(false)
  const navigate = useNavigate();

  const listGender: Option[] = [
    { value: 2, label: "Khách hàng" },
    { value: 1, label: "Chủ tour" },
  ];
  const Gender: OptionGender[] = [
    { value: true, label: "Nam" },
    { value: false, label: "Nữ" },
  ];
  const handleFormSignIn = () => {
    formSignUp.validateFields().then((value) => {
      if (value.birthday && dayjs.isDayjs(value.birthday)) {
        value.birthday = value.birthday.format("YYYY/MM/DD");
      }
      const email = localStorage.getItem("email")
      const avatarUrl = localStorage.getItem("avatarUrl")
      const updatedValue = {
        ...value,
        email: email,
        avatar: avatarUrl
      };
      console.log(updatedValue);
      setLoadingData(true)
      SignUpAPI(updatedValue)
        .then((res) => {
          if (res.succeeded) {
            return GetTokenUser(localStorage.getItem("tokenGoogle") as string)
          }
        })
        .then((res) => {
          setUser({ token: res.data.token, role: res.data.role });
          setLoadingData(false);
          navigate("/home");
        })
    });
  };
  useEffect(() => {

  }, [])
  return <div className="loginPage">
    <Spin spinning={loadingData}>
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
          <Form
            name="information__form"
            autoComplete="off"
            layout="vertical"
            form={formSignUp}
            onFinish={handleFormSignIn}
          >
            <Row gutter={[16, 0]}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Họ Và Tên"
                  rules={[validationRulesInstance.requireForm]}
                >
                  <Input
                    size="large"
                    placeholder="Vui lòng nhập họ và tên của bạn"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="gender"
                  label="Giới tính"
                  rules={[validationRulesInstance.requireForm]}
                >
                  <Select
                    placeholder="Chọn Giới tính"
                    allowClear
                    size="large"

                    options={Gender}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 0]}>
              <Col span={12}>
                <Form.Item
                  name="phoneNumber"
                  label="Điện Thoại"
                  rules={[
                    validationRulesInstance.requireForm,
                    validationRulesInstance.phoneValidate,
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Vui lòng nhập số điện thoại"
                    prefix={<span className="prefix__number-title">+84</span>}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="address"
                  label="Địa chỉ"
                  rules={[validationRulesInstance.requireForm]}
                >
                  <Input size="large" placeholder="Vui lòng nhập địa chỉ" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 0]}>
              <Col span={12}>
                <Form.Item
                  name="birthday"
                  label="Ngày Sinh"
                  rules={[validationRulesInstance.requireForm]}
                >
                  <DatePicker
                    size="large"
                    style={{ width: "100%" }}
                    placeholder="mm/dd/yyyy"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="role" label="Role"
                  rules={[validationRulesInstance.requireForm]}

                >
                  <Select
                    placeholder="Chọn Role của bạn"
                    allowClear
                    size="large"

                    options={listGender}
                  />
                </Form.Item>
              </Col>
            </Row>
            <div className="form__action" style={{ justifyContent: "end", display: "flex" }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                icon={<SendOutlined />}
                style={{ backgroundColor: "#01b7f2" }}
              >
                <span className="form__action-title">Đăng ký</span>
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Spin>
  </div>
};

export default SignUp;
