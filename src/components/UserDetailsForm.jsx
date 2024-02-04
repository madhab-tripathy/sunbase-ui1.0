import {
    Card,
    Input,
    CardBody,
    Button,
    Typography,
} from "@material-tailwind/react";
import { createCustomer } from "../utilities/user-service";
import { useState } from "react";
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
        }else if(!email.includes('@')){
            alert("invalid email");
        }else if(phone.length !== 10){
            alert("invalid mobile number");
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        handleValidation();
        console.log(localStorage.getItem('sunbase_token'));
        createCustomer(customer).then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log();
        });
    }
    const handleChange = (event) => {
        const {name, value} = event.target;
        console.log(value);
        setCustomer(prevCustomer => ({...prevCustomer,[name]:value}));
    }

    return (
        <>
            <div className="w-full h-screen flex flex-col justify-center place-items-center">
                <Typography
                    color="blue-gray"
                    className="text-2xl font-bold text-center leading-none m-4"
                >
                    Customer Details
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
                                    />
                                    <Input 
                                        label="Street" 
                                        name="street"
                                        onChange={handleChange}
                                        size="lg" 
                                    />
                                    <Input 
                                        label="City" 
                                        name="city"
                                        onChange={handleChange}
                                        size="lg" 
                                    />
                                    <Input 
                                        label="Email" 
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        size="lg" 
                                    />
                                </div>
                                <div className="flex flex-col gap-4 w-full">
                                    <Input 
                                        label="Last Name" 
                                        name="lastName"
                                        onChange={handleChange}
                                        size="lg" 
                                    />
                                    <Input 
                                        label="Address" 
                                        name="address"
                                        onChange={handleChange}
                                        size="lg" 
                                    />
                                    <Input 
                                        label="State" 
                                        name="state"
                                        onChange={handleChange}
                                        size="lg" 
                                    />
                                    <Input 
                                        label="Phone" 
                                        name="phone"
                                        onChange={handleChange}
                                        size="lg" 
                                    />
                                </div>

                            </CardBody>

                        </div>
                        <Button type="submit" className="capitalize" style={{ marginTop: "1em" }} color="blue" half="true">
                            Submit
                        </Button>
                    </form>
                </Card>
            </div>
        </>
    );
}

export default UserDetailsForm;