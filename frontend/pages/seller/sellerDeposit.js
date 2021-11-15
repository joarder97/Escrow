import { Form, Input, Button } from 'antd';
import { useState } from 'react';
import LeftSideBar from '../../components/LeftSideBarSeller.js';

import styles from '../../styles/Home.module.css';
import '../../styles/logo.module.css';

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
/* eslint-enable no-template-curly-in-string */

export default function sellerDeposit(){
  const onSubmit = async (values) => {
    console.log(values);



    const {name, accountNumber, paymentAmount} = values.seller;

    let Key = 's1_o1_tx1';
    let buyerId = 'b1';
    let OrderId = 'o1';

    const url = 'http://localhost:3000/depositSeller';

    let requestBody = {
      key:Key,
      sellerId: name,
      buyerId:buyerId,
      orderId: OrderId,
      depositTransactionId:accountNumber,
      depositPaymentAmount:paymentAmount,
    };

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

    console.log(response);

    let data = await response.json();
    console.log(data);

    
};
  

  return (

    <div>

      <div>
        <LeftSideBar/>
      </div>

      <div className={styles.container}>
      <div>
          <Form {...layout} name="nest-messages" onFinish={onSubmit} validateMessages={validateMessages}>
          <Form.Item
            name={['seller', 'name']}
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >

            <Input />
          </Form.Item>
          <Form.Item
            name={['seller', 'accountNumber']}
            label="Account Number"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name={['seller', 'paymentAmount']}
            label="Payment Amount"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="PIN"
            name="['seller', 'password']"
            rules={[{ required: true, message: 'Please input your PIN!' }]}
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
    </div>

    
  );
};

