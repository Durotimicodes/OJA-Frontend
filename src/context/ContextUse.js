import React, {
  useContext,
  createContext,
  useReducer,
  useEffect,
  useState,
useCallback} from "react";
import { reducer } from "./reducer";
import { DATA_FROM_SEARCH, GET_CHAT_ID  } from "./actions";
import axios from "axios";
import instance from "../axios"

// const cartFromLocal = localStorage.getItem("cart");
// const cartAmountFromLocal = localStorage.getItem("cartAmount");

const initialState = {
  category: "All Categories",
  lowerPrice: "",
  upperPrice: "",
  sort: "",
  chatId: null
};

// const userData = {
// address: "Address",
// email: "Email",
// first_name: "First Name",
// image:"https://www.kindpng.com/picc/m/52-526237_avatar-profile-hd-png-download.png",
// last_name: "Last Name",
// phone_number: "Phone Number"
// }

const userData = {
  address: "",
  email: "",
  first_name: "",
  image:"",
  last_name: "",
  phone_number: ""
  }
export const context = createContext(null);

const ContextUse = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [user, setUser] = useState(userData)
  const [cart, setCart] = useState({
    cart: 0,
    cartAmount: 0,
    quantity: [],
    alert: 1,
  });
  const [deletedItem, setDeletedITem] =useState(false);
  // console.log(state)

  const handleSearch = (data) => {
    dispatch({ type: DATA_FROM_SEARCH, payload: { ...data } });
  };

  const setCartId = (id) => {
    dispatch({type: GET_CHAT_ID, payload: id})
  }
  const addToCart = () => {
    ViewCart()
  };

  const ViewCart = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
      };
      const resp = await axios.get(
        "https://oja-ecommerce.herokuapp.com/api/v1/viewcart",
        { headers: headers }
      );
      const cartQuantity = resp.data
         setCart({
      cart: cartQuantity.length,
      cartAmount: cartQuantity.reduce((acc, product) => {
        return acc + product.Price;
      }, 0),
      quantity: cartQuantity,
    });
      // return resp.data;
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    ViewCart();
    getUser()
}, [deletedItem]);

// useEffect(()=>{
//   if(deletedItem){
//     ViewCart();
    
//   }
// }, [deletedItem])


console.log(cart.quantity)
  const getUser = async ()=>{
    try {
     const response = await instance.get('/getbuyerprofile')
      console.log(response)
            setUser({...user,...response.data.data})
          } catch (error) {
  console.log(error.response, "this is an error")
          }
  }

  const filterCart = async ()=>{
    // const obj = cart.quantity.filter((item)=> item.CartProductID != id);
    // console.log("obj", obj);
    // console.log("id: ", id);
    // console.log("quantity: ", quantity);
    // cart.quantity = quantity;
    // setCart({...cart, quantity: [...cart.quantity, ...obj]});
    // console.log(cart);
  // ViewCart()
  }
  console.log(user)
  
  return (
    <context.Provider value={{ ...state, ...cart, handleSearch, addToCart, user, getUser, filterCart, setCart, ViewCart, setDeletedITem, deletedItem, setCartId}}>
      {children}
    </context.Provider>
  );
};

export const useAppContext = () => {
  return useContext(context);
};

export default ContextUse;
