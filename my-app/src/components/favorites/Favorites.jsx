import React from "react";
import axios from "axios";
import style from "./favorites.module.css";
import FavoritesCard from "./favoritesCard/favoritesCard";
import { AppContext } from "../../App";

const Favorites = (props) => {

    const context=React.useContext(AppContext);


    const onAddToCart = (objCart) => {
        axios.post('https://63816e3e9440b61b0d175baf.mockapi.io/cart', objCart)
        context.setCartItems([...context.cartItems, objCart]);
    }
  
    const onRemoveFavorites = (id) => {
        axios.delete(`https://63816e3e9440b61b0d175baf.mockapi.io/favorites/${id}`)
        context.setFavoritesItems((prev) => prev.filter(item => Number(item.id) !== Number(id)))
    }

    return(
        <div className={style.products_section}>

          <div className={style.search}>
            <h2>Избранные товары</h2> 
          </div>
                
          <div className={style.products}> 
            
            {
              context.favoritesItems.map( obj => {
                return(
                  <FavoritesCard 
                    key={obj.id} 
                    myId={obj.myId}
                    id={obj.id}
                    title={obj.title} 
                    description={obj.description} 
                    price={obj.price} 
                    img={obj.img}
                    onFavorite={
                      (id) => {
                        onRemoveFavorites(id)
                      }
                    }
                    onPlus={
                      (cartObj) => {
                        onAddToCart(cartObj)
                      }
                    }
                  />
                )
              } )
            }

          </div>
      </div>
    )
}

export default Favorites