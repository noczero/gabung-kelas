import {Button, Form, Input} from "antd";
import Link from "next/link";
import {useState, useContext, useEffect} from "react";
import axios from "axios";
import {toast} from "react-toastify";

import formItemLayout from "../constants/formItemLayout";
import tailFormItemLayout from "../constants/tailFormItemLayout";
import nextConfig from "../next.config.mjs";
import {Context} from "../context";

import Router from "next/router";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();

    // state
    const {state, dispatch} = useContext(Context);
    // console.log(state)
    const {user} = state;

    // router
    // const router = useRouter();

    // protected page from login, redirect
    useEffect(() => {
        //check user if user is login then push to / so cant access this page
        if (user !== null) Router.push("/user");
    }, [user]);

    const onFinish = async (values) => {
        // console.log(values)
        try {
            setLoading(true)
            const {data} = await axios.post(`${nextConfig.app.apiPrefix}/login`, values)

            // add user response to context
            dispatch({
                type: "LOGIN",
                payload: data.list[0]
            })

            // set to local storage
            window.localStorage.setItem('user', JSON.stringify(data.list[0]))

            toast(data.message)
            setLoading(false)

            //redirect
            Router.push("/user");
        } catch (e) {
            toast.error(e.response.data.message)
            setLoading(false)
        }
    }
    return (
        <>
            <h3 className="container-fluid text-center pt-4 pb-2">Masuk</h3>
            <div className="container col-md-4 offset-md-4 pb-5">
                <Form
                    {...formItemLayout}
                    form={form}
                    name="login"
                    onFinish={onFinish}
                    initialValues={{
                        email: 'satrya@zeroinside.id',
                        password: 'satrya@zeroinside.id',
                    }}
                    scrollToFirstError
                >

                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'E-mail yang dimasukkan tidak valid!',
                            },
                            {
                                required: true,
                                message: 'Masukkan email!',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Masukkan email valid"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Masukkan kata sandi, minimal 8 karakter.',
                                min: 8
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            placeholder="Masukkan password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={loading}
                            loading={loading}
                        >
                            Masuk
                        </Button>
                    </Form.Item>

                </Form>
                <div className="text-center">
                    <p>Belum punya akun? Silahkan <Link href="/register"><a>mendaftar</a></Link></p>
                    <p><Link href="/forgot-password"><a>Lupa Password</a></Link></p>
                </div>
            </div>
        </>
    )
}

export default Login;