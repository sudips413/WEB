const set_user=(userinfo)=>{
    return {
        type:"LOGIN",
        payload: userinfo
    }
}

const logout=()=>{
    return {
        type:"LOGOUT"
    }
}
const set_registration_status=(status)=>{
    return {
        type:"SET_REGISTRATION_STATUS",
        payload: status
    }
}




const userActions ={
    set_user,logout,set_registration_status
}
export default userActions