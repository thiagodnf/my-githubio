import dynamic from "next/dynamic";

import "bootstrap/dist/css/bootstrap.css";
import "academicons/css/academicons.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "../../public/css/style.scss";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {

    dynamic(() => import("bootstrap/dist/js/bootstrap.bundle"), {
        ssr: false,
    });

    return <Component {...pageProps} />;
}
