

import { Table, Tag, Space } from 'antd';

const { Column, ColumnGroup } = Table;



export default function createOrder() {

    let orderId = 'o1';
    let buyerId = 'b1';
    let sellerId = 's1';
    let orderDeliveryDate = '30/10/2021'; 

    async function onLoad () {

        try{
            const url = 'http://localhost:3000/createOrder';

            let requestBody = {
            key : orderId,
            sellerId : sellerId,
            buyerId : buyerId,
            orderDeliveryDate : orderDeliveryDate,
            
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
            console.log(data);
        }
        catch(err){
            console.log('error!!!');
        }
        
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
        <Table dataSource={_data} onLoad={onLoad()}>
          <Column title="Order Id" dataIndex="orderId" key="orderId" />
          <Column title="Seller Id" dataIndex="sellerId" key="sellerId" />
          <Column title="Buyer Id" dataIndex="buyerId" key="buyerId" /> 
          <Column title="Order Delivery Date" dataIndex="orderDeliveryDate" key="orderDeliveryDate" />
        </Table>
      );
}
