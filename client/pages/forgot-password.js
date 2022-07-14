import {useContext, useEffect, useState} from "react";
import {Context} from "../context";
import {useRouter} from "next/router";
import nextConfig from "../next.config.mjs";
import {toast} from "react-toastify";
import {Button, Form, Input} from "antd";
import formItemLayout from "../constants/formItemLayout";
import tailFormItemLayout from "../constants/tailFormItemLayout";
import Link from "next/link";
import axios from "axios";


const ForgotPassword = () => {
    // define state
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [code, setCode] = useState('')
    const [success, setSuccess] = useState(false) // if success == false, show only send reset code, if success true then show field form update password
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();


    // context localStorage
    const {state: {user}} = useContext(Context)

    // router
    const router = useRouter()

    // useEffect
    useEffect(() => {
        // if user login, user not able to access forgot password, so check user is not null then redirect to "/"
        if (user !== null) router.push("/");
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const {data} = await axios.post(`${nextConfig.app.apiPrefix}/forgot-password`, {email});
            setSuccess(true)
            toast(data.message)
        } catch (e) {
            setLoading(false)
            toast(e.response.data.message)
        }
    }

    const onFinishEmailSend = async (values) => {
        try {
            setLoading(true)
            const {data} = await axios.post(`${nextConfig.app.apiPrefix}/forgot-password`, values);
            setSuccess(true)
            toast(data.message)
            setLoading(false)
        } catch (e) {
            setLoading(false)
            toast.error(e.response.data.message)
        }
    }

    const onFinishUpdateNewPassword = async (values) => {
        console.log(values)
        try {
            setLoading(true)
            const {data} = await axios.post(`${nextConfig.app.apiPrefix}/reset-password`, values);
            toast(data.message)
            setLoading(false)
            await router.push('/login')
        } catch (e) {
            setLoading(false)
            toast.error(e.response.data.message)
        }
    }

    return (
        <>
            <h3 className="container-fluid text-center pt-4 pb-2">Lupa Password</h3>
            <div className="container col-md-4 offset-md-4 pb-5">
                <Form
                    {...formItemLayout}
                    form={form}
                    name="forgotPassword"
                    onFinish={!success ? onFinishEmailSend : onFinishUpdateNewPassword} // first step email send, then updatea password
                    initialValues={{
                        email: 'satrya@zeroinside.id',
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

                    {success && (
                        // show password button
                        <>
                            <Form.Item
                                name="code"
                                label="Kode Verfikasi"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Masukkan kode untuk lupa password!',
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Masukkan kode verfikasi lupa password"
                                    value={code}
                                    onChange={e => setCode(e.target.value)}
                                />
                            </Form.Item>
                            <Form.Item
                                name="newPassword"
                                label="Password Terbaru"
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
                                    placeholder="Masukkan password baru"
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                />
                            </Form.Item>

                            <Form.Item
                                name="confirmNewPassword"
                                label="Check Password"
                                dependencies={['newPassword']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Konfirmasi kata sandi / password!',
                                    },
                                    ({getFieldValue}) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject(new Error('Password tidak sama, coba ulangi kembali!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder="Konfirmasi password baru"/>
                            </Form.Item>
                        </>
                    )
                    }


                    <Form.Item {...tailFormItemLayout}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={loading}
                            loading={loading}
                        >
                            {!success ? 'Kirim Kode' : 'Update Password'}
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        </>)
}

export default ForgotPassword