import React, { useEffect, useState } from 'react'
import API from '../config/Config'
import { Link, useNavigate } from 'react-router-dom';

export default function Tables() {
  const navigate = useNavigate()
  const [getUser, setUser] = useState()

  let token = localStorage.getItem('token')
  if (token) {
    token = JSON.parse(token)
  }
  console.log('Token in Tables:', token)
 
   const config = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }

   

    API.get('/admin/user/list' , config)
    .then(res => {
      console.log('API response:', res)
      console.log('User data:', res.data)
      setUser(res.data)
    })
    .catch(res => {
      console.error("Lỗi Auth:", res.response);
      if(res.response?.status === 401) {
        alert("Phiên đăng nhập hết hạn!");
        handleLogout()
      }
    });
  }, [token, navigate])

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/admin/user/login')
  }

   function deleteUser(id) {
    // Nên dùng config để có Token, nếu route delete có verifyToken
    API.post('/admin/user/delete/' + id,{}, config) 
      .then(res => {
        alert('Đã xóa thành công');
        // Sau khi xóa ở Database, hãy xóa nó khỏi State để giao diện biến mất dòng đó ngay
        const updatedUsers = getUser.filter(user => user.id !== id);
        setUser(updatedUsers)
      })
      .catch(error => {
        alert('Đã xóa thất bại');
      });
  }
  

  function fetchData(){
   if (getUser && getUser.length > 0) {
      return getUser.map((value, index) => {
        return (
          <tr key={index}>
            <td>{value.id}</td>
            <td>{value.name}</td>
            <td>{value.email}</td>
            <td>{value.level === 1 ? 'admin' : 'user'}</td>
            <td>
              <Link to={'/admin/user/update/' + value.id} className="btn btn-sm btn-warning me-2" >Edit</Link>
              <button className="btn btn-sm btn-danger"onClick={()=>deleteUser(value.id)}>Delete</button>
            </td>
          </tr>
        )
      })
    }
  }


  return (
       <div className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-success">Tables</h1>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
        <div className="card shadow-sm mt-4">
          <div className="card-header bg-success text-white">
            User List
          </div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
               {fetchData()}
              </tbody>
            </table>
            {/* Pagination */}
            <nav>
              <ul className="pagination justify-content-end">
                <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">Next</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
  )
}
