import {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import {Input, Select, Option} from "@material-tailwind/react"

function Searchbar(props) {
    const [queryParams, setQueryParams] = useSearchParams();
    const [types, setTypes] = useState(null)
    const [selectedType, setSelectedType] = useState(null)
    useEffect(() => {
        const fetchPropertyTypes = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/properties/types');
                const foundData = await response.json();
                setTypes(foundData);
                console.log(foundData)
            } catch (error) {
                console.error('Error fetching property types:', error);
            }
        };

        fetchPropertyTypes();
    }, []);


    useEffect(() => {
        const fetchProperties = async (search) => {
            try {
                clickChange(props.page)
                const response = await fetch(`http://127.0.0.1:8000/api/properties/search?${search}`);
                const foundData = await response.json()
                props.changePageNumber(foundData.pageNumber)
                props.changeProperties(foundData.properties);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties(queryParams.toString());
    }, [queryParams, props.page]);
    const formData = Object.fromEntries(queryParams.entries());
    const handleChangeDropDown = (value) => {
        setSelectedType(value);
        const newFormData = {...formData, type: value};
        props.changePage(1);
        setQueryParams(newFormData);
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        const newFormData = {
            ...formData,
            [name]: value,
        };
        props.changePage(1);
        setQueryParams(newFormData);

    };
    const clickChange = (number) => {
        const newFormData = {
            ...formData,
            page: number
        }
        setQueryParams(newFormData)

    }
    return (
        <form className="flex justify-center">

            <Select color={'purple'} label={'Select Type'} name={'type'} value={selectedType}
                    onChange={handleChangeDropDown}>
                {types ? types.map((type) => {
                    return <Option value={type} key={type}>{type}</Option>
                }) : <Option> Nothing</Option>}
            </Select>
            <Input color={"black"} label={'City'} name={'city'} value={formData.city || ''} type={"text"}
                   onChange={handleChange}/>
            <Input color={"black"} label={'Street'} name={'street'} value={formData.street || ''} type={"text"}
                   onChange={handleChange}/>
            <Input color={"black"} label={"House Number"} name={'house_number'} value={formData.house_number || ''}
                   type={"number"} onChange={handleChange}/>
            <Input color={"black"} label={"Max Price"} name={'price'} value={formData.price || ''} type={"number"}
                   onChange={handleChange}/>
            <Input color={"black"} label={"Max Size"} name={'size'} value={formData.size || ''} type={"number"}
                   onChange={handleChange}/>
            <Input color={"black"} label={"Number of rooms"} name={"rooms"} value={formData.rooms || ''} type={"number"}
                   onChange={handleChange}/>
            <button
                className={'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 '}
                type={"reset"} onClick={() => setQueryParams('')}>Reset
            </button>
        </form>
    )
}

export default Searchbar;