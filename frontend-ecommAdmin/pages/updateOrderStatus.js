import { Input, Space } from 'antd';
import { useState } from 'react';

const { Search } = Input;

export default function updateOrderStatus(){
  
  const [orderStatus, setOrderStatus] = useState('');

  const onSubmit = async (values) => {
    console.log(values);
    let key = 'o1';

    const url = 'http://localhost:3000/updateOrderStatus';

    let requestBody = {
      key:key,
      newOrderStatus:values,
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
  <Space direction="vertical">
    <Search
      name="trackOrderId"
      placeholder="Input New Order Status"
      allowClear
      enterButton="Update Status"
      size="large"
      onSearch={onSubmit}
    />
  <p>{orderStatus}</p>
  </Space>
  );
};