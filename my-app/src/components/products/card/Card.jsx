
import style from './card.module.css'
import React, { useState } from "react"
import { AppContext } from '../../../App';


const Card = (props) =>{
  const context = React.useContext(AppContext)
  //const [added, setAdded] = useState(false);
  const [favorite, setFavorite] = useState(false)

  const onClickPlus = () => {
    let id=props.id
    let myId=props.myId
    let title = props.title
    let description = props.description
    let price = props.price
    let img = props.img 
    props.onPlus({id, myId, title, description, price, img});
    //setAdded(!added);
  }


  const onClickFavorite = () => {
    let id=props.id
    let myId=props.myId
    let title = props.title
    let description = props.description
    let price = props.price
    let img = props.img 

    props.onFavorite({id, myId, title, description, price, img});
    setFavorite(!favorite);
  }
  return(
      <div className={style.product_item}>
            
            {favorite === true ? <button className={style.favorite_btn_added} 
            // context.itemFavorite(props.myId) === true ? <button className={style.favorite_btn_added} 
            onClick={onClickFavorite} >Товар добавлен в избранное</button>
             : 
            <button className={style.favorite_btn} onClick={onClickFavorite}>Добавить в избранное</button>}

            <img className={style.product_img} src={props.img} alt={props.title} />
            <p className={style.product_title}>{props.title}</p>
            <p className={style.product_description}>{props.description}</p>
            <p className={style.price}>Цена </p>

            <div className={style.product_price}>
              <span>{props.price} руб</span>
              {/* <button className={context.itemAdded(props.myId) ? style.check_btn : style.plus_btn} onClick={onClickPlus}>
                <img src={context.itemAdded(props.myId) ? '/img/check.png' : '/img/plus.png'} alt=""/> */}
              <button className={context.itemAdded(props.myId) ? style.check_btn : style.plus_btn} onClick={onClickPlus}>
                <img src={context.itemAdded(props.myId) ? '/img/check.png' : '/img/plus.png'} alt=""/>
              </button>
            </div> 
          </div>
  )
}

export default Card