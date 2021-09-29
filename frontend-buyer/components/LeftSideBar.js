import { Layout, Menu } from 'antd';
import {
  DollarCircleFilled,
  CompassOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
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
        
              <h2 className="logo">Escrow</h2>

              <Menu theme="dark" mode="inline">
                  <Menu.Item key="1" icon={<PlusCircleOutlined />} onClick={ () => router.push('/createOrder')}>
                    Create Order
                  </Menu.Item>
                  <Menu.Item key="2" icon={<DollarCircleFilled />} onClick={ () => router.push('/buyerDeposit')}>
                    Make Deposit
                  </Menu.Item>
                  <Menu.Item key="3" icon={<CompassOutlined />} onClick={ () => router.push('/trackOrder')}>
                    Track Order
                  </Menu.Item>
                  <Menu.Item key="4" icon={<CloseCircleOutlined />} onClick={ () => router.push('/cancelOrder')}>
                    Cancel Order
                  </Menu.Item>
                  <Menu.Item key="5" icon={<ExclamationCircleOutlined />}>
                    Claim Dispute
                  </Menu.Item>
              </Menu>

            </Sider>
    )
}