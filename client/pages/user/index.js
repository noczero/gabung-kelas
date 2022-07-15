import {useContext, useEffect, useState} from "react";
import {Context} from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import OTPBox from "../../components/OTPBox";
import {useRouter} from "next/router";
import {USER_STATUS_ACTIVE, USER_STATUS_INACTIVE} from "../../constants/variable";

const UserIndex = () => {

    const {
        state: {user},
    } = useContext(Context);

    useEffect(()=>{

    },[user])

    return (
        <UserRoute>
            {user && user.status === USER_STATUS_INACTIVE ? (
                // check user not null and user status == active
                <OTPBox/>
            ) : (
                // user already active
                <span>
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                </span>
            )}
        </UserRoute>
    );
};

export default UserIndex;
