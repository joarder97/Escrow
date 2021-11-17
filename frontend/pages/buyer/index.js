import session from 'express-session';
import MyApp from './_app.js';
import styles from '../../styles/Home.module.css';
// import '../../styles/logo.module.css';
import {useRouter}  from 'next/router';
import LeftSideBar from '../../components/LeftSideBarBuyer.js';

export default function Home() {

  console.log(session);

   
  return (
    <div>
      <LeftSideBar />
      <div className={styles.container}>
        Welcome to Escrow!
      </div>
    </div>

  )
}


