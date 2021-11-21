import useUser from "../../lib/useUser";
import { Layout } from 'antd';
import MyApp from './_app.js';
import styles from '../../styles/Home.module.css';
import '../../styles/logo.module.css';
import LeftSideBar from '../../components/LeftSideBarEcommAdmin';

export default function Home() {

  useUser({redirectTo: '/login', redirectIfFound: false});
  useUser({redirectTo: '/ecommAdmin', redirectIfFound: true});


  return (
    <div>
      <LeftSideBar />
      <div className={styles.container}>
        Welcome to Escrow!
      </div>
    </div>

  )
}
