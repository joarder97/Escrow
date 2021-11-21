import useUser from "../../lib/useUser";
import { Input, Space, Form, Button } from 'antd';
import { useState } from 'react';

import LeftSideBar from '../../components/LeftSideBarDeliveryAgent';

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

export default function releaseFund(){

  useUser({redirectTo: '/login', redirectIfFound: false});
  


  const handleSubmit = async (values) => {

    

    const url = 'http://localhost:3000/releaseFund';


    let requestBody = {
      key:values.fund.orderId,
      depositTransactionId:values.fund.depositTransactionId,
      fundReleaseKey:values.fund.fundReleaseKey,
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
    let displayOrderStatus = 'Fund Released. '; 
    console.log(data);

    setOrderStatus(displayOrderStatus);
  };

  return (
    <div>
      <div><LeftSideBar/></div>
      <div className={styles.container}>
    <Form {...layout} name="nest-messages" onFinish={handleSubmit}>

        <Form.Item
            name={['fund', 'orderId']}
            label="Order Id"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name={['fund', 'depositTransactionId']}
            label="Deposit Transaction Id"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            label="Release Fund"
            name={['fund', 'fundReleaseKey']}
        >
            <Input.Password/>
        </Form.Item>

        <Form.Item wrapperCol={{...layout.wrapperCol, offset: 4}}>
            <Button type="primary" htmlType="submit">
                Release Fund
            </Button>
        </Form.Item>
        </Form>
    </div>
    </div>


  );
};