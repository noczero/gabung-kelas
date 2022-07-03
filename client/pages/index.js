import {envar} from "../config/envar";

const Index = () => {
    return (
        <>
            <h3 className="container-fluid text-center pt-4 pb-2">{envar.app.name}</h3>
        </>
    );
};

export default Index;