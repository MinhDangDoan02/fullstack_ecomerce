import React, { useContext, useEffect, useState } from 'react'
import API from '../Config/Config'
import { AppContext } from '../Context/AppContext';

export default function Product_Wishlist() {
    const [wishListProducts, setWishListProducts] = useState([])
    const {updateWishList} = useContext(AppContext)

    useEffect(() => {
        // Lấy user từ localStorage
        const user = JSON.parse(localStorage.getItem("user"))
        if(user && user.id) {
            // Fetch wishlist theo user ID từ API
            API.get(`/product/wishlist/` + user.id)
                .then(res => {
                    console.log("Wishlist data:", res.data)
                    setWishListProducts(res.data || [])
                })
                .catch(err => {
                    console.log("Error fetching wishlist:", err)
                    setWishListProducts([])
                })
        }
    }, []);

    // xoa san pham khoi wishlist
   function removeWishlist(id){
    const user = JSON.parse(localStorage.getItem("user"))
    if(!user || !user.id) {
        alert("Vui lòng đăng nhập")
        return
    }

    // TODO: Gọi API xóa khỏi wishlist nếu backend có endpoint DELETE
    // API.delete(`/product/wishlist/remove/${user.id}/${id}`)
    // .then(res => {
    //     console.log("Remove wishlist response:", res.data)
    // })
    // .catch(err => {
    //     console.log("Error removing from wishlist:", err)
    // })

    // Tạm thời chỉ cập nhật localStorage và state
    let prd_WishList = JSON.parse(localStorage.getItem("wishlist")) || {}
    delete prd_WishList[id]

    let productsWishList = wishListProducts.filter(item => item && item.id !== id)
    setWishListProducts(productsWishList)
    localStorage.setItem("wishlist", JSON.stringify(prd_WishList))
    updateWishList()
   }

    function renderWishlist() {
        if (wishListProducts.length > 0) {
            return wishListProducts.map((value,index) => {
                console.log(value.image)
                let images = JSON.parse(value.image);
                return (    
                    <tr key={value.id}>
                        <td className="cart_product">
                            <img 
                                src={"http://localhost:5000/public/upload/product/" + images[0]} 
                                style={{width: "80px"}} 
                                alt="" 
                            />
                        </td>
                        <td className="cart_description">
                            <h4>{value.name}</h4>
                            <p>Stock: {value.stock}</p>
                        </td>
                        <td className="cart_price">
                            <p>${value.price}</p>
                        </td>
                        <td className="cart_delete">
                            <a className="cart_quantity_delete" onClick={() => removeWishlist(value.id)}>
                                <i className="fa fa-times" />
                            </a>
                        </td>
                    </tr>
                )
            })
        } else {
            return <tr><td colSpan="4"><p className="text-center">Wishlist is empty</p></td></tr>
        }
    }

    return (
        <section id="cart_items">
            <div className="container">
                <div className="table-responsive cart_info">
                    <table className="table table-condensed">
                        <thead>
                            <tr className="cart_menu">
                                <td className="image">Item</td>
                                <td className="description">Name</td>
                                <td className="price">Price</td>
                                <td />
                            </tr>
                        </thead>
                        <tbody>
                            {renderWishlist()}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}