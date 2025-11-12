import React, { useState,PureComponent, useContext } from 'react';
import './dashboard.css';
import Boxes from '../Component/DashboardBoxes/Boxes';
import hand from '../assests/hand.png';
import Button from '@mui/material/Button';
import { IoAdd } from "react-icons/io5";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import Badges from '../Component/Badges';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import ProgressBar from '../Component/progressBar';
import { FiEdit3 } from "react-icons/fi";
import { IoEye } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import TooltipMUI from '@mui/material/Tooltip';
import Pagination from '@mui/material/Pagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MyContext } from '../App';
import dash from '../assests/dash.jpg'
import Products from './Products';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }; 
const columns = [
  { id: 'product', label: 'PRODUCT', minWidth: 150 },
  { id: 'category', label: 'CATEGORY', minWidth: 100 },
  {
    id: 'subcategory',
    label: 'SUB CATEGORY',
    minWidth: 150,
  },
  {
    id: 'price',
    label: 'PRICE',
    minWidth: 130,
  },
  {
    id: 'sales',
    label: 'SALES',
    minWidth: 130,
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 130,
  },
];


const Dashboard = () => {
  const [isOpenOrder, setIsOpenOrder] = useState(null);
  const [page, setPage] =useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [chart1Data, setChart1Data] = useState([
    { name: "JAN", TotalSales: 4000, TotalUsers: 2400, amt: 2400 },
    { name: "FEB", TotalSales: 3000, TotalUsers: 1398, amt: 2210 },
    { name: "MAR", TotalSales: 2000, TotalUsers: 9800, amt: 2290 },
    { name: "APR", TotalSales: 2780, TotalUsers: 3908, amt: 2000 },
    { name: "MAY", TotalSales: 1890, TotalUsers: 4800, amt: 2181 },
    { name: "JUN", TotalSales: 2390, TotalUsers: 3800, amt: 2500 },
    { name: "JUL", TotalSales: 3490, TotalUsers: 4300, amt: 2100 },
    { name: "AUG", TotalSales: 3200, TotalUsers: 4100, amt: 2200 },
    { name: "SEP", TotalSales: 3100, TotalUsers: 4000, amt: 2100 },
    { name: "OCT", TotalSales: 3600, TotalUsers: 4200, amt: 2300 },
    { name: "NOV", TotalSales: 3900, TotalUsers: 4400, amt: 2400 },
    { name: "DEC", TotalSales: 4200, TotalUsers: 4600, amt: 2500 },
  ]);

  const context=useContext(MyContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const toggleOrder = (index) => {
    setIsOpenOrder(isOpenOrder === index ? null : index);
  };

  const handleChangeFilter = (event) => {
    setCategoryFilter(event.target.value);
  };

  return (
    <div className='dashboard'>
      {/* ---------- HEADER ---------- */}
      <div className="dash">
        <div className="info">
          <h1>
            Good Morning,<br />{localStorage.getItem("userName")} <img src={hand} alt="wave" />
          </h1>
          <p style={{color:"#000"}}>Here's what's happening on your store today. See all the stats at once.</p>
          <Button className='btn-blue' onClick={()=>context.setIsOpenFullScreen({
            open:true,
            model:"Add Product"
            })} style={{marginTop:"1rem"}}>
            <IoAdd /> Add Product
          </Button>
        </div>

        <div className='dash-img'><img src={dash}/></div>
      </div>

      {/* ---------- DASHBOARD BOXES ---------- */}
      <Boxes />

    {/* ---------- ORDERS TABLE ---------- */}
      <div className='tables-card'>
        <div className='table-flex'>
          <h2>Products</h2>
        </div>
        <div className='dropdown'>
            <div className='column'>
              <h4>Category By</h4>
                <Select
                  className='drop-menu'
                  size='small'
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={categoryFilter}
                  label="Category"
                  onChange={handleChangeFilter}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Men</MenuItem>
                  <MenuItem value={20}>Women</MenuItem>
                  <MenuItem value={30}>Kids</MenuItem>
                </Select>
            </div>
            <div className='column2'>
              <Button className='btn-blue col-btn'>Export</Button>
              <Button className='btn-blue' onClick={()=>context.setIsOpenFullScreen({
                open:true,
                model:"Add Product"
                })}>Add Product</Button>
            </div>
        </div>

        <div className="table-wrapper">
          <table className="order-table">
            <thead className='table-container'>
              <tr className='table-header'>
                <th><Checkbox {...label} size='small'/></th>
                <th>Product</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className='table-body'>
                  <Checkbox {...label} size='small'/>
                </td>

                <td>
                  <div className='body-flex'>
                    <div className='body-img'>
                      <img src='https://www.houseofmasaba.com/cdn/shop/files/Masaba100410copy.jpg?v=1720173528' alt="img"/>
                    </div>
                    <div className='body-info'>
                      <h3><Link to='/product/9894375'>Pink Whispering Lily Crush Saree</Link></h3>
                      <p>Saree- Beautiful printed saree with Mystic print crushed palla</p>
                    </div>
                  </div>
                </td>
                <td>Electronics</td>
                <td>Women</td>
                <td><p>Rs. 1300</p></td>
                <td>
                  <p className="progress-bar">234 Sales</p>
                  <ProgressBar value={60} type="error" />
                </td>
                <td>
                  <div className='dash-btns'>
                    <TooltipMUI title="Edit"><Button className='dash-btn'><FiEdit3 /></Button></TooltipMUI>
                    <TooltipMUI title="View"><Button className='dash-btn'><IoEye /></Button></TooltipMUI>
                    <TooltipMUI title="Delete"><Button className='dash-btn'><MdOutlineDelete /></Button></TooltipMUI>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='table-body'>
                  <Checkbox {...label} size='small'/>
                </td>

                <td>
                  <div className='body-flex'>
                    <div className='body-img'>
                      <img src='https://www.houseofmasaba.com/cdn/shop/files/Masaba100410copy.jpg?v=1720173528' alt="img"/>
                    </div>
                    <div className='body-info'>
                      <h3><Link to='/product/9894375'>Pink Whispering Lily Crush Saree</Link></h3>
                      <p>Saree- Beautiful printed saree with Mystic print crushed palla</p>
                    </div>
                  </div>
                </td>
                <td>Electronics</td>
                <td>Women</td>
                <td><p>Rs. 1300</p></td>
                <td>
                  <p className="progress-bar">234 Sales</p>
                  <ProgressBar value={60} type="error" />
                </td>
                <td>
                  <div className='dash-btns'>
                    <TooltipMUI title="Edit"><Button className='dash-btn'><FiEdit3 /></Button></TooltipMUI>
                    <TooltipMUI title="View"><Button className='dash-btn'><IoEye /></Button></TooltipMUI>
                    <TooltipMUI title="Delete"><Button className='dash-btn'><MdOutlineDelete /></Button></TooltipMUI>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='table-body'>
                  <Checkbox {...label} size='small'/>
                </td>

                <td>
                  <div className='body-flex'>
                    <div className='body-img'>
                      <img src='https://www.houseofmasaba.com/cdn/shop/files/Masaba100410copy.jpg?v=1720173528' alt="img"/>
                    </div>
                    <div className='body-info'>
                      <h3><Link to='/product/9894375'>Pink Whispering Lily Crush Saree</Link></h3>
                      <p>Saree- Beautiful printed saree with Mystic print crushed palla</p>
                    </div>
                  </div>
                </td>
                <td>Electronics</td>
                <td>Women</td>
                <td><p>Rs. 1300</p></td>
                <td>
                  <p className="progress-bar">234 Sales</p>
                  <ProgressBar value={60} type="error" />
                </td>
                <td>
                  <div className='dash-btns'>
                    <TooltipMUI title="Edit"><Button className='dash-btn'><FiEdit3 /></Button></TooltipMUI>
                    <TooltipMUI title="View"><Button className='dash-btn'><IoEye /></Button></TooltipMUI>
                    <TooltipMUI title="Delete"><Button className='dash-btn'><MdOutlineDelete /></Button></TooltipMUI>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='table-body'>
                  <Checkbox {...label} size='small'/>
                </td>

                <td>
                  <div className='body-flex'>
                    <div className='body-img'>
                      <img src='https://www.houseofmasaba.com/cdn/shop/files/Masaba100410copy.jpg?v=1720173528' alt="img"/>
                    </div>
                    <div className='body-info'>
                      <h3><Link to='/product/9894375'>Pink Whispering Lily Crush Saree</Link></h3>
                      <p>Saree- Beautiful printed saree with Mystic print crushed palla</p>
                    </div>
                  </div>
                </td>
                <td>Electronics</td>
                <td>Women</td>
                <td><p>Rs. 1300</p></td>
                <td>
                  <p className="progress-bar">234 Sales</p>
                  <ProgressBar value={60} type="error" />
                </td>
                <td>
                  <div className='dash-btns'>
                    <TooltipMUI title="Edit"><Button className='dash-btn'><FiEdit3 /></Button></TooltipMUI>
                    <TooltipMUI title="View"><Button className='dash-btn'><IoEye /></Button></TooltipMUI>
                    <TooltipMUI title="Delete"><Button className='dash-btn'><MdOutlineDelete /></Button></TooltipMUI>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='pagination'>
          <Pagination count={10} />
        </div>
      </div>
      <div className='tables-card'>
        {/* <div className='table-flex'>
          <h2>Products (material ui)</h2>
        </div>
        <div className='dropdown'>
            <div className='column'>
              <h4>Category By</h4>
                <Select
                  className='drop-menu'
                  size='small'
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={categoryFilter}
                  label="Category"
                  onChange={handleChangeFilter}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Men</MenuItem>
                  <MenuItem value={20}>Women</MenuItem>
                  <MenuItem value={30}>Kids</MenuItem>
                </Select>
            </div>
            <div className='column2'>
              <Button className='btn-blue col-btn'>Export</Button>
              <Button className='btn-blue' onClick={()=>context.setIsOpenFullScreen({
                open:true,
                model:"Add Product"
                })}>Add Product</Button>
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
              <TableCell style={{minWidth:columns.minWidth}}>
                <div className='body-flex'>
                    <div className='body-img'>
                      <img src='https://www.houseofmasaba.com/cdn/shop/files/Masaba100410copy.jpg?v=1720173528' alt="img"/>
                    </div>
                    <div className='body-info'>
                      <h3><Link to='/product/9894375'>Pink Whispering Lily Crush Saree</Link></h3>
                      <p>Saree- Beautiful printed saree with Mystic print crushed palla</p>
                    </div>
                  </div>
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                Electronics
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                Women
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                <p>Rs. 1300</p>
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                <p className="progress-bar">234 Sales</p>
                  <ProgressBar value={60} type="error" />
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
                <div className='body-flex'>
                    <div className='body-img'>
                      <img src='https://www.houseofmasaba.com/cdn/shop/files/Masaba100410copy.jpg?v=1720173528' alt="img"/>
                    </div>
                    <div className='body-info'>
                      <h3><Link to='/product/9894375'>Pink Whispering Lily Crush Saree</Link></h3>
                      <p>Saree- Beautiful printed saree with Mystic print crushed palla</p>
                    </div>
                  </div>
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                Electronics
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                Women
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                <p>Rs. 1300</p>
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                <p className="progress-bar">234 Sales</p>
                  <ProgressBar value={60} type="error" />
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
                <div className='body-flex'>
                    <div className='body-img'>
                      <img src='https://www.houseofmasaba.com/cdn/shop/files/Masaba100410copy.jpg?v=1720173528' alt="img"/>
                    </div>
                    <div className='body-info'>
                      <h3><Link to='/product/9894375'>Pink Whispering Lily Crush Saree</Link></h3>
                      <p>Saree- Beautiful printed saree with Mystic print crushed palla</p>
                    </div>
                  </div>
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                Electronics
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                Women
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                <p>Rs. 1300</p>
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                <p className="progress-bar">234 Sales</p>
                  <ProgressBar value={60} type="error" />
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
                <div className='body-flex'>
                    <div className='body-img'>
                      <img src='https://www.houseofmasaba.com/cdn/shop/files/Masaba100410copy.jpg?v=1720173528' alt="img"/>
                    </div>
                    <div className='body-info'>
                      <h3><Link to='/product/9894375'>Pink Whispering Lily Crush Saree</Link></h3>
                      <p>Saree- Beautiful printed saree with Mystic print crushed palla</p>
                    </div>
                  </div>
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                Electronics
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                Women
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                <p>Rs. 1300</p>
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                <p className="progress-bar">234 Sales</p>
                  <ProgressBar value={60} type="error" />
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
                <div className='body-flex'>
                    <div className='body-img'>
                      <img src='https://www.houseofmasaba.com/cdn/shop/files/Masaba100410copy.jpg?v=1720173528' alt="img"/>
                    </div>
                    <div className='body-info'>
                      <h3><Link to='/product/9894375'>Pink Whispering Lily Crush Saree</Link></h3>
                      <p>Saree- Beautiful printed saree with Mystic print crushed palla</p>
                    </div>
                  </div>
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                Electronics
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                Women
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                <p>Rs. 1300</p>
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                <p className="progress-bar">234 Sales</p>
                  <ProgressBar value={60} type="error" />
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
                <div className='body-flex'>
                    <div className='body-img'>
                      <img src='https://www.houseofmasaba.com/cdn/shop/files/Masaba100410copy.jpg?v=1720173528' alt="img"/>
                    </div>
                    <div className='body-info'>
                      <h3><Link to='/product/9894375'>Pink Whispering Lily Crush Saree</Link></h3>
                      <p>Saree- Beautiful printed saree with Mystic print crushed palla</p>
                    </div>
                  </div>
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                Electronics
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                Women
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                <p>Rs. 1300</p>
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                <p className="progress-bar">234 Sales</p>
                  <ProgressBar value={60} type="error" />
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
                <div className='body-flex'>
                    <div className='body-img'>
                      <img src='https://www.houseofmasaba.com/cdn/shop/files/Masaba100410copy.jpg?v=1720173528' alt="img"/>
                    </div>
                    <div className='body-info'>
                      <h3><Link to='/product/9894375'>Pink Whispering Lily Crush Saree</Link></h3>
                      <p>Saree- Beautiful printed saree with Mystic print crushed palla</p>
                    </div>
                  </div>
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                Electronics
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                Women
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                <p>Rs. 1300</p>
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                <p className="progress-bar">234 Sales</p>
                  <ProgressBar value={60} type="error" />
              </TableCell>
              <TableCell style={{minWidth:columns.minWidth}}>
                <div className='dash-btns'>
                    <TooltipMUI title="Edit"><Button className='dash-btn'><FiEdit3 /></Button></TooltipMUI>
                    <TooltipMUI title="View"><Button className='dash-btn'><IoEye /></Button></TooltipMUI>
                    <TooltipMUI title="Delete"><Button className='dash-btn'><MdOutlineDelete /></Button></TooltipMUI>
                  </div>
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
      /> */}
      <Products/>
      </div>

      {/* ---------- ORDERS TABLE ---------- */}
      <div className='tables-card'>
        <div className='table-flex'>
          <h2>Recent Orders</h2>
        </div>

        <div className="table-wrapper">
          <table className="order-table">
            <thead className='table-container'>
              <tr className='table-header'>
                <th>&nbsp;</th>
                <th>Order Id</th>
                <th>Payment Id</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Pincode</th>
                <th>Total Amount</th>
                <th>Email</th>
                <th>User Id</th>
                <th>Order Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {/* ---------- ORDER 1 ---------- */}
              <tr>
                <td>
                  <Button onClick={() => toggleOrder(0)}>
                    {isOpenOrder === 0 ? <FaAngleUp /> : <FaAngleDown />}
                  </Button>
                </td>
                <td style={{color:"blue"}}>3h4g56g476g4g4h5j7</td>
                <td style={{color:"blue"}}>h4g56g476g4</td>
                <td>Ankit Kumar</td>
                <td>5485158415</td>
                <td>Maithon, Dhanbad, Jharkhand, India</td>
                <td>828407</td>
                <td>₹1499.00</td>
                <td>murad345@gmail.com</td>
                <td>Ankit123445</td>
                <td><Badges status='pending' /></td>
                <td>25-07-2025</td>
              </tr>
              {isOpenOrder === 0 && (
                <>
                  <tr>
                    <td colSpan="12">
                      <hr />
                      <table className="order-table1">
                        <thead>
                          <tr>
                            <th>Product Id</th>
                            <th>Product Title</th>
                            <th>Image</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td >3h4g56g476g4g4h5j7</td>
                            <td>Koskii Saree</td>
                            <td>
                              <img
                                src="https://serviceapi.spicezgold.com/download/1742462383493_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-1-202308161431.jpg"
                                alt=""
                                className='table-img'
                              />
                            </td>
                            <td>1</td>
                            <td>₹1500.00</td>
                            <td>₹1540.00</td>
                          </tr>
                          <tr>
                            <td>3h4g56g476g4g4h5j7</td>
                            <td>Koskii Saree</td>
                            <td>
                              <img
                                src="https://serviceapi.spicezgold.com/download/1742462383493_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-1-202308161431.jpg"
                                alt=""
                                className='table-img'
                              />
                            </td>
                            <td>1</td>
                            <td>₹1500.00</td>
                            <td>₹1540.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </>
              )}

              {/* ---------- ORDER 2 ---------- */}
              <tr>
                <td>
                  <Button onClick={() => toggleOrder(1)}>
                    {isOpenOrder === 1 ? <FaAngleUp /> : <FaAngleDown />}
                  </Button>
                </td>
                <td style={{color:"blue"}}>8j4l56g4k6g4g4h5k9</td>
                <td style={{color:"blue"}}>h8l56g476g4</td>
                <td>Ravi Kumar</td>
                <td>7845124598</td>
                <td>Delhi, India</td>
                <td>110001</td>
                <td>₹2499.00</td>
                <td>ravi123@gmail.com</td>
                <td>Ravi0098</td>
                <td><Badges status='confirmed' /></td>
                <td>01-08-2025</td>
              </tr>

              {isOpenOrder === 1 && (
                <>
                  <tr>
                    <td colSpan="12">
                      <hr />
                      <table className="order-table1">
                        <thead>
                          <tr>
                            <th>Product Id</th>
                            <th>Product Title</th>
                            <th>Image</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>8j4l56g4k6g4g4h5k9</td>
                            <td>Lehenga Set</td>
                            <td>
                              <img
                                src="https://serviceapi.spicezgold.com/download/1742462383493_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-1-202308161431.jpg"
                                alt=""
                                className='table-img'
                              />
                            </td>
                            <td>1</td>
                            <td>₹2500.00</td>
                            <td>₹2540.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* recharts */}
      <div className='tables-card'>
        <div className='table-flex ' style={{paddingBottom:"0"}}>
          <h2>Total Users & Total Sales</h2>
        </div>
        <div className='table-flex table-group'>
          <span className='total-group'><span className='total-user'></span>Total Users</span>
          <span className='total-group'><span className='total-user'></span>Total Sales</span>
        </div>
        <div className="table-wrapper">
              <LineChart
              width={1200}
              height={500}
              data={chart1Data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke='none'/>
              <XAxis dataKey="name" tick={{fontSize:12}}/>
              <YAxis tick={{fontSize:12}}/>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="TotalUsers" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={3}/>
              <Line type="monotone" dataKey="TotalSales" stroke="#82ca9d" strokeWidth={3}/>
            </LineChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
