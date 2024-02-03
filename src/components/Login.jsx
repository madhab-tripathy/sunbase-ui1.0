import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
} from "@material-tailwind/react";

const Login = () => {
    return (
        <>
            
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
                        <Input label="Login Id" size="lg" />
                        <Input label="Password" size="lg" />
                    </CardBody>
                    <CardFooter className="pt-0 flex justify-center">
                        <Button variant="gradient" color="blue" className="capitalize" half>
                            Submit
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}

export default Login;