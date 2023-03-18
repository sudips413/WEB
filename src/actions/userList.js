const get_user=(user)=>{
    return {
        type:"GET_USER",
        payload: user
    }
}
const getAllUsers = {
    get_user
}

export default getAllUsers