import useUser from "../../lib/useUser";
import { Input, Space } from 'antd';
import { useState } from 'react';

import styles from '../../styles/Home.module.css';
import '../../styles/logo.module.css';
import LeftSideBar from '../../components/LeftSideBarBuyer.js';

import './index';

const { Search } = Input;

export default function trackOrder(){

  useUser({redirectTo: '/login', redirectIfFound: false});
  
  const [orderStatus, setOrderStatus] = useState('');

  const onSubmit = async (values) => {
    console.log(values);

    const url = 'http://localhost:3000/getOrderStatus';

    let requestBody = {
      key:values,
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
    let displayOrderStatus = 'Your Order Status is: ' + data; 
    console.log(data);

    setOrderStatus(displayOrderStatus);
  };

  return (
  <div>
    <div>
      <LeftSideBar />
    </div>
    <div className={styles.container}> 
      <Space direction="vertical">
          <Search
            name="trackOrderId"
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSubmit}
          />
        <p>{orderStatus}</p>
      </Space>

    </div>
  </div>
  );
};