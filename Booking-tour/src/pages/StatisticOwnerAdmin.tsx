import {
    Input,
    Form,
    Button,
    Table,
    TableColumnsType,
    Avatar,
    Modal,
    Row,
    Col,
    Card,
    Statistic,
    Tag,
    Spin,
    message,
} from "antd";
import {
    EnvironmentFilled,
    SearchOutlined,
    EyeOutlined,
    SkinFilled,
    UserOutlined,
    CheckOutlined
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import ImgEmpty from "@/components/icon/iconEmpty";
import { ActiveTourOwner, GetAllTourOwner, GetStatisticTourOwner, GetTourOwnerById } from "@/lib/api/statistic-api";

interface DataType {
    id: string;
    userId: string;
    name: string;
    phoneNumber: string;
    email: string;
    avatar: string;
    status: number;
    ratingCount: number;
    ratingTotal: number;
    createAt: string;
    updateAt: null;
}
interface OptionType {
    label: string;
    value: number;
}
interface TourOwnerDetailType {
    id: string;
    userId: string;
    name: string;
    gender: boolean;
    birthday: string;
    address: string;
    phoneNumber: string;
    email: string;
    avatar: string;
    status: string;
    role: number;
    createAt: string;
    ratingCount: number;
    ratingTotal: number;
    updateAt: null;
}
interface StatisticTourOwner {
    amountTourOwner: number;
    amountActiveTourOwner: number;
    amountWaitingTourOwner: number;
}
const StatisticOwnerAdmin = () => {
    const [formSearchTourOwner] = Form.useForm();
    const [loadingData, setLoadingData] = useState<boolean>(false)
    const [open, setOpen] = useState(false);
    const statusUser: OptionType[] = [
        { label: "Đang chờ duyệt", value: 0 },
        { label: "Đã duyệt", value: 1 },
    ];
    const [dataSource, setDataSource] = useState<DataType[]>([]);
    const [dataTourOwner, setDataTourOwner] = useState<TourOwnerDetailType>();
    const [dataStatistic, setDataStatistic] = useState<StatisticTourOwner>();

    const showModal = (id: string) => {
        GetTourOwnerById(id)
            .then((res) => {
                if (res.succeeded) {
                    setDataTourOwner(res.data)
                    setOpen(true);
                }
            })
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const handleActive = (userId: string) => {
        ActiveTourOwner(userId)
            .then((res) => {
                if (res.succeeded) {
                    message.success("Phê duyệt thành công!");
                    return GetAllTourOwner(1);
                } else {
                    throw new Error('Phê duyệt không thành công');
                }
            })
            .then((res) => {
                if (res.succeeded) {
                    setDataSource(res.data);
                    setLoadingData(false);
                    return GetStatisticTourOwner();
                } else {
                    throw new Error('Lấy danh sách tour owner không thành công');
                }
            })
            .then((res) => {
                if (res.succeeded) {
                    setDataStatistic(res.data);
                } else {
                    throw new Error('Lấy thống kê tour owner không thành công');
                }
            })
            .catch((error) => {
                message.error("Có lỗi xảy ra: " + error.message);
            });
    }
    const handleFormSearch = () => {
        formSearchTourOwner.validateFields().then((value) => {
            console.log(value);
            setLoadingData(true)
            GetAllTourOwner(1, value.Keyword)
                .then((res) => {
                    if (res.succeeded) {
                        setDataSource(res.data)
                        setLoadingData(false)
                    }
                })
        });
    };
    useEffect(() => {
        setLoadingData(true)
        GetAllTourOwner()
            .then((res) => {
                if (res.succeeded) {
                    setDataSource(res.data)
                    setLoadingData(false)
                }
            })

    }, [])
    useEffect(() => {
        GetStatisticTourOwner()
            .then((res) => {
                if (res.succeeded) {
                    setDataStatistic(res.data)
                }
            })

    }, [])
    const columns: TableColumnsType<DataType> = [
        {
            title: "Hình ảnh",
            dataIndex: "avatar",
            key: "avatar",
            render: (avatar: string) => (<Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                src={avatar}
            />),
        },
        {
            title: "Họ và tên",
            dataIndex: "name",
            key: "name",
            ellipsis: true,
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status: number) => (
                <Tag color="#FF5500">
                    {statusUser[status].label}
                </Tag>),
            ellipsis: true,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            ellipsis: true,
        },
        {
            title: "Số điện thoại",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            ellipsis: true,
        },
        {
            title: 'Hành động',
            dataIndex: 'userId',
            render: (userId, record) =>
                dataSource.length >= 1 ? (
                    <div className="action__table">
                        <Button icon={<EyeOutlined />} type="text" onClick={() => showModal(record.id)}>
                        </Button>
                        {record.status === 0 && (

                            <Button icon={<CheckOutlined />} type="text" onClick={() => handleActive(userId)}>
                            </Button>

                        )}
                    </div>
                ) : null,
        },
    ];
    return (
        <div className="statisticAdmin__container">
            <Form
                name="searchForm"
                autoComplete="off"
                className="search__form"
                form={formSearchTourOwner}
                onFinish={handleFormSearch}
                layout="vertical"
            >
                <Row className="statistic__admin" justify={"center"}>
                    <Col span={6} className="statistic__admin-item">
                        <Card>
                            <Statistic
                                title="Tổng số Tour Owner"
                                value={dataStatistic?.amountTourOwner}
                                valueStyle={{ color: '#01B7F2' }}
                                prefix={<UserOutlined />}
                                suffix="Người"
                            />
                        </Card>
                    </Col>
                    <Col span={6} className="statistic__admin-item">
                        <Card>
                            <Statistic
                                title="Số Tour Owner Được cấp phép"
                                value={dataStatistic?.amountActiveTourOwner}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<UserOutlined />}
                                suffix="Người"
                            />
                        </Card>
                    </Col>
                    <Col span={6} className="statistic__admin-item">
                        <Card>
                            <Statistic
                                title="Số Tour Owner chờ phê duyệt"
                                value={dataStatistic?.amountWaitingTourOwner}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<UserOutlined />}
                                suffix="Người"
                            />
                        </Card>
                    </Col>
                </Row>
                <div className="search__form-admin">
                    <Form.Item noStyle name="Keyword">
                        <Input
                            size="large"
                            placeholder="Nhập tên và email Tour Owner"
                            prefix={<EnvironmentFilled />}
                            style={{
                                borderColor: "#79747E",
                                maxWidth: "250px",
                                minWidth: "200px",
                            }}
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
                <Spin spinning={loadingData}>
                    <div className="data__statistic">
                        <Table
                            columns={columns}
                            dataSource={dataSource}
                            locale={{
                                emptyText: () => (
                                    <div className="emptyBlank">
                                        <ImgEmpty></ImgEmpty>
                                        <span className="emptyBlank__title">
                                            There are no records to display.
                                        </span>
                                    </div>
                                ),
                            }}
                        />
                    </div>
                </Spin>
            </Form>
            <Modal
                title="Thông Tin Chi Tiết"
                open={open}
                onCancel={handleCancel}
                footer={null}
                cancelText="Trở về"
                width={"50%"}
                className="modal__container"
            >
                <div className="user__profile">
                    <div className="user__profile-avt">
                        <Avatar
                            size={{ xs: 150, sm: 150, md: 150, lg: 150, xl: 150, xxl: 150 }}
                            src={dataTourOwner?.avatar}
                        />
                    </div>
                    <div className="user__profile-name">{dataTourOwner?.name}</div>
                    <div className="user__profile-role">
                        <SkinFilled />
                        <div className="user__profile-role-title">Tour Owner</div>
                    </div>
                </div>

                <Row className="user__detailprofile">
                    <Col span={24}>
                        <Form
                            name="information__form"
                            autoComplete="off"
                            layout="vertical"
                        // form={formEdit}
                        >
                            <Row gutter={[16, 0]}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Họ Và Tên"
                                    >
                                        <Input
                                            size="large"
                                            disabled
                                            value={dataTourOwner?.name}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Điện Thoại"
                                    >
                                        <Input
                                            disabled
                                            size="large"
                                            placeholder="Vui lòng nhập số điện thoại"
                                            prefix={<span className="prefix__number-title">+84</span>}
                                            value={dataTourOwner?.phoneNumber}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[16, 0]}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Email"
                                    >
                                        <Input
                                            disabled
                                            size="large"
                                            placeholder="Vui lòng nhập email của bạn"
                                            value={dataTourOwner?.email}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Địa chỉ"
                                    >
                                        <Input disabled size="large" placeholder="Vui lòng nhập địa chỉ" value={dataTourOwner?.address} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[16, 0]}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Ngày Sinh"
                                    >
                                        <Input
                                            disabled
                                            size="large"
                                            value={dataTourOwner?.birthday}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Giới tính"
                                    >
                                        <Input
                                            disabled
                                            size="large"
                                            value={dataTourOwner?.gender ? "Nam" : "Nữ"}
                                        />
                                    </Form.Item>
                                </Col>

                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Modal>
        </div>
    )
}

export default StatisticOwnerAdmin