import useUser from "../../lib/useUser";
import { Form, Input, Button } from 'antd';
import { useState } from 'react';
import LeftSideBar from '../../components/LeftSideBarBuyer.js';

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



export default function depositBuyer(){
  useUser({redirectTo: '/login', redirectIfFound: false});
  const [releaseKey, setReleaseKey] = useState('');


  async function onSubmit (values){
    console.log(values);



    var Key = "tx_"+values.buyer.orderId+"_"+values.buyer.name+"_"+values.buyer.sellerId;

    console.log(Key);


    const url = 'http://localhost:3000/depositBuyer';

    let requestBody = {
      key:Key,
      buyerId:values.buyer.name,
      sellerId: values.buyer.sellerId,
      orderId: values.buyer.orderId,
      depositTransactionId: values.buyer.accountNumber,
      depositPaymentAmount: values.buyer.paymentAmount,      
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
    let displayReleaseKey = data;
    console.log(data);
    setReleaseKey('Release Key: ' + displayReleaseKey.FundReleaseKey);
};
  

  return (
    <div>
      <div>
        <LeftSideBar/>
      </div>
      <div className={styles.container}>



      <Form {...layout} name="nest-messages" onFinish={onSubmit} validateMessages={validateMessages}>
        
      <Form.Item
          name={['buyer', 'orderId']}
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
          name={['buyer', 'sellerId']}
          label="Seller ID"
          rules={[
            {
              required: true,
            },
          ]}
        >

          <Input />
        </Form.Item>

        <Form.Item
          name={['buyer', 'name']}
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
          name={['buyer', 'accountNumber']}
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
          name={['buyer', 'paymentAmount']}
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
          name="['buyer', 'password']"
          rules={[{ required: true, message: 'Please input your PIN!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
          <p>{releaseKey}</p>
      </Form>
      </div>
    </div>
  );
};

