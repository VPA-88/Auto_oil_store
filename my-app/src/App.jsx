
import React from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom'
import './App.css';
import Header from './components/header/Header';
import Cart from './components/cart/Cart';
import Footer from './components/footer/Footer';
import Favorites from './components/favorites/Favorites';
import Home from './components/Home';
export const AppContext = React.createContext({})
function App() {
  
  // state для хранения товаров
  const [products, setProducts] = React.useState([]);
  // state состояние корзины
  const [cartOpened, setCartOpened] = React.useState(false);
  // state для хранения товаров в корзине
  const [cartItems, setCartItems] = React.useState([]);
  // state для хранения избранных товаров
  const [favoritesItems, setFavoritesItems] = React.useState([])
  // state для поиска
  const [search, setSearch] =React.useState('')

  React.useEffect(() => {
    axios.get('https://63816e3e9440b61b0d175baf.mockapi.io/products').then((res) => {
      setProducts(res.data)
    })

    axios.get('https://63816e3e9440b61b0d175baf.mockapi.io/cart').then((res) => {
      setCartItems(res.data)
    })

    axios.get('https://63816e3e9440b61b0d175baf.mockapi.io/favorites').then((res) => {
      setFavoritesItems(res.data)
    })
  }, [])
  
  const onRemoveCartItem = (id) => {
    axios.delete(`https://63816e3e9440b61b0d175baf.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)))
  }
  const itemAdded = (myId) => {
    return cartItems.some((objCart) => objCart.myId ===myId)
  }

  const itemFavorite =(id) =>{
    return cartItems.some((objFavorite) => objFavorite.id ===id)
  }

  return (
    <AppContext.Provider value={{products,cartOpened,cartItems,favoritesItems,search,
      setProducts,setCartOpened,setCartItems,setFavoritesItems,setSearch,itemAdded, itemFavorite}}>
    <div className="app">
      { cartOpened ? <Cart 
      onRemoveCartItem={onRemoveCartItem}
      cartItems={cartItems} 
      closeCart={ () => setCartOpened(false) } 
      totalPrice={cartItems.reduce((totalElements, objPrice)=> totalElements+Number(objPrice.price),0)}
      /> : null 
      }
  
      <Header openCart={ () => setCartOpened(true) } />
        <Routes>
          <Route path='/favorites' element={
            <Favorites/>
          }
          />
          <Route path='/' element={
            <Home 
              items={products} 
              cartItems={cartItems} 
              setCartItems={setCartItems}
              setSearch={setSearch} 
              search={search}
              favoritesItems={favoritesItems}
              setFavoritesItems={setFavoritesItems}
            />
          }
          />
        </Routes>
      <Footer />

    </div>
    </AppContext.Provider>
  );
}

export default App;
