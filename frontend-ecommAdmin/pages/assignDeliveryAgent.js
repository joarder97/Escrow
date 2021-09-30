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

export default function assignDeliveryAgent(){
  const onSubmit = async (values) => {
    console.log(values);



    const {key, orderId} = values.assignAgent;

    const url = 'http://localhost:3000/assignDeliveryAgent'; 

    let requestBody = {
      key:key,
      orderId:orderId,   
    };

    console.log(requestBody);

    let response = await fetch(url, {
      method: 'POST',
    //   mode: 'cors',
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
        name={['assignAgent', 'key']}
        label="Agent Id"
        rules={[
          {
            required: true,
          },
        ]}
      >

        <Input />
      </Form.Item>
      <Form.Item
        name={['assignAgent', 'orderId']}
        label="Order Id"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
        <Button type="primary" htmlType="submit">
          Assign
        </Button>
      </Form.Item>
    </Form>
  );
};

