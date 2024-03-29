import {useReducer, createContext, useEffect} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import nextConfig from "../next.config.mjs";

// initial state
const initialState = {
    user: null,
};

// create context
const Context = createContext();

// root reducer
const rootReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {...state, user: action.payload};
        case "LOGOUT":
            return {...state, user: null};
        default:
            return state;
    }
};

// context provider
const Provider = ({children}) => {
    // for wrapping
    const [state, dispatch] = useReducer(rootReducer, initialState);

    const router = useRouter();

    // load context from local storage
    useEffect(() => {
        dispatch({
            type: "LOGIN",
            payload: JSON.parse(window.localStorage.getItem('user'))
        });
    }, []);

    // handling expired token
    axios.interceptors.response.use(
        function (response) {
            // any status code that lie within the range ot 2xx cause this function to trigger

            return response;
        }, function (error) {
            // any status code that falls outside range 2xx cause this function to trigger
            let res = error.response;

            if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
                // handle logout
                return new Promise((resolve, reject) => {
                    axios.get(`${nextConfig.app.apiPrefix}/logout`)
                        .then((data) => {
                            // console.log('/401 error> logout')
                            window.localStorage.removeItem('user')
                            router.push('/login')
                        })
                        .catch((err) => {
                            console.log("Axois interceptors err", err);
                            reject(error)
                        })
                })
            }

            return Promise.reject(error);
        }
    );

    const getCsrfToken = async () => {
        const {data} = await axios.get(`${nextConfig.app.apiPrefix}/csrf-token`);
        axios.defaults.headers["X-CSRF-Token"] = data.csrfToken;
        // console.log(axios.defaults.headers)
    }

    useEffect(() => {
        getCsrfToken()
    },[])

    return (
        <Context.Provider value={{state, dispatch}}>
            {children}
        </Context.Provider>
    )
}


export {Context, Provider};