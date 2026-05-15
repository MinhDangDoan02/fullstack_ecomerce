import React, { use, useContext, useEffect, useState } from 'react'
import API from '../Config/Config'
import { AppContext } from '../Context/AppContext'
import { useDispatch } from 'react-redux'


export default function Cart(props) {

  // const {updateCartCount} = useContext(AppContext)

    const [getCart, setCart] = useState([])
    const dispatch = useDispatch()
    const user = localStorage.getItem("user") 
    const userId = JSON.parse(user)
    console.log("user", userId.id)
    

  
    useEffect(() =>{

        let cart = JSON.parse(localStorage.getItem("cart"))
        console.log("cart",cart)
        API.get('/cart/' + userId.id)
        .then(res => {
            console.log("cart data", res.data)
            setCart(res.data)
        }
            
        )
    },[])
    function qtyUp(id){

      let newCart = [...getCart]

      newCart.map(async(value,key)=>{

        if(value.id === id){

          const newQty = value.quantity + 1

          newCart[key].quantity = newQty

          await API.post('/cart/update/' + id,{
            quantity:newQty
          })

        }

      })

      setCart(newCart)
    }
      function qtyDown(id){

  let newCart = [...getCart]

  newCart.map(async(value,key)=>{

    if(value.id === id){

      if(value.quantity > 1){

        const newQty = value.quantity - 1

        newCart[key].quantity = newQty

        await API.post('/cart/update/' + id,{
          quantity:newQty
        })

      }
      else{

        await API.post('/cart/delete/' + id)

        const updatedCart = newCart.filter(item => item.id !== id)

        setCart(updatedCart)

      }

    }

  })

  setCart(newCart)
}
    //      function qtyDelete(id) {
    //         let newCart2 = [...getCart];
    //   const updatedCart = newCart2.filter(item => item && item.id !== id)
    //   setCart(updatedCart)
    //   localStorage.setItem("cart", JSON.stringify());

    //   console.log("Giỏ hàng sau khi xóa:", updatedCart);
    // }
   async function qtyDelete(id){

  await API.post('/cart/delete/' + id)

  const updatedCart = getCart.filter(item => item.id !== id)

  setCart(updatedCart)

}
 


    
    function fetchData(e){
      if(!getCart) return null
      if(getCart && getCart.length > 0){
        return getCart.map((value,index) =>{
          let image = JSON.parse(value.product.image)
          return (
             <tr key={value.id}>
                    <td className="cart_product">
                      <a  href><img style={{width:"100px"}} src={"http://localhost:5000/public/upload/product/"  + image[0]} alt="" /></a>
                    </td>
                    <td className="cart_description">
                      <h4><a href>{value.product.name}</a></h4>
                      <p>Web ID: {value.web_id}</p>
                    </td>
                    <td className="cart_price">
                      <p>{value.priceAtAdd}</p>
                    </td>
                    <td className="cart_quantity">
                      <div className="cart_quantity_button">
                        <a className="cart_quantity_up" onClick={() => qtyUp(value.id)} id={value.id} > + </a>
                        <input className="cart_quantity_input" type="text" name="quantity" value={value.quantity} autoComplete="off" size={2} />
                        <a className="cart_quantity_down" onClick={() => qtyDown(value.id)}  href> - </a>
                      </div>
                    </td>
                    <td className="cart_total">
                      <p className="cart_total_price" >{value.priceAtAdd * value.quantity}</p>
                    </td>
                    <td className="cart_delete">
                      <a className="cart_quantity_delete" onClick={() => qtyDelete(value.id)}  href><i className="fa fa-times" /></a>
                    </td>
                  </tr>
                  
)
        })
      }
    }
    // Tính tổng tiền hàng (Sub Total)
        const subTotal = getCart.reduce((total, item) => {
            return total + (item.priceAtAdd * item.quantity);
        }, 0);

        
        const ecoTax = 2;

        
        const finalTotal = subTotal + ecoTax;
  return (
     <div>
        <section id="cart_items">
          <div className="container">
            <div className="breadcrumbs">
              <ol className="breadcrumb">
                <li><a href="#">Home</a></li>
                <li className="active">Shopping Cart</li>
              </ol>
            </div>
            <div className="table-responsive cart_info">
              <table className="table table-condensed">
                <thead>
                  <tr className="cart_menu">
                    <td className="image">Item</td>
                    <td className="description" />
                    <td className="price">Price</td>
                    <td className="quantity">Quantity</td>
                    <td className="total">Total</td>
                    <td />
                  </tr>
                </thead>
                <tbody id="cart_tbody">
                  {fetchData()}

                </tbody>
              </table>
            </div>
          </div>
        </section> {/*/#cart_items*/}
        <section id="do_action">
          <div className="container">
           
            <div className="row">
              <div className="col-sm-6">
                <div className="total_area">
                  <ul>
                    <li className="cart_sub_total">Cart Sub Total <span>{subTotal}</span></li>
                    <li className="eco_tax">Eco Tax <span>{ecoTax}</span></li>
                    <li>Shipping Cost <span>Free</span></li>
                    <li className="total_all">Total <span>{finalTotal}</span></li>
                  </ul>
                  <a className="btn btn-default update" href>Update</a>
                  <a className="btn btn-default check_out" href>Check Out</a>
                </div>
              </div>
            </div>
          </div>
        </section>{/*/#do_action*/}
      </div>
  )
}

