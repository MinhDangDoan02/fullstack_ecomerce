import React, { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import API from '../Config/Config'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const searchName = searchParams.get('name')
  const [blogs, setBlogs] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (searchName) {
      setLoading(true)
      // Tìm kiếm blog
      API.get('/blog/search', { params: { name: searchName } })
        .then(res => {
          console.log("Search blogs:", res.data)
          setBlogs(res.data || [])
        })
        .catch(err => {
          console.log("Error searching blogs:", err)
          setBlogs([])
        })

      // Tìm kiếm product
      API.get('/product/search', { params: { name: searchName } })
        .then(res => {
          console.log("Search products:", res.data)
          setProducts(res.data || [])
        })
        .catch(err => {
          console.log("Error searching products:", err)
          setProducts([])
        })
        .finally(() => setLoading(false))
    }
  }, [searchName])

  function renderBlogs() {
    if (blogs.length === 0) {
      return <p className="text-center">Không tìm thấy blog nào</p>
    }
    return blogs.map((blog) => {
      let images = JSON.parse(blog.image)
      return (
        <div className="col-sm-4" key={blog.id}>
          <div className="product-image-wrapper">
            <div className="single-products">
              <div className="productinfo text-center">
                <img
                  src={"http://localhost:5000/public/upload/blog/" + images[0]}
                  alt={blog.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <h2>{blog.title}</h2>
                <p>{blog.description}</p>
                <Link
                  to={"/blog/detail/" + blog.id}
                  className="btn btn-default"
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  function renderProducts() {
    if (products.length === 0) {
      return <p className="text-center">Không tìm thấy sản phẩm nào</p>
    }
    return products.map((product) => {
      let images = JSON.parse(product.image)
      return (
        <div className="col-sm-4" key={product.id}>
          <div className="product-image-wrapper">
            <div className="single-products">
              <div className="productinfo text-center">
                <img
                  src={"http://localhost:5000/public/upload/product/" + images[0]}
                  alt={product.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <h2>${product.price}</h2>
                <p>{product.name}</p>
                <Link
                  to={"/product-detail/" + product.id}
                  className="btn btn-default"
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <div className="col-sm-9 padding-right">
      <div className="features_items">
        <h2 className="title text-center">
          Kết quả tìm kiếm cho: <span style={{ color: '#ff0000' }}>"{searchName}"</span>
        </h2>

        {loading && <p className="text-center">Đang tìm kiếm...</p>}

        {!loading && (
          <>
            <div style={{ marginBottom: '40px' }}>
              <h3>Blog ({blogs.length})</h3>
              <div className="row">
                {renderBlogs()}
              </div>
            </div>

            <div>
              <h3>Sản phẩm ({products.length})</h3>
              <div className="row">
                {renderProducts()}
              </div>
            </div>

            {blogs.length === 0 && products.length === 0 && (
              <p className="text-center" style={{ marginTop: '40px' }}>
                Không tìm thấy kết quả nào phù hợp với từ khóa của bạn.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
