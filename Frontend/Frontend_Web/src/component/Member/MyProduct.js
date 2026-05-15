import React, { useEffect, useState } from 'react'
import API from '../Config/Config'
import { Link } from 'react-router-dom';

export default function MyProduct() {
   const [getProduct, setProduct] = useState({})
   let token = JSON.parse(localStorage.getItem("token"))
  
   let config = { 
                    headers: { 
                    'Authorization': 'Bearer '+ token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                    } 
                };
   
   useEffect(() =>{
    API.get("/user/my-product" , config)
    .then(res => {
      setProduct(res.data.data)
      console.log("getProduct",res.data.data)
    })
    
   },[])

   function delete_product(){
   
      API.get("/user/product/delete/" + glo_id, config)
      .then(res =>{
        console.log("delete_log" , res.data.data)
        setProduct(res.data.data)
      })


   }
   var glo_id = ""
 

   function fetchData(){
    const Products = Object.values(getProduct)
   if(Products && Products.length > 0){
    return( 
      Products.map((value, key)=>{
        const images = JSON.parse(value.image)
        glo_id = value.id
        return(
        <tr>
                <td className="cart_product" key={value.id}>
                  <a href><img src={"http://localhost/laravel8/laravel8/public/upload/product/"+ value.id_user + "/" + images[0]} alt=""  style={{ width: "100px" }} /></a>
                </td>
                <td className="cart_description">
                  <h4><a href>{value.name}</a></h4>
                </td>
                <td className="cart_price">
                  <p>{value.price}</p>
                </td>
                <td className="cart_total">
                  <Link to={"/account/member/product_edit/" + value.id}>edit</Link>
                  <Link onClick={delete_product} >delete</Link>
                </td>
              </tr>)
      })

    )
      
    }
   }
  


  return (
       <div className="col-sm-9">
        <div className="table-responsive cart_info">
          <table className="table table-condensed">
            <thead>
              <tr className="cart_menu">
                <td className="image">image</td>
                <td className="description">name</td>
                <td className="price">price</td>
                <td className="total">action</td>
              </tr>
            </thead>
            {fetchData()}
           
          </table>
        </div>
      </div>
  )
}
