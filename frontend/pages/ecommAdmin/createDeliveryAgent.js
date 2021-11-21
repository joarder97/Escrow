import useUser from "../../lib/useUser";
import { Input, Form, Button } from 'antd';
import { useState } from 'react';

import LeftSideBar from '../../components/LeftSideBarEcommAdmin';

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

export default function createDeliveryAgent(){
    useUser({redirectTo: '/login', redirectIfFound: false});

  const [orderStatus, setOrderStatus] = useState('');

  const handleSubmit = async (values) => {
        
    const {email, password} = values.user;
    let url = 'http://localhost:3000/createDeliveryAgent';
    let requestBody = {
        email: email,
        password: password,
    };

    let response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        withCredentials: true,
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });

    let data = await response.json();
    console.log(data);

};

  return (
    <div>

    <LeftSideBar/>

    <div className={styles.container}>
    <Form {...layout} name="nest-messages" onFinish={handleSubmit} validateMessages={validateMessages}>

        <Form.Item
            name={['user', 'email']}
            label="Email"
            rules={[{type: 'email'}]}
        >
            <Input/>
        </Form.Item>

        <Form.Item
            label="Password"
            name={['user', 'password']}
            rules={[{required: true, message: 'Please input your password!'}]}
        >
            <Input.Password/>
        </Form.Item>

        <Form.Item wrapperCol={{...layout.wrapperCol, offset: 4}}>
            <Button type="primary" htmlType="submit">
                Register
            </Button>
        </Form.Item>
        </Form>
    </div>
</div>
  );
};