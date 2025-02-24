import style from './header.module.css'
import {Link} from 'react-router-dom'
const Header = (props) =>{
    return (
        <header>
           {/* <div className={style.logo}><img src='/img/logo.png' alt="#"/> </div>*/}

            <nav>
                <Link to='/'className={style.nav_item}>
                <img src='/img/logo.png' alt="#"/>
                <a  className={style.nav_item}></a>
                </Link>

                
                <a className={style.nav_item}>Контакты</a>
               <Link to='/favorites' className={style.nav_item}>
                <a className={style.nav_item}>Избранное</a>
                </Link>
                <button className={style.overlay} onClick={props.openCart}>Корзина</button>
            </nav>
        </header>
    )
} 
export default Header