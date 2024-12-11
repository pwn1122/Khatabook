import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { dataProvider } from "./Data";
import { Link } from "react-router-dom";

const User = () => {
  const { User } = useParams();
  const { createList, setcreateList } = useContext(dataProvider);

  const [amount, setamount] = useState({
    amt: "",
    message: "",
  });
  const [mainArr ,setMainArr] = useState([])

  useEffect(()=> {
    const filterList = createList.filter((val) => val.userFName == User);
    setMainArr([filterList[0]]);
  } , [])

  function inputHandle(e) {
    const { value, id } = e.target;
    setamount({ ...amount, [id]: value });
  }

  function btnHandle(e) {
      const filterData = createList.map((val) => val.userFName == User ? {...val, history: [...val.history, {status: e.target.className, amount: amount.amt, msg: amount.message}]} : val);
    console.log(filterData)
    setcreateList(filterData)
  }

  return (
    <div>
      {mainArr.lenght > 0 && mainArr.map(({userFName,userLName,userAmount}) => {
        return (
          <div key={Math.random()}>
            <div className="customer-his">
              <Link to={"/"}>
                {" "}
                <i className="fa-solid fa-angles-left"></i>
              </Link>
              <div className="flex">
                { <h1>{userFName}</h1>}
                {<h1>{userLName}</h1>}
              </div>
              {<h1>{userAmount}</h1>}
            </div>
          </div>
        );
      })}
{
      <div className="history">
        {createList.filter(val => val.userFName == User)[0] && createList.filter(val => val.userFName == User)[0].history.map(({ msg, amount, status }) => {
          return (
            <div className={status}>
              <h1 className="msg">{msg}</h1>
              <h1>{amount}</h1>
            </div>
          );
        })}
         </div> }
         <div className="start-transactions">
         <h4>
          Start Adding Transactions <i className="fa-solid fa-arrow-down"></i>
        </h4>
         </div>
       
     
      <div className="customer-input">
        <input
          value={amount.message}
          type="text"
          name=""
          id="message"
          placeholder="Enter Details"
          onChange={inputHandle}
        />
        <input
          type="text"
          value={amount.amt}
          id="amt"
          placeholder="Enter Amount"
          onChange={inputHandle}
        />

        <button className="gave" id="gave-btn" onClick={btnHandle}>
          You Gave <i className="fa-solid fa-indian-rupee-sign"></i>
        </button>
        <button className="got" id="got-btn" onClick={btnHandle}>
          You Got <i className="fa-solid fa-indian-rupee-sign"></i>
        </button>
      </div>
    </div>
  );
};

export default User;
