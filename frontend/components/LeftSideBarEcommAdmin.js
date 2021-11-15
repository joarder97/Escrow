import { Layout, Menu } from 'antd';
import {useRouter}  from 'next/router';

import {
  UserAddOutlined,
  ApiOutlined,
  EditOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

export default function LeftSideBar(){
    const router = useRouter();
    return(
            <Sider
              style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left:0,
              }}
            >
        
              <h2 className="logo">Escrow E-Admin</h2>

              <Menu theme="dark" mode="inline">
                  <Menu.Item key="1" icon={<UserAddOutlined />} onClick={ () => router.push('/ecommAdmin/createDeliveryAgent')}>
                    Create Agnet
                  </Menu.Item>
                  <Menu.Item key="2" icon={<ApiOutlined />} onClick={ () => router.push('/ecommAdmin/assignDeliveryAgent')}>
                    Assign Agent
                  </Menu.Item>
                  <Menu.Item key="3" icon={<EditOutlined />} onClick={ () => router.push('/ecommAdmin/updateOrderStatus')}>
                    Update Order Status
                  </Menu.Item>
                 
              </Menu>

            </Sider>
    )
}