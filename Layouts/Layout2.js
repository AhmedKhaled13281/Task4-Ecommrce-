import React from 'react'
import Header from '@/Components/Header'
import { useSession , getSession} from 'next-auth/react';
import { useRouter } from 'next/router';
const Layout2 = ({children}) => {
  const router = useRouter()
  const session = useSession()

  return (
    <>
  {session?.data ? (      <div>
      <Header />
      <div>
        {children}
      </div>
    </div>) : router.push("/")}
    </>
  );
}

export default Layout2

