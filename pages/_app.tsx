import React from 'react'
import Head from 'next/head'
import type {AppProps} from 'next/app'
import '@/styles/global.css'

function App({Component, pageProps}: AppProps) {
    return <React.Fragment>
        <Head>
            <title>Zed Tourer</title>
            <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width'/>
        </Head>
        <Component {...{...pageProps}}/>
    </React.Fragment>
}

export default App