import React,{useContext, useState} from 'react'
import './style.css'
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SearchBox from '../../Component/SearchBox';
import { MyContext } from '../../App';
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }; 
const columns = [
  { id: 'userImg', label: 'USER IMAGE', minWidth: 80 },
  { id: 'userName', label: 'USER NAME', minWidth: 100 },
  {
    id: 'userEmail',
    label: 'USER EMAIL',
    minWidth: 150,
  },
  {
    id: 'userPhone',
    label: 'PHONE NUMBER',
    minWidth: 130,
  },
];
const Users = () => {
    const [page, setPage] =useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const context=useContext(MyContext);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
    <div className='tables-card product-card' style={{paddingTop:"1.5rem"}}>
        <div className='dropdown'>
            <div className='product-table'>
                <h2>Users List</h2>
            </div>
            <div className='column2'>
              <SearchBox/>
            </div>
        </div>
        <br/>
        <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox {...label} size="small"/>
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell style={{minWidth:columns.minWidth}}>
                <Checkbox {...label} size="small"/>
              </TableCell>
              <TableCell style={{width:"80px"}}>
                <div className='body-flex'>
                    <div className='body-img' style={{width:"50px",height:"50px",borderRadius:"50%"}}>
                      <img src='https://www.houseofmasaba.com/cdn/shop/files/Masaba100410copy.jpg?v=1720173528' alt="img"/>
                    </div>
                  </div>
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
               Ankit Kumar
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                <span className='user-tool-icon'><MdOutlineMarkEmailRead/>ankit123@gmail.com</span>
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                <span className='user-tool-icon'><FaPhone/>6248374770</span>
              </TableCell>
            </TableRow>
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

export default Users
