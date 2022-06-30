import {useState} from "react";

const Register = ()=> {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        // handle submit
        e.preventDefault(); // avoid to reload

        console.table({name,email,password})
    }

    return (
        <>
            <h1 className="jumbotron bg-primary square"> Register </h1>


            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="form-control mb-4 p-4"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Input Name"
                        required
                    />

                     <input
                        type="text"
                        className="form-control mb-4 p-4"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter Email"
                        required
                    />

                     <input
                        type="text"
                        className="form-control mb-4 p-4"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        required
                    />
                    <button type="submit" className="btn btn-block btn-primary p-2"> Submit</button>

                </form>
            </div>
        </>
    )
}

export default Register;