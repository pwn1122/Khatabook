import { useEffect, useState } from "react";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { dataProvider } from "./Data";

function App() {
  const [display, setDisplay] = useState(false);
  const { createList, setcreateList } = useContext(dataProvider);
  const navigate  = useNavigate()

  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function check() {
      const resp = await fetch('http://localhost:4000/check', {
        credentials: 'include'
      })
      if(resp.ok == false) {
        navigate('/Login')
      }
    }
    check()
  },[])

  const handlelogout = async() =>{
    try{
      const res = await fetch('http://localhost:4000/logout', {
        credentials: "include"
      });

      if(res.ok){
        navigate('/Login')
      }
      else{
        alert('there is some issue try again later')
      }
    }
    catch(err){
      alert('there is some internal issue try again later')
    }
  }

  const filterSearch =
    search == ""
      ? createList
      : createList.filter((fval) =>  fval.userFName.toLowerCase().includes(search.toLowerCase()));


  function addList() {
    if (fName.trim() == "") {
      alert("Please enter name");
      return;
    }
    const findName = createList.filter(
      (val) => val.userFName.toLowerCase() == fName.toLowerCase()
    );
    setDisplay(!display);
    setlName("");
    setfName("");
    if (findName.length > 0) {
      alert("Already exist ");
      return;
    }
    setcreateList([
      ...createList,
      { userFName: fName, userLName: lName, userAmount: 0, history: [] },
    ]);
  }

  return (
    <>
      <nav>
        
        <div className="business">
          <div className="my-business">
            <i class="fa-solid fa-book"></i>
            <h2>My Business</h2>
            <i class="fa-solid fa-pen"></i>
          </div>
          <div className="sign">
            <button>
              <Link to={"/"}>Sigin</Link>
            </button>
            <button>
              <Link to={"/Login"}>Login</Link>
            </button>
            <button className="logout" onClick={handlelogout}>
              Logout
            </button>
          </div>

          <i class="fa-solid fa-address-book"></i>
        </div>
        <div className="navrs">
          <div className="total-rs">
            <div className="pay">
              <span className="payment">You Will Give</span>
              <span className="green">
                <i class="fa-solid fa-indian-rupee-sign"></i>0.00
              </span>
            </div>
            <hr />
            <div className="pay">
              <span className="payment">You Will Get</span>
              <span className="red">
                <i class="fa-solid fa-indian-rupee-sign"></i>0.00
              </span>
            </div>

            <hr />
            <div className="pay">
              <span className="payment">Online Collections</span>
              <span className="blue">
                <i class="fa-solid fa-indian-rupee-sign"></i>0.00{" "}
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </div>
          </div>
          <div className="transction">
            <i class="fa-solid fa-file-lines"></i>
            <h2>Transaction History</h2>
          </div>
        </div>
      </nav>

      <main>
        <div className="search">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search Customer"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button
            onClick={() => {
              setDisplay(true);
            }}
            className="add-customer"
          >
            <i class="fa-solid fa-user-plus"></i>ADD CUSTOMER
          </button>
        </div>
      </main>
      <div className={display ? "add" : "hide"}>
        <i
          onClick={() => {
            setDisplay(!display);
          }}
          class="fa-solid fa-chevron-left"
        ></i>
        <input
          type="text"
          value={fName}
          onChange={(e) => {
            setfName(e.target.value);
          }}
          placeholder="Enter First Name"
        />

        <input
          type="text"
          value={lName}
          onChange={(e) => {
            setlName(e.target.value);
          }}
          placeholder="Enter Last Name"
        />
        <button onClick={addList}>Add</button>
      </div>

      {filterSearch.map(({ userFName, userLName, userAmount }) => {
        return (
          <Link to={`${userFName}`} key={Math.random()}>
            <div className="lists">
              <div className="name">
                <h2>{userFName}</h2>
                <h2>{userLName}</h2>
              </div>
              <div className="rupess">
                <h2>
                  {" "}
                  <i class="fa-solid fa-indian-rupee-sign"></i>
                  {userAmount}
                </h2>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
}

export default App;
