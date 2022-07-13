import {useEffect, useState} from "react";
import {Context} from "../../context";
import axios from "axios";
import nextConfig from "../../next.config.mjs";
import {useRouter} from "next/router";
import {SyncOutlined} from "@ant-design/icons";

const UserRoute = ({children}) => {
    const [ok, setOk] = useState(false); // protect show or ok, default not ok

    // router
    const router = useRouter()

    const fetchUser = async () => {
        try {
            const {data} = await axios.get(`${nextConfig.app.apiPrefix}/current-user`)
            // console.log(data)

            if (data.status === '00') {
                setOk(true);
            } else {
                setOk(false);
            }
        } catch (e) {
            console.log(e)
            setOk(false);
        }
    }
    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <>
            {/*if not ok then set loading, if ok then using fragments to using in another pages */}
            {!ok ? (
                <SyncOutlined
                    spin
                    className="d-flex justify-content-center display-1 text-primary p-5"/>
            ) : (
                <>
                    {children}
                </>
            )}
        </>

    )
};

export default UserRoute