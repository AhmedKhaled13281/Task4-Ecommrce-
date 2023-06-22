import React , {useEffect, useState} from 'react'
import Header from '@/Components/Header'
import { getSession} from 'next-auth/react';
import { useRouter } from 'next/router';
const Layout2 = ({children}) => {
  const router = useRouter()
  const [loading , setLoading] = useState(true)

  useEffect(() => {
    const secure = async () => {
      const session = await getSession()
      console.log(session)
      if(!session){
        router.push("/")
      }else {
        setLoading(false)
      }
    }
    secure()
  } ,[router])

  return (
    <>
      {loading ? (<h1>Loading ...</h1>) : (     <div>
      <Header />
      <div>
        {children}
      </div>
    </div>)}
    </>
  );
}

export default Layout2

