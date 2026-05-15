import React, { use } from 'react'
import { useEffect, useState } from 'react'
import API from '../config/Config'
import { Link } from 'react-router-dom'

export default function ProductTable() {
    const [products, setProducts] = useState()
    useEffect(() => {
        API.get('/admin/product/list')
            .then(res => {
            console.log('API response:', res.data) 
            setProducts(res.data)
            })
            .catch(error => {
            console.error('Error fetching products:', error)
            })
    }, [])
    function handleDelete(productId) {
        if(window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
            API.delete('/admin/product/delete/' + productId)
            .then(res => {
                alert('Xóa sản phẩm thành công')
                // Cập nhật lại danh sách sản phẩm sau khi xóa
                setProducts(products.filter(p => p.id !== productId))
            })
            .catch(error => {
                console.error('Error deleting product:', error)
                alert('Xóa sản phẩm thất bại')
            })
        }
    }

    function fetchProducts() {
        if(products) {
            return products.map((product, index) => (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.detail}</td>
                  <td>{product.category.name}</td>
                  <td>{product.price + '||' + product.stock}</td>
                  <td>
                    <Link to={`/admin/product/update/` + product.id} className="btn btn-sm btn-primary me-2">Edit</Link>
                    <a href="#" className="btn btn-sm btn-danger" onClick={() => handleDelete(product.id)}>Delete</a>
                  </td>
                </tr>
            ))
        }
    }


  return (
     <div className="flex-grow-1 p-4">
        <h1 className="text-success">ProductsTables</h1>
            <Link to="/admin/product/add" className="btn btn-success">Add Product</Link>
        <div className="card shadow-sm mt-4">
          <div className="card-header bg-success text-white">
            User List
          </div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tên sản phẩm</th>
                  <th>Mô tả</th>
                  <th>Danh mục</th>
                  <th>Biến thể</th>
                </tr>
              </thead>
              <tbody>
               {fetchProducts()}
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
