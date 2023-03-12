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


const userActions ={
    set_user,logout
}
export default userActions