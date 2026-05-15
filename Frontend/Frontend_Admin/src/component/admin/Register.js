import React, { useState, useEffect } from 'react'
import API from '../config/Config'
import { useNavigate } from 'react-router-dom'


export default function Register() {
  const navigate = useNavigate()
  const [getAvatar, setAvatar] = useState()
  const [errors, setErrors] = useState({})
  const [countries, setCountries] = useState()
  const [getInputs, setInputs] = useState({
    name:'',
    email:'',
    password:'',
    phone:'',
    address:'',
    id_country:'',
  })

  useEffect(() => {
    API.get('/admin/country/list')
      .then(res => {
        setCountries(res.data)
      })
      .catch(error => {
        console.error('Cannot load country list', error)
      })
  }, [])

function handleInputs(e){
  e.preventDefault()
  const name = e.target.name
  const value = e.target.value
  setInputs(state =>({...state,
    [name]:value
  }))
}
function handleFile(e){
  e.preventDefault()
  setAvatar(e.target.files[0])
}

function handleSubmit(e) {
  e.preventDefault()
  let errorSubmit = {}
  let flag = true

  if(getInputs.name == ''){
    errorSubmit.name = 'vui long nhap nam'
    flag = false
  }
  if(getInputs.email == ''){
    errorSubmit.email = 'vui long nhap email'
    flag = false
  }
  if(getInputs.password == ''){
    errorSubmit.password = 'vui liong nhap pass'
    flag = false
  }
  if(getInputs.phone == ''){
    errorSubmit.phone = 'vui long nhap so dien thoai'
    flag = false
  }
  if(getInputs.address == ''){
    errorSubmit.address = 'vui long nhap dia chi'
    flag = false
  }
  if(getInputs.id_country ==''){
    errorSubmit.id_country = ' vui long nhap country'
    flag = false
  }
  if(!getAvatar){
    errorSubmit.getAvatar = 'vui long upload anh'
    flag = false
  }else{
    let size = getAvatar.size
    let name = getAvatar.name
    let type = name.split(".").pop().toLowerCase()
    let arrType = ['png', 'jpg','jpeg']
    if(!arrType.includes(type)){
      errorSubmit.getAvatar = 'file phai la hinh anh'
      flag = false
    }
    if(size > 1024*1024){
      errorSubmit.getAvatar = 'size phai nho hon 1MB'
      flag = false
    }
  }

  if (!flag) {
    setErrors(errorSubmit);
  } else {
  
    const formData = new FormData();

    formData.append('name', getInputs.name);
    formData.append('email', getInputs.email);
    formData.append('password', getInputs.password);
    formData.append('phone', getInputs.phone);
    formData.append('address', getInputs.address);
    formData.append('id_country', getInputs.id_country);
    
   

  
    if (getAvatar) {
      formData.append('avatar', getAvatar)
    }

 
    API.post('/admin/user/register', formData)
      .then(res => {
        if (res.data.errors) {
          setErrors(res.data.errors)
        } else {
          alert('Đăng ký thành công!')
          navigate('/admin/user/login')

        }
      })
      .catch(function(error){
            console.log(error)
});
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

     <div className='register-wrapper'>
         <div className="register-box">
           <ul>
                {renderError()}
            </ul>
        <div className="logo">
          <img src="https://img.icons8.com/color/96/000000/add-user-group-man-man.png" alt="Logo" />
          <h3 className="text-success">Create Account</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input type="text" className="form-control" name="name" placeholder="Enter full name" onChange={handleInputs} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name="email" placeholder="Enter email"  onChange={handleInputs}/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" placeholder="Password" onChange={handleInputs} />
          </div>
          <div className="mb-3">
            <label htmlFor="confirm" className="form-label">phone</label>
            <input type="number" className="form-control" name="phone" placeholder="phone"  onChange={handleInputs}/>
          </div>
          <div className="mb-3">
            <label htmlFor="confirm" className="form-label">Address</label>
            <input type="text" className="form-control" name="address" placeholder="Adress"  onChange={handleInputs}/>
          </div>
           <div className="mb-3">
            <label htmlFor="confirm" className="form-label">Country</label>
            <select
              className="form-control"
              name="id_country"
              value={getInputs.id_country}
              onChange={handleInputs}
            >
              <option value="">Chọn country</option>
              {countries && countries.length > 0 && (
                countries.map((country, index) => (
                  <option key={index} value={country.id}>
                    {country.name }
                  </option>
                ))
              )}
            </select>
          </div>
            <div className="mb-3">
            <label htmlFor="confirm" className="form-label">avatar</label>
            <input type="file" className="form-control" name="avatar" placeholder="avatar" onChange={handleFile}/>
          </div>
          <button type="submit" className="btn btn-success w-100">Register</button>
          <p className="mt-3 text-center">Already have an account? <a href="login.html" className="text-success">Login</a></p>
        </form>
      </div>
     </div>
  )
}
