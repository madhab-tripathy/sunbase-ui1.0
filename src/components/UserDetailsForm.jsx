import {
    Card,
    Input,
    CardBody,
    Button,
    Typography,
} from "@material-tailwind/react";
const UserDetailsForm = () => {
    return (
        <>
            
            <div className="w-full h-screen flex flex-col justify-center place-items-center">
                <Typography
                    color="blue-gray"
                    className="text-2xl font-bold text-center leading-none m-4"
                >
                    Customer Details
                </Typography>
                <Card color="transparent" shadow={false} className="w-3/4 max-w-screen-lg sm:w-96">

                    <form>
                        <div className="flex flex-col">
                            <CardBody className="p-0 flex gap-4">
                                <div className="flex flex-col gap-4 w-full">
                                    <Input label="First Name" size="lg" />
                                    <Input label="Street" size="lg" />
                                    <Input label="City" size="lg" />
                                    <Input label="Email" size="lg" />
                                </div>
                                <div className="flex flex-col gap-4 w-full">
                                    <Input label="Last Name" size="lg" />
                                    <Input label="Address" size="lg" />
                                    <Input label="State" size="lg" />
                                    <Input label="Phone" size="lg" />
                                </div>

                            </CardBody>

                        </div>
                        <Button className="capitalize" style={{ marginTop: "1em" }} color="blue" half="true">
                            Submit
                        </Button>
                    </form>
                </Card>
            </div>
        </>
    );
}

export default UserDetailsForm;