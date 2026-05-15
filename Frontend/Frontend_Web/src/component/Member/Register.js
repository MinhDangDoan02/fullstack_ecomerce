import React, { useState } from 'react'
import API from '../Config/Config'

export default function Register() {

    const [inputs, setInput] = useState({
        name:"",
        email:"",
        password:"",
        phone:"",
        address:""
    })

    const [inAvatar , setAvatar] = useState()
    const [errors, setErrors] = useState({})

    function handleinput(e){
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setInput(state =>({...state,
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
        if(inputs.name == ""){
            errorSubmit.name = "vui long nhap ten"
            flag = false
        }
        if(inputs.email == ""){
            errorSubmit.email = "vui long nhap email"
            flag = false
        }
        if(inputs.password == ""){
            errorSubmit.password =" vui long nhap pass"
            flag = false
        }
        if(inputs.phone ==""){
            errorSubmit.phone =" vui long nhap phone"
            flag = false
        }
        if(inputs.address ==""){
            errorSubmit.address = "vui long nhap dia chi"
            flag = false
        }
         if(!inAvatar){
            errorSubmit.inAvatar = "vui lòng uload ảnh"
            flag = false
        }else{
        let size = inAvatar.size
        let name = inAvatar.name
        let type = name.split(".").pop().toLowerCase()

        let arrType = ["png","jpg","jpeg"]

        if(!arrType.includes(type)){
            errorSubmit.inAvatar = "file phải là hình ảnh"
            flag = false
        }

        if(size > 1024 * 1024){
            errorSubmit.inAvatar = "size phải nhỏ hơn 1MB"
            flag = false
        }
        }

        if(!flag){
            setErrors(errorSubmit)
        }
        else{
            const data = {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password,
                phone:inputs.phone,
                address: inputs.address,
                level: 0

            }
            API.post('register', data)
            .then(res => {
                if(res.data.errors){
                    setErrors(res.data.errors)
                }else{
                    alert("thanh cong")
                }
            })
        }
    }
       function renderError(){
        if(Object.keys(errors).length > 0){
        return Object.keys(errors).map((key,index)=>
        {
            return  (
            <li key={index}>{errors[key]}</li>
        )
        })
    }
    }
    
  return (
       <div>
        
        <div className="col-sm-1">
          <h2 className="or">OR</h2>
        </div>
        <div className="col-sm-4">
            <ul>
                {renderError()}
            </ul>
          <div className="signup-form">{/*sign up form*/}
            <h2>New User Signup!</h2>
            <form action="#"  onSubmit={handleSubmit}>
              <input type="text" name='name' placeholder="Name"  onChange={handleinput}/>
              <input type="email" name='email' placeholder="Email Address"  onChange={handleinput}/>
              <input type="password" name='password' placeholder="Password" onChange={handleinput} />
               <input type="text" name='phone' placeholder="Phone"  onChange={handleinput}/>
                <input type="text" name='address' placeholder="Address"  onChange={handleinput}/>
                 <input type='file'  name='avatar' placeholder='Avartar' onChange={handleFile}></input>
              <button type="submit" className="btn btn-default"  >Signup</button>
            </form>
          </div>{/*/sign up form*/}
        </div>
      </div>
  )
}
