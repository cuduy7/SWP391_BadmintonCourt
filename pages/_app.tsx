import App from 'next/app';
import Head from 'next/head';
import "../app/globals.css";
import Modal from 'react-modal'
import { Inter } from 'next/font/google'
import GlobalState from '@/contexts';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ['latin'] })
class MyApp extends App {
    componentDidMount() {
        Modal.setAppElement('#__next');
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <>
                <Head>
                    <title>Vietnam Badminton Court (VBC)</title>
                    <link rel="icon" href="/images/Vector.png" />
                </Head>
                <main className={inter.className}>
                    <GlobalState>
                        <Component {...pageProps} />
                    </GlobalState>
                    <ToastContainer
                        position="top-right"
                        autoClose={4000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        rtl={false}
                    />
                </main>
            </>
        );
    }
}

export default MyApp;
