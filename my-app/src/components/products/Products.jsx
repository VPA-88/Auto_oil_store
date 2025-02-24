
import React from "react";
import Card from "./card/Card"
import style from "./Products.module.css"
import axios from 'axios';



const Products = (props) => {

  const onAddToCart = async (objCart) => {
    try {
      const findCartItem = props.cartItems.find((cartItem) => Number(cartItem.myId) === Number(objCart.myId))
      if (findCartItem) {
        axios.delete(`https://63816e3e9440b61b0d175baf.mockapi.io/cart/${findCartItem.myId}`)
        props.setCartItems(prev => prev.filter(cartItem => Number(cartItem.myId) !== Number(objCart.myId)))
      } else {
        const { data } = await axios.post('https://63816e3e9440b61b0d175baf.mockapi.io/cart', objCart)
        props.setCartItems([...props.cartItems, data]);
      }
    }
    catch {
      alert('Не удалось добавить товар в корзину')
    }
  }
  const onAddToFavorite = async (objFavorite) => {
    try {
      const findFavotiteItem = props.favoritesItems.find(favoriteItem => Number(favoriteItem.myId) === Number(objFavorite.myId))
      if (findFavotiteItem) {
        axios.delete(`https://63816e3e9440b61b0d175baf.mockapi.io/favorites/${findFavotiteItem.myId}`)
        props.setFavoritesItems(prev => prev.filter(favItems => favItems.myId !== objFavorite.myId))
      } else {
        const { data } = await axios.post('https://63816e3e9440b61b0d175baf.mockapi.io/favorites', objFavorite)
        props.setFavoritesItems([...props.favoritesItems, data]);
      }
    }
    catch {
      alert('Не удалось добавить товар в избранное')
    }
  }

  // const onAddToCart = (objCart) => {
  //   axios.post('https://63816e3e9440b61b0d175baf.mockapi.io/cart', objCart)
  //   props.setCartItems([...props.cartItems, objCart]);
  // }

  // const onAddToFavorite = (objFavorite) => {
  //   axios.post('https://63816e3e9440b61b0d175baf.mockapi.io/favorites', objFavorite)
  //   props.setFavoritesItems([...props.favoritesItems, objFavorite]);
  // }

  const onSearchInput = (inputValue) => {
    props.setSearch(inputValue.target.value)
  }



    return(
        <div className={style.products_section}>
          <div className={style.search}>
          <h2>{props.search ? `Поиск по запросу: ` + props.search : 'Maslo Castrol'}</h2> 
          {/*/<h2 className={style.text_banner_1}>Наши растения</h2>*/}
            <div className={style.search_block}>
              <img src="/img/search.png" alt="search" />
              <input onChange={onSearchInput} placeholder="Поиск " />
            </div>
          </div>  
          <div className={style.products}>  
            {
              props.items.filter((item) => item.title.toLowerCase().includes(props.search.toLowerCase()))
              .map( obj => {
                return(
                  <Card  key={obj.id} title={obj.title} 
                  myId={obj.myId}
                  description={obj.description} 
                   price={obj.price} 
                    img={obj.img}   
                    onFavorite={
                      (favoritesObj) => {
                        onAddToFavorite(favoritesObj)
                      }
                    }
                    onPlus={
                      (cartObj) => {
                        onAddToCart(cartObj)     
                    }
                  }//onAddToCart
                  />
                )
              } )
            }

          </div>
      </div>
    )
}

export default Products