import React, { useState,useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
import { FiEdit3 } from "react-icons/fi";
import { IoEye } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import TooltipMUI from '@mui/material/Tooltip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import './style.css';
import { MyContext } from '../../App';
import { deleteData, fetchDataFromApi } from '../../utils/Api';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }; 
const columns = [
  { id: 'image', label: 'IMAGE', minWidth: 250 },
  { id: 'catName', label: 'CATEGORY NAME', minWidth: 250 },
  { id: 'action', label: 'Action', minWidth: 100 },
];
const CategoryList = () => {
    const [page, setPage] =useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const context=useContext(MyContext);
    
    useEffect(()=>{
        fetchDataFromApi("/api/category").then((res)=>{
            // console.log(res.data);
            context.setCatData(res.data)
        })
    },[context.isOpenFullScreen])
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const deleteCat=(id)=>{
        deleteData(`/api/category/${id}`).then((res)=>{
            // console.log(res);
            fetchDataFromApi("/api/category").then((res)=>{
            // console.log(res.data);
            context.setCatData(res.data)
        })
        })
    }
  return (
    <>
        <div className='homeSlide-header'>
            <div className='table-flex'>
            <h2>Category List</h2>
            </div>
            <div className='column2'>
                <Button className='btn-blue col-btn'>Export</Button>
                <Button className='btn-blue' onClick={()=>context.setIsOpenFullScreen({
                    open:true,
                    model:"Add New Category"
                })}>Add Category</Button>
            </div>
        </div>
        <div className='tables-card home-slide'>
            <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow >
                {/* <TableCell width={60}>
                    <Checkbox {...label} size="small"/>
                </TableCell> */}
                {columns.map((column) => (
                    <TableCell
                        width={column.minWidth}
                        key={column.id}
                        align={column.align}
                        >
                    {column.label}
                    </TableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {context.catData.length!==0 && context.catData.map((item,index)=>{
                    return(
                        <TableRow key={index}>
                        {/* <TableCell style={{minWidth:columns.minWidth}}>
                            <Checkbox {...label} size="small"/>
                        </TableCell> */}
                        <TableCell width={100}>
                            <div className='category-banner'>
                                <div className='body-img'>
                                {/* <img src='https://www.houseofmasaba.com/cdn/shop/files/Masaba100410copy.jpg?v=1720173528' alt="img"/> */}
                                <img src={item.images[0]} alt='image'/>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell style={{minWidth:columns.minWidth}}>
                            {/* Fashion */}
                            {item.name}
                        </TableCell>
                        <TableCell style={{minWidth:columns.minWidth}}>
                            <div className='dash-btns'>
                                <TooltipMUI title="Edit"><Button className='dash-btn' onClick={()=>context.setIsOpenFullScreen({
                                    open:true,
                                    model:"Edit Category",
                                    id:item._id
                                })}><FiEdit3 /></Button></TooltipMUI>
                                <TooltipMUI title="Delete"><Button className='dash-btn' onClick={()=>deleteCat(item._id)}><MdOutlineDelete /></Button></TooltipMUI>
                            </div>
                        </TableCell>
                        </TableRow>
                    )
                })}
                
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count=""
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </div> 
    </>
  )
}

export default CategoryList
