import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import store from '../store/store';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(40)
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })
  }, [])
  

  return <>
    <LoadingBar
      color='#6366F1'
      progress={progress}
      waitingTime={500}
      onLoaderFinished={() => setProgress(0)}
    />
    <ToastContainer />
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  </>
}
