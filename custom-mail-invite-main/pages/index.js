import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Index() {
  const [value, setValue] = useState(true);
  const [data, setData] = useState(true);

  const getShop = async () => {
    try {
      const getRequest = await window.api.get(`/checkShop?shop=${window.shop}`);
      console.log("getRequest", getRequest);

      const invite = getRequest.data.sendInvite;
      console.log("invite", invite);

      if (invite == false) {
        setValue(false);
        setData(false);
      } else {
        setValue(true);
        setData(true);
      }
    } catch (e) {
      console.log("err", e);
    }
  };

  useEffect(() => {
    getShop();
  }, []);

  console.log("value", value);
  console.log("data", data);

  const handleDataPost = async (e) => {
    console.log("data123", data);

    const newData = {
      data: data,
    };

    const postRequest = await window.api
      .post(`/customersInvite?shop=${window.shop}`, newData)
      .then(() => {})
      .catch((err) => console.log(err));
    console.log("postRequest", postRequest);
  };

  const handleClick = async () => {
    setValue(!value);
    setData(!data);
  };

  useEffect(() => {
    handleDataPost();
  }, [value]);

  return (
    <div className="section">
      <div className="container card1">
        <div className="row just-content" >
          <div className="head-text-button  flex-div">
             <div className="header-title-div  ">
             <p className="note-text">
                  You {value ? "can" : "cannot"} send a account invite to a
                  customer.
                </p>
             </div>
             <div className="header-btn-div">
             <button className="my-btn" onClick={handleClick}>
                  {value ? "ON" : "OFF"}
                </button>
             </div>
          </div>
          <hr className="hr-1"/>
          <img className="img-wt"
              src="https://live.staticflickr.com/65535/52256254715_3eb7a5ea10_w.jpg"
              alt="img"
            />
         
         <hr className="hr-1"/>
        </div>
        <div className="row">
        <div className="col-md-12">
            <div className="btn-div">
              <h2>Free Customer Invite Setup</h2>
              <ul>
                <li >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                 </svg>
                  <p>An easy, one-click tool to send email-invites to your customers whose account is not yet enabled.</p>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16" >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                  </svg>
                  <p>You can invite new customers to activate their accounts, as soon as they provide their email by clicking above button.</p>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                  </svg>
                  <p>
                  Similarly you can stop sending invite to a customer by making button OFF.
                  </p>
                </li>

              </ul>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
