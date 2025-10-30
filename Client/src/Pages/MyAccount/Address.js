import React, { useContext, useState, useEffect } from "react";
import "./style.css";
import MyAccountSidebar from "../../components/MyAccountSidebar";
import { myContext } from "../../App";
import Radio from "@mui/material/Radio";
import { Button } from "@mui/material";
import { deleteData, fetchDataFromApi } from "../../utils/Api";
import AddAddress from "../AddAddress";
import { MdOutlineDelete } from "react-icons/md";
const Address = () => {
  const context = useContext(myContext);
  const [selectedValue, setSelectedValue] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const removeAddress = (id) => {
  deleteData(`/api/address/${id}`).then((res) => {
    context.openAlertBox("success","Address removed");

    // refresh list
    fetchDataFromApi(`/api/address/get?userId=${context.userData?._id}`).then((res)=>{
      context.setAddress(res.data);
    })
  }).catch(err=>{
    context.openAlertBox("error","Failed to remove");
  });
};

  // Fetch address list on mount
  useEffect(() => {
    if (context.userData?._id) {
      fetchDataFromApi(`/api/address/get?userId=${context.userData?._id}`).then(
        (res) => {
          context.setAddress(res.data);
        }
      );
    }
  }, [context.userData]);

  return (
    <div>
      <section className="my-account">
        <div className="container">
          <div className="col1">
            <MyAccountSidebar />
          </div>

          <div className="col2">
            <div className="submit-details">
              <h2>Address</h2>

              {/* Add Address button */}
              <div
                className="address"
                onClick={() => setShowForm(true)}
                style={{ cursor: "pointer" }}
              >
                <span style={{ color: "#000" }}>Add Address</span>
              </div>

              {/* ✅ Show AddAddress form inside page */}
              {showForm && (
                <AddAddress
                  onClose={() => setShowForm(false)}
                  onSuccess={() => {
                    setShowForm(false);

                    // Refresh list after adding
                    fetchDataFromApi(
                      `/api/address/get?userId=${context.userData?._id}`
                    ).then((res) => {
                      context.setAddress(res.data);
                    });
                  }}
                />
              )}

              {/* ✅ List all addresses below the form */}
              <div className="address-box">
                {context.address.length > 0 &&
                  context.address.map((item, index) => {
                    return (
                      <div className="address-part" key={index}>
                        <div>
                          <Radio
                          checked={selectedValue === item._id}
                          onChange={handleChange}
                          value={item._id}
                          name="radio-buttons"
                        />

                        <span style={{ color: "#000" }} >
                          {item.address_line1}, {item.city}, {item.state} -{" "}
                          {item.pincode}, {item.country}
                        </span>
                        </div>
                        <Button className="delete-btn" onClick={()=>removeAddress(item._id)}><MdOutlineDelete className="del-icon"/></Button>
                      </div>
                    );
                  })}
              </div>

              <br />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Address;
