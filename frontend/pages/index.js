import {useRouter}  from 'next/router';


export default function Home() {
    const router = useRouter();

    return (
      <div>
      <div>
        Welcome to Escrow!
      </div>
      <button onClick={ () => router.push('/registerBuyer')}>Register</button>
      <button onClick={ () => router.push('/login')}>Sign In</button>
      </div>
  
    )
  }
  