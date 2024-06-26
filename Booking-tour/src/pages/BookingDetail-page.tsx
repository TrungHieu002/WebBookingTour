import { Col, Row, Form, Divider, Input, Timeline, Spin } from "antd";
import {
    EnvironmentFilled,
    WhatsAppOutlined,
    MailOutlined,
    UserOutlined,
    HomeOutlined
} from "@ant-design/icons";
import validationRulesInstance from "@/lib/validated/Rule";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { GetBookingById } from "@/lib/api/booking-api";
interface schedulesItem {
    id: string;
    startTime: string;
    date: number;
    description: string;
}
interface filePathItem {
    filePath: string;
    fileUrl: string;
}
interface PaymentData {
    timestamp: string,
    paymentMethod: string,
    amount: number,
    note: string,
    createdAt: string,
}
interface TourOwnerData {
    id: string,
    name: string,
    avatar: null,
    ratingCount: number,
    ratingTotal: number,
    email: string,
    phoneNumber: string,
    address: string,
}
interface OrderData {
    id: string,
    name: string,
    email: string,
    phoneNumber: string,
    address: string,
    participants: number,
    totalPrice: number,
    status: number,
    payment: PaymentData,
}
interface TourData {
    id: string,
    name: string,
    description: string,
    price: number,
    location: number,
    startDate: string,
    endDate: string,
    lastRegisterDate: string,
    status: number,
    vehicle: string,
    hotel: string,
    images: filePathItem[],
    schedules: [],
    tourOwner: TourOwnerData,
}
interface BookingDetailType {
    order: OrderData,
    tour: TourData,
    tourOwnerReviewId: string,
    createAt: string,
}

const BookingDetailPage = () => {
    const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
    const [dataDetail, setDataDetail] = useState<BookingDetailType>();
    const { id } = useParams();
    useEffect(() => {
        const fetchDataBooking = (id: string) => {
            setLoadingDetail(true)
            GetBookingById(id)
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
        fetchDataBooking(id as string)
    }, [id])
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
    return (
        <div className="TourDetail__container">

            <Spin spinning={loadingDetail}>
                <Row className="TourDetail__title">
                    <Col span={16}><span className="TourDetail__title-item">{dataDetail?.tour.name}</span></Col>
                </Row>
                <Row className="TourDetail__location">
                    <Col span={16} style={{ display: "flex", gap: "4px" }}>
                        <div className="TourDetail__location-item">
                            <EnvironmentFilled />
                            <span className="item-title">{dataDetail?.tour.location}</span>
                        </div>
                    </Col>
                </Row>
                <Row className="TourDetail__item" gutter={[30, 30]}>
                    <Col span={16}>
                        <Row className="item__listImg" gutter={[8, 8]}>
                            {dataDetail?.tour.images?.map((data, key) => (
                                <Col span={8} key={key}>
                                    <img src={data.filePath} alt="ImgTour" className="item__img-tour" />
                                </Col>
                            ))}
                        </Row>
                        <Row className="item__description">
                            Mô tả chuyến đi
                        </Row>
                        <Row className="item__detail">
                            {dataDetail?.tour.description}
                        </Row>
                        <Divider></Divider>
                        <Row className="item__description">
                            Chi tiết chuyến đi
                        </Row>
                        <Row className="item__timeline">
                            <Col span={16}>
                                <Timeline
                                    className="timeline"
                                    items={groupSchedulesByDate(dataDetail?.tour.schedules as schedulesItem[]).map((daySchedule, index) => ({
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
                                    <span className="item-title">+84 {dataDetail?.tour?.tourOwner?.phoneNumber}</span>
                                </div>
                                <div className="TourDetail__location-item">
                                    <MailOutlined />
                                    <span className="item-title">{dataDetail?.tour?.tourOwner?.email}</span>
                                </div>
                                <div className="TourDetail__location-item">
                                    <UserOutlined />
                                    <span className="item-title">{dataDetail?.tour?.tourOwner?.name}</span>
                                </div>
                                <div className="TourDetail__location-item">
                                    <HomeOutlined />
                                    <span className="item-title">{dataDetail?.tour?.hotel}</span>
                                </div>
                            </Col>
                        </Row>
                        <Divider></Divider>
                    </Col>
                    <Col span={8} className="TourDetail__item-form">
                        <Form
                            name="information__form"
                            className="form__checkout"
                            autoComplete="off"
                            initialValues={dataDetail}
                            layout="vertical"
                        >
                            <div className="checkout__title">Thông Tin Vé</div>
                            <Divider style={{ margin: "12px 0px" }} />
                            <Row>
                                <Col span={24}>
                                    <Form.Item
                                        label="Ngày bắt đầu"
                                        rules={[validationRulesInstance.requireForm]}

                                    >
                                        <Input
                                            size="large"
                                            disabled
                                            placeholder="Vui lòng nhập họ và tên của bạn"
                                            value={dataDetail?.tour?.startDate}
                                        />

                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Form.Item
                                        label="Ngày kết thúc"
                                        rules={[validationRulesInstance.requireForm]}
                                    >
                                        <Input
                                            size="large"
                                            disabled
                                            placeholder="Vui lòng nhập họ và tên của bạn"
                                            value={dataDetail?.tour?.endDate}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Form.Item
                                        label="Họ Và Tên"
                                        rules={[validationRulesInstance.requireForm]}
                                    >
                                        <Input
                                            size="large"
                                            disabled
                                            placeholder="Vui lòng nhập họ và tên của bạn"
                                            value={dataDetail?.order.name}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Form.Item
                                        label="Điện Thoại"
                                        rules={[
                                            validationRulesInstance.requireForm,
                                            validationRulesInstance.phoneValidate,
                                        ]}
                                    >
                                        <Input
                                            size="large"
                                            disabled
                                            placeholder="Vui lòng nhập số điện thoại"
                                            prefix={<span className="prefix__number-title">+84</span>}
                                            value={dataDetail?.order.phoneNumber}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Form.Item
                                        label="Email"
                                        rules={[
                                            validationRulesInstance.requireForm,
                                            validationRulesInstance.emailValidation,
                                        ]}
                                    >
                                        <Input
                                            disabled
                                            size="large"
                                            placeholder="Vui lòng nhập email của bạn"
                                            value={dataDetail?.order.email}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Form.Item
                                        label="Địa chỉ"
                                        rules={[validationRulesInstance.requireForm]}
                                    >
                                        <Input
                                            size="large"
                                            disabled
                                            placeholder="Vui lòng nhập địa chỉ của bạn"
                                            value={dataDetail?.order.address}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Form.Item
                                        label="Phương thức thanh toán"
                                        rules={[validationRulesInstance.requireForm]}
                                    >
                                        <Input
                                            size="large"
                                            disabled
                                            placeholder="Vui lòng nhập địa chỉ của bạn"
                                            value={dataDetail?.order.payment.paymentMethod}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Form.Item
                                        label="Thời gian thanh toán"
                                        rules={[validationRulesInstance.requireForm]}
                                    >
                                        <Input
                                            size="large"
                                            disabled
                                            placeholder="Vui lòng nhập địa chỉ của bạn"
                                            value={dataDetail?.order.payment.timestamp}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Divider style={{ margin: "0px 0px 12px 0px" }} />
                            <div className="checkout__subPrice">
                                <div className="checkout__subPrice-title">Đơn giá</div>
                                <div className="checkout__subPrice-price">VNĐ {dataDetail?.order.payment.amount}</div>
                            </div>
                            <div className="checkout__Price">
                                <div className="checkout__Price-title">Tổng hóa đơn</div>
                                <div className="checkout__Price-price">VNĐ {dataDetail?.order.payment.amount}</div>
                            </div>
                            <Divider style={{ margin: "12px 0px" }} />
                        </Form>
                    </Col>
                </Row>
            </Spin>
        </div >
    )
}

export default BookingDetailPage