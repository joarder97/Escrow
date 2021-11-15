import { Layout } from 'antd';
import MyApp from './_app.js';
import styles from '../../styles/Home.module.css';
import '../../styles/logo.module.css';
import LeftSideBar from '../../components/LeftSideBarDeliveryAgent';

export default function Home() {
  return (
    <div>
      <LeftSideBar />
      <div className={styles.container}>
      Welcome to Escrow!
      </div>
    </div>

  )
}
