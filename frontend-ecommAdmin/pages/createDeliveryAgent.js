import { Input, Space } from 'antd';
import { useState } from 'react';

const { Search } = Input;

export default function createDeliveryAgent(){

  const [orderStatus, setOrderStatus] = useState('');

  const onSubmit = async (values) => {
    console.log(values);

    const url = 'http://localhost:3000/createDeliveryAgent';

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
    let displayOrderStatus = 'Agent Created '; 
    console.log(data);

    setOrderStatus(displayOrderStatus);
  };

  return (
  <Space direction="vertical">
    <Search
      name="agnetId"
      placeholder="input Agent Id"
      allowClear
      enterButton="Create"
      size="large"
      onSearch={onSubmit}
    />
  <p>{orderStatus}</p>
  </Space>
  );
};