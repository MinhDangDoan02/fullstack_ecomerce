import React, { useEffect, useState } from 'react'
import API from '../Config/Config'

export default function Account() {
  

  const [avatar, setAvatar] = useState()
  const [errors, setErrors] = useState({})
  const [user, setUser] = useState({
    id:"",
    name:"",
    email:"",
    password:"",
    phone:"",
    address:"",
  })
  useEffect(() =>{
    let userData = localStorage.getItem("user")
    if(userData){
      userData = JSON.parse(userData)
      

      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        address:userData.address
      })
      setAvatar(userData.avatar)
    }
  },[])

  function handleInput(e){
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    setUser(state =>({
      ...state,
      [name]:value
    }))

  }
   function handleFile(e){
        e.preventDefault()
        setAvatar(e.target.files[0])
    }
 function handleSubmit(e){
        e.preventDefault()
        let errorSubmit = {}
        let flag = true
        if(user.name == ""){
            errorSubmit.name = "vui long nhap ten"
            flag = false
        }
        if(user.password ==""){
            user.password  = "vui logn nhap pass"
            flag = false
           }

      
        if(user.phone ==""){
            errorSubmit.phone =" vui long nhap phone"
            flag = false
        }
        if(user.address ==""){
            errorSubmit.address = "vui long nhap dia chi"
            flag = false
        }
         if(!avatar){
            errorSubmit.avatar = "vui lòng uload ảnh"
            flag = false
        }else{
        let size = avatar.size
        let name = avatar.name
        let type = name.split(".").pop().toLowerCase()

        let arrType = ["png","jpg","jpeg"]

        if(!arrType.includes(type)){
            errorSubmit.avatar = "file phải là hình ảnh"
            flag = false
        }

        if(size > 1024 * 1024){
            errorSubmit.avatar = "size phải nhỏ hơn 1MB"
            flag = false
        }
        }

        if(!flag){
            setErrors(errorSubmit)
        }
        else{
            const data = {
                name: user.name,
                email: user.email,
                password: user.password,
                phone:user.phone,
                address: user.address,
                level: 0

            }
              let token = JSON.parse(localStorage.getItem("token"))
   
              let config = { 
                          headers: { 
                          'Authorization': 'Bearer '+ token,
                          'Content-Type': 'application/x-www-form-urlencoded',
                          'Accept': 'application/json'
                          } 
                      };
            API.post('/user/update/' + user.id,data,config)
            .then(res => {
                if(res.data.errors){
                    setErrors(res.data.errors)
                }else{
                    alert("update thanh cong")
                     const token = res.data.token
                     const auth = res.data.Auth

                     localStorage.setItem("token" , JSON.stringify(token))
                     localStorage.setItem("user", JSON.stringify(auth))
                    console.log(res.data)
                }
            })
        }
    }
  


  return (
        <div>
      
        <div className="col-sm-9">
          <div className="blog-post-area">
            <h2 className="title text-center">Update user</h2>
            <div className="signup-form">{/*sign up form*/}
              <h2>New User Signup!</h2>
              <form action="#" onSubmit={handleSubmit} >
                 <input type="text" name='name' placeholder="Name" value={user.name} onChange={handleInput} />
              <input type="email" readOnly name='email' placeholder="Email Address"  value={user.email} onChange={handleInput} />
              <input type="password" name='password' placeholder="Password"  value={user.password} onChange={handleInput} />
               <input type="text" name='phone' placeholder="Phone"  value={user.phone} onChange={handleInput} />
                <input type="text" name='address' placeholder="Address"  value={user.address} onChange={handleInput}/>
                 <input type='file'  name='avatar' placeholder='Avartar' onChange={handleFile}></input>
                <button type="submit" className="btn btn-default">Signup</button>
              </form>
            </div>
          </div>
        </div>
      </div>
  )
 }
