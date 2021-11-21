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
  EditOutlined,
  CloseCircleOutlined,
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
        
              <h2 className="logo">Escrow Seller</h2>

              <Menu theme="dark" mode="inline">
                  <Menu.Item key="1" icon={<DollarCircleFilled />} onClick={ () => router.push('/seller/sellerDeposit') }>
                    Deposit
                  </Menu.Item>
                  <Menu.Item key="2" icon={<EditOutlined />} onClick={ () => router.push('/seller/updateOrderStatus') }>
                    Update Order Status
                  </Menu.Item>
                  <Menu.Item key="3" icon={<CloseCircleOutlined />} onClick={ () => router.push('/seller/cancelOrder') }>
                    Cancel Order
                  </Menu.Item>
                  <Menu.Item key="4" icon={<CloseCircleOutlined />} onClick={ () => router.push('/logout') }>
                    Logout
                  </Menu.Item>
              </Menu>

            </Sider>
    )
}