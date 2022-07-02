import {envar} from "../config/envar";

const Index = () => {
    return (
      <>
        <h1 className="jumbotron text-center bg-primary">{envar.app.name}</h1>
      </>
    );
};

export default Index;