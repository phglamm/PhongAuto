/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  ProfileOutlined,
  HeartOutlined,
  UserOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  TeamOutlined,
  AppstoreAddOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Checkbox,
  DatePicker,
  Form,
  Image,
  Input,
  Layout,
  Menu,
  Modal,
  Select,
  Table,
  theme,
} from "antd";
import { Footer } from "antd/es/layout/layout";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import api from "../../config/api";
import { toast } from "react-toastify";

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
import "./Dashboard.css";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import dayjs from "dayjs";
const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [items, setItems] = useState([]);
  const [key, setKey] = useState();
  const location = useLocation();
  const currentURI =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  const role = "admin";

  const dataOpen = JSON.parse(localStorage.getItem("keys")) ?? [];

  const [openKeys, setOpenKeys] = useState(dataOpen);

  useEffect(() => {
    if (role === "owner") {
      setItems([
        getItem("Type", "category"),
        getItem("Profile", "profile", <ProfileOutlined />),
        getItem("Manage Cars", "/dashboard", <HeartOutlined />),
        getItem("Manage Staffs", "staffs", <UserOutlined />),
        getItem("Statistics", "statistics", <BarChartOutlined />, [
          getItem("Club 1", "stats-club-1"),
          getItem("Club 2", "stats-club-2"),
          getItem("Club 3", "stats-club-3"),
          getItem("All Clubs", "all-clubs"),
        ]),
      ]);
    }
    if (role === "staff") {
      setItems([
        getItem("Category", "category"),
        getItem("Hồ sơ", "profile", <ProfileOutlined />),
        getItem("Club", "clubs", <HeartOutlined />, [
          getItem("Time Slot", "time-slot"),
          getItem("Promotion", "promotion"),
        ]),
        getItem("Booking", "booking", <CheckCircleOutlined />, [
          getItem("Court ID 1", "court-1"),
          getItem("Court ID 2", "court-2"),
        ]),
      ]);
    }

    if (role === "admin") {
      setItems([
        getItem("Type", "type", <SettingOutlined />),
        getItem("Profile", "profile", <ProfileOutlined />),
        getItem("Manage Cars", "/dashboard", <HeartOutlined />),
        getItem("Manage Accounts", "accounts", <TeamOutlined />),
        getItem("Statistics", "statistics", <BarChartOutlined />, [
          getItem("Club 1", "stats-club-1"),
          getItem("Club 2", "stats-club-2"),
          getItem("Club 3", "stats-club-3"),
          getItem("All Clubs", "all-clubs"),
        ]),
        getItem("Quay Về", "", <BarChartOutlined />),
      ]);
    }
  }, []);

  const handleSubMenuOpen = (keyMenuItem) => {
    setOpenKeys(keyMenuItem);
  };
  const handleSelectKey = (keyPath) => {
    setKey(keyPath);
  };

  useEffect(() => {
    localStorage.setItem("keys", JSON.stringify(openKeys));
  }, [openKeys]);

  useEffect(() => {
    handleSubMenuOpen([...openKeys, key]);
  }, [currentURI]);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const dateformat = "DD-MM-YYYY";
  const [special, setSpecial] = useState(false);
  const [specialUpdate, setSpecialUpdate] = useState(false);
  const [form] = useForm();
  const [formUpdate] = useForm();

  function hanldeClickSubmit() {
    form.submit();
  }
  function hanldeClickSubmitUpdate() {
    formUpdate.submit();
  }
  async function addCar(value) {
    console.log(value);
    try {
      const response = await api.post("PhongAuto", value);
      console.log(response);
      toast.success("Add Car Successfully");
      form.resetFields();
      setOpen(false);
      fetchCar();
    } catch (error) {
      console.log(error.response.data);
    }
  }
  const [cars, setCars] = useState([]);
  async function fetchCar() {
    try {
      const response = await api.get("PhongAuto");
      setCars(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  }
  useEffect(() => {
    fetchCar();
  }, []);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const handleUpdateOk = () => {
    setIsModalUpdateOpen(false);
  };
  const handleUpdateCancel = () => {
    setIsModalUpdateOpen(false);
  };
  const [selectedCar, setSelectedCar] = useState(null);
  const [newData, setNewData] = useState("");

  async function deleteCar(values) {
    console.log(values.id);
    try {
      Modal.confirm({
        title: "Are you sure you want to delete this car ?",
        onOk: async () => {
          const response = await api.delete(`PhongAuto/${values.id}`);
          console.log(response);
          toast.success("Delete Succesfully");
          setCars(
            cars.filter((car) => {
              return car.id !== values.id;
            })
          );
        },
      });
      fetchCar();
    } catch (error) {
      toast.error("Delete Error");
      console.log(error.response.data);
    }
  }

  async function updateCar(values) {
    const dataUpdate = {
      ...newData,
      produceDate: dayjs(newData?.produceDate).format("DD-MM-YYYY"), // Format date if necessary
    };

    try {
      await api.put(`PhongAuto/${values.id}`, dataUpdate);
      setIsModalUpdateOpen(false);
      toast.success("Update Successfully");
      fetchCar();
      formUpdate.resetFields();
    } catch (error) {
      toast.error("Update error");
      console.log(error.response.data);
    }
  }
  const initialDate = selectedCar?.produceDate
    ? dayjs(selectedCar.produceDate)
    : null;

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Image",
      dataIndex: "imgURL",
      key: "imgURL",
      render: (value) => (
        <Image src={value[0]} alt="value" style={{ width: 200 }} />
      ),
    },
    {
      title: "Car's Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 280,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 610,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },

    {
      title: "Released Date",
      dataIndex: "produceDate",
      key: "produceDate",
      render: (value) => moment(value).format("DD-MM-YYYY"),
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (value) => value.toLocaleString() + " $",
    },
    {
      title: "Special",
      dataIndex: "isSpecial",
      key: "isSpecial",
      render: (isSpecial) => <Checkbox checked={isSpecial} disabled />,
    },
    {
      title: "Action",
      render: (values) => {
        return (
          <>
            <div className="action-button">
              <Button
                onClick={(e) => {
                  deleteCar(values);
                }}
                className="delete-button"
              >
                Delete
              </Button>

              <Button
                className="admin-upload-button update-button"
                onClick={() => {
                  setSelectedCar(values);
                  formUpdate.setFieldsValue(values);
                  setIsModalUpdateOpen(true);
                }}
              >
                Update
              </Button>
            </div>

            <Modal
              className="modal-updateCategory-form"
              footer={false}
              title="Update Car"
              okText={"Update"}
              open={isModalUpdateOpen}
              onOk={handleUpdateOk}
              onCancel={handleUpdateCancel}
            >
              <Form
                initialValues={{
                  ...selectedCar,
                  produceDate: initialDate,
                }}
                onValuesChange={(changedValues, allValues) => {
                  setNewData(allValues);
                }}
                form={formUpdate}
                onFinish={(values) => {
                  updateCar(selectedCar);
                }}
                id="form-update"
                className="form-main"
              >
                <Form.Item
                  className="label-form"
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Type in Name",
                    },
                  ]}
                >
                  <Input type="text" required />
                </Form.Item>
                <Form.Item
                  className="label-form"
                  label="Brand"
                  name="brand"
                  rules={[
                    {
                      required: true,
                      message: "Choose Brand",
                    },
                  ]}
                >
                  <Select className="select-input" placeholder="Choose Brand">
                    <Select.Option value="Lamborghini">
                      Lamborghini
                    </Select.Option>
                    <Select.Option value="Aston Martin">
                      Aston Martin
                    </Select.Option>
                    <Select.Option value="Ferrari">Ferrari</Select.Option>
                    <Select.Option value="Rolls-Royce">
                      Rolls-Royce
                    </Select.Option>
                    <Select.Option value="Bugatti">Bugatti</Select.Option>
                    <Select.Option value="Porsche">Porsche</Select.Option>
                    <Select.Option value="Bentley">Bentley</Select.Option>
                    <Select.Option value="McLaren">McLaren</Select.Option>
                    <Select.Option value="Mercedes-AMG">
                      Mercedes-AMG
                    </Select.Option>
                    <Select.Option value="Tesla">Tesla</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  className="label-form"
                  label="Type"
                  name="type"
                  rules={[
                    {
                      required: true,
                      message: "Choose Type",
                    },
                  ]}
                >
                  <Select className="select-input" placeholder="Choose Type">
                    <Select.Option value="Coupe">Coupe</Select.Option>
                    <Select.Option value="SUV">SUV</Select.Option>
                    <Select.Option value="Supercar">Supercar</Select.Option>
                    <Select.Option value="Sedan">Sedan</Select.Option>
                    <Select.Option value="Sports Car">Sports Car</Select.Option>
                    <Select.Option value="Pick Up Truck">
                      Pick Up Truck
                    </Select.Option>
                  </Select>
                </Form.Item>
                {/* <Form.Item
                  className="label-form"
                  label="Release Date"
                  name="produceDate"
                  rules={[
                    {
                      required: true,
                      message: "Choose Date",
                    },
                  ]}
                >
                 
                </Form.Item> */}
                <Form.Item
                  className="label-form"
                  label="Color"
                  name="color"
                  rules={[
                    {
                      required: true,
                      message: "Type in Color",
                    },
                  ]}
                >
                  <Input type="text" required />
                </Form.Item>
                <Form.Item
                  className="label-form"
                  label="Price"
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: "Type in Price",
                    },
                  ]}
                >
                  <Input type="number" required />
                </Form.Item>
                <Form.Item
                  className="label-form"
                  label="Special"
                  name="isSpecial"
                  valuePropName="checked"
                  initialValue={specialUpdate}
                >
                  <Checkbox
                    className="checkbox"
                    checked={specialUpdate}
                    onChange={(e) => {
                      setSpecialUpdate(e.target.checked);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  className="label-form-description"
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Type in Description",
                    },
                  ]}
                >
                  <TextArea rows={5} />
                </Form.Item>
                <Button onClick={() => hanldeClickSubmitUpdate()}>
                  Update Car
                </Button>
              </Form>
            </Modal>
          </>
        );
      },
    },
  ];
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={["profile"]}
          mode="inline"
          selectedKeys={currentURI}
          openKeys={openKeys}
          onOpenChange={handleSubMenuOpen}
        >
          {items.map((item) =>
            item.children ? (
              <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((subItem) => (
                  <Menu.Item
                    key={subItem.key}
                    onClick={(e) => handleSelectKey(e.keyPath[1])}
                  >
                    <Link to={`/dashboard/${subItem.key}`}>
                      {subItem.label}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={`/${item.key}`}>{item.label}</Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <header></header>
        </Header>
        <Content
          style={{ margin: "0 16px", display: "flex", flexDirection: "column" }}
        >
          <Breadcrumb>
            {location.pathname.split("/").map((path, index, array) => (
              <Breadcrumb.Item key={path}>
                {index === 0 ? path : <Link to={`/${path}`}>{path}</Link>}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Outlet style={{ flexGrow: 1 }} />
            <Button type="primary" onClick={showModal} style={{ width: "10%" }}>
              Add Car into Automotive
            </Button>
            <Modal
              title="Add Car"
              open={open}
              onOk={handleOk}
              footer={false}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <Form
                form={form}
                onFinish={addCar}
                id="form"
                className="form-main"
              >
                <Form.Item
                  className="label-form"
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Type in Name",
                    },
                  ]}
                >
                  <Input type="text" required />
                </Form.Item>
                <Form.Item
                  className="label-form"
                  label="Brand"
                  name="brand"
                  rules={[
                    {
                      required: true,
                      message: "Choose Brand",
                    },
                  ]}
                >
                  <Select className="select-input" placeholder="Choose Brand">
                    <Select.Option value="Lamborghini">
                      Lamborghini
                    </Select.Option>
                    <Select.Option value="Aston Martin">
                      Aston Martin
                    </Select.Option>
                    <Select.Option value="Ferrari">Ferrari</Select.Option>
                    <Select.Option value="Rolls-Royce">
                      Rolls-Royce
                    </Select.Option>
                    <Select.Option value="Bugatti">Bugatti</Select.Option>
                    <Select.Option value="Porsche">Porsche</Select.Option>
                    <Select.Option value="Bentley">Bentley</Select.Option>
                    <Select.Option value="McLaren">McLaren</Select.Option>
                    <Select.Option value="Mercedes-AMG">
                      Mercedes-AMG
                    </Select.Option>
                    <Select.Option value="Tesla">Tesla</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  className="label-form"
                  label="Type"
                  name="type"
                  rules={[
                    {
                      required: true,
                      message: "Choose Type",
                    },
                  ]}
                >
                  <Select className="select-input" placeholder="Choose Type">
                    <Select.Option value="Coupe">Coupe</Select.Option>
                    <Select.Option value="SUV">SUV</Select.Option>
                    <Select.Option value="Supercar">Supercar</Select.Option>
                    <Select.Option value="Sedan">Sedan</Select.Option>
                    <Select.Option value="Sports Car">Sports Car</Select.Option>
                    <Select.Option value="Pick Up Truck">
                      Pick Up Truck
                    </Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  className="label-form"
                  label="Release Date"
                  name="produceDate"
                  rules={[
                    {
                      required: true,
                      message: "Choose Date",
                    },
                  ]}
                >
                  <DatePicker
                    className="label-form"
                    placeholder="Choose Date"
                    required
                    format={dateformat}
                    disabledDate={(current) => {
                      let customDate = dayjs().format("DD-MM-YYYY");
                      return (
                        current && current > dayjs(customDate, "DD-MM-YYYY")
                      );
                    }}
                  />
                </Form.Item>
                <Form.Item
                  className="label-form"
                  label="Color"
                  name="color"
                  rules={[
                    {
                      required: true,
                      message: "Type in Color",
                    },
                  ]}
                >
                  <Input type="text" required />
                </Form.Item>
                <Form.Item
                  className="label-form"
                  label="Price"
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: "Type in Price",
                    },
                  ]}
                >
                  <Input type="number" required />
                </Form.Item>
                <Form.Item
                  className="label-form"
                  label="Special"
                  name="isSpecial"
                  valuePropName="checked"
                  initialValue={special}
                >
                  <Checkbox
                    className="checkbox"
                    checked={special}
                    onChange={(e) => {
                      setSpecial(e.target.checked);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  className="label-form-description"
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Type in Description",
                    },
                  ]}
                >
                  <TextArea rows={4} />
                </Form.Item>
                <Button onClick={() => hanldeClickSubmit()}> Add Car</Button>
              </Form>
            </Modal>

            <Table
              dataSource={cars}
              columns={columns}
              pagination={{ pageSize: 6 }}
              className="table-cars"
              scroll={{ x: "max-content" }}
            />
          </div>
        </Content>
        <Footer style={{ textAlign: "center", backgroundColor: "#E3F2EE" }}>
          PhongAuto ©{new Date().getFullYear()} Created by Phong
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
