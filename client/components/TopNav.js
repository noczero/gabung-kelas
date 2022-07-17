import {useState, useEffect, useContext} from "react";
import {Menu, Layout, Avatar} from "antd";
import Link from "next/link";
import {AppstoreAddOutlined, CoffeeOutlined, LoginOutlined, LogoutOutlined, UserAddOutlined,UserOutlined} from "@ant-design/icons";
import {Context} from "../context";
import axios from "axios";
import nextConfig from "../next.config.mjs";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

import logo from "../public/assets/icon/gabung-kelas/with-text/SVG/Asset 5.svg"
import Image from "next/image";

const {Item, SubMenu} = Menu;
const {Header} = Layout;

let items = [
    // add loginShow key for dynamic nav before login or after login
    {
        label: (
            <Link href="/#">
                <a style={{ paddingLeft:'100px'}}/>
            </Link>
        ),
        key: '/',
        icon: (
             <Image
                 className="p-1"
                    src={logo}
                    alt="Logo Gabung Kelas"
                    layout='fill'
                />
        ),
        afterloginshow: 'always'
    }, // remember to pass the key prop
    {
        label: (
            <Link href="/login">
                <a>Masuk</a>
            </Link>
        ),
        key: '/login',
        icon: <LoginOutlined/>,
        afterloginshow: 'no'
    }, // which is required
    {
        label: (
            <Link href="/register">
                <a>Daftar</a>
            </Link>
        ),
        key: '/register',
        icon: <UserAddOutlined/>,
        afterloginshow: 'no'
    }, // which is required
    {
        label: 'User',
        key: '/userMenu',
        icon:  <Avatar
            src="https://joeschmoe.io/api/v1/random"
            size={40}
            style={{ verticalAlign: "middle" }}
            icon={<UserOutlined />}
          />,
        className: 'float-right',
        afterloginshow: 'yes',
        style: {marginLeft: 'auto'},
        children: [
            {
                label: (
                    <Link href="/user">
                        <a>Dashboard</a>
                    </Link>
                ),
                key: '/user'
            },
            {
                label: 'Keluar',
                key: '/logout',
            }

        ],
    },
];

const TopNav = () => {
    const [current, setCurrent] = useState("");

    const handleClick = (e) => {
        if (e.key === '/logout') {
            // handle logout
            logout().then(r => {
            })
        } else {
            setCurrent(e.key)
        }
    }


    // use context
    const {state, dispatch} = useContext(Context);

    const {user} = state;

    const router = useRouter();

    const logout = async () => {
        dispatch({type: 'LOGOUT'});

        // remove local storage
        window.localStorage.removeItem("user");

        const {data} = await axios.get(`${nextConfig.app.apiPrefix}/logout`);
        toast(data.message);
        await router.push("/login");
    }

    // keep selected menu select
    let isClient, itemConditional;

    // navigation conditional
    if (user === null) {
        // not login
        itemConditional = items.filter((item) => {
            // search for login show false or login show null
            return item.afterloginshow === 'no' || item.afterloginshow === 'always';
        })
    } else {
        // already login
        itemConditional = items.filter((item) => {
            return item.afterloginshow === 'yes' || item.afterloginshow === 'always';
        })

        // update profile label
        const findProfileIdx = itemConditional.findIndex(item => item.key === '/userMenu');

        itemConditional[findProfileIdx].label = user.fullName // set label
    }

    useEffect(() => {
        let isClient = (typeof window !== 'undefined');
        isClient && setCurrent(window.location.pathname);
    }, [isClient && window.location.pathname]);


    return (
        <Header className="site-layout-background" style={{ padding: 0 ,  position: 'fixed', zIndex: 1, width: '100%' }}>
            <Menu  theme="light" mode="horizontal" items={itemConditional} onClick={handleClick} selectedKeys={[current]}/>
        </Header>
    )
}
export default TopNav;