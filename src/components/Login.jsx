import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { loginUser } from "../utilities/user-service";
import {useNavigate } from 'react-router-dom';
const Login = () => {
    const [user, setUser] = useState({});
    
    const navigate = useNavigate();

    const handleValidation = () => {
        if (user.email === ""
            || user.password === "") {
            alert("all fields are required");
            return false;
        }
        else if (!user.email.includes('@')) {
            alert("invalid email");
            return false;
        }
        return true;

    }


    const handleSubmit =  (event) => {
        event.preventDefault();
        // form validation
        
        if(handleValidation()){
            loginUser(user).then((res)=>{
                // need to enhance, not good way to do this
                localStorage.setItem('sunbase_token', JSON.stringify(res.token));
                alert("login successful");
                navigate("/user/customers-info");
            })
            .catch((err)=>{
                alert(err.message);
                console.log(err);
            });
        }
    }

    const handleChange = (event) => {
        // spread form data
        const { name, value } = event.target;
        console.log(value);
        setUser(prevUser => ({ ...prevUser, [name]: value }))
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
                                Login Page
                            </Typography>
                        </CardHeader>
                        <CardBody className="flex flex-col gap-4">
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

export default Login;