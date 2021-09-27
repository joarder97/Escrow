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
  UserAddOutlined,
  ApiOutlined,
  EditOutlined,
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
        
              <h2 className="logo">Escrow E-Admin</h2>

              <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                  <Menu.Item key="1" icon={<UserAddOutlined />}>
                    Create Agnet
                  </Menu.Item>
                  <Menu.Item key="2" icon={<ApiOutlined />}>
                    Assign Agent
                  </Menu.Item>
                  <Menu.Item key="3" icon={<EditOutlined />}>
                    Update Order Status
                  </Menu.Item>
                 
              </Menu>

            </Sider>
    )
}