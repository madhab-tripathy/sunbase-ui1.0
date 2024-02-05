import { Card, Typography,IconButton,
    Tooltip, Button, Input
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { PencilIcon, UserPlusIcon,  MinusCircleIcon} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { getAllCustomers, deleteCustomer, syncCustomer, searchCustomer} from "../utilities/user-service";


const TABLE_HEAD = ["First Name", "Last Name", "Address", "City", "State", "Email", "Phone", "Action"];

const TABLE_ROWS = [];
const options = [
    'First Name', 'City', 'Email', 'Phone'
];
const defaultOption = options[0];

const SunbaseData = () => {
    // store table data
    const [tableRows, setTableRows] = useState([{
        firstName:'',
        lastName:'',
        address:'',
        city:'',
        state:'',
        email:'',
        phone:'',
        uuid:''
    }])

    const [email,setEmail] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [searchTerm, setSearchTerm] = useState("")
    // fetch all data in table
    useEffect(()=>{
        const fetchTableData = ()=>{
            getAllCustomers().then((res)=>{
                setTableRows(prevData => [...res]);
            }).catch((err)=>{
                console.error(err);
            })
        }
        fetchTableData();
    },[])

    // delete customer
    const handleDelete = (uuid)=>{
        deleteCustomer(uuid).then((res)=>{
            console.log(res);
            window.location.href = "#";
            alert(res)
        })
        .catch((err)=>{
            console.error(err);
        });
    }

    // handaleSyncData
    const handleSyncData = ()=>{
        syncCustomer().then((res)=>{
            setTableRows(prevData => [...res]);
        }).catch((err)=>{
            console.error(err);
        })
    }

    const handleSearch = (event)=>{
        let query = event.target.value;
        setSearchTerm(query);
    }

    // search by terms
    const handaleDropdown = (event) => {
        let search = event.value;
        searchCustomer(search,searchTerm.toLocaleUpperCase())
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.error(err);
        });
    }


    return (
        <>
            <Typography
                color="blue-gray"
                className="text-2xl font-bold text-center leading-none m-4"
            >
                Customer List
            </Typography>
            <div className="m-4 flex gap-2 items-center">
                <a href="/customer-form">
                    <Button className="flex items-center gap-3 rounded-md capitalize" size="sm">
                        <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Customer
                    </Button>
                </a>
                <Dropdown options={options} onChange={handaleDropdown} value={defaultOption} placeholder="Select an option" />
                <div>
                    <Input
                    label="Search"
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                    inputMode={handleSearch}
                    />
                </div>
                <Button onClick={handleSyncData} className="flex items-center gap-3 rounded-md capitalize" color="blue" size="sm">
                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Sync
                </Button>
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
                        {tableRows.map(({ firstName, lastName, address, city, state, email, phone, uuid }, index) => {
                            const isLast = index === TABLE_ROWS.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={index}>
                                    <td className={`${classes}`}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal text-white"
                                        >
                                            {firstName}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal text-white"
                                        >
                                            {lastName}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal text-white"
                                        >
                                            {address}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal text-white"
                                        >
                                            {city}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal text-white"
                                        >
                                            {state}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal text-white"
                                        >
                                            {email}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal text-white"
                                        >
                                            {phone}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex gap-2">
                                        <Typography
                                            as="a"
                                            href="#"
                                            onClick={(e)=>{
                                                handleDelete(uuid);
                                            }}
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
                                            href={`/customer-form?id=${uuid}`}                                    
                                            variant="small"
                                            color="blue-gray"
                                            className="font-medium"
                                        >
                                            <Tooltip content="Edit User" className="bg-white text-black">
                                                <IconButton variant="text">
                                                <PencilIcon className="h-4 w-4"  color="white"/>
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