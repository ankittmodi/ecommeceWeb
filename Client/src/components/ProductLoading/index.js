import React from 'react'
import './style.css';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
const ProductLoading = () => {
  return (
    <div className='skeleton'>
    <Box sx={{ width: 300 }}>
        <Skeleton sx={{ bgcolor: 'grey.600' }}
            variant="rectangular"
            width={270}
            height={300}/>
        <Skeleton animation="wave" width={270}/>
        <Skeleton animation={false} width={270}/>
        <Skeleton animation={false} width={270}/>
        <Skeleton animation={false} width={270}/>
    </Box>
    <Box sx={{ width: 300 }}>
        <Skeleton sx={{ bgcolor: 'grey.600' }}
            variant="rectangular"
            width={270}
            height={300}/>
        <Skeleton animation="wave" width={270}/>
        <Skeleton animation={false} width={270}/>
        <Skeleton animation={false} width={270}/>
        <Skeleton animation={false} width={270}/>
    </Box>
    <Box sx={{ width: 300 }}>
        <Skeleton sx={{ bgcolor: 'grey.600' }}
            variant="rectangular"
            width={270}
            height={300}/>
        <Skeleton animation="wave" width={270}/>
        <Skeleton animation={false} width={270}/>
        <Skeleton animation={false} width={270}/>
        <Skeleton animation={false} width={270}/>
    </Box>
    <Box sx={{ width: 300 }}>
        <Skeleton sx={{ bgcolor: 'grey.600' }}
            variant="rectangular"
            width={270}
            height={300}/>
        <Skeleton animation="wave" width={270}/>
        <Skeleton animation={false} width={270}/>
        <Skeleton animation={false} width={270}/>
        <Skeleton animation={false} width={270}/>
    </Box>
    <Box sx={{ width: 300 }}>
        <Skeleton sx={{ bgcolor: 'grey.300' }}
            variant="rectangular"
            width={270}
            height={300}/>
        <Skeleton animation="wave" width={270}/>
        <Skeleton animation={false} width={270}/>
        <Skeleton animation={false} width={270}/>
        <Skeleton animation={false} width={270}/>
    </Box>

    </div>
  )
}

export default ProductLoading
