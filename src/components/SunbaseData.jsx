import { Card, Typography,IconButton,
    Tooltip, Button, Input
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { PencilIcon, UserPlusIcon,  MinusCircleIcon} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { getAllCustomers, deleteCustomer, syncCustomer, searchCustomer} from "../utilities/user-service";
import { getToken } from "../auth";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = ["First Name", "Last Name", "Address", "Street", "City", "State", "Email", "Phone", "Action"];

const options = [
    'Search','First Name', 'City', 'Email', 'Phone'
];
const defaultOption = options[0];

const SunbaseData = () => {
    // store table data
    const [tableRows, setTableRows] = useState([{}])

    const [searchOption, setSearchOption] = useState("");
    
    let navigate = useNavigate();
    
    const fetchTableData = ()=>{
        getAllCustomers(getToken()).then((res)=>{
            setTableRows(prevData => [...res]);
            navigate("/user/customers-info");
        }).catch((err)=>{
            alert(err.message);
            console.error(err);
        })
    }

    useEffect(()=>{
        fetchTableData();
    },[])
    
    // delete customer
    const handleDelete = (uuid)=>{
        console.log(getToken());
        deleteCustomer(uuid,getToken()).then((res)=>{
            console.log(res);
            navigate("/user/customers-info")
            alert(res)
        })
        .catch((err)=>{
            alert(err.message);
            console.error(err);
        });
    }

    // handaleSyncData
    const handleSyncData = ()=>{
        syncCustomer(getToken()).then((res)=>{
            setTableRows(prevData => [...res]);
        }).catch((err)=>{
            alert(err.message);
            console.error(err);
        })
    }
    // search input handled
    const handleSearch = (event)=>{
        let query = event.target.value;
        searchCustomer(searchOption,query,getToken())
        .then((res)=>{
            if(res === ""){
                alert("No result found")
            }else{
                setTableRows(res);
            }
        })
        .catch((err)=>{
            alert(err.message);
            console.error(err);
        });
    }
    // search optimization
    const optimise = (callback,delay)=>{
        let timer;
        return function(...args){
            if(timer){
                clearTimeout(timer);
            };
            timer = setTimeout(() =>{
                callback(...args);
            },delay);
        }
    }
    const optimisedFn = optimise(handleSearch,600);
    
    // search dropdown handle
    const handaleDropdown = (event) => {
        let option = event.value;
        setSearchOption(option);
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
                    onKeyUp={optimisedFn}
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
                        {tableRows.map(({ firstName, lastName, address, street, city, state, email, phone, uuid }, index) => {
                            const isLast = index === tableRows.length - 1;
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
                                            {street}
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