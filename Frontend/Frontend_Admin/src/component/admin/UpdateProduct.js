import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../config/Config'

export default function UpdateProduct() {
  const params = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState({
    name: '',
    id_category: '',
    price: '',
    stock: '',
    detail: ''
  })
  const [file, setFile] = useState(null)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(true)
   const [categories, setCategories] = useState([])

  // Get categories
  useEffect(() => {

    API.get('/admin/category/list')
      .then((res) => {

        console.log(res.data)
        setCategories(res.data)

      })
      .catch((error) => {
        console.log(error)
      })

  }, [])

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
          setProduct({
            name: current.name || '',
            id_category: current.id_category || '',
            price: current.price || '',
            stock: current.stock || '',
            detail: current.detail || ''
          })
        } else {
          setErrors({ form: 'Không tìm thấy sản phẩm' })
        }
      })
      .catch(err => {
        if (err.response?.status === 401) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          navigate('/admin/user/login')
        } else {
          setErrors({ form: 'Lỗi tải dữ liệu sản phẩm' })
          console.error(err)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  function handleInput(e) {
    const name = e.target.name
    const value = e.target.value
    setProduct(prev => ({ ...prev, [name]: value }))
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

    if (!product.name) {
      errorSubmit.name = 'Vui lòng nhập tên sản phẩm'
      flag = false
    }
    if (!product.price) {
      errorSubmit.price = 'Vui lòng nhập giá sản phẩm'
      flag = false
    }
    if (!product.stock) {
      errorSubmit.stock = 'Vui lòng nhập số lượng sản phẩm'
      flag = false
    }
    if (!product.id_category) {
      errorSubmit.id_category = 'Vui lòng chọn danh mục sản phẩm'
      flag = false
    }
    if (!product.detail) {
      errorSubmit.detail = 'Vui lòng nhập mô tả sản phẩm'
      flag = false
    }

    if (!flag) {
      setErrors(errorSubmit)
      return
    }

    const formData = new FormData()
    formData.append('name', product.name)
    formData.append('id_category', product.id_category)
    formData.append('detail', product.detail)
    formData.append('price', product.price)
    formData.append('stock', product.stock)

    if (file) {
      formData.append('image', file)
    }

    API.post(`/admin/product/update/` + params.id, formData, config)
      .then(res => {
        alert('Cập nhật sản phẩm thành công')
        navigate('/admin/product/list')
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
      <h1 className="text-success">Update Product</h1>
      <div className="card shadow-sm mt-4">
        <div className="card-header bg-success text-white">Update Product</div>
        <div className="card-body">
          {errors.form && <div className="alert alert-danger">{errors.form}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={product.name}
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Image</label>
              {product.image && !file && (
                <div className="mb-2">
                  <img src={product.image} alt="current" style={{ maxWidth: '200px', height: 'auto' }} />
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
              <label className="form-label">detail</label>
              <textarea
                name="detail"
                className="form-control"
                value={product.detail}
                onChange={handleInput}
                rows="3"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <select
                name="id_category"
                className="form-control"
                value={product.id_category}
                onChange={handleInput}
              >
                <option value="">Chọn danh mục</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-success">Update Product</button>
          </form>
        </div>
      </div>
    </div>
  )
}
