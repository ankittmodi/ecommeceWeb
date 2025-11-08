import React, { useContext, useState } from 'react'
import './style.css'
import 'react-lazy-load-image-component/src/effects/blur.css';
import {Button} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { MyContext } from '../../App';
import { postData } from '../../utils/Api';

const AddSubCategory = () => {

    const [level1, setLevel1] = useState('');
    const [level2, setLevel2] = useState('');

    const [formFeilds,setFormfeilds] = useState({
        name:"",
        parentCatName:null,
        parentId:null
    });

    const [formFeilds2,setFormfeilds2] = useState({
        name:"",
        parentCatName:null,
        parentId:null
    });

    const [isLoading,setIsLoading] = useState(false);
    const [isLoading2,setIsLoading2] = useState(false);
    const context = useContext(MyContext);

    const level1Obj = context.catData.find(c => c._id === level1);
    const level2Obj = level1Obj?.children?.find(c => c._id === level2);

    const onChangeInput=(e)=>{
        const{name,value}=e.target;
        setFormfeilds(prev=>({...prev,[name]:value}))
    }

    const onChangeInput2=(e)=>{
        const{name,value}=e.target;
        setFormfeilds2(prev=>({...prev,[name]:value}))
    }

    const handleLevel1 = (e)=>{
        const val = e.target.value;
        setLevel1(val);
        setFormfeilds(prev=>({...prev,parentId:val}));
        setFormfeilds(prev=>({...prev,parentCatName: context.catData.find(c=>c._id===val).name}))
    }

    const handleLevel2 = (e)=>{
        const val = e.target.value;
        setLevel2(val);
        setFormfeilds2(prev=>({...prev,parentId:val}));
        setFormfeilds2(prev=>({...prev,parentCatName: level1Obj.children.find(c=>c._id===val).name}))
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!formFeilds.name || !level1) return;
        setIsLoading(true);

        postData("/api/category/create",formFeilds).then(()=>{
            setTimeout(()=>{
                setIsLoading(false);
                context.setIsOpenFullScreen({open:false});
                context.getCat();
            },1500)
        })
    }

    const handleSubmit2=(e)=>{
        e.preventDefault();
        if(!formFeilds2.name || !level2) return;
        setIsLoading2(true);

        postData("/api/category/create",formFeilds2).then(()=>{
            setTimeout(()=>{
                setIsLoading2(false);
                context.setIsOpenFullScreen({open:false});
                context.getCat();
            },1500)
        })
    }

  return (
    <section className='add-product sub-cat-cat'>

        {/* Level-2 */}
        <form className='form' onSubmit={handleSubmit}>
            <h4>Add Sub Category</h4>
            <div className='scroll-form'>
                <div className='products sub-category'>
                    <div className='col'>
                        <h3>Product Category</h3>
                        <Select
                            size='small'
                            onChange={handleLevel1}
                            value={level1}
                            sx={{width:"100%"}}
                        >
                            {context.catData.map(c=>(
                                <MenuItem value={c._id} key={c._id}>{c.name}</MenuItem>
                            ))}
                        </Select>
                    </div>

                    <div className='col'>
                        <h3>Sub Category Name</h3>
                        <input type='text' className='search'
                            name='name'
                            value={formFeilds.name}
                            onChange={onChangeInput}
                            disabled={isLoading}
                        />
                    </div>
                </div>
            </div>
            <Button type="submit" className='header-btn'>Publish and View</Button>
        </form>

        {/* Level-3 */}
        <form className='form' onSubmit={handleSubmit2}>
            <h4>Add Second Level Category</h4>
            <div className='scroll-form'>
                <div className='products sub-category'>
                    <div className='col'>
                        <h3>Product Category</h3>
                        <Select
                            size='small'
                            onChange={handleLevel2}
                            value={level2}
                            sx={{width:"100%"}}
                        >
                            {level1Obj?.children?.map(c=>(
                                <MenuItem value={c._id} key={c._id}>{c.name}</MenuItem>
                            ))}
                        </Select>
                    </div>

                    <div className='col'>
                        <h3>Sub Category Name</h3>
                        <input type='text' className='search'
                            name='name'
                            value={formFeilds2.name}
                            onChange={onChangeInput2}
                            disabled={isLoading2}
                        />
                    </div>
                </div>
            </div>
            <Button type="submit" className='header-btn'>Publish and View</Button>
        </form>

    </section>
  )
}

export default AddSubCategory;
