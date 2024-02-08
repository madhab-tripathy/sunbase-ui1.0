import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { createUser } from "../utilities/user-service";
import {useNavigate } from 'react-router-dom';
const Register = () => {

    const navigate = useNavigate();
//  user state
    const [user, setUser] = useState({});
// Form validation
    const handleValidation = ()=>{
        if(user.email === "" 
        || user.firstName === "" 
        || user.lastName === "" 
        || user.password === ''){
            alert("all fields are required");
        }
        else if(!user.email.includes('@')){
            alert("invalid email");
        }
    }

//  submit data to srver generated token
    const handleSubmit = (event) =>{
        event.preventDefault();
        // form validation
        handleValidation();
        createUser(user).then((res)=>{
            localStorage.setItem('sunbase_token', JSON.stringify(res.token));
            alert("registration successful");
            setTimeout(()=>{
                navigate("/user/customers-info");
            },500);
        })
        .catch((err)=>{
            console.log(err);
        })
        ;
    }

    const handleChange = (event)=>{
        // spread form data
        const {name, value} = event.target;
        console.log(value);
        setUser(prevUser => ({...prevUser,[name]:value.trim()}))
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="w-full h-screen flex justify-center place-items-center">
                    <Card className="w-2/5">
                        <CardHeader variant="gradient"
                            color="blue"
                            className="mb-4 grid h-28 place-items-center"
                            floated="false">
                            <Typography variant="h3" color="white">
                                Register Page
                            </Typography>
                        </CardHeader>
                        <CardBody className="flex flex-col gap-4">
                            <Input
                                label="First Name" 
                                name="firstName" 
                                size="lg"
                                onChange={handleChange}

                            />
                            <Input 
                                label="Last Name" 
                                name="lastName" 
                                size="lg"
                                onChange={handleChange}
                            />
                            <Input 
                                label="Email" 
                                name="email" 
                                type="email" 
                                size="lg"
                                onChange={handleChange}
                            />
                            <Input 
                                label="Password" 
                                name="password" 
                                type="password" 
                                size="lg"
                                onChange={handleChange}
                            />
                        </CardBody>
                        <CardFooter className="pt-0 flex justify-center">
                            <Button type="submit" variant="gradient" color="blue" className="capitalize" half>
                                Submit
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </form>
        </>
    );
}

export default Register;