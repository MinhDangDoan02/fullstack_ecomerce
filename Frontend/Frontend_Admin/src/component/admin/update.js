import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../config/Config'

export default function Update() {
  const params = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState({
    title: '',
    description: '',
    content: '',
    image: ''
  })
  const [file, setFile] = useState(null)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(true)

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
        const blogs = res.data
        const current = blogs.find(item => String(item.id) === String(params.id))
        if (current) {
          setBlog({
            title: current.title || '',
            description: current.description || '',
            content: current.content || '',
            image: current.image || ''
          })
        } else {
          setErrors({ form: 'Không tìm thấy blog' })
        }
      })
      .catch(err => {
        if (err.response?.status === 401) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          navigate('/admin/user/login')
        } else {
          setErrors({ form: 'Lỗi tải dữ liệu blog' })
          console.error(err)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  function handleInput(e) {
    const name = e.target.name
    const value = e.target.value
    setBlog(prev => ({ ...prev, [name]: value }))
  }

  function handleFile(e) {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errorSubmit = {}
    let flag = true

    if (!blog.title) {
      errorSubmit.title = 'Vui lòng nhập title'
      flag = false
    }
    if (!blog.description) {
      errorSubmit.description = 'Vui lòng nhập description'
      flag = false
    }
    if (!blog.content) {
      errorSubmit.content = 'Vui lòng nhập content'
      flag = false
    }

    if (!flag) {
      setErrors(errorSubmit)
      return
    }

    const formData = new FormData()
    formData.append('title', blog.title)
    formData.append('description', blog.description)
    formData.append('content', blog.content)

    if (file) {
      formData.append('image', file)
    }

    API.post(`/admin/blog/update/` + params.id, formData, config)
      .then(res => {
        alert('Cập nhật blog thành công')
        navigate('/admin/blog/list')
      })
      .catch(err => {
        if (err.response?.status === 401) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          navigate('/admin/user/login')
          return
        }
        setErrors({ form: 'Cập nhật thất bại' })
        console.error(err)
      })
  }

  function renderError() {
    if (!errors) return null
    return Object.keys(errors).map(key => (
      <li key={key}>{errors[key]}</li>
    ))
  }

  if (loading) {
    return (
      <div className="flex-grow-1 p-4">
        <p>Đang tải dữ liệu...</p>
      </div>
    )
  }

  return (
    <div className="flex-grow-1 p-4">
      <h1 className="text-success">Update Blog</h1>
      <div className="card shadow-sm mt-4">
        <div className="card-header bg-success text-white">Update Blog</div>
        <div className="card-body">
          {errors.form && <div className="alert alert-danger">{errors.form}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={blog.title}
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Image</label>
              {blog.image && !file && (
                <div className="mb-2">
                  <img src={blog.image} alt="current" style={{ maxWidth: '200px', height: 'auto' }} />
                </div>
              )}
              <input
                type="file"
                name="image"
                className="form-control"
                onChange={handleFile}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control"
                value={blog.description}
                onChange={handleInput}
                rows="3"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Content</label>
              <textarea
                name="content"
                className="form-control"
                value={blog.content}
                onChange={handleInput}
                rows="5"
              />
            </div>
            <button type="submit" className="btn btn-success">Update Blog</button>
          </form>
        </div>
      </div>
    </div>
  )
}
