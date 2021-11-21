import useUser from "../../lib/useUser";
import { Layout } from 'antd';
import MyApp from './_app.js';
import styles from '../../styles/Home.module.css';
import '../../styles/logo.module.css';
import LeftSideBar from '../../components/LeftSideBarDeliveryAgent';

export default function Home() {

  useUser({redirectTo: '/login', redirectIfFound: false});
  useUser({redirectTo: '/deliveryAgent', redirectIfFound: true});

  let {user} = useUser();
  if(user){
    console.log(user.Email);
  }else{
    user = {};
  }

  return (
    <div>
      <LeftSideBar />
      <div className={styles.container}>
      Welcome to Escrow!
      <p>Email: {user.Email}</p>
      </div>
    </div>

  )
}
