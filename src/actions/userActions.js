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
const set_loading_status=(status)=>{
    return {
        type:"SET_LOADING_STATUS",
        payload: status
    }
}

const set_image = (image)=>{
    return {
        type:"SET_IMAGE",
        payload: image
    }
}




const userActions ={
    set_user,logout,set_registration_status,set_loading_status,set_image
}
export default userActions