// const initState = {
//     cart: JSON.parse(localStorage.getItem("cart"))
// }

// const rootReducer = (state = initState , action) => {

//     switch(action.type) {

//         case "ADD_CART":
//             const currentQtyAdd = state.cart[action.payload] || 0

//             const newCartADD = {
//                 ...state.cart,
//                 [action.payload]: currentQtyAdd + 1
//             }
//             localStorage.setItem("cart", JSON.stringify(newCartADD))
//             return {
//                 ...state,
//                 cart: newCartADD
//             }
            
//         case "DOWN_CART":
//             const currentQtyDown = state.cart[action.payload] 
//              let newCartDown = { ...state.cart }
//             if (currentQtyDown > 1) {
//                 newCartDown[action.payload] = currentQtyDown - 1
//             } else {
//                 delete newCartDown[action.payload]

//             }
//             localStorage.setItem("cart", JSON.stringify(newCartDown))

//             return {
//                 ...state,
//                 cart:newCartDown
//             }
        
//         case "DELETE_CART" :
//             const currentQtyDelete = state.cart[action.payload]
//             const newCartDel = {
//                 ...state.cart
//             }
//             delete newCartDel[action.payload]
//             localStorage.setItem("cart", JSON.stringify(newCartDel))

//             return {
//                 ...state,
//                 cart:newCartDel
//             }


//         default:
//             return state

//     }

// }
// export default rootReducer 