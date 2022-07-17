import {envar} from "../config/envar";
import logo from "../public/assets/icon/gabung-kelas/with-text/SVG/Asset 5.svg"
import Image from 'next/image'

const Index = () => {
    return (
        <>

                <Image
                    src={logo}
                    alt="Logo Gabung Kelas"
                    layout="responsive"
                />
            <h3 className="container-fluid text-center pt-4 pb-2">{envar.app.name}</h3>
        </>
    );
};

export default Index;