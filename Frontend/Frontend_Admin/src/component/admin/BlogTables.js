import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../config/Config'

export default function BlogTables() {
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState([])
  const [error, setError] = useState('')

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
      navigate('/admin/user/login')
      return
    }

    API.get('/admin/blog/list', config)
      .then(res => {
        setBlogs(res.data )
      })
      .catch(err => {
        if (err.response?.status === 401) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          navigate('/admin/user/login')
        } else {
          setError('Không thể tải danh sách blog')
          console.error(err)
        }
      })
  }, [navigate, token])

  function deleteBlog(id) {
    if (!window.confirm('Bạn có muốn xóa blog này không?')) return

    console.log('Deleting blog with id:', id, 'config:', config)

    API.post('/admin/blog/delete/' + id, {}, config)
      .then(() => {
        alert('Đã xóa thành công')
        setBlogs(prev => prev.filter(blog => blog.id !== id))
      })
      .catch(err => {
        alert('Xóa blog thất bại: ' + (err.response?.data?.message || err.message || 'Lỗi không xác định'))
      })
  }

  function renderRows() {
    if (!blogs || blogs.length === 0) {
      return (
        <tr>
          <td colSpan="5" className="text-center">Không có blog nào</td>
        </tr>
      )
    }

    return blogs.map((blog, index) => (
      <tr key={blog.id }>
        <td>{blog.id }</td>
        <td>{blog.title}</td>
        <td>{blog.image ? <img src={`http://localhost:5000/public/upload/blog/${blog.image[0]}`} alt={blog.title} style={{ maxWidth: '100px', height: 'auto' }} /> : 'No image'}</td>
        <td>{blog.description || '—'}</td>
        <td>
          <Link to={`/admin/blog/update/` + blog.id} className="btn btn-sm btn-warning me-2">Edit</Link>
          <button className="btn btn-sm btn-danger" onClick={() => deleteBlog(blog.id)}>Delete</button>
        </td>
      </tr>
    ))
  }

  return (
    <div className="flex-grow-1 p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-success">Blog Management</h1>
        <Link to="/admin/blog/add" className="btn btn-success">Add Blog</Link>
      </div>
      <div className="card shadow-sm mt-4">
        <div className="card-header bg-success text-white">Blog List</div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Image</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {renderRows()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
