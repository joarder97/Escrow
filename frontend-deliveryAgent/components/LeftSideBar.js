import { Layout, Menu } from 'antd';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  EyeOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

export default function LeftSideBar(){
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

              <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                  <Menu.Item key="1" icon={<EyeOutlined />}>
                    Current Orders
                  </Menu.Item>
                  <Menu.Item key="2" icon={<CheckCircleOutlined />}>
                    Varify Deliveried
                  </Menu.Item>
              </Menu>

            </Sider>
    )
}