import 'antd/dist/antd.css';
import '../styles/globals.css';

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


import LeftSideBar from '../components/LeftSideBar';

const { Header, Content, Footer } = Layout;



const onSearch = value => console.log(value);


function MyApp({ Component, pageProps }) {
  return(  
          <Layout>
            <LeftSideBar/>

            <Layout 
               style={{
                position:'relative',
                left:'500px',
                top:'100px',
               
              
              }}
            >
              <Space>
                <Search
                  placeholder="input Order Id"
                  allowClear
                  enterButton="track"
                  size="large"
                  onSearch={onSearch}
                />
              </Space>
            </Layout>

            {/* <Layout className="site-layout" style={{ 
              marginLeft: 200,  
              position:'relative',
                
                top:'400px',
              }}>
              <Header className="site-layout-background" style={{ padding: 0 }} />
              <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
                    ...
                  <br />
                  <Component {...pageProps} />
                  </div>
              </Content>
              <Footer style={{ 
                textAlign: 'center',
                }}>

                Escrow ©2021
              </Footer>
            </Layout> */}
          </Layout>
  )
}

export default MyApp


//////

// npm run dev -- -p 3001