import panelImg from "@/assets/panel.jpg";
import {
  // DatePicker,
  Button,
  Row,
  Col,
  Card,
  Divider,
  Tag,
  Spin,
} from "antd";
import {
  RightCircleOutlined,
  DollarTwoTone,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetTourHome } from "@/lib/api/tour-api";
import dayjs from "dayjs";
import { GetLocationHome } from "@/lib/api/location-api";

interface filePathItem {
  filePath: string;
  fileUrl: string;
}
export interface TourData {
  id: string;
  name: string;
  description: string;
  price: string;
  location: string;
  startDate: string;
  status: number;
  hotel: string;
  image: filePathItem;
}
interface LocationData {
  id: string,
  name: string,
  description: string,
  images: filePathItem[],
  createAt: string,
  updateAt: null,

}
export default function HomePage() {
  const [tourMoney, setTourMoney] = useState<TourData[]>();
  const [locationData, setLocationData] = useState<LocationData[]>();
  const [tourNormal, setTourNomarl] = useState<TourData[]>();
  const [loadingMoney, setLoadingMoney] = useState<boolean>(false);
  const [loadingNormal, setLoadingNormal] = useState<boolean>(false);
  const [loadingLocation, setLoadingLocation] = useState<boolean>(false);
  useEffect(() => {
    setLoadingNormal(true)
    GetTourHome()
      .then((res) => {
        if (res.succeeded) {
          setTourNomarl(res.data)
          setLoadingNormal(false)
        }
      })
  }, [])
  useEffect(() => {
    setLoadingMoney(true)
    GetTourHome(true)
      .then((res) => {
        if (res.succeeded) {
          setTourMoney(res.data)
          setLoadingMoney(false)
        }
      })
  }, [])
  useEffect(() => {
    setLoadingLocation(true)
    GetLocationHome()
      .then((res) => {
        if (res.succeeded) {
          setLocationData(res.data)
          setLoadingLocation(false)
        }
      })
  }, [])
  return (
    <>
      <div className="Panel">
        <img src={panelImg} alt="Img Introduction" className="Panel__img" />
      </div>
      <div className="homeContent">
        <Row className="listCard">
          <Col span={23} className="listCard__title">
            Tour Thịnh Hành
          </Col>
          <Col
            span={1}
            className="listCard__title"
            style={{ textAlign: "end" }}
          >
            <Link to={"/tour"}>
              <Button
                type="primary"
                size="large"
                icon={<RightCircleOutlined />}
                style={{ backgroundColor: "#01b7f2" }}
              />
            </Link>
          </Col>
        </Row>
        <Spin spinning={loadingNormal}>
          <Row gutter={16}>
            {tourNormal?.map((data) => (
              <Col span={6} key={data?.id}>
                <Card
                  hoverable
                  bordered={true}
                  cover={
                    <img
                      alt="imgTour"
                      src={data?.image?.filePath}
                      className="listCard__item"
                    />
                  }
                  actions={[
                    <Link to={`/tour/${data?.id}`}>
                      <Button
                        type="primary"
                        size="large"
                        icon={<DollarTwoTone />}
                        style={{ backgroundColor: "#01b7f2" }}
                      >
                        Xem thông tin
                      </Button>
                    </Link>,
                  ]}
                >
                  <Row>
                    <Col span={24}>
                      <Tag color="#2db7f5" className="listCard__item-activity">
                        {data.name}
                      </Tag>
                      <Tag color="#f50" style={{ textAlign: "end" }}>
                        VND {data?.price}
                      </Tag>
                      <Divider style={{ margin: "5px 0px" }}></Divider>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <div className="listCard__item-info">Ngày</div>
                    </Col>
                    <Col span={12} style={{ textAlign: "end" }}>
                      <div className="listCard__item-info">Địa điểm</div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <div className="listCard__item-content"> {dayjs(data?.startDate).format('MMMM DD, YYYY')}</div>
                    </Col>
                    <Col span={12} style={{ textAlign: "end" }}>
                      <div className="listCard__item-content">
                        {data?.location}
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </Spin>
        <Row className="listCard">
          <Col span={23} className="listCard__title">
            Top Tour Giá Rẻ
          </Col>
          <Col
            span={1}
            className="listCard__title"
            style={{ textAlign: "end" }}
          >
            <Link to={"/tour"}>
              <Button
                type="primary"
                size="large"
                icon={<RightCircleOutlined />}
                style={{ backgroundColor: "#01b7f2" }}
              />
            </Link>
          </Col>
        </Row>
        <Spin spinning={loadingMoney}>
          <Row gutter={16}>
            {tourMoney?.map((data) => (
              <Col span={6} key={data?.id}>
                <Card
                  hoverable
                  bordered={true}
                  cover={
                    <img
                      alt="imgTour"
                      src={data?.image?.filePath}
                      className="listCard__item"
                    />
                  }
                  actions={[
                    <Link to={`/tour/${data?.id}`}>
                      <Button
                        type="primary"
                        size="large"
                        icon={<DollarTwoTone />}
                        style={{ backgroundColor: "#01b7f2" }}
                      >
                        Xem thông tin
                      </Button>
                    </Link>,
                  ]}
                >
                  <Row>
                    <Col span={24}>
                      <Tag color="#2db7f5" className="listCard__item-activity">
                        {data.name}
                      </Tag>
                      <Tag color="#f50" style={{ textAlign: "end" }}>
                        VND {data?.price}
                      </Tag>
                      <Divider style={{ margin: "5px 0px" }}></Divider>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <div className="listCard__item-info">Ngày</div>
                    </Col>
                    <Col span={12} style={{ textAlign: "end" }}>
                      <div className="listCard__item-info">Địa điểm</div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <div className="listCard__item-content"> {dayjs(data?.startDate).format('MMMM DD, YYYY')}</div>
                    </Col>
                    <Col span={12} style={{ textAlign: "end" }}>
                      <div className="listCard__item-content">
                        {data?.location}
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </Spin>
        <Row className="listCard">
          <Col span={24} className="listCard__title">
            Thông Tin Về Địa Điểm
          </Col>
        </Row>
        <Spin spinning={loadingLocation}>
          <Row gutter={[16, 16]}>
            {locationData?.map((data, key) => (
              <Col span={6} className="listCard__link" key={key}>
                <Link to={`/home/${data?.id}`}>
                  <img
                    src={data?.images[0].filePath}
                    alt="imgLocation"
                    className="listCard__item"
                    style={{
                      borderRadius: 8,
                    }}
                  />
                </Link>
                <div className="listCard__location">{data?.name}</div>
              </Col>
            ))}
          </Row>
        </Spin>

        {/* <Row className="listCard">
          <Col span={24} className="listCard__title">
            Thời Tiết Đà Nẵng
          </Col>
        </Row>
        <Row className="listCard__weather">
          {weather.map((data, key) => (
            <Col span={3} className="listCard__weather-item" key={key}>
              <Row className="weather__text-primary">{data.wednesday}</Row>
              <Row className="weather__text-secondary">{data.date}</Row>
              <Row>
                <img src={data.iconWeather} alt="" />
              </Row>
              <Row className="weather__text-primary">{data.weather}</Row>
              <Row className="weather__text-secondary">{data.temperature}</Row>
            </Col>
          ))}
        </Row> */}
      </div>
    </>
  );
}
