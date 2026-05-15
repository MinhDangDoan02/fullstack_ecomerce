import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../config/Config'

export default function Forms() {
  let params = useParams()

  const [getUserById, setUserById] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    avatar: '',
    id_country:''
    
  })
  const [file, setFile] = useState(null)
  const [errors, setErrors] = useState({})
  

  let token = JSON.parse(localStorage.getItem('token'))
  const config = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }

  useEffect(() => {
    API.get('/admin/user/show/' + params.id, config)
      .then(res => {
        setUserById(res.data) 
      })
      .catch(err => {
        console.error("Lỗi get data:", err)
        alert("Không thể lấy dữ liệu người dùng")
      })
  }, [])

  const handleInput = (e) => {
    const { name, value } = e.target
    setUserById(state => ({ ...state, [name]: value }))
  }

  const handleFile = (e) => {
    setFile(e.target.files[0]) 
  }

  function handleSubmit(e){
    e.preventDefault()
    let errorSubmit = {}
    let flag = true
   if(getUserById.name == ''){
    errorSubmit.name = 'vui long nhap nam'
    flag = false
  }
  if(getUserById.email == ''){
    errorSubmit.email = 'vui long nhap email'
    flag = false
  }
  if(getUserById.password == ''){
    errorSubmit.password = 'vui liong nhap pass'
    flag = false
  }
  if(getUserById.phone == ''){
    errorSubmit.phone = 'vui long nhap so dien thoai'
    flag = false
  }
  if(getUserById.address == ''){
    errorSubmit.address = 'vui long nhap dia chi'
    flag = false
  }
  if(getUserById.id_country ==''){
    errorSubmit.id_country = ' vui long nhap country'
    flag = false
  }
  if(file){
    let size = file.size
    let name = file.name
    let type = name.split(".").pop().toLowerCase()
    let arrType = ['png', 'jpg','jpeg']
    if(!arrType.includes(type)){
      errorSubmit.file = 'file phai la hinh anh'
      flag = false
    }
    if(size > 1024*1024){
      errorSubmit.file = 'size phai nho hon 1MB'
      flag = false
    }
  }

  if (!flag) {
    setErrors(errorSubmit);
  } else {
  
    const formData = new FormData();

    formData.append('name', getUserById.name);
    formData.append('email', getUserById.email);
    formData.append('password', getUserById.password);
    formData.append('phone', getUserById.phone);
    formData.append('address', getUserById.address);
    formData.append('level', getUserById.level);
    formData.append('id_country', getUserById.id_country);
    if (file) {
      formData.append('avatar', file)
    }
    API.post('/admin/user/update/' + params.id,formData, config)
    .then(res => {
      if(res.data.errors){
        alert('update that bai')
      }
      alert('update thanh cong')
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

  

  function fetchData() {
    if (getUserById) {
      return (
        <form onSubmit={handleSubmit}>   
          <div className="mb-3 text-center">
            <ul>
                {renderError()}
            </ul>
            <label className="form-label d-block text-start">Current Avatar</label>
            {getUserById.avatar ? (
              <img 
               src={`http://localhost:5000/public/upload/user/${getUserById.avatar}`}
                alt="Old Avatar"
                className="img-thumbnail"
                style={{ width: '150px', borderRadius: '8px' }}
              />
            ) : (
              <div className="p-3 bg-light border">Chưa có ảnh đại diện</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input 
              type="text" 
              name="name" // Cần thuộc tính name để handleInput hoạt động
              className="form-control" 
              value={getUserById.name || ''} 
              onChange={handleInput} 
              id="name" 
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input 
              type="email" 
              name="email"
              className="form-control" 
              value={getUserById.email || ''} 
              onChange={handleInput} 
              id="email" 
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input 
              type="number" 
              name="phone"
              className="form-control" 
              value={getUserById.phone || ''} 
              onChange={handleInput} 
              id="phone" 
            />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input 
              type="text" 
              name="address"
              className="form-control" 
              value={getUserById.address || ''} 
              onChange={handleInput} 
              id="address" 
            />
          </div>
           <div className="mb-3">
            <label htmlFor="country" className="form-label">Country</label>
            <input 
              type="number" 
              name="id_coutry"
              className="form-control" 
              value={getUserById.id_country || ''} 
              onChange={handleInput} 
              id="country" 
            />
          </div>

          <div className="mb-3">
            <label htmlFor="avatar" className="form-label">Change Avatar (Chọn file mới nếu muốn thay đổi)</label>
            <input 
              type="file" 
              className="form-control" 
              id="avatar" 
              onChange={handleFile} // KHÔNG dùng value ở đây
            />
          </div>

          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role</label>
            <select 
              name="level"
              className="form-select" 
              value={getUserById.level} 
              onChange={handleInput} 
              id="role"
            >
              <option value={1}>Admin</option>
              <option value={0}>User</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success me-2">Submit Update</button>
          <button type="reset" className="btn btn-secondary">Reset</button>
        </form>
      )
    }
  
  }

  return (
    <div className="flex-grow-1 p-4">
      <h1 className="text-success">Forms</h1>
      <div className="card shadow-sm mt-4">
        <div className="card-header bg-success text-white">Update User</div>
        <div className="card-body">
          {fetchData()}
        </div>
      </div>
    </div>
  )
}