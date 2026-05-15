import React, { useContext, useEffect, useState } from 'react'
import API from '../Config/Config'
import { Link, useParams } from 'react-router-dom'
import Rate from './Rate'
import { AppContext } from '../Context/AppContext'
import { useDispatch } from 'react-redux'
import { addCart } from '../Redux/CounterSlice'

export default function Product_Detail() {
  let params = useParams()
  const [getProductDetails, setProductDetails] = useState()
  const [zoomImg,setZoomImg] = useState("")
  const {updateCartCount} = useContext(AppContext)
  const dispatch = useDispatch()


  
  useEffect(() =>{
    API.get("/product/detail/" + params.id)
    .then(res =>{
      console.log("productDetail :",res.data)
      setProductDetails(res.data)
      let images = JSON.parse(res.data.image)
      setZoomImg(images[0])
    })  
  },[])
  

 
    const [getCart, setCart] = useState([])

 

function handleAddToCart(e) {
  e.preventDefault()
   const user = JSON.parse(localStorage.getItem("user"))
    const data = {
      userId: user.id,
      productId: getProductDetails.id,
      quantity: parseInt(e.target.parentElement.querySelector('input[name="qty"]').value),
      priceAtAdd: getProductDetails.price
    }
    console.log("data cart", data)

     API.post('/cart/add', data)
      .then(res => {
        console.log("add cart response", res.data)
        if(res.data.success){
          alert("thêm vào giỏ hàng thành công")
          updateCartCount()
          dispatch(addCart(getProductDetails.id))
        }
      })
     
   

 
 
}
  
  function fetchData(e){
    if(!getProductDetails) return null
     let images = JSON.parse(getProductDetails.image)
    if(getProductDetails )
       {
      return(
        <div className="product-details">{/*product-details*/}
          <div className="col-sm-5">
            <div className="view-product">
              <img src={"http://localhost:5000/public/upload/product/"  + zoomImg} alt="" />
              <Link to={"http://localhost:5000/public/upload/product/"   + zoomImg} rel="prettyPhoto"><h3>ZOOM</h3></Link>
            </div>
            <div id="similar-product" className="carousel slide" data-ride="carousel">
              {/* Wrapper for slides */}
              <div className="carousel-inner">
                <div className="item active"  style={{width:"100px" , display:"flex"}} >
                  {images.map((img, index) =>{

                    return( < img key={index} onClick={() => setZoomImg(img)}
                        src={"http://localhost:5000/public/upload/product/"  + "/" + img}
                     />)
                    
                    
                  })}
                 
                </div>
              </div>
              {/* Controls */}
              <a className="left item-control" href="#similar-product" data-slide="prev">
                <i className="fa fa-angle-left" />
              </a>
              <a className="right item-control" href="#similar-product" data-slide="next">
                <i className="fa fa-angle-right" />
              </a>
            </div>
          </div>
          <div className="col-sm-7">
            <div className="product-information">{/*/product-information*/}
              <img src="images/product-details/new.jpg" className="newarrival" alt="" />
              <h2>{getProductDetails.name}</h2>
              <p> Stock: {getProductDetails.stock}</p>

              <Rate id_blog_rate = {getProductDetails.id}></Rate>
             
              <span>
                <span>{getProductDetails.price}</span>
                <label>Quantity: </label>
                <input type="text" defaultValue={3} name='qty' />
                <button type="button" className="btn btn-fefault cart" onClick={handleAddToCart} >
                  <i className="fa fa-shopping-cart"  />
                  Add to cart
                 
                </button>
              </span>
              <p><b>Availability:</b>{getProductDetails.id_category} </p>
              <p><b>Detail:</b> {getProductDetails.detail}</p>
              <a href><img src="images/product-details/share.png" className="share img-responsive" alt="" /></a>
            </div>{/*/product-information*/}
          </div>
        </div>
      )
    
    
    }
      

  }



  return (
      <div className="col-sm-9 padding-right">
        {fetchData()}
        
        
      </div>
  )
}
