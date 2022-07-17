import {
    AppstoreAddOutlined,
    HomeOutlined,
    InstagramOutlined, MailOutlined, PhoneOutlined,
    TwitterOutlined
} from "@ant-design/icons"
import {Button, Space} from 'antd';
import nextConfig from "../../next.config.mjs";
import wingsHeader from "../../public/assets/wings-header.svg"
import Image from 'next/image'


const {app, contact} = nextConfig;

const Footer = () => {

    return (

        <footer className="text-center text-lg-start bg-light text-muted mt-auto">

            <section className="pt-3">
                <div className="container text-center text-md-start mt-5">
                    <div className="row mt-3">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                <AppstoreAddOutlined /> Gabung Kelas
                            </h6>
                            <p>
                                Bergabung dengan siswa lain bersama kami dan menjadi bagian dalam plaftorm
                                pembelajaran ini.
                                Belajar dari instruktur terbaik atau kamu bisa menjadi instruktur untuk
                                mengajarkan
                                ilmu yang kamu tahu.
                            </p>
                        </div>
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            <h6 className="fw-bold mb-4">
                                Menjadi Instruktur
                            </h6>
                            <p>
                                Nikmati keuntungan dengan kelas yang kamu buat. Kami menawarkan 70% pendapatan
                                untuk setiap instruktur.
                                Sudah siap untuk membuat kelas pertama?
                            </p>
                        </div>
                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className=" fw-bold mb-4">
                                Lainnya
                            </h6>
                            <p>
                                <a href="#!" className="text-reset">Ketentuan dan Kebijakan</a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">Tentang Kami</a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">Pemesanan</a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">Bantuan</a>
                            </p>
                        </div>
                        <div className="col-md-4 col-lg-2 col-xl-3 mx-auto mb-md-0 mb-4">
                            <h6 className="fw-bold mb-4">
                                Kontak
                            </h6>
                            <p><HomeOutlined className="pe-1"/> {contact.address}</p>
                            <p><MailOutlined className="pe-1"/> {contact.email}</p>
                            <p><PhoneOutlined className="pe-1"/> {contact.phoneNumber}</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="text-center pt-4">
                © {new Date().getFullYear()} Hak Cipta - :
                <a className="text-reset fw-bold" href={app.clientURL}>gabungkelas.id</a>
                <p>{app.name}</p>
            </div>

            <section
                className="footer-wings d-flex justify-content-center justify-content-lg-between p-4 "
            >
                <div className="me-5 d-none d-lg-block">
                    <span>Kamu dapat terhubung dengan media sosial kami:</span>
                </div>
                <div>
                    <Space>
                        <Button type="link" href={contact.twitter} icon={<TwitterOutlined/>}/>
                        <Button type="link" href={contact.instagram} icon={<InstagramOutlined/>}/>
                    </Space>
                </div>
            </section>
              {/*<Image*/}
              {/*      src={wingsHeader}*/}
              {/*      alt="Picture of the author"*/}
              {/*      layout="responsive"*/}
              {/*  />*/}
        </footer>


    )
}

export default Footer;