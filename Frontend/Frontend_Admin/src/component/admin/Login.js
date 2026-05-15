import React, { useState } from 'react'
import API from '../config/Config'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [getInput, setInput] = useState({
    email: '',
    password:''
  })
  const [errors, setErrors] = useState({})
  function handleInputs(e){
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    setInput(state => ({...state,
      [name]:value
    }))
  }

  function handleSubmit(e){
    e.preventDefault()
    let errorSubmit = {} 
    let flag = true
    if(getInput.email ==''){
      errorSubmit.email = 'vui long nhap email'
      flag = false
    }
    if(getInput.password ==''){
      errorSubmit.password = 'vui long nhap pass'
      flag = false
    }
    if(!flag){
      setErrors(errorSubmit)
      return
    }
    else{
      const data ={
        email: getInput.email,
        password:getInput.password,
      }
      API.post('/admin/user/login', data)
      .then(res =>{
        if(res.data.errors){
          setErrors(res.data.errors)
        }
        else{
          const token = res.data.token
          const user = res.data.user
          localStorage.setItem('token', JSON.stringify(token))
          localStorage.setItem('user', JSON.stringify(user))
          alert("thanh cong")

          
          alert('dang nhap thanh cong')

          console.log('tra ve login', res.data)
          navigate('/')
        }
      }
        
      )
      
    }


  }
     function renderError(){
      if(Object.keys(errors).length > 0){
        return Object.keys(errors).map((key, index) => 
          {
           return  (
            <li key={index}>{errors[key]}</li>
        )
        })
      }
    }


  return (
   <div className='login-wraper'>
     <div className="login-box">
      {renderError()}
        <div className="logo">
          <img src="https://img.icons8.com/color/96/000000/admin-settings-male.png" alt="Logo" />
          <h3 className="text-success">Admin Panel</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name="email" placeholder="Enter email" onChange={handleInputs} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" placeholder="Password" onChange={handleInputs} />
          </div>
          <button type="submit" className="btn btn-success w-100">Login</button>
          <p className="mt-3 text-center">Don't have an account? <a href="register.html" className="text-success">Register</a></p>
        </form>
      </div>
   </div>
  )
}
