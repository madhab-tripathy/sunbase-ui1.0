import { Card, Typography,IconButton,
    Tooltip, Button, Input
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { PencilIcon, UserPlusIcon,  MinusCircleIcon} from "@heroicons/react/24/solid";
import { useEffect } from "react";


const TABLE_HEAD = ["First Name", "Last Name", "Address", "City", "State", "Email", "Phone", "Action"];

const TABLE_ROWS = [
    {
        name: "John Michael",
        job: "Manager",
        date: "23/04/18",
    },
    {
        name: "Alexa Liras",
        job: "Developer",
        date: "23/04/18",
    },
];
const options = [
    'First Name', 'City', 'Email', 'Phone'
];
const defaultOption = options[0];


const SunbaseData = () => {

    useEffect(()=>{
        
    },[])

    const handaleDropdown = (event) => {
        console.log(event.value);
    }
    return (
        <>
            <Typography
                color="blue-gray"
                className="text-2xl font-bold text-center leading-none m-4"
            >
                Customer List
            </Typography>
            <div className="m-4 flex gap-2">
                <Button className="flex items-center gap-3 rounded-md capitalize mb-2" size="sm">
                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Customer
                </Button>
                <Dropdown options={options} onChange={handaleDropdown} value={defaultOption} placeholder="Select an option" />
                <div>
                    <Input
                    label="Search"
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                    />
                </div>
            </div>
            <Card className="h-full w-full overflow-scroll rounded-none">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-black text-white">
                        {TABLE_ROWS.map(({ name, job, date }, index) => {
                            const isLast = index === TABLE_ROWS.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={name}>
                                    <td className={`${classes}`}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal text-white"
                                        >
                                            {name}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal text-white"
                                        >
                                            {job}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal text-white"
                                        >
                                            {date}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal text-white"
                                        >
                                            {name}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal text-white"
                                        >
                                            {job}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal text-white"
                                        >
                                            {date}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal text-white"
                                        >
                                            {date}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex gap-2">
                                        <Typography
                                            as="a"
                                            href="#"
                                            variant="small"
                                            color="blue-gray"
                                            className="font-medium"
                                        >
                                            <Tooltip content="Delete User" className="bg-white text-black">
                                                <IconButton variant="text">
                                                <MinusCircleIcon className="h-4 w-4" color="red" />
                                                </IconButton>
                                            </Tooltip>
                                        </Typography>
                                        <Typography
                                            as="a"
                                            href="#"
                                            variant="small"
                                            color="blue-gray"
                                            className="font-medium"
                                        >
                                            <Tooltip content="Edit User" className="bg-white text-black">
                                                <IconButton variant="text">
                                                <PencilIcon className="h-4 w-4" color="white"/>
                                                </IconButton>
                                            </Tooltip>
                                        </Typography>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>
        </>
    );
}

export default SunbaseData;