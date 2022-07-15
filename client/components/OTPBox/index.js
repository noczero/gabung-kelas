import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../context";
import axios from "axios";
import nextConfig from "../../next.config.mjs";
import {toast} from "react-toastify";
import {SyncOutlined} from "@ant-design/icons";
import {USER_STATUS_ACTIVE} from "../../constants/variable";

const OTPBox = () => {
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [loading, setLoading] = useState(false)

    const {state: {user}, dispatch} = useContext(Context)

    // useEffect( () => {
    //         setOtp(['','','','','',''])
    // })

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        //Focus next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const resendOTP = async (e) => {
        e.preventDefault()
        try {
            const code = otp.join("")
            console.log(code)
            const {data} = await axios.put(`${nextConfig.app.apiPrefix}/user/verification`)
            toast(data.message)
        } catch (err) {
            toast.error(err.response.data.message)
            console.log(err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const code = otp.join("")
            console.log(code)
            const {data} = await axios.post(`${nextConfig.app.apiPrefix}/user/verification`, {
                emailVerificationCode: code
            })
            toast(data.message)

            // update localstorage
            let userLocalStorage = JSON.parse(window.localStorage.getItem('user'))
            userLocalStorage.status = USER_STATUS_ACTIVE // set to active
            // set again
            window.localStorage.setItem('user', JSON.stringify(userLocalStorage))

            // update the context
            dispatch({
                type: "LOGIN",
                payload: userLocalStorage
            })

        } catch (err) {
            toast.error(err.response.data.message)
            console.log(err)
        }

    }


    return (
        <>
            <div className="container pt-4">
                <div className="row">
                    <div className="col text-center">
                        <h4>Verifikasi Akun</h4>
                        <p>Masukkan kode verifikasi, kami sudah mengirim kode verifikasi
                            ke {user ? user.email : ''}.</p>

                        {otp.map((data, index) => {
                            return (
                                <input
                                    className="otp-field"
                                    type="text"
                                    name="otp"
                                    maxLength="1"
                                    key={index}
                                    value={data}
                                    onChange={e => handleChange(e.target, index)}
                                    onFocus={e => e.target.select()}

                                />
                            );
                        })}

                        <div className="pt-3">
                            <button
                                type="submit"
                                className="btn btn-block btn-primary"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? <SyncOutlined spin/> : "Verifikasi"}
                            </button>
                            <p>Belum menerima kode verifikasi? <a className="blue" onClick={resendOTP}>Kirim ulang.</a>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default OTPBox
