import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
    const route = ['/register', '/login', '/reset-password', '/'];
    const adminRoute = [
        '/admin',
        '/admin/all-users',
        '/admin/add-products',
        '/admin/all-products',
        '/admin/orders',
        `/admin/[id]`,
    ];
    if (route.includes(appProps.router.pathname)) {
        return (
            <>
                <Provider store={store}>
                    <ToastContainer
                        autoClose={1000}
                        position='top-center'
                        theme='colored'
                    />
                    <Component {...pageProps} />
                </Provider>
            </>
        );
    }
    if (adminRoute.includes(appProps.router.pathname)) {
        return (
            <>
                <Provider store={store}>
                    <ToastContainer
                        autoClose={1000}
                        position='top-center'
                        theme='colored'
                    />
                    <Layout admin>
                        <Component {...pageProps} />
                    </Layout>
                </Provider>
            </>
        );
    }
    return (
        <>
            <Provider store={store}>
                <ToastContainer
                    autoClose={1000}
                    position='top-center'
                    theme='colored'
                />
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        </>
    );
}

export default MyApp;
