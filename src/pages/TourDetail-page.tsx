import { Col, Row, Form, Divider, Input, DatePicker, Button, Timeline, Spin } from "antd";
import { RedirectVNPay } from "@/lib/api/payment-api";
import {
  EnvironmentFilled,
  DollarOutlined,
  WhatsAppOutlined,
  MailOutlined,
  UserOutlined,
  HomeOutlined
} from "@ant-design/icons";
import validationRulesInstance from "@/lib/validated/Rule";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AddTourOder, GetTourById } from "@/lib/api/tour-api";



interface filePathItem {
  filePath: string;
  fileUrl: string;
}
interface schedulesItem {
  id: string;
  startTime: string;
  date: number;
  description: string;
}
interface tourOwner {
  id: string,
  name: string,
  avatar: string,
  ratingCount: number,
  ratingTotal: number,
  email: string,
  phoneNumber: string,
  address: string,
}
interface TourDetailType {
  id: string;
  name: string;
  description: string;
  price: number;
  location: string;
  startDate: string;
  endDate: string;
  lastRegisterDate: string;
  status: number;
  vehicle: string;
  hotel: string;
  images: filePathItem[];
  schedules: schedulesItem[];
  tourOwner: tourOwner;
  tourOwnerReviews: schedulesItem[];
}


const TourDetailPage = () => {
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
  const [formCheckOut] = Form.useForm();
  const [dataDetail, setDataDetail] = useState<TourDetailType>();
  const { id } = useParams();
  useEffect(() => {
    const fetchDataTour = (id: string) => {
      setLoadingDetail(true)
      GetTourById(id)
        .then((res) => {
          if (!res.succeeded) {
            console.log(res.messages[0]);
          }
          if (res.data != null) {

            setDataDetail(res.data)
            setLoadingDetail(false)
          }
        })
    }
    fetchDataTour(id as string)
  }, [id])
  useEffect(() => {
    if (dataDetail) {
      formCheckOut.setFieldsValue({
        startDate: dayjs(dataDetail.startDate, "YYYY/MM/DD"),
        endDate: dayjs(dataDetail.endDate, "YYYY/MM/DD"),
      });
    }
  }, [dataDetail]);
  const groupSchedulesByDate = (schedules: schedulesItem[] = []) => {
    const grouped = schedules.reduce((acc, schedule) => {
      const { date, id, description, startTime } = schedule;
      if (!acc[date]) {
        acc[date] = {
          date,
          schedules: []
        };
      }
      acc[date].schedules.push({ id, startTime, description });
      return acc;
    }, {} as Record<number, { date: number; schedules: { id: string; startTime: string; description: string }[] }>);

    return Object.values(grouped);
  };


  const handleBooking = async () => {
    formCheckOut.validateFields().then((value) => {
      const addValue = {
        paymentMethod: 'Thanh toán Online',
        tourId: id,
        totalPrice: dataDetail?.price,
        participants: 1,
        amount: dataDetail?.price,
        note: "Cảm ơn",
      };
      const updatedValue = { ...value, ...addValue };
      const { startDate, endDate, ...finalValue } = updatedValue;

      console.log(finalValue);
      RedirectVNPay(dataDetail?.price as number)
        .then(url => {
          console.log(url);
          localStorage.setItem('TourPaymentUrl', url);
          window.open(url, '_blank')
        })
      AddTourOder(finalValue)
        .then((res) => {
          if (!res.succeeded) {
            console.log(res.message[0]);
          }
        })
    })
  }

  return <div className="TourDetail__container">

    <Spin spinning={loadingDetail}>
      <Row className="TourDetail__title">
        <Col span={16}><span className="TourDetail__title-item">{dataDetail?.name}</span></Col>
      </Row>
      <Row className="TourDetail__location">
        <Col span={16} style={{ display: "flex", gap: "4px" }}>
          <div className="TourDetail__location-item">
            <EnvironmentFilled />
            <span className="item-title">{dataDetail?.location}</span>
          </div>
        </Col>
      </Row>
      <Row className="TourDetail__item" gutter={[30, 30]}>
        <Col span={16}>
          <Row className="item__listImg" gutter={[8, 8]}>
            {dataDetail?.images?.map((data, key) => (
              <Col span={8} key={key}>
                <img src={data.filePath} alt="ImgTour" className="item__img-tour" />
              </Col>
            ))}
          </Row>
          <Row className="item__description">
            Mô tả chuyến đi
          </Row>
          <Row className="item__detail">
            {dataDetail?.description}
          </Row>
          <Divider></Divider>
          <Row className="item__description">
            Chi tiết chuyến đi
          </Row>
          <Row className="item__timeline">
            <Col span={16}>
              <Timeline
                className="timeline"
                items={groupSchedulesByDate(dataDetail?.schedules as schedulesItem[]).map((daySchedule, index) => ({
                  dot: <div className="timeline__dot">Ngày {index + 1}</div>,
                  children: (
                    <div className="timeline__list">
                      {daySchedule.schedules.map(schedule => (
                        <div key={schedule.id} className="timeline__item">
                          {schedule.startTime}: {schedule.description}
                        </div>
                      ))}
                    </div>
                  )
                }))}
              />
            </Col>
            <Col span={8} className="timeline__info">
              <div className="TourDetail__location-item">
                <WhatsAppOutlined />
                <span className="item-title">+84 {dataDetail?.tourOwner.phoneNumber}</span>
              </div>
              <div className="TourDetail__location-item">
                <MailOutlined />
                <span className="item-title">{dataDetail?.tourOwner.email}</span>
              </div>
              <div className="TourDetail__location-item">
                <UserOutlined />
                <span className="item-title">{dataDetail?.tourOwner.name}</span>
              </div>
              <div className="TourDetail__location-item">
                <HomeOutlined />
                <span className="item-title">{dataDetail?.hotel}</span>
              </div>
            </Col>
          </Row>
          <Divider></Divider>
          {/* <Row className="item__description">
            Đánh giá
          </Row>
          <Row className="item__comment">
            <Col span={24}>
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src="https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-1/368021133_1726419231151489_6853635133763153961_n.jpg?stp=dst-jpg_p200x200&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHXc4Y4B9SC2Fny3yA8N-CUBC9cMpZD2bwEL1wylkPZvD4bJYKXx2IP8953lqBULM1Rvddh6Q3aEhnBc6AwmJmM&_nc_ohc=GbGyntddSokQ7kNvgH72wpj&_nc_ht=scontent.fsgn2-3.fna&oh=00_AYBwycwtcZo1foqIxawptm7QEYZs546YxJAMHDh9Vw6lzw&oe=665C9498" />}
                      title={<a href="https://ant.design">{item.name}</a>}
                      description={item.title}
                    />
                  </List.Item>
                )}
              />
            </Col>
          </Row> */}
        </Col>
        <Col span={8} className="TourDetail__item-form">
          <Form
            name="information__form"
            className="form__checkout"
            autoComplete="off"
            form={formCheckOut}
            initialValues={dataDetail}

            layout="vertical"
            onFinish={handleBooking}
          >
            <div className="checkout__title">Thông Tin Vé</div>
            <Divider style={{ margin: "12px 0px" }} />
            <Row>
              <Col span={24}>
                <Form.Item
                  name="startDate"
                  label="Ngày bắt đầu"
                  rules={[validationRulesInstance.requireForm]}

                >
                  <DatePicker
                    disabled
                    size="large"
                    style={{ width: "100%" }}
                    placeholder="YYYY/MM/DD"
                    format="YYYY/MM/DD"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="endDate"
                  label="Ngày kết thúc"
                  rules={[validationRulesInstance.requireForm]}
                >
                  <DatePicker
                    size="large"
                    disabled
                    style={{ width: "100%" }}
                    placeholder="YYYY/MM/DD"
                    format="YYYY/MM/DD"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
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
            </Row>
            <Row>
              <Col span={24}>
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
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
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
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="address"
                  label="Địa chỉ"
                  rules={[validationRulesInstance.requireForm]}
                >
                  <Input
                    size="large"
                    placeholder="Vui lòng nhập địa chỉ của bạn"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider style={{ margin: "0px 0px 12px 0px" }} />
            <div className="checkout__subPrice">
              <div className="checkout__subPrice-title">Đơn giá</div>
              <div className="checkout__subPrice-price">VNĐ {dataDetail?.price}</div>
            </div>
            <div className="checkout__Price">
              <div className="checkout__Price-title">Tổng hóa đơn</div>
              <div className="checkout__Price-price">VNĐ {dataDetail?.price}</div>
            </div>
            <Divider style={{ margin: "12px 0px" }} />
            <div className="form__checkout-action">
              <Button
                type="primary"
                size="large"
                icon={<DollarOutlined />}
                style={{ backgroundColor: "#01b7f2", width: "100%" }}
                onClick={handleBooking}
              >
                <span className="form__action-title">Thanh Toán</span>
              </Button>
              {/* <Button
                type="primary"
                size="large"
                icon={<CommentOutlined />}
                style={{ backgroundColor: "#7BBCB0", width: "100%" }}
              >
                <span className="form__action-title">Liên hệ Chủ Tour</span>
              </Button> */}
            </div>
          </Form>
        </Col>
      </Row>
    </Spin>
  </div >
};

export default TourDetailPage;
