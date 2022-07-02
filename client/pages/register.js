import {useState} from "react";
import axios from "axios";
import {envar} from "../config/envar";
import nextConfig from "../next.config.mjs";

const {apiURL} = nextConfig.app

import {
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select
} from "antd";

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const Register = () => {

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [form] = Form.useForm();
    const {Option} = Select;

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
        console.log('Received values of form: ', values);
        // console.table(values)
        // console.log(nextConfig)
        try {
            const {data} = await axios.post(`${apiURL}/register`, values)
            console.log(data)
            if (data.message === '00') {
                console.log('success')
            } else {
                console.log('failed response')
            }
        } catch (e) {
            console.log(e)
        }

    };

    const handleSubmit = (e) => {
        // handle submit
        e.preventDefault(); // avoid to reload

        // console.table({name, email, password})
    }

    return (
        <>
            <h1 className="jumbotron bg-primary square"> Register </h1>
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
                        phoneNumber: '82277009251',
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
                        label="Kata Sandi"
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
                        label="Konfirmasi Kata Sandi"
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
                                message: 'Silahkan masukkan nomor handphone',
                                min: 10
                            },
                        ]}
                    >
                        <Input
                            placeholder="82233445xxx"
                            addonBefore={countryCodeSelector}
                            style={{
                                width: '100%',
                            }}
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
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
                        <Checkbox>
                            Dengan menandai kotak disamping, Anda telah menyetujui <a href="#"> Ketentuan
                            Penggunaan </a>
                        </Checkbox>
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Registrasi
                        </Button>
                    </Form.Item>

                </Form>
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