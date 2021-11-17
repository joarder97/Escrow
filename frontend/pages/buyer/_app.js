import 'antd/dist/antd.css';
import '../../styles/logo.module.css';

import { Layout,Input, Space } from 'antd';

import LeftSideBar from '../../components/LeftSideBarBuyer';
import { SessionProvider } from 'next-auth/react';
import session from 'express-session';

// import {PageContextProvider} from "../lib/usePageContext";

const { Search } = Input;
const { Content, Footer } = Layout;

// import '../../styles/globals.css';

function MyAppBuyer({ Component, pageProps }) {
  console.log("Hello from app");
  return(  
      <SessionProvider session={session}>
            <div>
              <div>
                <LeftSideBar/>  
              <div> 
                <Layout>
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
              </div>
            </div>
          </div>
        </SessionProvider>
  )
}

export default MyAppBuyer;

//////

// npm run dev -- -p 3001



