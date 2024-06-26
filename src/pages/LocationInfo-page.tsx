
import { GetLocationById } from "@/lib/api/location-api";
import {
  EnvironmentFilled,
} from "@ant-design/icons";
import { Col, Divider, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
interface fileItem {
  filePath: string,
  fileUrl: string,
}
interface LocationType {
  id: string,
  name: string,
  description: string,
  images: fileItem[]
}
const LocationInfoPage = () => {
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
  const [dataDetail, setDataDetail] = useState<LocationType>();
  const { id } = useParams();
  useEffect(() => {
    const fetchDataBooking = (id: string) => {
      setLoadingDetail(true)
      GetLocationById(id)
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
  return (

    <Spin spinning={loadingDetail}>
      <div className="TourDetail__container">
        <Row className="TourDetail__title">
          <Col span={24}><span className="TourDetail__title-item">Thành phố Hội An</span></Col>
        </Row>
        <Row className="TourDetail__location">
          <Col span={24} style={{ display: "flex", gap: "4px" }}>
            <div className="TourDetail__location-item">
              <EnvironmentFilled />
              <span className="item-title">{dataDetail?.name}</span>
            </div>
          </Col>
        </Row>
        <Row className="TourDetail__item" gutter={[30, 30]}>
          <Col span={24}>
            <Row className="item__listImg" gutter={[8, 8]}>
              {dataDetail?.images.map((data, key) => (
                <Col span={6} key={key}>
                  <img src={data.filePath} alt="ImgTour" className="item__img-tour" />
                </Col>
              ))}
            </Row>
            <Row className="item__description">
              Mô tả
            </Row>
            <Row className="item__detail">
              <Col span={20}>
                {dataDetail?.description}
              </Col>
            </Row>
            <Divider />
          </Col>
        </Row>
      </div>
    </Spin>
  )
};
export default LocationInfoPage;
