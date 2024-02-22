import styles from'./logo.module.css'
import logo from'../../img/logo.png'

export default function LogoSky(){

    return(<>
        <a className={styles.search__logo_link} href="#" target="_blank">
        <img className={styles.search__logo_img} src={logo} alt="logo"/>
    </a>
    <a className={styles.search__logo_mob_link} href="#" target="_blank">
        <img className={styles.search__logo_mob_img} src="img/logo-mob.png" alt="logo"/>
    </a>
    </>
    )
}