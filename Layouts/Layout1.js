import React from 'react'
import Header from '@/Components/Header'


const Layout1 = ({children}) => {

  return (
    <div>
        <Header />
        <div>
        {children}
      </div>
        </div>
  )
}

export default Layout1