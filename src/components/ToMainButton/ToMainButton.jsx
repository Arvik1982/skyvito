import { Link } from "react-router-dom"
import styles from'./tomainbutton.module.css'

export default function ToMainButton(){
    return(
<Link to='/'>
        <button
        type="button"
        className={`${styles.menu__btn_serch} ${styles.btn_hov02}`}
        id="btnGoBack"
      >
        Вернуться на главную
      </button> 
    </Link>  
    )
}