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
  UploadOutlined,
  PlusOutlined,
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
  Upload,
} from "antd";
import { Footer } from "antd/es/layout/layout";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
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
import uploadFile from "../../utils/upload";
import dayjs from "dayjs";
import { duongdan } from "../../routes";
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
    if (role === "admin") {
      setItems([
        getItem("Type", "type", <SettingOutlined />),
        getItem("Profile", "profile", <ProfileOutlined />),
        getItem("Manage Cars", "dashboard", <HeartOutlined />),
        getItem("Manage Accounts", "dashboard/accounts", <TeamOutlined />),
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

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => {
        console.log(error);
        reject(error);
      };
    });
  };

  async function addCar(value) {
    console.log(value);
    const imgURLs = fileList.map((file) => file.url); // Collect all uploaded image URLs
    value.imgURL = imgURLs;
    const parseNum = parseInt(value.price);
    console.log(parseNum);
    value.price = parseNum;
    try {
      const response = await api.post("PhongAuto", value);
      console.log(response);
      toast.success("Add Car Successfully");
      setFileList([]);
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
    const parseNum = parseInt(newData.price);
    console.log(parseNum);
    const dataUpdate = {
      ...newData,
      price: parseNum,
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
    ? dayjs(selectedCar?.produceDate, "DD-MM-YYYY")
    : null;
  console.log(dayjs(initialDate), "DD-MM-YYYY");
  const navigate = useNavigate();
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
        <Image
          src={value[0]}
          alt="value"
          style={{ width: 200, height: " 120px" }}
        />
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
                onClick={() => {
                  navigate(`${duongdan.detail}/${values.id}`);
                }}
                className="delete-button"
              >
                View
              </Button>

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
                  console.log(values);
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
                  <DatePicker
                    className="label-form"
                    placeholder="Choose Date"
                    format={dateformat}
                    disabledDate={(current) => {
                      let customDate = dayjs().format("DD-MM-YYYY");
                      return (
                        current && current > dayjs(customDate, "DD-MM-YYYY")
                      );
                    }}
                  />
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

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const handlePreview = (file) => {
    console.log(file);
    if (!file.url && !file.preview) {
      file.preview = getBase64(file.originFileObj);
    }
    console.log(file.preview);
    console.log(file.url);
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = async ({ fileList: newFileList }) => {
    const uploadedFiles = await Promise.all(
      newFileList.map(async (file) => {
        if (!file.url && !file.preview) {
          const url = await uploadFile(file.originFileObj); // Upload each file and get its URL
          return { ...file, url };
        }
        return file;
      })
    );
    setFileList(uploadedFiles);
    toast.success("Upload Successfully");
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
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
            <Button type="primary" onClick={showModal} style={{ width: "15%" }}>
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
                  label="Image URL"
                  name="imgURL"
                >
                  <Upload
                    className="label-form-image"
                    action="https://66933fa0c6be000fa07a5685.mockapi.io"
                    maxCount={4}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    listType="picture-card"
                    fileList={fileList}
                  >
                    {fileList.length >= 8 ? null : uploadButton}
                  </Upload>
                  {previewImage && (
                    <Image
                      wrapperStyle={{
                        display: "none",
                      }}
                      preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) =>
                          !visible && setPreviewImage(""),
                      }}
                      src={previewImage}
                    />
                  )}
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
