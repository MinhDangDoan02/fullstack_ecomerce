import {   useEffect, useState, createContext } from "react";


export const AppContext = createContext([])

export const AppProvider = ({children}) => {
   const [cartCount, setCartCount] = useState(0)
   const [wishlistCount, setWishlistCount] = useState(0) 

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || {}
    const total = Object.values(cart).reduce((sum, qty) => sum + qty, 0)
    setCartCount(total)
  }

  const updateWishList = () =>{
    const wishList = JSON.parse(localStorage.getItem("wishlist")) || {}
    const totalWish = Object.keys(wishList).length
    setWishlistCount(totalWish)
  }

  useEffect(() => {
    updateCartCount();
    updateWishList() 
  }, []);

    return <AppContext.Provider value={{cartCount, updateCartCount, wishlistCount, updateWishList}}>
        {children}
    </AppContext.Provider>
}