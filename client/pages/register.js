import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {
    Button,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select
} from "antd";
import {SyncOutlined} from "@ant-design/icons";
import Link from "next/link";

import nextConfig from "../next.config.mjs";

import formItemLayout from "../constants/formItemLayout";
import tailFormItemLayout from "../constants/tailFormItemLayout";
import {useRouter} from "next/router";
import {Context} from "../context";

const Register = () => {

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [agreement, setAgreement] = useState(false);


    const [form] = Form.useForm();
    const {Option} = Select;

    const router = useRouter();
    const {state: {user},} = useContext(Context);

    useEffect(() => {
        //check user if user is login then push to / so cant access this page
        if (user !== null) router.push("/");
    }, [user]);

    const countryCodeSelector = (
        <Form.Item name="countryCode" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="86">+62</Option>
            </Select>
        </Form.Item>
    );

    const onFinish = async (values) => {
        // console.log('Received values of form: ', values);
        // console.table(values)
        // console.log(nextConfig)
        try {
            setLoading(true)
            const {data} = await axios.post(`${nextConfig.app.apiPrefix}/register`, values)
            // console.log(data)
            // as response with status != will go to catch, we dont need to make a status condition.
            // it will success anyway
            // if (data.status === '00') {
            //     console.log('success')
            //     toast.success(data.message)
            // } else if (data.status === '01') {
            //     console.log('failed response')
            //     toast.error(data.message)
            // }
            toast(data.message)
            setLoading(false)
            //redirect
            await router.push("/login");
        } catch (e) {
            toast.error(e.response.data.message)
            // console.log(e)
            setLoading(false)
        }

    };

    const handleSubmit = (e) => {
        // handle submit
        e.preventDefault(); // avoid to reload

        // console.table({name, email, password})
    }

    return (
        <>
            <h3 className="container-fluid text-center pt-4 pb-2">Daftar</h3>
            <div className="container col-md-4 offset-md-4 pb-5">
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    initialValues={{
                        countryCode: '62',
                        fullName: 'User 1',
                        email: 'test@test.com',
                        password: 'useruseruser',
                        confirmPassword: 'useruseruser',
                        phoneNumber: 82211334400,
                    }}
                    scrollToFirstError
                >
                    <Form.Item
                        name="fullName"
                        label="Nama Lengkap"
                        rules={[
                            {
                                required: true,
                                message: 'Masukkan nama lengkap!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input
                            placeholder="Masukkan nama lengkap"
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                        />
                    </Form.Item>

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

                    <Form.Item
                        name="confirmPassword"
                        label="Check Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Konfirmasi kata sandi / password!',
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('Password tidak sama, coba ulangi kembali!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Konfirmasi password"/>
                    </Form.Item>

                    <Form.Item
                        name="phoneNumber"
                        label="Nomor Handphone"
                        rules={[
                            {
                                message: 'Silahkan masukkan nomor handphone yang valid',
                                type: 'number',
                            },
                        ]}
                    >
                        <InputNumber
                            placeholder="82233445xxx"
                            addonBefore={countryCodeSelector}
                            style={{
                                width: '100%',
                            }}
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e)}
                        />
                    </Form.Item>
                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('Anda harus menyetujui ketentuan penggunaan')),
                            },
                        ]}
                        {...tailFormItemLayout}
                    >
                        <Checkbox
                            checked={agreement}
                            onChange={e => setAgreement(e.target.checked)}
                        >
                            Dengan menandai kotak disamping, Anda telah menyetujui <a href="#"> Ketentuan
                            Penggunaan </a>
                        </Checkbox>
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={loading || !agreement}
                            loading={loading}
                        >
                            Registrasi
                        </Button>
                    </Form.Item>

                </Form>
                <div className="text-center">
                    <p>Sudah punya akun? Silahkan <Link href="/login"><a>Masuk</a></Link></p>
                </div>
            </div>

            {/*<div className="container col-md-4 offset-md-4 pb-5">*/}
            {/*<form onSubmit={handleSubmit}>*/}
            {/*    <input*/}
            {/*        type="text"*/}
            {/*        className="form-control mb-4 p-4"*/}
            {/*        value={name}*/}
            {/*        onChange={e => setName(e.target.value)}*/}
            {/*        placeholder="Masukkan nama lengkap"*/}
            {/*        required*/}
            {/*    />*/}

            {/*     <input*/}
            {/*        type="text"*/}
            {/*        className="form-control mb-4 p-4"*/}
            {/*        value={email}*/}
            {/*        onChange={e => setEmail(e.target.value)}*/}
            {/*        placeholder="Masukkan email kamu"*/}
            {/*        required*/}
            {/*    />*/}

            {/*     <input*/}
            {/*        type="text"*/}
            {/*        className="form-control mb-4 p-4"*/}
            {/*        value={password}*/}
            {/*        onChange={e => setPassword(e.target.value)}*/}
            {/*        placeholder="Masukkan kata sandi (password)"*/}
            {/*        required*/}
            {/*    />*/}

            {/*    <input*/}
            {/*        type="text"*/}
            {/*        className="form-control mb-4 p-4"*/}
            {/*        value={confirmPassword}*/}
            {/*        onChange={e => setConfirmPassword(e.target.value)}*/}
            {/*        placeholder="Konfirmasi kata sandi (password)"*/}
            {/*        required*/}
            {/*    />*/}
            {/*    <button type="submit" className="btn btn-block btn-primary p-2"> Submit</button>*/}

            {/*</form>*/}

            {/*</div>*/}
        </>
    )
}

export default Register;