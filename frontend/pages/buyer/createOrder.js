import useUser from "../../lib/useUser";
import { Table, Tag, Space, Form, Layout, Input, Button } from 'antd';
import styles from '../../styles/Home.module.css';
import '../../styles/logo.module.css';
import LeftSideBar from '../../components/LeftSideBarBuyer.js';

import './index';

const { Column } = Table;

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 8,
  },
};

const validateMessages = {
  required: '${label} is required!',
};

export default function createOrder() {

  useUser({redirectTo: '/login', redirectIfFound: false});

  let {user} = useUser();

  if(user){
    console.log(user.Key);
  }




    async function onSubmit (values) {

          const url = 'http://localhost:3000/createOrder';

            let requestBody = {
              key : values.order.orderId,
              sellerId : values.order.sellerId,
              buyerId : values.order.buyerId,
              orderDeliveryDate : values.order.orderDeliveryDate,
            };

            console.log(requestBody);

          let response = await fetch(url, {
            method: 'POST',
            // mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
          },
            body: JSON.stringify(requestBody),
          });

            // console.log(response);
            let data = await response.json();
            console.log(data);
    };





// const _data = [
//   {
//     orderId: orderId,
//     sellerId:sellerId,
//     buyerId:buyerId,
//     orderDeliveryDate:orderDeliveryDate,

//   },
// ];

return(
        // <div>
        //   <div>
        //     <LeftSideBar/>
        //   </div>
        //   <div className={styles.container}>
        //   <Table dataSource={_data} onLoad={onLoad()}>
        //     <Column title="Order Id" dataIndex="orderId"  />
        //     <Column title="Seller Id" dataIndex="sellerId"  />
        //     <Column title="Buyer Id" dataIndex="buyerId"  /> 
        //     <Column title="Order Delivery Date" dataIndex="orderDeliveryDate"  />
        //   </Table>
        //   </div>
        // </div>


        <div>
        <div>
          <LeftSideBar/>
        </div>
        <div className={styles.container}>
  
        <Form {...layout} name="nest-messages" onFinish={onSubmit} validateMessages={validateMessages}>
          <Form.Item
            name={['order', 'orderId']}
            label="Order ID"
            rules={[
              {
                required: true,
              },
            ]}
          >
  
            <Input />
          </Form.Item>
          <Form.Item
            name={['order', 'buyerId']}
            label="Buyer ID"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name={['order', 'sellerId']}
            label="Seller ID"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
  
          <Form.Item
            label="Order Delivery Date (DD/MM/YY)"
            name={['order', 'orderDeliveryDate']}
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
              Submit
            </Button>
          </Form.Item>
        </Form>
        </div>
      </div>

      );
}