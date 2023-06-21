import React , {useEffect} from 'react'
import '@/styles/globals.css'
import Layout1 from '@/Layouts/Layout1'
import Layout2 from '@/Layouts/Layout2'
import { SessionProvider } from "next-auth/react"
import { Provider } from 'react-redux'
import { store } from '@/Store'
import NotFound from './404'

export default function App({ Component, pageProps }) {
  let layouts = {
    'L1' : Layout1,
    'L2' : Layout2
  }
  let Wrapper = layouts[Component.layout] 

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </Provider>
    </SessionProvider>
  );
}