import TopNav from "../components/TopNav";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import '../public/css/style.css';
import {Flip, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/footer/Footer"
import {useEffect} from "react";
import AppHeader from "../components/Header";
import {Provider} from "../context";
import {Layout} from "antd";


function MyApp({Component, pageProps}) {
    const {Header, Content, Sider} = Layout;
    useEffect(() => {
        document.body.classList.add("d-flex");
        document.body.classList.add("flex-column");
        document.body.classList.add("min-vh-100");
    });
    return (
        <Provider>
            <AppHeader/>
            <Layout>
                <ToastContainer position="top-center" limit={1} autoClose={1000} transition={Flip}/>
                <TopNav/>
                <Content className="site-layout" style={{padding: '0 50px', marginTop: 64}}>
                    <div className="site-layout-background" style={{padding: 24, minHeight: 500}}>
                        <Component {...pageProps}/>
                    </div>
                </Content>
                <Footer/>
            </Layout>
        </Provider>
    )
}

export default MyApp;