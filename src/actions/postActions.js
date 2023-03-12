const set_posts=(post)=>{
    return {
        type:"SET_POST",
        payload: post
    }
}

const setAllPosts = {
    set_posts
}

export default setAllPosts
