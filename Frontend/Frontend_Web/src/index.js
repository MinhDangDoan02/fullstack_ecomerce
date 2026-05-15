import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Detail from './component/Blog/Detail';
import Register from './component/Member/Register';
import Login from './component/Member/Login';
import List_Blog from './component/Blog/List_Blog';
import Account from './component/Member/Account';
import Product_Add from'./component/Member/Product_Add'
import MyProduct from './component/Member/MyProduct';
import Product_Edit from './component/Member/Product_Edit';
import Home from './component/Blog/Home';
import Product_Detail from './component/Blog/Product_Detail';
import Cart from './component/Blog/Cart';
import Product_Wishlist from './component/Blog/Product_Wishlist';
import Checkout from './component/Blog/Checkout';
import SearchResults from './component/Blog/SearchResults';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Router>
      <App>
        <Routes>
          <Route path="/blog" element={<List_Blog />} />
          <Route path="/blog/detail/:id" element={<Detail />} />
          <Route path='/member/register' element={<Register></Register>}></Route>
          <Route path='/member/login' element={<Login></Login>}></Route>
          <Route path='/member/account' element={<Account></Account>}></Route>
          <Route path='/account/member/product_add' element={<Product_Add></Product_Add>}></Route>
          <Route path='/account/member/myproduct' element ={<MyProduct></MyProduct>}></Route>
          <Route path='/account/member/product_edit/:id' element ={<Product_Edit></Product_Edit>}></Route>
          <Route path='' element={<Home></Home>}></Route>
          <Route path='/product-detail/:id' element={<Product_Detail></Product_Detail>}></Route>
          <Route path='/cart' element={<Cart></Cart>}></Route>
          <Route path='/product-wishlist' element={<Product_Wishlist></Product_Wishlist>}></Route>
          <Route path='/checkout' element={<Checkout></Checkout>}></Route>
          <Route path='/search' element={<SearchResults></SearchResults>}></Route>
        </Routes>
      </App>
     </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
