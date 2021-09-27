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
  DollarCircleFilled,
  CompassOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
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
        
              <h2 className="logo">Escrow</h2>

              <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                  <Menu.Item key="1" icon={<DollarCircleFilled />}>
                    Make Deposit
                  </Menu.Item>
                  <Menu.Item key="2" icon={<CompassOutlined />}>
                    Track Order
                  </Menu.Item>
                  <Menu.Item key="3" icon={<CloseCircleOutlined />}>
                    Cancel Order
                  </Menu.Item>
                  <Menu.Item key="4" icon={<ExclamationCircleOutlined />}>
                    Claim Dispute
                  </Menu.Item>
              </Menu>

            </Sider>
    )
}