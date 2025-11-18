import React, { useState } from 'react';
import './collapse.css';
import { Link } from 'react-router-dom';
import { FiMinus } from "react-icons/fi";
import { FaRegPlusSquare } from "react-icons/fa";

const CategoryCollapse = (props) => {

  const [submenuindex, setsubmenuindex] = useState(null);
  const [subSubMenuIndex, setSubSubMenuIndex] = useState(null); // State for the third level

  const openSubmenu = (index) => {
    setsubmenuindex(submenuindex === index ? null : index);
    setSubSubMenuIndex(null); // Close third-level menus when top level changes
  };

  // Function to handle the third level collapse.
  // It takes the main index (i) and the sub-index (j) to identify the unique third menu.
  const openSubSubmenu = (i, j) => {
    const uniqueIndex = `${i}-${j}`;
    setSubSubMenuIndex(subSubMenuIndex === uniqueIndex ? null : uniqueIndex);
  };

  return (
    <div>
      <div className="scroll2">
        <ul className="list-style list1">

          {props?.data?.length > 0 && props?.data?.map((cat, index) => (
            <li key={index} className="cat-item">

              <div className="cat-row">
                <Link to="/productlisting" className="cat-link">{cat?.name}</Link>

                {cat?.children?.length > 0 && (
                  submenuindex === index ? (
                    <FiMinus className='icon3' onClick={() => openSubmenu(index)} />
                  ) : (
                    <FaRegPlusSquare className='icon3' onClick={() => openSubmenu(index)} />
                  )
                )}
              </div>

              {submenuindex === index && cat?.children?.length > 0 && (
                <ul className="submenu2">
                  {cat?.children?.map((subCat, subIndex) => {
                    const uniqueSubIndex = `${index}-${subIndex}`;
                    const isSubSubMenuOpen = subSubMenuIndex === uniqueSubIndex;
                    const hasThirdLevel = subCat.children && subCat.children.length > 0;

                    return (
                      <li key={subIndex} className="submenu-item">

                        <div className="subcat-row">
                          <Link to="/" className="subcat-link">{subCat?.name}</Link>
                          
                          {hasThirdLevel && (
                            isSubSubMenuOpen ? (
                              <FiMinus className='icon4' onClick={() => openSubSubmenu(index, subIndex)} />
                            ) : (
                              <FaRegPlusSquare className='icon4' onClick={() => openSubSubmenu(index, subIndex)} />
                            )
                          )}
                        </div>

                        {/* THIRD LEVEL SUBMENU */}
                        {isSubSubMenuOpen && hasThirdLevel && (
                          <ul className="third-level-submenu">
                            {subCat.children.map((thirdCat, thirdIndex) => (
                              <li key={thirdIndex} className="third-level-item">
                                <Link to="/">{thirdCat.name}</Link>
                              </li>
                            ))}
                          </ul>
                        )}

                      </li>
                    );
                  })}
                </ul>
              )}

            </li>
          ))}

        </ul>
      </div>
    </div>
  );
}

export default CategoryCollapse;