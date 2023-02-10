import { ConfigProvider } from 'antd';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '../theme/global-styles';
import theme from '../theme/index';

export default function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme}>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
                />
                <meta name="description" content="Description" />
                <meta name="keywords" content="Keywords" />
                <title>Enkaz Dinleme Uygulaması</title>

                <link rel="manifest" href="/manifest.json" />
                <link
                    href="/icons/favicon-16x16.png"
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                />
                <link
                    href="/icons/favicon-32x32.png"
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                />
                <link rel="apple-touch-icon" href="/apple-icon.png" />
                <meta name="theme-color" content="#317EFB" />
            </Head>
            <GlobalStyle />
            <ConfigProvider
                theme={{
                    components: {
                        Slider: {
                            handleSizeHover: '20px',
                            handleSize: '20px',
                            railSize: '20px',
                            dotSize: '20px',
                        },
                    },
                }}>
                <Component {...pageProps} />
            </ConfigProvider>
        </ThemeProvider>
    );
}
