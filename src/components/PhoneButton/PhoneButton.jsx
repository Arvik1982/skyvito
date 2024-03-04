import { useState } from 'react'
import { useSelector } from 'react-redux';
import styles from '../../pages/Article/article.module.css'


export default function PhoneButton({phone}){

  

  const userAssessTokenRedux = useSelector(
    (state) => state.authRedux.access_token,
  )

    const [displayNumber, setDisplayNumber]=useState(false)
    const [needToLogin, setNeedToLogin] = useState(false)
    // const [commentsOpen, setCommentsOpen]= useState(false)
    const token = localStorage.getItem('user_token')
    const [defaultNumber] = useState('NNN-NN-NN')

    const userCheckPhoneOpen =()=>{
      displayNumber?setDisplayNumber(false):setDisplayNumber(true)
      setNeedToLogin(false)
      
      
     }
     const userCheckPhoneClose =()=>{
      setDisplayNumber(false)
      setNeedToLogin(true)
      
     }

    let numberPart;
        
    if (String(phone).slice(0,1)==='+'){
        numberPart=String(phone).slice(1,4)
    }else{
        numberPart=String(phone).slice(0,3)   
    }
    // ||token?userCheckCommentsOpen():setNeedToLogin(true)}
    return(<>
        <button
        onClick={()=>{userAssessTokenRedux || Boolean(token)? userCheckPhoneOpen():userCheckPhoneClose()}}
        type="button"
        className={`${styles.article__btn} ${styles.btn_hov02}`}
      > {!displayNumber?'Показать телефон':'' }
        {displayNumber && <span >8-{phone?phone:defaultNumber}</span> }<br />
        {!displayNumber && <span>8&nbsp;{numberPart}&nbsp;ХХХ&nbsp;ХХ&nbsp;ХХ</span>}
      </button>
       { needToLogin && 
        <h1 style={{
          marginTop:'5px',
          fontSize:'16px',
          color:'red'}}
        >Войдите в приложение </h1>}
        </>
    )
}