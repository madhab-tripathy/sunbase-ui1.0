// isLoggin => token is exist or not 
export const isLoggin = ()=>{
    let data = localStorage.getItem("sunbase_token");
    // data is present return true or if not present return false
    return !!data;
}


// getToken=> get token from local storage
export const getToken = () => {
    if(isLoggin()) {
        return JSON.parse(localStorage.getItem("sunbase_token"));
    }
}