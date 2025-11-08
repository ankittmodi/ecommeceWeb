import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import './style.css'
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { MyContext } from '../../App';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { deleteData, editData } from '../../utils/Api';

const EditSubCategory = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [selectVal, setSelectVal] = useState(props.parentId);
    const [formFeilds, setFormfeilds] = useState({
        name: props.name,
        parentCatName: props.parentCatName,
        parentId: props.parentId
    });
    const[isLoading,setIsLoading]=useState(false);

    const context = useContext(MyContext);

    useEffect(()=>{
        setSelectVal(props.parentId)
    },[props.parentId])

    const flatten = (items) => {
    let list = [];
    items.forEach(i => {
        list.push(i);
        if (i.children && i.children.length) {
        list = list.concat(flatten(i.children));
        }
    });
    return list;
    };

    const flatCats = flatten(context.catData);

    const handleChange = (e) => {
        setSelectVal(e.target.value);
        formFeilds.parentId = e.target.value;
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        setIsLoading(true);
        if(formFeilds.name===""){
            context.openAlertBox("error","Please enter category name");
            return false;
        }
        editData(`/api/category/${props?._id}`,formFeilds).then((res)=>{
            console.log(res.data)
            setTimeout(()=>{
                context.openAlertBox("success",res.data.message);
                context.getCat();
                setIsLoading(false);
            },1000)
        });
    }

    const deleteCat=(id)=>{
        deleteData(`/api/category/${id}`).then((res)=>{
            context.getCat();
        })
    }

    return (
        <div className='edit-category'>
            <form onSubmit={handleSubmit}>
                {editMode && (
                    <div className='sub-dropdown'>
                        <div>
                            <Select
                            value={selectVal}
                            size='small'
                            onChange={handleChange}
                            sx={{ width: '100%' }}
                            >
                            {flatCats
                                .filter(item => item._id !== props._id) // can't select itself
                                .filter(item => {
                                if (!props.parentId) {
                                    // Men → parent should be Level-1 (Fashion)
                                    return item.parentId === null;
                                } else {
                                    // Jeans → parent should be Level-2 (Men)
                                    return item._id === props.parentId;
                                }
                                })
                                .map(item => (
                                <MenuItem
                                    key={item._id}
                                    value={item._id}
                                    onClick={() => formFeilds.parentCatName = item.name}
                                >
                                    {item.name}
                                </MenuItem>
                                ))}
                            </Select>
                        </div>
                        <input type='text' className='search search-text'
                            name='name'
                            value={formFeilds.name}
                            onChange={e=>setFormfeilds(prev=>({...prev, name:e.target.value}))}
                        />

                        <div className='btn-groups'>
                            <Button type="submit" className='header-btn'>Edit</Button>
                            <Button className='header-btn' onClick={() => setEditMode(false)}>Cancel</Button>
                        </div>
                    </div>
                )}

                {!editMode && (
                    <div className='edit-group'>
                        <span>{props.name}</span>
                        <div className='btn-group'>
                            <Button className='angle1' onClick={() => setEditMode(true)}><CiEdit className='edit-icon' /></Button>
                            <Button className='angle1' onClick={()=>deleteCat(props._id)}><MdOutlineDelete className='edit-icon' /></Button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    )
}

export default EditSubCategory;
