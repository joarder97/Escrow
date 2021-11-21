import useUser from "../../lib/useUser";
import { Input, Form, Button } from 'antd';
import { useState } from 'react';

import LeftSideBar from '../../components/LeftSideBarSeller';

import styles from '../../styles/Home.module.css';
import '../../styles/logo.module.css';
import './index';


const { Search } = Input;

const layout = {
  labelCol: {
      span: 4,
  },
  wrapperCol: {
      span: 12,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} is required!',
  types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
  },
  number: {
      range: '${label} must be between ${min} and ${max}',
  },
};

export default function updateOrderStatus(){

  useUser({redirectTo: '/login', redirectIfFound: false});
  
  const [orderStatus, setOrderStatus] = useState('');

  const handleSubmit = async (values) => {
    // console.log(values);
    // const { orderId, newOrderStatus } = values;
    const url = 'http://localhost:3000/updateOrderStatus';

    let requestBody = {
      key:values.status.orderId,
      newOrderStatus:values.status.newStatus,
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
    let displayOrderStatus = 'Order Updated '; 
    console.log(data);

    setOrderStatus(displayOrderStatus);
  };

  return (
    <div>
      <div>
        <LeftSideBar />
      </div>
      <div className={styles.container}>
      <Form {...layout} name="nest-messages" onFinish={handleSubmit} validateMessages={validateMessages}>

        <Form.Item
            name={['status', 'orderId']}
            label="Order ID"
            rules={[{required: true, message: 'Please input order id!'}]}
        >
            <Input/>
        </Form.Item>

        <Form.Item
            label="New order Status"
            name={['status', 'newStatus']}
            rules={[{required: true, message: 'Please input new order status!'}]}
        >
           <Input />
        </Form.Item>

        <Form.Item wrapperCol={{...layout.wrapperCol, offset: 4}}>
            <Button type="primary" htmlType="submit">
                Update
            </Button>
        </Form.Item>
        </Form>
      <p>{orderStatus}</p>
      </div>
    </div>

  );
};