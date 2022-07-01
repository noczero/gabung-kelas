import {Menu} from "antd";
import Link from "next/link";
import {AppstoreAddOutlined, LoginOutlined, UserAddOutlined} from "@ant-design/icons";

const {Item} = Menu;

const items = [
    {
        label: (
            <Link href="/">
                <a>App</a>
            </Link>
        ),
        key: 'app',
        icon: <AppstoreAddOutlined/>,
    }, // remember to pass the key prop
    {
        label: (
            <Link href="/login">
                <a>Login</a>
            </Link>
        ),
        key: 'login',
        icon: <LoginOutlined/>
    }, // which is required
    {
        label: (
            <Link href="/register">
                <a>Register</a>
            </Link>
        ),
        key: 'register',
        icon: <UserAddOutlined/>
    }, // which is required
];

const TopNav = () => {
    return (
        <Menu mode="horizontal" items={items}/>
    )
}
export default TopNav;