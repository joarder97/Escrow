import { Table, Tag, Space } from 'antd';
import styles from '../../styles/Home.module.css';
import '../../styles/logo.module.css';
import LeftSideBar from '../../components/LeftSideBarBuyer.js';

import './index';

const { Column } = Table;



export default function createOrder() {

    let orderId = 'o1';
    let buyerId = 'b1';
    let sellerId = 's1';
    let orderDeliveryDate = '30/10/2021'; 

    async function onLoad () {

          const url = 'http://localhost:3000/createOrder';

            let requestBody = {
              key : orderId,
              sellerId : sellerId,
              buyerId : buyerId,
              orderDeliveryDate : orderDeliveryDate,
            };

            // console.log(requestBody);

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





const _data = [
  {
    orderId: orderId,
    sellerId:sellerId,
    buyerId:buyerId,
    orderDeliveryDate:orderDeliveryDate,

  },
];

return(
        <div>
          <div>
            <LeftSideBar/>
          </div>
          <div className={styles.container}>
          <Table dataSource={_data} onLoad={onLoad()}>
            <Column title="Order Id" dataIndex="orderId"  />
            <Column title="Seller Id" dataIndex="sellerId"  />
            <Column title="Buyer Id" dataIndex="buyerId"  /> 
            <Column title="Order Delivery Date" dataIndex="orderDeliveryDate"  />
          </Table>
          </div>
        </div>

      );
}