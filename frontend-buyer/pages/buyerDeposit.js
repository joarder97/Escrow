import { Form, Input, Button } from 'antd';

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
  const onSubmit = async (values) => {
    console.log(values);



    const {name, accountNumber, paymentAmount} = values.buyer;

    let Key = 'b1_o1_tx1';
    let SellerId = 's1';
    let OrderId = 'o1';

    const url = 'http://localhost:3000/depositBuyer';

    let requestBody = {
      key:Key,
      buyerId:name,
      sellerId: SellerId,
      orderId: OrderId,
      depositTransactionId:accountNumber,
      depositPaymentAmount:paymentAmount,      
    };

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
    console.log(data);

    
  };
  

  return (
    <Form {...layout} name="nest-messages" onFinish={onSubmit} validateMessages={validateMessages}>
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
        label="Account Number"
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
        label="Payment Amount"
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

    </Form>
  );
};

