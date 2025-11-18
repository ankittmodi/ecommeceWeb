import React, { useContext, useEffect, useState } from 'react'
import './addRam.css';
import './style.css';
import {Button} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { MdOutlineCloudUpload } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import TooltipMUI from '@mui/material/Tooltip';
import { MyContext } from '../../App';
import { deleteData, editData, fetchDataFromApi, postData } from '../../utils/Api';

const AddRams = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [data, setData] = useState([]);
    const [editMode,setEditMode]=useState(null);
    const context = useContext(MyContext);

    useEffect(() => {
        getData();
    }, []);

    const getData=()=>{
        fetchDataFromApi('/api/product/productRams/get')
            .then((res) => {
                setData(res?.data || []);
            })
            .catch((err) => console.log(err));
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if (name === "") {
            context.openAlertBox("error", "Please enter product rams");
            return;
        }

        setIsLoading(true);

        if(editMode==null){
            setTimeout(() => {
            postData(`/api/product/productRams/create`, { name })
                .then((res) => {
                    setName("");
                    getData();
                    context.openAlertBox("success", res?.message);
                })
                .catch((err) => console.log(err))
                .finally(() => setIsLoading(false));
        }, 500);
        }
        if(editMode!==null){
            setTimeout(() => {
            editData(`/api/product/productRams/${editMode}`,{
                name:name
            })
                .then((res) => {
                        setName("");
                        setEditMode(null);
                        getData();
                        context.openAlertBox("success", res?.data?.message);
                })
                .catch((err) => console.log(err))
                .finally(() => setIsLoading(false));
        }, 500);
        }
    };


    const deleteProductRams=(id)=>{
        deleteData(`/api/product/productRams/${id}`).then((res)=>{
            getData();
            context.openAlertBox("success","Items deleted");
        })
    }

    const editItem=(id)=>{
        fetchDataFromApi(`/api/product/productRams/${id}`).then((res)=>{
            // console.log(res);
            setName(res?.data?.name);
            setEditMode(res?.data?._id);
        })
    }

    return (
        <section className='ram-section'>
            <div className='ram'>
                <div className='ram-heading'>
                    <h2>Add Product RAMS</h2>
                </div>

                <div className='ram-container'>
                    <form onSubmit={handleSubmit} className='ram-form'>
                        <div className='products'>
                            <div className='col'>
                                <h3>Product RAMS</h3>
                                <input
                                    type='text'
                                    className='search'
                                    name='name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        <Button type="submit" className='ram-btn'>
                            <MdOutlineCloudUpload className='upload-icon' />
                            {isLoading===true ? <CircularProgress color="inherit" size={20} /> : 'Publish and View'}
                        </Button>
                    </form>
                </div>
            </div>

            {/* Table with fetched RAM data */}
            {
                data?.length!==0 && 
                <div className='tables-card ram'>
                <div className="table-wrapper">
                    <table className="order-table ram-table">
                        <thead className='table-container'>
                            <tr className='table-header'>
                                <th>PRODUCT RAM</th>
                                <th className='ram-title'>ACTION</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.name}</td>
                                    <td className='ram-title'>
                                        <div className='dash-btns'>
                                            <TooltipMUI><Button className='dash-btn' onClick={()=>editItem(item?._id)}><FiEdit3 /></Button></TooltipMUI>
                                            <TooltipMUI title="Delete" ><Button className='dash-btn' onClick={()=>deleteProductRams(item?._id)}><MdOutlineDelete /></Button></TooltipMUI>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
            }

        </section>
    );
};

export default AddRams;
