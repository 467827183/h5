import axios from "axios";

export function axiosCustom({api='https://api.tideswap.io/v1',cmd="",headers={
    'Content-Type': 'application/json'
},params={},method="get",data={},successCode=0,showToast=true}):Promise<any>{
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url:api+cmd,
                method:method,
                headers,
                params,
                data
            })
            const resData = res.data
            if(resData.status===0){
                resolve(resData.data)
            }else {
                reject({
                    cmd:api+cmd,
                    method:method,
                    msg:resData.msg,
                    code:resData.code
                })
            }
        }catch (e) {
            reject({
                cmd:api+cmd,
                method:method,
                msg:e
            })
        }
    })
}
