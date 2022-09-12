// `pages/_app.js`

// Global css can only be imported here
import '../styles/global.css';

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}