import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Col, Input, Form, Row } from 'antd';

export const LoginForm = () => {
  const onFinish = () => {
    console.log('whomp');
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
        <Input size="large" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input size="large" />
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
