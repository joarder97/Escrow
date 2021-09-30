import { Input, Space } from 'antd';
import { useState } from 'react';

const { Search } = Input;

export default function releaseFund(){
  
  const [orderStatus, setOrderStatus] = useState('');

  const onSubmit = async (values) => {
    console.log(values);

    const url = 'http://localhost:3000/releaseFund';

    let key = 'o1';
    let depositTransactionId = 'b1_o1_tx1';

    let requestBody = {
      key:key,
      depositTransactionId:depositTransactionId,
      fundReleaseKey:values
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
  <Space direction="vertical">
    <Search
      name="releaseFund"
      placeholder="input Confirmation Key"
      allowClear
      enterButton="Confirm"
      size="large"
      onSearch={onSubmit}
    />
  <p>{orderStatus}</p>
  </Space>
  );
};