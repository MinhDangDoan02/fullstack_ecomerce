import React from 'react'
import { Link } from 'react-router-dom'

export default function sidebar() {
  return (
    <div className="bg-dark text-white p-3 vh-100 w-100">
      <h2 className="text-center">Admin</h2>
      <ul className="nav flex-column mt-4">
        <li className="nav-item">
          <Link to="/" className="nav-link text-white">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/blog/list" className="nav-link text-white">Blog List</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/blog/add" className="nav-link text-white">Add Blog</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/user/login" className="nav-link text-white">Login</Link>
          
        </li>
        <li className="nav-item">
          <Link to="/admin/product/list" className="nav-link text-white">Product</Link>
        </li>
      </ul>
    </div>
  )
}
