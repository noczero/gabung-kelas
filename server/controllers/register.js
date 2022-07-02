
export const register =  (req,res,next) => {
    res.send("Hello from controller")
}

export const register_async = async (req,res,next) => {
    res.send("Async controller")
}