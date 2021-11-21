import useUser from "../../lib/useUser";
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



export default function depositSeller(){
  useUser({redirectTo: '/login', redirectIfFound: false});
  const [state, setState] = useState('');


  async function onSubmit (values){
    console.log(values);



    var Key = "tx_"+values.seller.orderId+"_"+values.seller.name+"_"+values.seller.buyerId;

    console.log(Key);


    const url = 'http://localhost:3000/depositSeller';

    let requestBody = {
      key:Key,
      sellerId: values.seller.name,
      buyerId:values.seller.buyerId,
      orderId: values.seller.orderId,
      depositTransactionId: values.seller.accountNumber,
      depositPaymentAmount: values.seller.paymentAmount,      
    };

    console.log(requestBody);

    let response = await fetch(url, {
      method: 'POST',
      // mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
  });
    let data = await response.json();
    console.log(data);
    setState('Successfully Deposited');
};
  

  return (
    <div>
      <div>
        <LeftSideBar/>
      </div>
      <div className={styles.container}>



      <Form {...layout} name="nest-messages" onFinish={onSubmit} validateMessages={validateMessages}>
        
      <Form.Item
          name={['seller', 'orderId']}
          label="Order Id"
          rules={[
            {
              required: true,
            },
          ]}
        >

          <Input />
        </Form.Item>
        
        <Form.Item
          name={['seller', 'buyerId']}
          label="Buyer ID"
          rules={[
            {
              required: true,
            },
          ]}
        >

          <Input />
        </Form.Item>

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
          label="Acc No"
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
          label="Amount"
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
          <p>{state}</p>
      </Form>
      </div>
    </div>
  );
};

