import React, { useState } from 'react'
import API from '../Config/Config'
import { useNavigate } from 'react-router-dom'
import Cart from '../Blog/Cart'

export default function Login() {
  const navigate = useNavigate()
  const [inputs , setInputs] = useState(
    {
      email:"",
      password:""
  }
  )

  const [errors, setErrors] = useState({})

  function handleinput(e){
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    setInputs(state =>({...state,
      [name]:value
    }))
  }
  function handleSubmit(e){
    e.preventDefault()
    let errorSubmit = {}
    let flag = true
    if(inputs.email == ""){
      errorSubmit.email = "vui long nhap email"
      flag = false
    }
    if(inputs.password ==""){
      errorSubmit.password = "vui long nhap pass"
      flag = false
    }
    if(!flag){
      setErrors(errorSubmit)
    }
    else{
      const data = {
        email: inputs.email,
        password: inputs.password,
      }
      API.post('/member/login' , data)
      .then(res =>{
        if(res.data.errors){
          setErrors(res.data.errors)

        }
        else{
          
          const token = res.data.token
          const auth = res.data.user
          
          if(token){
            localStorage.setItem('token', JSON.stringify(token))
          }
          if(auth){
            localStorage.setItem('user', JSON.stringify(auth))
          }
          alert("thanh cong")

          console.log("tra ve login:" ,res.data)
          navigate('/')
        }
      })
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
     <div className="col-sm-4 col-sm-offset-1">
      <ul>
          {renderError()}
        </ul>
        <div className="login-form">{/*login form*/}
          <h2>Login to your account</h2>
          <form action="#" onSubmit={handleSubmit}>
            <input type="email" name='email' placeholder="Email Address"  onChange={handleinput}/>
            <input type="password" name='password' placeholder="Password" onChange={handleinput} />
            <button   type="submit" className="btn btn-default"></button>
          </form>
        </div>{/*/login form*/}
      </div>
      
  )
}
