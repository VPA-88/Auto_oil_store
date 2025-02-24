
import style from './banner.module.css'
const Banner = () => {
  return(
  
    <div className={style.banner}>
    <div className={style.banner_section}>  
        <p className={style.text_banner}> Maslo Castrol
          <br />
          <span>Лучшие цены на высококачественное масло для двухтактных двигателей </span>
          <br />
          <button className={style.banner_btn}>Купить</button>
        </p>
      </div>
    </div>
    )
}
export default Banner





