import {Button, Form, Input, Radio, Space} from 'antd';
import styles from '../styles/Home.module.css';
import useUser from "../lib/useUser";
import React from 'react';
import ReactDOM from 'react-dom';


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
/* eslint-enable no-template-curly-in-string */

export default function LoginPage() {




    const [value, setValue] = React.useState('buyer');
    const [v, setV] = React.useState('');

    const onChange = e => {
        console.log('radio checked', e.target.value);
        let v =  setValue(e.target.value);
        return v;
      };

      if(value || handleSubmit){
        if(value === 'buyer'){
            useUser({redirectTo: '/buyer', redirectIfFound: true});
          }else if(value === 'seller'){
            useUser({redirectTo: '/seller', redirectIfFound: true});
          }else if(value === 'ecommAdmin'){
            useUser({redirectTo: '/ecommAdmin', redirectIfFound: true});
        }else if(value === 'agent'){
            useUser({redirectTo: '/deliveryAgent', redirectIfFound: true});
        }else{
            useUser({redirectTo: '/login', redirectIfFound: true});
        }
      }

        

    const handleSubmit = async (values) => {

       let UserType = value;

        // console.log(userType);

        const {email, password} = values.user;
        const url = 'http://localhost:3000/login';
        const requestBody = {
            email: email,
            password: password,
            userType: UserType,
        };

        console.log(requestBody);

        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();


        // console.log(data.UserType);
        
        setV(data.UserType);
    };








    return (
    
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

            <Radio.Group onChange={ onChange } defaultValue= "buyer">
                <Space direction="vertical">
                    <Radio.Button value={'buyer'}>Buyer</Radio.Button>
                    <Radio.Button value={'seller'}>Seller</Radio.Button>
                    <Radio.Button value={'ecommAdmin'}>E-commerce Admin</Radio.Button>
                    <Radio.Button value={'agent'}>Delivery Agent</Radio.Button>
                </Space>
            </Radio.Group>
           
            <Form.Item wrapperCol={{...layout.wrapperCol, offset: 4}}>
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
};