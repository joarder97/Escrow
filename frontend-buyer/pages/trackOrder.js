import { Input, Space } from 'antd';
import { useState } from 'react';

const { Search } = Input;

export default function trackOrder(){
  
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
  );
};