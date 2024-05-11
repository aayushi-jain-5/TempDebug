import { Children, createContext, useEffect, useState }  from "react";
import {food_list} from "../assets/frontend_assets/assets.js";
import FoodDisplay from "../components/FoodDisplay/FoodDisplay.jsx";
import axios from 'axios'

export const StoreContext=  createContext("")



const StoreContextProvider  = (props) =>{

    const [cartItems,setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [tokken,setTokken] = useState("");
    const [food_list,setFoodList]  = useState([]);  
    
    const addToCart = (itemId) => {
        if(!cartItems[itemId]){
            setCartItems((prev) => ({...prev,[itemId]: 1 }))    
        }
        else{
            setCartItems((prev) => ({...prev,[itemId]:prev[itemId]+1})) 
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev,[itemId]: prev[itemId] - 1}))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = food_list.find((product) => product._id  === item)
                totalAmount += itemInfo.price * cartItems[item]

            }
        } // usig for in loop because cartitem is an object
        return totalAmount;
    }

    const fetchFoodList  = async () => {
        const response = await axios.get(url+"api/food/list");
        setFoodList(response.data.data);

    }

    useEffect(() => {
     
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("tokken")){
                setTokken(localStorage.getItem("tokken"));
            }
    
        }

        loadData();

        

    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        tokken,
        setTokken
    }


    return(
        <StoreContext.Provider value={contextValue}>
          {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;