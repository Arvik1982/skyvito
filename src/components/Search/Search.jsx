import styles from'./search.module.css'
import logo from'../../img/logo.png'

export default function Search (){  
return(
    <div className={`${styles.main__search} ${styles.search}`}>
    <a className={styles.search__logo_link} href="#" target="_blank">
        <img className={styles.search__logo_img} src={logo} alt="logo"/>
    </a>
    <a className={styles.search__logo_mob_link} href="#" target="_blank">
        <img className={styles.search__logo_mob_img} src="img/logo-mob.png" alt="logo"/>
    </a>
    <form className={styles.search__form} action="#">
        <input className={styles.search__text} type="search" placeholder="Поиск по объявлениям" name="search"/>
        <input className={styles.search__text_mob} type="search" placeholder="Поиск" name="search-mob"/>
        <button type='button' className={`${styles.search__btn} ${styles.btn_hov02}`}>Найти</button>
    </form>

</div>

)}