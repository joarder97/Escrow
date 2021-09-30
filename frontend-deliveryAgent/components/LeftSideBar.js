import { Layout, Menu } from 'antd';
import {
  EyeOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

import {useRouter}  from 'next/router';

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
        
              <h2 className="logo">Escrow Agent</h2>

              <Menu theme="dark" mode="inline" onClick={ () => router.push('/orderDetails')}>
                  <Menu.Item key="1" icon={<EyeOutlined />}>
                    Order Details
                  </Menu.Item>
                  <Menu.Item key="2" icon={<CheckCircleOutlined />} onClick={ () => router.push('/releaseFund')}>
                    Varify Deliveried
                  </Menu.Item>
              </Menu>

            </Sider>
    )
}