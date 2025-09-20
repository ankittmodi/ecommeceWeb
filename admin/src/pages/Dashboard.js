import React from 'react'
import './dashboard.css';
import Boxes from '../Component/DashboardBoxes/Boxes';
import hand from '../assests/hand.png';
import Button from '@mui/material/Button';
import { IoAdd } from "react-icons/io5";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, color, category, price, action) {
  return { name, color, category, price, action };
}

const rows = [
  createData('Apple MacBook Pro 17', 'Silver','Laptop', 'Rs. 1,20,000', 'Edit'),
  createData('Apple MacBook Pro 17', 'Silver','Laptop', 'Rs. 1,20,000', 'Edit'),
  createData('Apple MacBook Pro 17', 'Silver','Laptop', 'Rs. 1,20,000', 'Edit'),
  createData('Apple MacBook Pro 17', 'Silver','Laptop', 'Rs. 1,20,000', 'Edit'),
  createData('Apple MacBook Pro 17', 'Silver','Laptop', 'Rs. 1,20,000', 'Edit'),
  createData('Apple MacBook Pro 17', 'Silver','Laptop', 'Rs. 1,20,000', 'Edit'),
  createData('Apple MacBook Pro 17', 'Silver','Laptop', 'Rs. 1,20,000', 'Edit'),
  createData('Apple MacBook Pro 17', 'Silver','Laptop', 'Rs. 1,20,000', 'Edit'),
];
const Dashboard = () => {
  return (
    <div className='dashboard'>
      <div className="dash">
        <div className="info">
          <h1>Good Morning,<br />Ankit <img src={hand} alt="" /></h1>
          <p>Here's What happening on your store today. See the statics at once.</p>
          <Button className='btn-blue'><IoAdd />Add Product</Button>
        </div>
        <img src="" alt="" />
      </div>
      <Boxes/>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>PRODUCT NAME</StyledTableCell>
            <StyledTableCell align="right">COLOR</StyledTableCell>
            <StyledTableCell align="right">CATEGORY</StyledTableCell>
            <StyledTableCell align="right">PRICE</StyledTableCell>
            <StyledTableCell align="right">ACTION</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.color}</StyledTableCell>
              <StyledTableCell align="right">{row.category}</StyledTableCell>
              <StyledTableCell align="right">{row.price}</StyledTableCell>
              <StyledTableCell align="right">{row.action}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default Dashboard
