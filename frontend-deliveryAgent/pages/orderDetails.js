import { Table, Tag, Space } from 'antd';

const { Column, ColumnGroup } = Table;



export default function orderDetails() {

    let orderId = 'o1';
    let buyerId = 'b1';
    let sellerId = 's1';
    let orderDeliveryDate = '30/10/2021'; 

const _data = [
  {
    orderId: orderId,
    sellerId:sellerId,
    buyerId:buyerId,
    orderDeliveryDate:orderDeliveryDate,

  },
];

return(
        <Table dataSource={_data}>
          <Column title="Order Id" dataIndex="orderId" key="orderId" />
          <Column title="Seller Id" dataIndex="sellerId" key="sellerId" />
          <Column title="Buyer Id" dataIndex="buyerId" key="buyerId" /> 
          <Column title="Order Delivery Date" dataIndex="orderDeliveryDate" key="orderDeliveryDate" />
        </Table>
      );
}
