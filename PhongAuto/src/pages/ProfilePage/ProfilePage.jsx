import uploadFile from "../../utils/upload";
import HeaderAntd from "../../components/Header/Header";
import api from "../../config/api";
import { login, logout, selectUser } from "../../redux/features/counterSlice";
import {
  EditOutlined,
  HomeOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  PlusOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Form,
  Image,
  Input,
  Modal,
  Select,
  Upload,
} from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import { duongdan } from "../../routes";
import "./ProfilePage.css";
export default function ProfilePage() {
  const [form] = useForm();
  const [form2] = useForm();

  const user = useSelector(selectUser);
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

  const [open2, setOpen2] = useState(false);
  const [confirmLoading2, setConfirmLoading2] = useState(false);
  const showModal2 = () => {
    setOpen2(true);
  };
  const handleOk2 = () => {
    setConfirmLoading2(true);
    setTimeout(() => {
      setOpen2(false);
      setConfirmLoading2(false);
    }, 2000);
  };
  const handleCancel2 = () => {
    console.log("Clicked cancel button");
    setOpen2(false);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function editProfile(values) {
    // Combine the avatarURL and backgroundURL processing in a cleaner way
    if (fileList[0]) {
      values.avatarURL = fileList.map((file) => file.url); // Collect all uploaded image URLs for avatar
    }
    if (fileList2[0]) {
      values.backgroundURL = fileList2.map((file) => file.url); // Collect all uploaded image URLs for background
    }

    console.log(values);

    try {
      const response = await api.put(`PhongAuto-Login/${user.id}`, values);
      console.log(response.data);
      toast.success("Edit success");

      dispatch(login(response.data));
      setOpen(false);
      setFileList([]); // Clear file lists after successful update
      setFileList2([]);
      form.resetFields(); // Reset the form fields
    } catch (error) {
      toast.error("Edit error");
      console.log(error.response.data);
    }
  }

  async function changePassword(values) {
    if (values.oldPassword === user.password) {
      try {
        const response = await api.put(`PhongAuto-Login/${user.id}`, values);
        console.log(response.data);

        setOpen2(false);
        form2.resetFields(); // Reset the form fields
        dispatch(logout());
        navigate(duongdan.login);
        toast.success("Change Password Success, Please Login Again");
      } catch (error) {
        toast.error("Change Password Error");
        console.log(error.response.data);
      }
    } else {
      toast.error("Change Password Error");
    }
  }

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const [previewOpen2, setPreviewOpen2] = useState(false);
  const [previewImage2, setPreviewImage2] = useState("");
  const [fileList2, setFileList2] = useState([]);

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

  const handlePreview2 = (file) => {
    console.log(file);
    if (!file.url && !file.preview) {
      file.preview = getBase64(file.originFileObj);
    }
    console.log(file.preview);
    console.log(file.url);
    setPreviewImage2(file.url || file.preview);
    setPreviewOpen2(true);
  };

  const handleChange2 = async ({ fileList: newFileList }) => {
    const uploadedFiles = await Promise.all(
      newFileList.map(async (file) => {
        if (!file.url && !file.preview) {
          const url = await uploadFile(file.originFileObj); // Upload each file and get its URL
          return { ...file, url };
        }
        return file;
      })
    );
    setFileList2(uploadedFiles);

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
  console.log(user.avatarURL[0]);
  return (
    <div>
      <HeaderAntd></HeaderAntd>
      <Modal
        title="Edit Profile"
        open={open}
        onOk={handleOk}
        footer={false}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="login_form"
          className="register-form"
          initialValues={{ remember: true }}
          onFinish={editProfile}
        >
          <div className="form-register">
            <div className="form-register-1">
              <Form.Item
                name="fullname"
                rules={[
                  { required: true, message: "Please input your Fullname!" },
                  {
                    pattern: /^[a-zA-ZÀ-ỹẠ-ỹ\s]*$/,
                    message:
                      "Your Full Name won't have number and special characters",
                  },
                ]}
                initialValue={user.fullname}
              >
                <Input
                  required
                  prefix={<SmileOutlined />}
                  type="text"
                  placeholder="Full Name"
                />
              </Form.Item>

              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your Phone Number!",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: "Just Include Number",
                  },
                ]}
                initialValue={user.phone}
              >
                <Input
                  prefix={<PhoneOutlined />}
                  type="text"
                  placeholder="Phone Number"
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                  {
                    type: "email",
                    message: "Please type in your Email!",
                  },
                  {
                    pattern: /^([a-zA-Z0-9@.])*$/,
                    message: "Do not have Special Characters",
                  },
                ]}
                initialValue={user.email}
              >
                <Input
                  prefix={<MailOutlined />}
                  type="email"
                  placeholder="Email"
                />
              </Form.Item>

              <Form.Item
                name="address"
                rules={[
                  { required: true, message: "Please input your Address!" },
                ]}
                initialValue={user.address}
              >
                <Input
                  prefix={<HomeOutlined />}
                  type="text"
                  placeholder="Address"
                />
              </Form.Item>

              <Form.Item
                name="gender"
                rules={[
                  { required: true, message: "Please input your Gender!" },
                ]}
                initialValue={user.gender}
              >
                <Select placeholder="Gender">
                  <Select.Option value="MALE">Male</Select.Option>
                  <Select.Option value="FEMALE">Female</Select.Option>
                  <Select.Option value="OTHER">Other</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="avatarURL" label="Avatar" className="form-image">
                {" "}
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
                name="backgroundURL"
                label="Background"
                className="form-image"
              >
                {" "}
                <Upload
                  className="label-form-image"
                  action="https://66933fa0c6be000fa07a5685.mockapi.io"
                  maxCount={4}
                  onPreview={handlePreview2}
                  onChange={handleChange2}
                  listType="picture-card"
                  fileList={fileList2}
                >
                  {fileList2.length >= 8 ? null : uploadButton}
                </Upload>
                {previewImage2 && (
                  <Image
                    wrapperStyle={{
                      display: "none",
                    }}
                    preview={{
                      visible: previewOpen2,
                      onVisibleChange: (visible) => setPreviewOpen2(visible),
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage2(""),
                    }}
                    src={previewImage2}
                  />
                )}
              </Form.Item>
            </div>
          </div>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Edit
          </Button>
        </Form>
      </Modal>

      <Modal
        title="Change password"
        open={open2}
        onOk={handleOk2}
        footer={false}
        confirmLoading={confirmLoading2}
        onCancel={handleCancel2}
      >
        <Form
          form={form2}
          name="login_form"
          className="register-form"
          initialValues={{ remember: true }}
          onFinish={changePassword}
        >
          <Form.Item
            name="oldPassword"
            rules={[
              { required: true, message: "Please input your Password!" },
              {
                pattern: /^([a-zA-Z0-9])*$/,
                message: "Your password won't have special characters",
              },
              {
                min: 6,
                message: "Your password need to have at least 6 characters",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Old Password"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your Password!" },
              {
                pattern: /^([a-zA-Z0-9])*$/,
                message: "Your password won't have special characters",
              },
              {
                min: 6,
                message: "Your password need to have at least 6 characters",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="New Password"
            />
          </Form.Item>
          <Form.Item
            dependencies={["password"]}
            required
            name="confirm"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Confirm your New Password",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Your password is not correct")
                  );
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              required
              placeholder="Confirm password"
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Edit
          </Button>
        </Form>
      </Modal>

      <div style={{ padding: "50px", maxWidth: "600px", margin: "0 auto" }}>
        <Card
          style={{ textAlign: "center" }}
          cover={<img alt="cover" src={user?.backgroundURL} />}
          actions={[
            <>
              <Button
                onClick={showModal}
                type="primary"
                icon={<EditOutlined />}
                style={{ marginRight: "5%" }}
              >
                Edit Profile
              </Button>

              <Button
                onClick={showModal2}
                type="primary"
                icon={<EditOutlined />}
                style={{ marginLeft: "5%" }}
              >
                Change Password
              </Button>
            </>,
          ]}
        >
          <Avatar
            size={300}
            src={user?.avatarURL[0]}
            style={{ marginBottom: "20px" }}
          />
          <h2>{user?.fullname}</h2>
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Username">
              {user?.username}
            </Descriptions.Item>
            <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{user?.phone}</Descriptions.Item>
            <Descriptions.Item label="Address">
              {user?.address}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </div>
  );
}
