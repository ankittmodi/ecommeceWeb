import React,{useContext, useState} from 'react'
import './style.css'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import ProgressBar from '../../Component/progressBar';
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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SearchBox from '../../Component/SearchBox';
import { MyContext } from '../../App';

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
const Products = () => {
    const [isOpenOrder, setIsOpenOrder] = useState(null);
    const [page, setPage] =useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [categoryFilter, setCategoryFilter] = useState('');
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
    <>
    <div className='product-table'>
          <h2>Products (material ui)</h2>
          <div className='product-btns'>
            <Button className='product-btn'>Export</Button>
            <Button className='product-btn' onClick={()=>context.setIsOpenFullScreen({
                open:true,
                model:'Add Product'
            })}>Add Product</Button>
          </div>
    </div>
    <div className='tables-card product-card' style={{paddingTop:"1.5rem"}}>
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
      />
      </div> 
    </>
  )
}

export default Products
