import 'antd/dist/antd.css';
import '../../styles/logo.module.css';

import { Layout,Input, Space } from 'antd';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';


const { Search } = Input;


import LeftSideBar from '../../components/LeftSideBarDeliveryAgent';

const { Header, Content, Footer } = Layout;



const onSearch = value => console.log(value);


function MyApp({ Component, pageProps }) {
  return(  
          <Layout>
            <LeftSideBar/>


            <Layout className="site-layout" style={{ 
              marginLeft: 200,  
              position:'relative',
                
              top:'40px',
              }}>
              {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
              <Content style={{ overflow: 'initial' }}>
                <div className="site-layout-background" style={{ padding: 0}}>

                  <Component {...pageProps} />
                  </div>
              </Content>
              <Footer style={{ 
                textAlign: 'center',
                }}>

                Escrow ©2021
              </Footer>
            </Layout>
          </Layout>
  )
}

export default MyApp


//////

// npm run dev -- -p 3001