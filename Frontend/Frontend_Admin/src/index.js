import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Register from './component/admin/Register';
import Login from './component/admin/Login';
import Tables from './component/admin/Tables';
import Forms from './component/admin/Forms';
import FormBlog from './component/admin/FormBlog';
import BlogTables from './component/admin/BlogTables';
import Update from './component/admin/update';
import ProductTable from './component/admin/ProductTable';
import AddProduct from './component/admin/AddProduct';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route path='/admin/user/register' element={<Register></Register>}></Route>
          <Route path='/admin/user/login' element={<Login></Login>}></Route>
          <Route path='' element={<Tables></Tables>}></Route>
          <Route path='/admin/user/update/:id' element={<Forms></Forms>}></Route>
          <Route path='/admin/blog/add' element={<FormBlog></FormBlog>}></Route>
          <Route path='/admin/blog/list' element={<BlogTables></BlogTables>}></Route>
          <Route path='/admin/blog/update/:id' element={<Update></Update>}></Route>
          <Route path='/admin/product/list' element={<ProductTable></ProductTable>}></Route>
          <Route path='/admin/product/add' element={<AddProduct></AddProduct>}></Route>
          <Route path='/admin/product/update/:id' element={<AddProduct></AddProduct>}></Route>
          <Route path='/admin/category/list' element={<AddProduct></AddProduct>}></Route>
          <Route path='/admin/category/add' element={<AddProduct></AddProduct>}></Route>
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
