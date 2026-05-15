import React, { useEffect, useState } from 'react'
import API from '../config/Config'

export default function AddProduct() {

  const [products, setProduct] = useState({
    name: '',
    price: '',
    stock: '',
    detail: '',
    id_category: ''
  })

  const [files, setFiles] = useState([])
  const [errors, setErrors] = useState({})
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

  // Handle input
  function handleInput(e) {

    const name = e.target.name
    const value = e.target.value

    setProduct((state) => ({
      ...state,
      [name]: value
    }))
  }

  // Handle file
  function handleFile(e) {

    const selectedFiles = e.target.files

    if (selectedFiles.length > 3) {

      alert('Chỉ được upload tối đa 3 ảnh')

      e.target.value = ''
      return
    }

    setFiles(selectedFiles)
  }

  // Handle submit
  function handleSubmit(e) {

    e.preventDefault()

    let errorSubmit = {}
    let flag = true

    // Validate
    if (products.name === '') {
      errorSubmit.name = 'Vui lòng nhập tên sản phẩm'
      flag = false
    }

    if (products.price === '') {
      errorSubmit.price = 'Vui lòng nhập giá sản phẩm'
      flag = false
    }

    if (products.stock === '') {
      errorSubmit.stock = 'Vui lòng nhập số lượng sản phẩm'
      flag = false
    }

    if (products.detail === '') {
      errorSubmit.detail = 'Vui lòng nhập mô tả sản phẩm'
      flag = false
    }

    if (products.id_category === '') {
      errorSubmit.id_category = 'Vui lòng chọn danh mục'
      flag = false
    }

    if (!files || files.length === 0) {

      errorSubmit.image = 'Vui lòng chọn ảnh'
      flag = false

    } else {

      Object.keys(files).forEach((key) => {

        const file = files[key]

        // Check image type
        if (
          !['image/jpeg', 'image/png', 'image/gif', 'image/webp']
            .includes(file.type)
        ) {

          errorSubmit.image =
            'Vui lòng chọn file jpg/png/gif/webp'

          flag = false
        }

        // Check size
        if (file.size > 1024 * 1024) {

          errorSubmit.image =
            'File phải nhỏ hơn 1MB'

          flag = false
        }
      })
    }

    // Show errors
    if (!flag) {

      setErrors(errorSubmit)
      return
    }

    // Call API
    const token = JSON.parse(
      localStorage.getItem('token')
    )

    const config = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }

    const formData = new FormData()

    formData.append('name', products.name)
    formData.append('price', products.price)
    formData.append('stock', products.stock)
    formData.append('detail', products.detail)
    formData.append(
      'id_category',
      products.id_category
    )

    // Append images
    if (files) {

      Object.keys(files).forEach((key) => {

        formData.append('image', files[key])

      })
    }

    API.post(
      '/admin/product/add',
      formData,
      config
    )
      .then((res) => {

        console.log(res.data)

        alert('Thêm sản phẩm thành công')

      })
      .catch((error) => {

        console.log(error)

      })
  }

  // Render errors
  function renderError() {

    if (Object.keys(errors).length > 0) {

      return Object.keys(errors).map((key, index) => (

        <li key={index}>
          {errors[key]}
        </li>

      ))
    }

    return null
  }

  return (

    <div className="flex-grow-1 p-4">

      <h1 className="text-success">
        Form Product
      </h1>

      <ul className="text-danger">
        {renderError()}
      </ul>

      <div className="card shadow-sm mt-4">

        <div className="card-header bg-success text-white">
          Form Product
        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            {/* Name */}
            <div className="mb-3">

              <label className="form-label">
                Tên sản phẩm
              </label>

              <input
                type="text"
                className="form-control"
                name="name"
                onChange={handleInput}
              />

            </div>

            {/* Price */}
            <div className="mb-3">

              <label className="form-label">
                Giá
              </label>

              <input
                type="text"
                className="form-control"
                name="price"
                onChange={handleInput}
              />

            </div>

            {/* Stock */}
            <div className="mb-3">

              <label className="form-label">
                Số lượng
              </label>

              <input
                type="text"
                className="form-control"
                name="stock"
                onChange={handleInput}
                value={products.stock}
              />

            </div>

            {/* Detail */}
            <div className="mb-3">

              <label className="form-label">
                Mô tả
              </label>

              <textarea
                className="form-control"
                name="detail"
                onChange={handleInput}
                value={products.detail}
              />

            </div>

            {/* Category */}
            <div className="mb-3">

              <label className="form-label">
                Danh mục
              </label>

              <select
                className="form-control"
                name="id_category"
                onChange={handleInput}
                value={products.id_category}
              >

                <option value="">
                  Chọn danh mục
                </option>

                {
                  categories &&
                  categories.map((category) => (

                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>

                  ))
                }

              </select>

            </div>

            {/* Image */}
            <div className="mb-3">

              <label className="form-label">
                Ảnh sản phẩm
              </label>

              <input
                type="file"
                className="form-control"
                multiple
                onChange={handleFile}
              />

            </div>

            <button
              type="submit"
              className="btn btn-primary"
            >
              Thêm sản phẩm
            </button>

          </form>

        </div>
      </div>
    </div>
  )
}