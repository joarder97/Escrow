import useUser from "../../lib/useUser";
import "./_app";
import styles from '../../styles/Home.module.css';
import '../../styles/logo.module.css';
import LeftSideBar from '../../components/LeftSideBarBuyer.js';

export default function Home() {

  // console.log(useUser.toString());

  console.log("Hello from index");

  useUser({redirectTo: '/login', redirectIfFound: false});
  useUser({redirectTo: '/buyer', redirectIfFound: true});

  let {user} = useUser();
  if(user){
    console.log(user.Email);
  }
    // console.log(useUser.Email);
  
  return (
      <div>
        <LeftSideBar/>
        <div className={styles.container}>
          <h1>Welcome to escrow!</h1>
          <p>Email: {user.Email}</p>
        </div>
      </div>

  )
}