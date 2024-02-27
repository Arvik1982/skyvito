import { useNavigate } from 'react-router-dom'

import styles from'./logo.module.css'
import logo from'../../img/logo.png'

export default function LogoSky(){
    const navigate = useNavigate()

    return(<>
    <div className={styles.search__logo_link} >
        <img
         onClick={()=>{navigate('/')}}
         className={styles.search__logo_img} src={logo} alt=""/>
    </div>
    <div className={styles.search__logo_mob_link} >
        <img 
        onClick={()=>{navigate('/')}}
        className={styles.search__logo_mob_img} src="img/logo-mob.png" alt=""/>
    </div>
    </>
    )
}