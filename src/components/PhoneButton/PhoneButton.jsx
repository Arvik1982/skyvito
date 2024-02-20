import { useState } from 'react'
import styles from '../../pages/Article/article.module.css'
import { accessToken } from '../../vars/vars';

export default function PhoneButton({phone}){

    const [displayNumber, setDisplayNumber]=useState(false)

    let numberPart;
        
    if (String(phone).slice(0,1)==='+'){
        numberPart=String(phone).slice(1,4)
    }else{
        numberPart=String(phone).slice(0,3)   
    }
    
    return(
        <button
        onClick={()=>{accessToken && !displayNumber?setDisplayNumber(true):setDisplayNumber(false)}}
        type="button"
        className={`${styles.article__btn} ${styles.btn_hov02}`}
      > {!displayNumber?'Показать телефон':'' }
        {displayNumber && <span >8{phone}</span> }<br />
        {!displayNumber && <span>8&nbsp;{numberPart}&nbsp;ХХХ&nbsp;ХХ&nbsp;ХХ</span>}
      </button>
    )
}