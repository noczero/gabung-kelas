import {useState, useEffect, useContext} from "react";
import {Menu} from "antd";
import Link from "next/link";
import {AppstoreAddOutlined, CoffeeOutlined, LoginOutlined, LogoutOutlined, UserAddOutlined} from "@ant-design/icons";
import {Context} from "../context";
import axios from "axios";
import nextConfig from "../next.config.mjs";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

const {Item, SubMenu} = Menu;

let items = [
    // add loginShow key for dynamic nav before login or after login
    {
        label: (
            <Link href="/#">
                <a>Gabung Kelas</a>
            </Link>
        ),
        key: '/',
        icon: <AppstoreAddOutlined/>,
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
        key: '/user',
        icon: <CoffeeOutlined/>,
        className: 'float-right',
        afterloginshow: 'yes',
        style:{ marginLeft: 'auto' } ,
        children: [
            {
              label: 'Profile',
              key : '/settings'
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
        const findProfileIdx = itemConditional.findIndex(item => item.key ==='/user');

        itemConditional[findProfileIdx].label = user.fullName // set label
    }

    useEffect(() => {
        let isClient = (typeof window !== 'undefined');
        isClient && setCurrent(window.location.pathname);
    }, [isClient && window.location.pathname]);


    return (
        <Menu mode="horizontal" items={itemConditional} onClick={handleClick} selectedKeys={[current]}/>
    )
}
export default TopNav;