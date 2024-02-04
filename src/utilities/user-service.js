import { axiosRequest } from "./helper";

const authToken = JSON.parse(localStorage.getItem('sunbase_token'));

// configure header
const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `.concat(authToken),
    },
};
// create user
export const createUser = (user)=>{
    return axiosRequest
    .post('/api/v1/sunbase/auth/register',user)
    .then((response)=>  response.data);
}
// login autherntication
export const loginUser = (credential) =>{
    return axiosRequest
    .post('/api/v1/sunbase/auth/login',credential)
    .then((response)=> response.data);
}
// create customer with jwt token
export const createCustomer = (customer) =>{
    return axiosRequest
    .post('/api/v1/sunbase/customer/add-customer',customer,axiosConfig)
    .then((response) => response.data);
}