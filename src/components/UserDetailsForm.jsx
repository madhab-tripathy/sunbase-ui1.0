import {
    Card,
    Input,
    CardBody,
    Button,
    Typography,
} from "@material-tailwind/react";
import { createCustomer, getCustomerById, updateCustomer } from "../utilities/user-service";
import React, { useEffect, useState } from "react";
import {useNavigate } from 'react-router-dom';
const UserDetailsForm = () => {

    // customer state
    const[customer, setCustomer] = useState({
        firstName:'',
        lastName:'',
        street:'',
        city:'',
        email:'',
        address:'',
        state:'',
        phone:'',
    });
    const {firstName, lastName, street, city, email, address, state, phone} = customer;
    const [id, setId] =  useState("");
    const isEditMode = !!id; // Check if it's in edit mode
    const navigate = useNavigate();
    useEffect(() => {
        // Get the current URL search parameters
        const queryParams = new URLSearchParams(window.location.search);
        // Get the value of the "id" parameter
        setId(queryParams.get('id'));
    }, []); 
    
    

    // form validation
    const handleValidation = ()=>{
        if(firstName === "" 
        || lastName === "" 
        || street === ""
        || city === ""
        || email === ""
        || address === ""
        || state === ""
        || phone === ""){
            alert("all field are required");
            return false;
        }else if(!email.includes('@')){
            alert("invalid email");
            return false;
        }else if(phone.length !== 10){
            alert("invalid mobile number");
            return false; 
        }
        return true;
    }


    useEffect(() => {
        // If in edit mode, fetch customer data and set the initial state
        if (isEditMode) {
            getCustomerById(id)
            .then((res) => {
                setCustomer(res); // getCustomerById returns the customer data
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, [id, isEditMode]);


    // handle submited form data by user
    const handleSubmit = (event) => {
        event.preventDefault();
        if(handleValidation()){
            // create and update both are evaluating here
            const apiCall = isEditMode ? updateCustomer : createCustomer;
            apiCall(customer,id).then((res)=>{
                alert(isEditMode ? "Update Successfully" : "Customer Added")
                setTimeout(()=>{
                    navigate("/customers-info");
                },500)
            })
            .catch((err)=>{
                alert("authentication error");
                console.error(err);
            });
        }
    
    }
    const handleChange = (event) => {
        const {name, value} = event.target;
        setCustomer(prevCustomer => ({...prevCustomer,[name]:value}));
    }

    return (
        <>
            <div className="w-full h-screen flex flex-col justify-center place-items-center">
                <Typography
                    color="blue-gray"
                    className="text-2xl font-bold text-center leading-none m-4"
                >
                    {isEditMode ? "Edit Customer" : "Add Customer"}
                </Typography>
                <Card color="transparent" shadow={false} className="max-w-screen-lg sm:w-92 md:w-3/5">

                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <CardBody className="p-0 flex gap-4">
                                <div className="flex flex-col gap-4 w-full">
                                    <Input 
                                        label="First Name" 
                                        name="firstName"
                                        onChange={handleChange}
                                        size="lg" 
                                        value={firstName}
                                    />
                                    <Input 
                                        label="Street" 
                                        name="street"
                                        onChange={handleChange}
                                        size="lg" 
                                        value={street}
                                    />
                                    <Input 
                                        label="City" 
                                        name="city"
                                        onChange={handleChange}
                                        size="lg" 
                                        value={city}
                                    />
                                    <Input 
                                        label="Email" 
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        size="lg" 
                                        value={email}
                                    />
                                </div>
                                <div className="flex flex-col gap-4 w-full">
                                    <Input 
                                        label="Last Name" 
                                        name="lastName"
                                        onChange={handleChange}
                                        size="lg" 
                                        value={lastName}
                                    />
                                    <Input 
                                        label="Address"
                                        value={address}
                                        name="address"
                                        onChange={handleChange}
                                        size="lg" 
                                    />
                                    <Input 
                                        label="State" 
                                        name="state"
                                        value={state}
                                        onChange={handleChange}
                                        size="lg" 
                                    />
                                    <Input 
                                        label="Phone" 
                                        type="tel"
                                        name="phone"
                                        onChange={handleChange}
                                        size="lg" 
                                        value={phone}
                                    />
                                </div>

                            </CardBody>

                        </div>
                        <Button type="submit" className="capitalize" style={{ marginTop: "1em" }} color="blue" half="true">
                            {isEditMode ? "Update" : "Submit"}
                        </Button>
                    </form>
                </Card>
            </div>
        </>
    );
}

export default UserDetailsForm;