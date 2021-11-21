import useUser from "../lib/useUser";
import { Layout, Menu } from 'antd';
import {
  EyeOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

import {useRouter}  from 'next/router';

const { Sider } = Layout;

export default function LeftSideBar(){
  useUser({redirectTo: '/login', redirectIfFound: false});
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
        
              <h2 className="logo">Escrow Agent</h2>

              <Menu theme="dark" mode="inline">
                  <Menu.Item key="1" icon={<EyeOutlined />}>
                    Order Details
                  </Menu.Item>
                  <Menu.Item key="2" icon={<CheckCircleOutlined />} onClick={ () => router.push('/deliveryAgent/releaseFund')}>
                    Varify Deliveried
                  </Menu.Item>
                  <Menu.Item key="3" icon={<CheckCircleOutlined />} onClick={ () => router.push('/logout')}>
                    Logout
                  </Menu.Item>
              </Menu>

            </Sider>
    )
}