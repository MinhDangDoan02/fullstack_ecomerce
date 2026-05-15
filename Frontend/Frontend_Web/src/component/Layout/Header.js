import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'
import { useSelector } from 'react-redux'

export default function Header() {

  const {wishlistCount} = useContext(AppContext)
  const [searchInput, setSearchInput] = useState('')
  const navigate = useNavigate()
  
  const cart = useSelector(state => state.cartCount.cart)
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0)
  let auth = localStorage.getItem("user")
  if(auth && auth !== "undefined"){
    try {
      auth = JSON.parse(auth)
    } catch (e) {
      auth = null
    }
  } else {
    auth = null
  }
  function handleLogout(){
    localStorage.clear()
  }

  function handleSearch(e) {
    e.preventDefault()
    if(searchInput.trim()) {
      navigate(`/search?name=${encodeURIComponent(searchInput)}`)
      setSearchInput('')
    }
  }

  const user = JSON.parse(localStorage.getItem("user"))
  console.log("user header", user)
  return (
        <header id="header">{/*header*/}
        <div className="header_top">{/*header_top*/}
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <div className="contactinfo">
                  <ul className="nav nav-pills">
                    <li><a href><i className="fa fa-phone" /> {user?.phone}</a></li>
                    <li><a href><i className="fa fa-envelope" />{user?.mail}</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="social-icons pull-right">
                  <ul className="nav navbar-nav">
                    <li><a href><i className="fa fa-facebook" /></a></li>
                    <li><a href><i className="fa fa-twitter" /></a></li>
                    <li><a href><i className="fa fa-linkedin" /></a></li>
                    <li><a href><i className="fa fa-dribbble" /></a></li>
                    <li><a href><i className="fa fa-google-plus" /></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>{/*/header_top*/}
        <div className="header-middle">{/*header-middle*/}
          <div className="container">
            <div className="row">
              <div className="col-md-4 clearfix">
                <div className="logo pull-left">
                  <Link to=""><img src="http://localhost:5000/public/upload/logo/logo.png" alt="" /></Link>
                </div>
                <div className="btn-group pull-right clearfix">
                  <div className="btn-group">
                    <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                      USA
                      <span className="caret" />
                    </button>
                    <ul className="dropdown-menu">
                      <li><a href>Canada</a></li>
                      <li><a href>UK</a></li>
                    </ul>
                  </div>
                  <div className="btn-group">
                    <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                      DOLLAR
                      <span className="caret" />
                    </button>
                    <ul className="dropdown-menu">
                      <li><a href>Canadian Dollar</a></li>
                      <li><a href>Pound</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-8 clearfix">
                <div className="shop-menu clearfix pull-right">
                  <ul className="nav navbar-nav">
                    <li>{ auth ? ( <Link to={'/member/account'} ><i className="fa fa-user" /> Account</Link>):( <Link to={'/member/login'}><i className="fa fa-user" /> Login</Link>)}</li>
                    <li><Link to={'/product-wishlist'}><i className="fa fa-star" /> Wishlist ({wishlistCount})</Link></li>
                    <li><Link to ={"/checkout"}><li><a href><i className="fa fa-crosshairs" /> Checkout</a></li></Link></li>
                    <li><Link to ={"/cart"}><li><a href><i className="fa fa-shopping-cart" /> Cart ({cartCount})</a></li></Link></li>
                    <li>{auth ? ( <Link to={'/member/login'} onClick={handleLogout}><i className="fa fa-lock" /> Logout</Link> ) : (<Link to="/member/Register"><i className="fa fa-lock" /> Register</Link>) }</li>
                   
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>{/*/header-middle*/}
        <div className="header-bottom">{/*header-bottom*/}
          <div className="container">
            <div className="row">
              <div className="col-sm-9">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                  </button>
                </div>
                <div className="mainmenu pull-left">
                  <ul className="nav navbar-nav collapse navbar-collapse">
                    <li><Link to="/">Home</Link></li>
                    <li className="dropdown"><a href="#">Shop<i className="fa fa-angle-down" /></a>
                      <ul role="menu" className="sub-menu">
                        <li><a href="shop.html">Products</a></li>
                        <li><a href="product-details.html">Product Details</a></li> 
                        <li><a href="checkout.html">Checkout</a></li> 
                        <li><a href="cart.html">Cart</a></li> 
                        <li><a href="login.html">Login</a></li> 
                      </ul>
                    </li> 
                    <li className="dropdown"><Link to="/blog">Blog<i className="fa fa-angle-down" /></Link>
                    </li> 
                    <li><a href="404.html">404</a></li>
                    <li><a href="contact-us.html">Contact</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="search_box pull-right">
                  <form onSubmit={handleSearch} style={{ display: 'flex' }}>
                    <input
                      type="text"
                      placeholder="Tìm kiếm blog hoặc sản phẩm..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      style={{ flex: 1, padding: '8px' }}
                    />
                    <button type="submit" style={{ padding: '8px 12px', cursor: 'pointer' }}>
                      <i className="fa fa-search" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
  )
}
