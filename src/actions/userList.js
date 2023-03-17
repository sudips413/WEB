const get_user=(userinfo)=>{
    return {
        type:"GET_USER",
        payload: userinfo
    }
}

export default get_user