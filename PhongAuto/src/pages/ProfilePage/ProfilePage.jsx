import HeaderAntd from "@/components/Header/Header";
import { selectUser } from "@/redux/features/counterSlice";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Descriptions } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ProfilePage() {
  const user = useSelector(selectUser);
  return (
    <div>
      <HeaderAntd></HeaderAntd>

      <div style={{ padding: "50px", maxWidth: "600px", margin: "0 auto" }}>
        <Card
          style={{ textAlign: "center" }}
          cover={<img alt="cover" src={user.backgroundURL} />}
          actions={[
            <Button key="1" type="primary" icon={<EditOutlined />}>
              Edit Profile
            </Button>,
          ]}
        >
          <Avatar
            size={100}
            icon={<UserOutlined />}
            src={user.avatarURL}
            style={{ marginBottom: "20px" }}
          />
          <h2>{user.fullname}</h2>
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Username">
              {user.username}
            </Descriptions.Item>
            <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
            <Descriptions.Item label="Address">
              {user.address}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </div>
  );
}
