import useUser from "../../lib/useUser";
import { Alert, Button, Space, Form, Input } from 'antd';
import { useState } from 'react';
import styles from '../../styles/Home.module.css';
import '../../styles/logo.module.css';
import LeftSideBar from '../../components/LeftSideBarBuyer.js';

import './index';

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 8,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} is required!',
};


export default function cancelOrder() {

  useUser({redirectTo: '/login', redirectIfFound: false});

  const [orderStatus, setOrderStatus] = useState('');

  const onSubmit = async (values) => {

    console.log(values);

    const url = 'http://localhost:3000/cancelOrder';

    let requestBody = {
      key:values.order.orderId,
    };
    console.log(requestBody);
    let response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
  });
    let data = await response.json();
    let displayOrderStatus = data;
    console.log(data);

    setOrderStatus('Order Cancelled');
};

  return (

    <div>
      <div>
        <LeftSideBar />
      </div>
      <div className={styles.container}> 
      <Form {...layout} name="nest-messages" onFinish={onSubmit} validateMessages={validateMessages}>
        
          
          <Form.Item
            name={['order', 'orderId']}
            label="Order ID"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
  
          <Form.Item
            label="Order Release Key"
            name="['order', 'orderReleaseKey']"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
  
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

      </div>
      </div>
  )
}