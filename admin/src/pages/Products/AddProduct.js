// FULL & CORRECT ADD PRODUCT TEMPLATE (RAM, SIZE, WEIGHT FIXED)
import React,{useContext, useEffect, useState} from 'react'
import './style.css'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import UploadBox from '../../Component/UploadBox';
import { IoMdClose } from "react-icons/io";
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';
import { MyContext } from '../../App';
import { deleteImage, fetchDataFromApi, postData } from '../../utils/Api';
import { MdOutlineCloudUpload } from "react-icons/md";

const AddProduct = () => {

    const [formFeilds, setFormfeilds] = useState({
        name:"",
        description:"",
        images:[],
        brand:"",
        price:"",
        oldPrice:"",
        catName:"",
        category:"",
        catId:"",
        subCatId:"",
        subCatName:"",
        thirdsubCat:"",
        thirdsubCatId:"",
        countInStock:"",
        rating:"",
        isFeatured:false,
        discount:"",
        productRam:[],
        size:[],
        productWeight:[],
        dateCreated:"",
    });

    const [previews, setPreviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const context = useContext(MyContext);

    const [productCat, setproductCat] = useState('');
    const [productSubCat, setproductSubCat] = useState('');
    const [productThirdLevelCat, setproductThirdLevelCat] = useState('');
    const [productFeatured, setproductFeatured] = useState('');

    // -------------------- RAM --------------------
    const [ramList, setRamList] = useState([]);
    const [selectedRams, setSelectedRams] = useState([]);

    // -------------------- SIZE --------------------
    const [sizeList, setSizeList] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);

    // -------------------- WEIGHT --------------------
    const [weightList, setWeightList] = useState([]);
    const [selectedWeights, setSelectedWeights] = useState([]);

    // FETCH LISTS: RAM, SIZE, WEIGHT
    useEffect(() => {
        fetchDataFromApi('/api/product/productRams/get').then((res) => {
            if (res?.success) setRamList(res?.data);
        });

        fetchDataFromApi('/api/product/productSize/get').then((res) => {
            if (res?.success) setSizeList(res?.data);
        });

        fetchDataFromApi('/api/product/productWeight/get').then((res) => {
            if (res?.success) setWeightList(res?.data);
        });

    }, []);

    // -------------------- CATEGORY CHANGE --------------------
    const handleChange = (event) => {
        const id = event.target.value;
        const catObj = context.catData.find(cat => cat._id === id);

        setproductCat(id);

        setFormfeilds(prev => ({
            ...prev,
            catId: id,
            catName: catObj?.name || "",
            category: id,
            subCatId: "",
            subCat: "",
            thirdsubCatId: "",
            thirdsubCat: ""
        }));
    };

    const handleProductSubCat = (event) => {
        const id = event.target.value;
        setproductSubCat(id);

        let subCat = "";
        context.catData.forEach(cat => {
            const sub = cat.children?.find(s => s._id === id);
            if (sub) subCat = sub.name;
        });

        setFormfeilds(prev => ({
            ...prev,
            subCatId: id,
            subCat
        }));
    };

    const handleProductThirdLevelCat = (event) => {
        const id = event.target.value;
        setproductThirdLevelCat(id);

        let thirdName = "";
        context.catData.forEach(cat => {
            cat.children?.forEach(sub => {
                const third = sub.children?.find(t => t._id === id);
                if (third) thirdName = third.name;
            });
        });

        setFormfeilds(prev => ({
            ...prev,
            thirdsubCatId: id,
            thirdsubCat: thirdName
        }));
    };

    // -------------------- FEATURED --------------------
    const handleIsFeatured = (event) => {
        setproductFeatured(event.target.value);
        setFormfeilds(prev => ({ ...prev, isFeatured: event.target.value }));
    };

    // -------------------- RAM SELECT --------------------
    const handleProductRam = (event) => {
        let value = event.target.value;

        if (!Array.isArray(value)) value = [value];   // FIX

        setSelectedRams(value);
        setFormfeilds(prev => ({
            ...prev,
            productRam: value
        }));
    };


    // -------------------- SIZE SELECT --------------------
    const handleProductSize = (event) => {
        let value = event.target.value;

        if (!Array.isArray(value)) value = [value];   // FIX

        setSelectedSizes(value);
        setFormfeilds(prev => ({
            ...prev,
            size: value
        }));
    };


    // -------------------- WEIGHT SELECT --------------------
    const handleProductWeight = (event) => {
        let value = event.target.value;

        if (!Array.isArray(value)) value = [value];   // FIX

        setSelectedWeights(value);
        setFormfeilds(prev => ({
            ...prev,
            productWeight: value
        }));
    };


    // -------------------- RATING --------------------
    const onChangeRating = (e, newValue) => {
        setFormfeilds(prev => ({
            ...prev,
            rating: newValue
        }));
    };

    // -------------------- INPUT HANDLER --------------------
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormfeilds(prev => ({ ...prev, [name]: value }));
    };

    // -------------------- IMAGE UPLOAD --------------------
    const setPreviewsFun = (previewsArr) => {
        setPreviews([...previewsArr]);
        setFormfeilds(prev => ({ ...prev, images: previewsArr }));
    };

    const removeCategoryImage = (image, index) => {
        deleteImage(`/api/product/deleteImage?img=${image}`).then(() => {
            const arr = [...previews];
            arr.splice(index, 1);
            setPreviews(arr);

            setFormfeilds(prev => ({
                ...prev,
                images: arr
            }));
        });
    };

    // -------------------- SUBMIT --------------------
    const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formFeilds);

    const requiredFields = [
        "name",
        "description",
        "brand",
        "price",
        "catId",
        "subCat",
        "countInStock",
        "rating",
        "discount",
    ];

    // 🛑 Check empty required fields
    for (let field of requiredFields) {
        if (
        formFeilds[field] === "" ||
        formFeilds[field] === null ||
        formFeilds[field] === undefined
        ) {
        context.openAlertBox("error", `Please enter product ${field}`);
        setIsLoading(false);
        return;
        }
    }

    // 🛑 Validate images
    if (!formFeilds.images || formFeilds.images.length === 0) {
        context.openAlertBox("error", "Please upload product images");
        setIsLoading(false);
        return;
    }

    setIsLoading(true);

    postData("/api/product/create", formFeilds).then((res) => {
        console.log(res);

        if (!res.error) {
        context.openAlertBox("success", res.message);

        setTimeout(() => {
            setIsLoading(false);
            context.setIsOpenFullScreen({ open: false });
        }, 1000);
        } else {
        setIsLoading(false);
        context.openAlertBox("error", res.message);
        }
    });
    };


    return (
        <section className='add-product'>
            <form className='form' onSubmit={handleSubmit}>
                <div className='scroll-form'>

                    {/* ---------------- PRODUCT BASIC ---------------- */}
                    <div className='products'>
                        <div className='col'>
                            <h3>Product Name</h3>
                            <input type='text' className='search'
                                name='name'
                                value={formFeilds.name}
                                onChange={onChangeInput}
                            />
                        </div>
                    </div>

                    <div className='products'>
                        <div className='col'>
                            <h3>Product Description</h3>
                            <textarea className='textarea'
                                name='description'
                                value={formFeilds.description}
                                onChange={onChangeInput}
                            />
                        </div>
                    </div>

                    {/* ---------------- CATEGORY GRID ---------------- */}
                    <div className='products product-grid'>

                        {/* CATEGORY */}
                        <div className='col'>
                            <h3>Product Category</h3>
                            {context.catData.length !== 0 && (
                                <Select size='small'
                                    value={productCat}
                                    onChange={handleChange}
                                    sx={{ width: '100%' }}
                                >
                                    {context.catData.map(cat => (
                                        <MenuItem key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        </div>

                        {/* SUB CAT */}
                        <div className='col'>
                            <h3>Product Sub Category</h3>
                            <Select size='small'
                                value={productSubCat}
                                onChange={handleProductSubCat}
                                sx={{ width: '100%' }}
                            >
                                {context.catData.map(cat =>
                                    cat.children?.map(sub => (
                                        <MenuItem key={sub._id} value={sub._id}>
                                            {sub.name}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                        </div>

                        {/* THIRD CATEGORY */}
                        <div className='col'>
                            <h3>Third Level Category</h3>
                            <Select size='small'
                                value={productThirdLevelCat}
                                onChange={handleProductThirdLevelCat}
                                sx={{ width: '100%' }}
                            >
                                {context.catData.map(cat =>
                                    cat.children?.map(sub =>
                                        sub.children?.map(third => (
                                            <MenuItem key={third._id} value={third._id}>
                                                {third.name}
                                            </MenuItem>
                                        ))
                                    )
                                )}
                            </Select>
                        </div>

                        {/* PRICE */}
                        <div className='col'>
                            <h3>Price</h3>
                            <input type='number'
                                className='search'
                                name='price'
                                value={formFeilds.price}
                                onChange={onChangeInput}
                            />
                        </div>

                        {/* OLD PRICE */}
                        <div className='col'>
                            <h3>Old Price</h3>
                            <input type='number'
                                className='search'
                                name='oldPrice'
                                value={formFeilds.oldPrice}
                                onChange={onChangeInput}
                            />
                        </div>

                        {/* FEATURED */}
                        <div className='col'>
                            <h3>Featured</h3>
                            <Select size='small'
                                value={productFeatured}
                                onChange={handleIsFeatured}
                                sx={{ width: '100%' }}
                            >
                                <MenuItem value={true}>True</MenuItem>
                                <MenuItem value={false}>False</MenuItem>
                            </Select>
                        </div>

                        {/* STOCK */}
                        <div className='col'>
                            <h3>Stock</h3>
                            <input type='number'
                                className='search'
                                name='countInStock'
                                value={formFeilds.countInStock}
                                onChange={onChangeInput}
                            />
                        </div>

                        {/* BRAND */}
                        <div className='col'>
                            <h3>Brand</h3>
                            <input type='text'
                                className='search'
                                name='brand'
                                value={formFeilds.brand}
                                onChange={onChangeInput}
                            />
                        </div>

                        {/* DISCOUNT */}
                        <div className='col'>
                            <h3>Discount</h3>
                            <input type='number'
                                className='search'
                                name='discount'
                                value={formFeilds.discount}
                                onChange={onChangeInput}
                            />
                        </div>

                        {/* RAM */}
                        <div className='col'>
                            <h3>Product RAM</h3>
                            <Select
                                multiple
                                size='small'
                                value={selectedRams}
                                onChange={handleProductRam}
                                sx={{ width: '100%' }}
                            >
                                {ramList?.map(ram => (
                                    <MenuItem key={ram._id} value={ram.name}>
                                        {ram.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>

                        {/* SIZE */}
                        <div className='col'>
                            <h3>Product Size</h3>
                            <Select
                                multiple
                                size='small'
                                value={selectedSizes}
                                onChange={handleProductSize}
                                sx={{ width: '100%' }}
                            >
                                {sizeList?.map(s => (
                                    <MenuItem key={s._id} value={s.name}>
                                        {s.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>

                        {/* WEIGHT */}
                        <div className='col'>
                            <h3>Product Weight</h3>
                            <Select
                                multiple
                                size='small'
                                value={selectedWeights}
                                onChange={handleProductWeight}
                                sx={{ width: '100%' }}
                            >
                                {weightList?.map(w => (
                                    <MenuItem key={w._id} value={w.name}>
                                        {w.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>

                    </div>

                    {/* RATING */}
                    <div className='products product-grid'>
                        <div className='col'>
                            <h3>Rating</h3>
                            <Rating
                                defaultValue={1}
                                precision={0.5}
                                onChange={onChangeRating}
                            />
                        </div>
                    </div>

                    {/* IMAGES */}
                    <div className='upload col'>
                        <h3>Media & Images</h3>

                        <div className='upload-file'>
                            {previews?.map((img, index) => (
                                <div className='upload-file-wrapper' key={index}>
                                    <span className='close-icon'
                                        onClick={() => removeCategoryImage(img, index)}>
                                        <IoMdClose />
                                    </span>
                                    <div className='file'>
                                        <img src={img} alt="" />
                                    </div>
                                </div>
                            ))}

                            <UploadBox
                                multiple={true}
                                name="images"
                                url="/api/product/uploadImages"
                                setPreviewsFun={setPreviewsFun}
                            />
                        </div>
                    </div>
                </div>

                <br />
                <Button type="submit" className='header-btn'>
                    <MdOutlineCloudUpload className='upload-icon' />
                    {isLoading ? <CircularProgress size={20} /> : "Publish & View"}
                </Button>

            </form>
        </section>
    );
};

export default AddProduct;
