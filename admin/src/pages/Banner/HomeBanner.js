import React, { useState,PureComponent, useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';

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
import ProgressBar from '../../Component/progressBar';
import { deleteData, deleteMultipleData, fetchDataFromApi } from '../../utils/Api';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }; 
const columns = [
  { id: 'image', label: 'IMAGE', minWidth: 250 },
  { id: 'action', label: 'Action', minWidth: 100 },
];
const HomeBanner = () => {
    const [page, setPage] =useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const[bannerData,setbannerData]=useState([]);
    const[sortedIds,setSortedIds]=useState([]);
    const context=useContext(MyContext);
    
    useEffect(()=>{
       getData();
    },[context?.isOpenFullScreen]);

    const handleSelectAll=(e)=>{
      const isChecked=e.target.checked;
      // update all items checked status
      const updateItems=bannerData.map((item)=>({
        ...item,
        checked:isChecked
      }));
      setbannerData(updateItems);
      console.log(updateItems);
      // update ths sorted ids state
      if(isChecked){
        const ids=updateItems.map((item)=>item._id).sort((a,b)=>a-b);
        console.log(ids);
        setSortedIds(ids);
      }
      else{
        setSortedIds([]);
      }
    }

    const handleCheckBoxChange=(e,id,index)=>{
      const updatedItems=bannerData.map((item)=>
      item._id===id?{...item,checked:!item.checked}:item);
      setbannerData(updatedItems);
      // update the sorted ids state
      const selectIds=updatedItems
      .filter((item)=>item.checked)
      .map((item)=>item._id)
      .sort((a,b)=>a-b);
      setSortedIds(selectIds);
      console.log(selectIds)
    }


    const getData = () => {
    fetchDataFromApi('/api/bannerV1').then((res) => {
        if (!res.error) {
        let arr = res.data
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // newest first
            .map(item => ({
            ...item,
            checked: false
            }));

        setbannerData(arr);
        }
    });
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const deleteSlide = (id) => {
    deleteData(`/api/bannerV1/delete/${id}`)
        .then((res) => {
        console.log(res);

        // Refresh home slide list
        getData();

        context.openAlertBox("success", "Banner deleted!");
        })
        .catch(err => {
        console.error("Deletion Failed:", err);
        context.openAlertBox("error", "Failed to delete banner.");
        });
    }

    const handleDeleteMultipleSlide = async () => {
          if (sortedIds?.length === 0) {
            context.openAlertBox("error", "Please select items to delete");
            return;
          }
    
          try {
            const res = await deleteMultipleData(`/api/homeSlide/delete-multiple`, {
              ids: sortedIds,
            });
            console.log(res.data);
            getData();
            context.openAlertBox("success", "Selected banneer deleted!");
          } catch (err) {
            console.error(err);
            context.openAlertBox("error", "Error deleting items");
          }
        };

  return (
    <>
        <div className='homeSlide-header'>
            <div className='table-flex'>
            <h2>Home Banner</h2>
            </div>
            <div className='column2'>
                <Button className='btn-blue col-btn'>Export</Button>
                <Button className='btn-blue' onClick={()=>context.setIsOpenFullScreen({
                    open:true,
                    model:"Add BannerV1"
                })}>Add Banner</Button>
                {
                sortedIds?.length!==0 && <Button className='product-btn' style={{background:"red",color:"#fff"}} onClick={handleDeleteMultipleSlide}>Delete</Button>
                }
            </div>
        </div>
        <div className='tables-card home-slide'>
            <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                <TableCell width={60}>
                    <Checkbox {...label} size="small" 
                    onClick={handleSelectAll}
                    checked={bannerData?.length>0 ? bannerData.every((item)=>item.checked):false}
                    />
                </TableCell>
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
            {
                bannerData?.length!==0 && bannerData?.map((slide,index)=>{
                        return(
                        <TableRow>
                            <TableCell style={{minWidth:columns.minWidth}}>
                                <Checkbox {...label} size="small" 
                                checked={slide.checked===true?true:false}
                                onChange={(e)=>handleCheckBoxChange(e,slide._id,index)}
                                />
                            </TableCell>
                            <TableCell style={{minWidth:columns.minWidth}}>
                                <div className='body-banner'>
                                    <div className='body-img'>
                                    <img src={slide.images[0]} alt="img"/>
                                    </div>
                                </div>
                            </TableCell>
                            
                            <TableCell style={{minWidth:columns.minWidth}}>
                                <div className='dash-btns'>
                                    <TooltipMUI title="Edit"><Button className='dash-btn' onClick={()=>context.setIsOpenFullScreen({
                                    open:true,
                                    model:"Edit BannerV1",
                                    id:slide._id
                                })}><FiEdit3 /></Button></TooltipMUI>
                                    <TooltipMUI title="Delete"><Button className='dash-btn' onClick={()=>deleteSlide(slide?._id)}><MdOutlineDelete /></Button></TooltipMUI>
                                </div>
                            </TableCell>
                        </TableRow>
                        )
                    })
                
            }
                
                {/* <TableRow>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <Checkbox {...label} size="small"/>
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className='body-banner'>
                        <div className='body-img'>
                        <img src='https://www.houseofmasaba.com/cdn/shop/files/Masaba100410copy.jpg?v=1720173528' alt="img"/>
                        </div>
                    </div>
                </TableCell>
                
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className='dash-btns'>
                        <TooltipMUI title="Edit"><Button className='dash-btn'><FiEdit3 /></Button></TooltipMUI>
                        <TooltipMUI title="View"><Button className='dash-btn'><IoEye /></Button></TooltipMUI>
                        <TooltipMUI title="Delete"><Button className='dash-btn'><MdOutlineDelete /></Button></TooltipMUI>
                    </div>
                </TableCell>
                </TableRow>
                <TableRow>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <Checkbox {...label} size="small"/>
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className='body-banner'>
                        <div className='body-img'>
                        <img src='https://www.houseofmasaba.com/cdn/shop/files/Masaba100410copy.jpg?v=1720173528' alt="img"/>
                        </div>
                    </div>
                </TableCell>
                
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className='dash-btns'>
                        <TooltipMUI title="Edit"><Button className='dash-btn'><FiEdit3 /></Button></TooltipMUI>
                        <TooltipMUI title="View"><Button className='dash-btn'><IoEye /></Button></TooltipMUI>
                        <TooltipMUI title="Delete"><Button className='dash-btn'><MdOutlineDelete /></Button></TooltipMUI>
                    </div>
                </TableCell>
                </TableRow>
                <TableRow>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <Checkbox {...label} size="small"/>
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className='body-banner'>
                        <div className='body-img'>
                        <img src='https://www.houseofmasaba.com/cdn/shop/files/Masaba100410copy.jpg?v=1720173528' alt="img"/>
                        </div>
                    </div>
                </TableCell>
                
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className='dash-btns'>
                        <TooltipMUI title="Edit"><Button className='dash-btn'><FiEdit3 /></Button></TooltipMUI>
                        <TooltipMUI title="View"><Button className='dash-btn'><IoEye /></Button></TooltipMUI>
                        <TooltipMUI title="Delete"><Button className='dash-btn'><MdOutlineDelete /></Button></TooltipMUI>
                    </div>
                </TableCell>
                </TableRow> */}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={bannerData?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </div>
    </>
  )
}

export default HomeBanner
