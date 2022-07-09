import TopNav from "../components/TopNav";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import '../public/css/style.css';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/footer/Footer"
import {useEffect} from "react";
import Header from "../components/Header";
import {Provider} from "../context";

function MyApp({Component, pageProps}) {
    useEffect(() =>
    {
        document.body.classList.add("d-flex");
        document.body.classList.add("flex-column");
        document.body.classList.add("min-vh-100");
    });
    return (
    <Provider>
        <Header/>
        <ToastContainer position="top-center"/>
        <TopNav/>
        <Component {...pageProps}/>
        <Footer/>
    </Provider>
    )
}

export default MyApp;