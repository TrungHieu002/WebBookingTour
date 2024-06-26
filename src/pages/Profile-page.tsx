import { Button, Col, DatePicker, Form, Input, Row, Select, Spin, message } from "antd";
import validationRulesInstance from "@/lib/validated/Rule";
import { Avatar } from "antd";
import { SkinFilled, SaveOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { EditProfile, GetProfile } from "@/lib/api/profile-api";
import { useUserContext } from "@/contexts/UserContext";
import dayjs from "dayjs";
interface Option {
  value: boolean;
  label: string;
}
export interface UserData {
  name: string;
  phoneNumber: string;
  email: string;
  avatar: string;
  gender: boolean;
  birthday: string;
  address: string;
}
export default function Profile() {
  const [form] = Form.useForm();
  const [userProfile, setUserProfile] = useState<UserData>();
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [user,] = useUserContext();
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    const fetchDataUser = () => {
      setLoading(true);
      GetProfile()
        .then((res) => {
          if (!res.succeeded) {
            console.log(res.messages[0]);
          }
          if (res.data != null) {
            const profileData = {
              ...res.data,
              birthday: dayjs(res.data.birthday, "YYYY/MM/DD")
            };
            setUserProfile(profileData)
            console.log(profileData);

            setLoading(false)
          }
        })
    }
    fetchDataUser()
  }, [])
  const handleFormChange = () => {
    setIsFormChanged(true);
  };

  const handleFormSubmit = (values: UserData) => {
    setLoading(true)
    if (values.birthday && dayjs.isDayjs(values.birthday)) {
      values.birthday = values.birthday.format("YYYY/MM/DD");
    }
    values.avatar = userProfile?.avatar || ""
    EditProfile(values)
      .then((res) => {
        if (!res.succeeded) {
          message.error('Chỉnh sửa thất bại!');
          setLoading(false)
        }
        else {
          setLoading(false)
          setUserProfile(values);
          message.success('Chỉnh sửa thành công!');
          setIsFormChanged(false);
        }
      })
  };
  const listGender: Option[] = [
    { value: true, label: "Nam" },
    { value: false, label: "Nữ" },
  ];
  return (
    <div className="container__profile">
      {loading ? (<Spin tip="Loading" size="large"></Spin>) : (
        <>
          <div className="item__profile">
            <div className="item__profile-avt">
              <Avatar
                size={{ xs: 150, sm: 150, md: 150, lg: 150, xl: 150, xxl: 150 }}
                src={userProfile?.avatar}
              />
            </div>
            <div className="item__profile-name">{userProfile?.name}</div>
            <div className="item__profile-role">
              <SkinFilled />
              <div className="item__profile-role-title">{user?.role}</div>
            </div>
          </div>
          <Row className="item__detailprofile">
            <Col span={14} className="item__detailprofile-container">
              <div className="detailprofile__title">Thông Tin Cá Nhân</div>
              <Form
                name="information__form"
                autoComplete="off"
                layout="vertical"
                form={form}
                initialValues={userProfile}
                onValuesChange={handleFormChange}
                onFinish={handleFormSubmit}
              >
                <Row gutter={[16, 0]}>
                  <Col span={12}>
                    <Form.Item<UserData>
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
                    <Form.Item<UserData>
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
                </Row>
                <Row gutter={[16, 0]}>
                  <Col span={12}>
                    <Form.Item<UserData>
                      name="email"
                      label="Email"
                      rules={[
                        validationRulesInstance.requireForm,
                        validationRulesInstance.emailValidation,
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder="Vui lòng nhập email của bạn"
                        disabled
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<UserData>
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
                    <Form.Item<UserData>
                      name="birthday"
                      label="Ngày Sinh"
                      rules={[validationRulesInstance.requireForm]}
                    >
                      <DatePicker
                        size="large"
                        style={{ width: "100%" }}
                        placeholder="YYYY/MM/DD"
                        format="YYYY/MM/DD"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<UserData> name="gender" label="Giới tính">
                      <Select
                        placeholder="Chọn giới tính của bạn"
                        size="large"
                        options={listGender}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <div className="form__action">
                  <Button
                    type="primary"
                    size="large"
                    icon={<SaveOutlined />}
                    style={{ backgroundColor: "#01b7f2" }}
                    disabled={!isFormChanged}
                    htmlType="submit"
                  >
                    <span className="form__action-title">Lưu</span>
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}
