import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';

function Signup() {
  const navigate  = useNavigate()

  const [ SignupData , setSignupData] = useState({
    username : '',
    email : '',
    password: ''
  })

  const handleSignup = (e) => {
    e.preventDefault();

    fetch('http://localhost:4000/Signup',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(SignupData),
      credentials: 'include'
    })
    .then((res) =>{
      if(res.ok){
        navigate('/App')
      }
      else{
        return res.json()
      }
    })
    .then(data =>{
      alert(data.error)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const handleChange = (e) => {
    const id = e.target.id;
    setSignupData({ ...SignupData, [id]: e.target.value})
    console.log(SignupData)
  }
  return (
    <>
    <div class="header">
  	<h2>Register</h2>
    </div>
      <form onSubmit={handleSignup}>
        <div className='input-group'>
            <label>Username</label>
            <input type="text" id='username' placeholder='Usename' value={SignupData.username} onChange={handleChange} />
        </div>
        <div className='input-group'>
            <label>Email</label>
            <input type="email" placeholder='Email' id='email' value={SignupData.email} onChange={handleChange} />
        </div>
        <div className='input-group'>
            <label>Password</label>
            <input type="password" id='password' placeholder='password' value={SignupData.password} onChange={handleChange} />
        </div>
        <div className='input-group'>
            <button className='btn'>Register</button>
        </div>
        <Link to="/Login">Go To Login Page</Link>
        
      </form>
    </>
  )
}

export default Signup
