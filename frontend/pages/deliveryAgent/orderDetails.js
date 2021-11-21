// import useUser from "../../lib/useUser";
// import { Table, Tag, Space } from 'antd';

// import LeftSideBar from '../../components/LeftSideBarDeliveryAgent';

// import styles from '../../styles/Home.module.css';
// import '../../styles/logo.module.css';  
// import './index';


// const { Column, ColumnGroup } = Table;



// async function orderDetails() {

//   useUser({redirectTo: '/login', redirectIfFound: false});

//   const url = 'http://localhost:3000/orderDetails';

//     let requestBody = {
//       key:Key
//     };

//     console.log(requestBody);

//     let response = await fetch(url, {
//       method: 'POST',
//       // mode: 'cors',
//       cache: 'no-cache',
//       credentials: 'same-origin',
//       headers: {
//           'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(requestBody),
        
//   });
//   let data = await response.json();
//   console.log(data);


// return(
//     <div>
//       <div><LeftSideBar/></div>
//       <div className={styles.container}>
//       <Table dataSource={_data}>

//         </Table>
//       </div>
//     </div>

//       );

// };

// export default orderDetails;