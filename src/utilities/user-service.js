
import { getToken } from "../auth";
import { axiosRequest } from "./helper";

const AUTH_BASE_URL = '/api/v1/sunbase/auth';
const CUSTOMER_BASE_URL = '/api/v1/sunbase/customer';
// const authToken = getToken();



// create user
export const createUser = (user)=>{
    
    return axiosRequest
    .post(`${AUTH_BASE_URL}/register`,user)
    .then((response)=>  response.data);
}
// login autherntication
export const loginUser = (credential) =>{
    return axiosRequest
    .post(`${AUTH_BASE_URL}/login`,credential)
    .then((response)=> response.data);
}
// create customer with jwt token
export const createCustomer = (customer,authToken) =>{
    // configure header
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer '.concat(authToken),
        },    
    };
    return axiosRequest
    .post(`${CUSTOMER_BASE_URL}/add-customer`,customer,axiosConfig)
    .then((response) => response.data);
}
// get all customer
export const getAllCustomers = (authToken)=>{
    // configure header
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer '.concat(authToken),
        },    
    };
    return axiosRequest
    .get(`${CUSTOMER_BASE_URL}/get-all-customers`,axiosConfig)
    .then((response) => response.data);
    
}
// get customer by id
export const getCustomerById = (id,authToken)=>{
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer '.concat(authToken),
        },    
        params:{
            id: id
        }
    };
    return axiosRequest
    .get(`${CUSTOMER_BASE_URL}/get-customerById`,axiosConfig)
    .then((response) => response.data);
}
// update customer
export const updateCustomer = (customer,id,authToken)=>{
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer '.concat(authToken),
        },    
        params:{
            id: id
        }
    };
    return axiosRequest
    .put(`${CUSTOMER_BASE_URL}/edit-customer`,customer,axiosConfig)
    .then((response) => response.data);
}
// delete customer
export const deleteCustomer = (id,authToken)=>{
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer `.concat(authToken),
        },    
        params:{
            id: id
        }
    };
    return axiosRequest
    .delete(`${CUSTOMER_BASE_URL}/delete`,axiosConfig)
    .then((response) => response.data);
}
// sync customer data from reomte api
export const syncCustomer = (authToken)=>{
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer '.concat(authToken),
        },    
    };
    return axiosRequest
    .get(`${CUSTOMER_BASE_URL}/sync-customer`,axiosConfig)
    .then((response) => response.data);
}
// seach query api
export const searchCustomer = (searchOption, query, authToken)=>{
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer '.concat(authToken),
        },    
        params:{
            searchOption: searchOption,
            q: query
        }
    };
    return axiosRequest
    .get(`${CUSTOMER_BASE_URL}/search`,axiosConfig)
    .then((response) => response.data);
}
