import { useState, ChangeEvent } from 'react';
import { Button, Col, Input, Form, Row } from 'antd';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onFinish = () => {
    console.log({
      email,
      password
    });
  };


  return (
    <Form
      labelCol={{ span: 24 }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input
          size="large"
          onChange={onEmailChange}
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input
          size="large"
          type="password"
          onChange={onPasswordChange}
        />
      </Form.Item>
      <Form.Item>
        <Row justify="end">
          <Col>
            <Button
              type="primary"
              htmlType="submit"
            >
              Sign In
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  )
};
