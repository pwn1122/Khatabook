import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


function Login() {

	const [loginData , setLoginData] = useState({
		email:'',
		password:''                          
	})

	const Navigate = useNavigate();
	const handleLogin = async (e) =>{
		e.preventDefault();

		try{
			const resp = await fetch('http://localhost:4000/login',{
				method: 'POST',
				headers:{
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(loginData),
				credentials: 'include'
			})
			console.log(resp)
			if (resp.ok){
				Navigate('/App')
			}
			const error = await resp.json()
			console.log(error)
		}
		catch(err){
			console.log(err)
		}
	}

	const handleChange = (e) =>{
		const id = e.target.id;
		setLoginData({...loginData, [id]: e.target.value })
		console.log(loginData)
	}

  return (
    <>

   <div class="header">
  	<h2>Login</h2>
  </div>
	 
  <form onSubmit={handleLogin}>

  	<div class="input-group">
  		<label>Email</label>
  		<input type="text" id='email' placeholder="email" onChange={handleChange} value={loginData.username}/>
  	</div>
  	<div class="input-group">
  		<label>Password</label>
  		<input type="password" id='password' placeholder="Password" onChange={handleChange} value={loginData.password} />
  	</div>
  	<div class="input-group">
  		<button type="submit" class="btn">Login</button>
  	</div>

	  <Link to="/">Go To Signup Page</Link>

  </form>
      
    </>
  )
}

export default Login 
