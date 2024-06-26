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
    Spin,
} from "antd";
import {
    EnvironmentFilled,
    SearchOutlined,
    EyeOutlined,
    SkinFilled,
    UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import ImgEmpty from "@/components/icon/iconEmpty";
import { GetAllCustomer, GetCustomerById, GetStatisticCustomer } from "@/lib/api/statistic-api";
interface OptionType {
    value: number;
    label: string;
}
interface DataType {
    id: string;
    userId: string;
    name: string;
    phoneNumber: string;
    email: string;
    avatar: string;
    status: string;
    createAt: string;
    updateAt: null;
}
interface CustomerDetailType {
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
    updateAt: null;
}
interface dataMount {
    amountCustomer: number;
}
const StatisticAdminPage = () => {
    const [formSearchCustomer] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [loadingData, setLoadingData] = useState<boolean>(false)
    const [statisticCustomer, setStatisticCustomer] = useState<dataMount>()
    const [dataSource, setDataSource] = useState<DataType[]>([]);
    const [dataCustomer, setDataCustomer] = useState<CustomerDetailType>();
    const Role: OptionType[] = [
        { value: 0, label: "Admin" },
        { value: 1, label: "Tour Owner" },
        { value: 2, label: "Customer" },
    ];
    const showModal = (id: string) => {
        GetCustomerById(id)
            .then((res) => {
                if (res.succeeded) {
                    setDataCustomer(res.data)
                    setOpen(true);
                }
            })
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const handleFormSearch = () => {
        formSearchCustomer.validateFields().then((value) => {
            console.log(value);
            setLoadingData(true)
            GetAllCustomer(1, value.Keyword)
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
        GetAllCustomer()
            .then((res) => {
                if (res.succeeded) {
                    setDataSource(res.data)
                    setLoadingData(false)
                }
            })

    }, [])
    useEffect(() => {
        GetStatisticCustomer()
            .then((res) => {
                if (res.succeeded) {
                    setStatisticCustomer(res.data)
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
            dataIndex: 'id',
            render: (id: string) =>
                dataSource.length >= 1 ? (
                    <div className="action__table">
                        <Button icon={<EyeOutlined />} type="text" onClick={() => showModal(id)}>
                        </Button>
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
                form={formSearchCustomer}
                onFinish={handleFormSearch}
                layout="vertical"
            >
                <Row className="statistic__admin" justify={"center"}>
                    <Col span={6} className="statistic__admin-item">
                        <Card>
                            <Statistic
                                title="Tổng số khách hàng"
                                value={statisticCustomer?.amountCustomer}
                                valueStyle={{ color: '#01B7F2' }}
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
                            placeholder="Nhập tên khách hàng"
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
                            size="large"
                            htmlType="submit"
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
                            src={dataCustomer?.avatar}
                        />
                    </div>
                    <div className="user__profile-name">{dataCustomer?.name}</div>
                    <div className="user__profile-role">
                        <SkinFilled />
                        <div className="user__profile-role-title">{Role[dataCustomer?.role ?? 0].label}</div>
                    </div>
                </div>

                <Row className="user__detailprofile">
                    <Col span={24}>
                        <Form
                            name="information__form"
                            autoComplete="off"
                            layout="vertical"
                        >
                            <Row gutter={[16, 0]}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Họ Và Tên"
                                    >
                                        <Input
                                            size="large"
                                            disabled
                                            value={dataCustomer?.name}
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
                                            value={dataCustomer?.phoneNumber}
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
                                            value={dataCustomer?.email}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Địa chỉ"
                                    >
                                        <Input disabled size="large" placeholder="Vui lòng nhập địa chỉ" value={dataCustomer?.address} />
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
                                            value={dataCustomer?.birthday}
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
                                            value={dataCustomer?.gender ? "Nam" : "Nữ"}
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

export default StatisticAdminPage