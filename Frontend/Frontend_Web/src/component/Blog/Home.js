import React, { use, useContext, useEffect, useState } from 'react'
import API from '../Config/Config'
import { Link } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'
import Product_Detail from './Product_Detail'

export default function Home() {
    const [getProducts, setProducts] = useState()
    const {updateWishList} = useContext(AppContext)
    const [category, setCategory] = useState()
    const [activeCategory, setActiveCategory] = useState(null)

    useEffect(() =>{
        API.get("/product/list")
        .then(res =>{
            console.log("products" , res.data)
            setProducts(res.data)
        })
    },[])
    useEffect(() =>{
        API.get("/category/list")
        .then(res =>{
            console.log("category" , res.data)
            setCategory(res.data)
        })
    },[])

    function handleWishlist(productId) {
        // Lấy user từ localStorage
        const user = JSON.parse(localStorage.getItem("user"))
        if(!user || !user.id) {
            alert("Vui lòng đăng nhập để thêm vào wishlist")
            return
        }

        // Kiểm tra xem sản phẩm đã có trong wishlist chưa (từ localStorage tạm thời)
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || {};
        if (wishlist[productId]) {
            alert("Sản phẩm đã có trong wishlist");
            return
        }

        // Gửi API thêm vào wishlist
        API.post("/product/wishlist/add", {
            userId: user.id,
            productId: productId
        })
        .then(res => {
            console.log("Add wishlist response:", res.data)
            
            // Cập nhật localStorage
            wishlist[productId] = 1
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            
            // Cập nhật context
            updateWishList()
            
            alert("Thêm wishlist thành công");
        })
        .catch(err => {
            console.log("Error adding to wishlist:", err)
            alert("Có lỗi xảy ra, vui lòng thử lại")
        })
    }

  function fetchData() {

    if (getProducts && getProducts.length > 0) {

        let filterProducts = getProducts

        if (activeCategory) {
            filterProducts = getProducts.filter(
                item => item.id_category === activeCategory
            )
        }

        return filterProducts.map((value) => {

            let images = JSON.parse(value.image)

            return (
                <div className="col-sm-4" key={value.id}>
                    <div className="product-image-wrapper">

                        <div className="single-products">

                            <div className="productinfo text-center">

                                <img
                                    src={
                                        "http://localhost:5000/public/upload/product/" +
                                        images[0]
                                    }
                                    alt=""
                                />

                                <h2>{value.price}</h2>

                                <p>{value.name}</p>

                                <a
                                    href="#"
                                    className="btn btn-default add-to-cart"
                                >
                                    <i className="fa fa-shopping-cart" />
                                    Add to cart
                                </a>

                            </div>

                        </div>

                        <div className="choose">

                            <ul className="nav nav-pills nav-justified">

                                <li>
                                    <Link to={"/product-detail/" + value.id}>
                                        <i className="fa fa-plus-square" />
                                        Product Detail
                                    </Link>
                                </li>

                                <li>
                                    <a
                                        href="#"
                                        onClick={() => handleWishlist(value.id)}
                                    >
                                        <i className="fa fa-plus-square" />
                                        Product Wishlist
                                    </a>
                                </li>

                            </ul>

                        </div>

                    </div>
                </div>
            )
        })
    }
}
  function fetchCategory() {
    if (category && category.length > 0) {
        return category.map((value) => {
            return (
                <li
                    key={value.id}
                    className={
                        activeCategory === value.id ? "active" : ""
                    }
                >
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            setActiveCategory(value.id)
                        }}
                    >
                        {value.name}
                    </a>
                </li>
            )
        })
    }
}


  return (
      <div className="col-sm-9 padding-right">
       
        <div className="category-tab" 
        
        >{/*category-tab*/}
          <div className="col-sm-12">
            <ul className="nav nav-tabs" >
             {fetchCategory()}
            </ul>
             <div className="features_items">{/*features_items*/}
          <h2 className="title text-center">Features Items</h2>
          {fetchData()}
          
          
        </div>{/*features_items*/}
          </div>
        
        </div>{/*/recommended_items*/}
      </div>
  )
}
