// import styles from '../styles/Home.module.css'

// export default function TrackOrder() {
//   return (
//     <div className={styles.container}>
//       track order..
//     </div>
//   )
// }

//////

import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

const onSearch = value => console.log(value);

export default function TrackOrder(){
  return( <Space direction="vertical">
  <Search
    placeholder="input search text"
    allowClear
    enterButton="Search"
    size="large"
    onSearch={onSearch}
  />
  </Space>);
};