import {
  Input,
  Form,
  Button,
  DatePicker,
  Row,
  Col,
  List,
  Tag,
  PaginationProps,
  Spin,
} from "antd";
import {
  EnvironmentFilled,
  CalendarFilled,
  SearchOutlined,
  DollarTwoTone,
  HomeFilled,
  ClockCircleFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetAllBookingCustomer } from "@/lib/api/booking-api";
import dayjs from "dayjs";
interface OptionStateTour {
  value: number;
  label: string;
}
interface DataType {
  id: string;
  name: string;
  startDate: string;
  description: string;
  hotel: string;
  image: string;
  location: string;
  participants: number;
  totalPrice: number;
  status: number;
  createdAt: string;
  updatedAt: string;
}
const BookingPage = () => {
  const [formSearchBooking] = Form.useForm();
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [loadingData, setLoadingData] = useState<boolean>(false)
  const [searchKeyWord, setSearchKeyWord] = useState<string>();
  const [searchStartDate, setSearchStartDate] = useState<string>();
  const [searchEndDate, setSearchEndDate] = useState<string>();
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const onPageChange: PaginationProps["onChange"] = (page) => {
    setCurrent(page)
  }
  const handleFormSearch = () => {
    formSearchBooking.validateFields().then((value) => {
      if (value.startDate && dayjs.isDayjs(value.startDate)) {
        value.startDate = value.startDate.format("YYYY/MM/DD");
      }
      if (value.endDate && dayjs.isDayjs(value.endDate)) {
        value.endDate = value.endDate.format("YYYY/MM/DD");
      }
      setSearchKeyWord(value.Keyword)
      setSearchStartDate(value.startDate)
      setSearchEndDate(value.endDate)
      setLoadingData(true)
      GetAllBookingCustomer(1, value.Keyword, value.startDate, value.endDate)
        .then((res) => {
          if (res?.succeeded) {
            setCurrent(1)
            setDataSource(res.data)
            setLoadingData(false)
            setTotalRecords(res.totalCount)
          }
        })
    });
  };
  const listStateTour: OptionStateTour[] = [
    { value: 0, label: "Đang Chuẩn Bị" },
    { value: 1, label: "Đang tiến hành" },
    { value: 2, label: "Đã kết thúc" },

  ];
  useEffect(() => {
    setLoadingData(true)
    GetAllBookingCustomer(current, searchKeyWord, searchStartDate, searchEndDate)
      .then((res) => {
        if (res?.succeeded) {
          setDataSource(res.data)
          setTotalRecords(res.totalCount)
          setLoadingData(false)
        }
      })
  }, [])
  return (
    <div className="searchTour">
      <Form
        name="SearchForm"
        form={formSearchBooking}
        autoComplete="off"
        className="searchTour__form"
        layout="vertical"
        onFinish={handleFormSearch}
      >
        <div className="search__form">
          <Form.Item noStyle name="Keyword">
            <Input
              size="large"
              placeholder="Nhập tên,địa điểm du lịch"
              prefix={<EnvironmentFilled />}
              style={{
                borderColor: "#79747E",
                maxWidth: "250px",
                minWidth: "200px",
              }}
            />
          </Form.Item>
          <Form.Item noStyle name="startDate">
            <DatePicker
              suffixIcon={<CalendarFilled style={{ color: "#112211" }} />}
              placeholder="Nhập ngày bắt đầu"
              size="large"
              style={{
                borderColor: "#79747E",
                maxWidth: "300px",
                minWidth: "200px",
              }}
              format={"YYYY/MM/DD"}
            />
          </Form.Item>
          <Form.Item noStyle name="endDate">
            <DatePicker
              suffixIcon={<CalendarFilled style={{ color: "#112211" }} />}
              placeholder="Nhập ngày kết thúc"
              size="large"
              style={{
                borderColor: "#79747E",
                maxWidth: "300px",
                minWidth: "200px",
              }}
              format={"YYYY/MM/DD"}
            />
          </Form.Item>
          <Form.Item noStyle>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              icon={<SearchOutlined />}
              style={{ backgroundColor: "#01b7f2" }}
            >
              Tìm kiếm
            </Button>
          </Form.Item>
        </div>
        <Row className="search__filter">
          {loadingData ? (<Spin tip="Loading" size="large"></Spin>) : (
            <Col span={24}>
              <List
                itemLayout="vertical"
                bordered
                size="large"
                pagination={{
                  onChange: onPageChange,
                  total: totalRecords,
                  current: current,
                }}
                dataSource={dataSource}
                renderItem={(item, key) => (
                  <List.Item
                    key={key}
                    extra={
                      <div>
                        <div className="containerRow__itemTour">
                          <Row>
                            <Col className="item__tourInfo" span={24}>
                              <Tag color="#f50" style={{ marginRight: 0 }}>
                                VND {item?.totalPrice}
                              </Tag>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="item__tourInfo text__tour" span={24}>
                              <EnvironmentFilled /> {item?.location}
                            </Col>
                          </Row>
                          <Row>
                            <Col className="item__tourInfo text__tour" span={24}>
                              <HomeFilled /> {item?.hotel}
                            </Col>
                          </Row>
                        </div>
                        <Link to={`${item?.id}`}>
                          <Button
                            type="primary"
                            size="large"
                            icon={<DollarTwoTone />}
                            style={{ backgroundColor: "#01b7f2" }}
                          >
                            Xem thông tin
                          </Button>
                        </Link>
                      </div>
                    }
                  >
                    <List.Item.Meta
                      avatar={
                        <img
                          width={150}
                          alt="logo"
                          style={{ borderRadius: "16px" }}
                          src={item?.image}
                        />
                      }
                      title={
                        <Link
                          to={`${item?.id}`}
                          style={{
                            fontSize: "20px",
                            fontWeight: 500,
                            color: "#000000",
                          }}
                        >
                          {item?.name}
                        </Link>
                      }
                      description={
                        <>
                          <Row>{item?.description}</Row>
                          <Row style={{ paddingTop: "16px" }}>
                            <ClockCircleFilled />
                            <span className="list__itemTour-date">
                              {dayjs(item?.startDate).format('MMMM DD, YYYY')}
                            </span>
                            <Tag color="#7BBCB0" style={{ marginRight: 0 }}>
                              {listStateTour[item.status].label}
                            </Tag>
                          </Row>
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            </Col>
          )}
        </Row>
      </Form>
    </div>
  );
};

export default BookingPage;
