import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import './subcatlist.css';
import { MyContext } from '../../App';
import { FaAngleDown } from "react-icons/fa6";
import EditSubCategory from '../../Component/EditSubCategory/EditSubCategory';

const SubCatList = () => {
  const [isOpen, setIsOpen] = useState(null);
  const context = useContext(MyContext);

  const expand = (index) => {
    setIsOpen(isOpen === index ? null : index);
  };

  return (
    <>
      <div className='homeSlide-header'>
        <div className='table-flex'>
          <h2>Sub Category List</h2>
        </div>
        <div className='column2'>
          <Button className='btn-blue col-btn'>Export</Button>
          <Button
            className='btn-blue'
            onClick={() =>
              context.setIsOpenFullScreen({
                open: true,
                model: "Add New Sub Category"
              })
            }
          >
            Add SubCategory
          </Button>
        </div>
      </div>

      <div className='card'>
        {context.catData.length !== 0 && (
          <ul className="level-1">
            {context.catData.filter(i => i.parentId === null).map((firstCat, index) => (
              <li key={index}>
                <div className='first-cat'>
                  <b>{firstCat.name}</b>
                  <Button className='angle' onClick={() => expand(index)}>
                    <FaAngleDown />
                  </Button>
                </div>

                {isOpen === index && firstCat.children.length !== 0 && (
                  <ul className='level-2'>
                    {firstCat.children.map((subCat) => (
                      <li key={subCat._id}>
                        <EditSubCategory {...subCat} catData={context.catData} />

                        {subCat.children.length !== 0 && (
                          <ul className='level-3'>
                            {subCat.children.map((third) => (
                              <li key={third._id}>
                                <EditSubCategory {...third} catData={context.catData} />
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SubCatList;
