const set_posts=(post)=>{
    return {
        type:"SET_POST",
        payload: post
    }
}
const set_single_post=(post)=>{
    return {
        type:"SET_SINGLE_POST",
        payload: post
    }
}

const setAllPosts = {
    set_posts,set_single_post
}

export default setAllPosts
