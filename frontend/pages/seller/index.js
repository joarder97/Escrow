import useUser from "../../lib/useUser";
import './_app';
import styles from '../../styles/Home.module.css';
import '../../styles/logo.module.css';
import LeftSideBar from '../../components/LeftSideBarSeller.js';

export default function Home() {

  useUser({redirectTo: '/login', redirectIfFound: false});
  useUser({redirectTo: '/seller', redirectIfFound: true});

  let {user} = useUser();
  if(user){
    console.log(user.Email);
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
