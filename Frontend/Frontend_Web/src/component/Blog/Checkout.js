import React, { useEffect, useState } from 'react'
import API from '../Config/Config'
import { data, useNavigate } from 'react-router-dom'

export default function Checkout() {
    const navigate = useNavigate()
    const [countrys, setCountrys] = useState([])
    const [getCart, setCart] = useState([])
    const [errors, setErrors] = useState({})
    const [getInfo, setInfo] = useState({
        fullName: '',
        phone: '',
        address: '',
        idCountry: '',
        note: ''
    })
   

    const user = localStorage.getItem("user")
    const userId = JSON.parse(user)

useEffect(() => {
        API.get('/country/list')
            .then(res => setCountrys(res.data))
            .catch(err => console.error('Country list error', err))
    }, [])

    useEffect(() => {
        if (!userId) return
        API.get('/cart/' + userId.id)
            .then(res => setCart(res.data))
            .catch(err => console.error('Cart load error', err))
    }, [])

    const qtyUp = async (id) => {
        const item = getCart.find(item => item.id === id)
        if (!item) return

        const newQty = item.quantity + 1
        setCart(getCart.map(item => item.id === id ? { ...item, quantity: newQty } : item))
        await API.post('/cart/update/' + id, { quantity: newQty })
    }

    const qtyDown = async (id) => {
        const item = getCart.find(item => item.id === id)
        if (!item) return

        if (item.quantity > 1) {
            const newQty = item.quantity - 1
            setCart(getCart.map(item => item.id === id ? { ...item, quantity: newQty } : item))
            await API.post('/cart/update/' + id, { quantity: newQty })
        } else {
            await API.post('/cart/delete/' + id)
            setCart(getCart.filter(item => item.id !== id))
        }
    }

    const qtyDelete = async (id) => {
        await API.post('/cart/delete/' + id)
        setCart(getCart.filter(item => item.id !== id))
    }

    const fetchData = () => {
        if (!getCart || !getCart.length) return null
        return getCart.map((value) => {
            const image = JSON.parse(value.product.image)
            return (
                <tr key={value.id}>
                    <td className="cart_product">
                        <a href="#"><img style={{ width: '100px' }} src={'http://localhost:5000/public/upload/product/' + image[0]} alt="" /></a>
                    </td>
                    <td className="cart_description">
                        <h4><a href="#">{value.product.name}</a></h4>
                        <p>Web ID: {value.web_id}</p>
                    </td>
                    <td className="cart_price">
                        <p>{value.priceAtAdd}</p>
                    </td>
                    <td className="cart_quantity">
                        <div className="cart_quantity_button">
                            <a className="cart_quantity_up" href="#" onClick={e => { e.preventDefault(); qtyUp(value.id) }}> + </a>
                            <input className="cart_quantity_input" type="text" name="quantity" value={value.quantity} readOnly autoComplete="off" size={2} />
                            <a className="cart_quantity_down" href="#" onClick={e => { e.preventDefault(); qtyDown(value.id) }}> - </a>
                        </div>
                    </td>
                    <td className="cart_total">
                        <p className="cart_total_price">{value.priceAtAdd * value.quantity}</p>
                    </td>
                    <td className="cart_delete">
                        <a className="cart_quantity_delete" href="#" onClick={e => { e.preventDefault(); qtyDelete(value.id) }}><i className="fa fa-times" /></a>
                    </td>
                </tr>
            )
        })
    }
    function handleInputChange(e) {
        const { name, value } = e.target
        setInfo(prev => ({ ...prev, [name]: value }))
    }


    const subTotal = getCart.reduce((total, item) => total + (item.priceAtAdd * item.quantity), 0)
    let shippingFee =30 
    let discountAmount = 10
    const finalTotal = subTotal + shippingFee - discountAmount

    const handleSubmit = async (e) => {
        e.preventDefault()
        let setErrorSubmit = {}
        let flag = true
        if(getInfo.fullName.trim() === ''){
            setErrorSubmit.fullName = "dien ten khong duoc de trong"
            flag = false
        }
        if(getInfo.phone.trim() === ''){
            setErrorSubmit.phone = "dien so dien thoai khong duoc de trong"
            flag = false
        }   
        if(getInfo.address.trim() === ''){
            setErrorSubmit.address = "dien dia chi khong duoc de trong"
            flag = false
        }
        if(getInfo.idCountry.trim() === ''){
            setErrorSubmit.idCountry = "chon quoc gia"
            flag = false
        }
        if(!flag){
            setErrors(setErrorSubmit)
            return
        }else{
            const data = { 
                userId: userId.id,
                fullName: getInfo.fullName,
                phone: getInfo.phone,
                address: getInfo.address,
                id_country: getInfo.idCountry,
                note: getInfo.note,
                shippingFee: 30,
                discountAmount: 10,
                totalAmount: finalTotal
            }
            console.log("Data gửi lên:", data);           // ← Thêm dòng này
            console.log("idCountry value:", getInfo.idCountry); // ← Thêm dòng này  
                API.post('/order/create', data)
                    .then(res => {
                        if (res.data.success) {
                            alert("dat hang thanh cong")
                            navigate('/')
                        }
                    })
                    .catch(err => console.error('Order creation error', err))
            }
            
            

   
        }



  return (
     <form onSubmit={handleSubmit}>
        <section id="cart_items">
        <div className="container">
          <div className="breadcrumbs">
            <ol className="breadcrumb">
              <li><a href="#">Home</a></li>
              <li className="active">Check out</li>
            </ol>
          </div>{/*/breadcrums*/}
          <div className="step-one">
            <h2 className="heading">Step1</h2>
          </div>
          <div className="checkout-options">
            <h3>{userId.name}</h3>
            <p>Checkout options</p>
            
          </div>{/*/checkout-options*/}
        
          <div className="shopper-informations">
            <div className="row">
              <div className="col-sm-3">
                <div className="shopper-info">
                  <p>Shopper Information</p>
                    <form>
                        <input type="text" placeholder="User Name" value={userId.name} />
                        <input type="text" placeholder="Email*" value={userId.email} />
                        <input type="text" placeholder="Phone*" value={userId.phone} />
                    </form>
                </div>
              </div>
              <div className="col-sm-5 clearfix">
                <div className="bill-to">
                  <p>Bill To</p>
                  <div className="form-one">
                    <form>
                        <input name='fullName' type="text" placeholder="Full Name *" value={getInfo.fullName} onChange={handleInputChange} />
                        <input name='address' type="text" placeholder="Address *" value={getInfo.address} onChange={handleInputChange} />
                        <input name='shippingFee' type="text" placeholder="shippingFee" value={30}  />
                        <input name='discountAmount' type="text" placeholder="Discount Amount" value={10}  />
                    
                      <input name='phone' type="text" placeholder="Phone *" value={getInfo.phone} onChange={handleInputChange} />
                    </form>
                  </div>
                    <div className="form-two">
                          <select name='idCountry' value={getInfo.idCountry} onChange={handleInputChange}>
                        <option>-- Country --</option>
                        {countrys.map((country) => (
                          <option key={country.id} value={country.id}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                        
                </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="order-message">
                  <p>Shipping Order</p>
                  <textarea name="note" placeholder="Notes about your order, Special Notes for Delivery" rows={16} defaultValue={""} 
                  onChange={handleInputChange}/>
                  <label><input type="checkbox" /> Shipping to bill address</label>
                </div>	
              </div>					
            </div>
          </div>
          <div className="review-payment">
            <h2>Review &amp; Payment</h2>
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
              <tbody>
                    {fetchData()}
                <tr>
                  <td colSpan={4}>&nbsp;</td>
                  <td colSpan={2}>
                    <table className="table table-condensed total-result">
                      <tbody><tr>
                          <td>Cart Sub Total</td>
                          <td>{subTotal}</td>
                        </tr>
                        <tr>
                          <td>Discount</td>
                          <td>{discountAmount}</td>
                        </tr>
                        <tr className="shipping-cost">
                          <td>Shipping Cost</td>
                          <td>{shippingFee}</td>										
                        </tr>
                        <tr>
                          <td>Total</td>
                          <td><span>{finalTotal}</span></td>
                        </tr>
                      </tbody></table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="payment-options">
            <span>
              <label><input type="checkbox" /> Direct Bank Transfer</label>
            </span>
            <span>
              <label><input type="checkbox" /> Check Payment</label>
            </span>
            <span>
              <label><input type="checkbox" /> Paypal</label>
            </span>
             <button type="submit" className="btn btn-primary">Order</button>
          </div>
          
        </div>
       
      </section> 
       

        </form>
  )
}

