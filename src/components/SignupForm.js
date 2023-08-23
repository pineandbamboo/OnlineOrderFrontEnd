import { Button, Form, Input, message, Modal } from "antd";
import React from "react";
import { LockOutlined, UserOutliner } from "@ant-design/icons";
import { signup } from "../utils";
import { useState, UserOutlined } from "react";

const SignupForm = () => {
  const [displayModal, setDisPlayModal] = useState(false);

  const handleCancel = () => {
    setDisPlayModal(false);
  };
  const signupOnClick = () => {
    setDisPlayModal(true);
  };
  const onFinish = (data) => {
    signup(data)
      .then(() => {
        setDisPlayModal(false);
        message.success(`Successfully signed up`);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  return (
    <>
      <Button shape="round" type="primary" onClick={signupOnClick}>
        Register
      </Button>
      <Modal
        title="Rigister"
        open={displayModal}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          name="normal_register"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          preserve={false}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name" },
            ]}
          >
            <Input placeholder="Your First Name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[{ required: true, message: "Please input your last name" }]}
          >
            <Input placeholder="Your Last Name" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SignupForm;
