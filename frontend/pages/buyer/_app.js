// import useUser from "../../lib/useUser";
import 'antd/dist/antd.css';
import '../../styles/logo.module.css';

import { Layout,Input, Space } from 'antd';
// import LeftSideBar from "../../components/LeftSideBarBuyer";






const { Search } = Input;
const { Content, Footer } = Layout;

// import '../../styles/globals.css';

function MyApp({ Component, pageProps }) {

  console.log("Hello from app");
  // console.log(useUser);

  // useUser({redirectTo: '/login', redirectIfFound: false});

  return(  

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


  )
}

export default MyApp;

//////

// npm run dev -- -p 3001



