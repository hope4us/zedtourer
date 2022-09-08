import Document, {Head, Html, Main, NextScript} from 'next/document'

export default class Doc extends Document {
    render() {
        const meta = {
            title: 'Zed Tourer',
            description: 'Zed Tourer',
            image: 'https://assets.zedtourer.co.zm/logo.png'
        }

        return <Html lang='en'>
            <Head>
                <meta name='robots' content='follow, index'/>
                <meta name='description' content={meta.description}/>
                <meta property='og:site_name' content={meta.title}/>
                <meta property='og:description' content={meta.description}/>
                <meta property='og:title' content={meta.title}/>
                <meta property='og:image' content={meta.image}/>
                <meta name='twitter:card' content='summary_large_image'/>
                <meta name='twitter:site' content='@zedtourer'/>
                <meta name='twitter:title' content={meta.title}/>
                <meta name='twitter:description' content={meta.description}/>
                <meta name='twitter:image' content={meta.image}/>

                <link rel='apple-touch-icon' sizes='180x180' href={'/apple-touch-icon.png'}/>
                <link rel='icon' type='image/png' sizes='32x32' href={'/favicon-32x32.png'}/>
                <link rel='icon' type='image/png' sizes='16x16' href={'/favicon-16x16.png'}/>
                <link rel='manifest' href={'/manifest.json'}/>
                <link rel='mask-icon' href={'/safari-pinned-tab.svg'} color='#5bbad5'/>
                <meta name='msapplication-TileColor' content='#da532c'/>
                <meta name='theme-color' content='#ffffff'/>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    }
}