import {api_response} from "../message/response";

let success_message = {
    status : '00',
    message : 'succes',
    data : [{a:'data'},{a:'data'}]
}

let failed_message = {
    status: '01',
    message: 'error',
    data : 'err'
}


export const get_async_test = async(req,res,next) => {
    try {
        // res.status(200).send(success_message)
        throw new Error("something wrong");
        res.status(200).send(api_response('00','success',[{'a':'a'}]))
    } catch (error) {
        // res.status(500).send(failed_message)
        console.log(error)
        res.status(500).send(api_response('01','failed','err'))
    }
}

export const get_async_test_wrapper = async (req,res,next) => {
    res.send(success_message)
}