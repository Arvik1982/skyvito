import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from'./register.module.css'
import logoModal from '../../img/logo_modal.png'
import { getTokens, registration } from '../../api'
import getInputValue from '../../functions/getInputValue'
import { setError } from '../../store/reducers/sliceError'
import createUserUid from '../../functions/createUid'
import { setTokenAccess, setTokenRefresh, setUserData} from '../../store/reducers/sliceReg'
import InputMail from './inputMail'
import InputPass from './inputPass'


export default function Register(){

  const userMail = useSelector(state=>state.authRedux.userMail)
  const userPassword = useSelector(state=>state.authRedux.password)
  const userPassword2 = useSelector(state=>state.authRedux.password2)
  const userName = useSelector(state=>state.authRedux.userName)
  const userSurName = useSelector(state=>state.authRedux.userSurName)
  const userCity= useSelector(state=>state.authRedux.userCity)
  const error = useSelector(state=>state.errorRedux.error)
  const userId = createUserUid()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    
    dispatch(setError(''))
  },[])
  
return(
    
<form className={styles.modal__form_login} id="formLogUp" action="#">
<div className={styles.modal__logo}>
    <img src={logoModal} alt="logo"/>
</div>
<InputMail/>
<InputPass/>
<input onChange={(event)=>{ getInputValue(event, dispatch, 'password2')}}
 className={`${styles.modal__input} ${styles.password_double}`} 
 type="password" 
 name="password2" 
 id="passwordSecond" 
 placeholder="Повторите пароль"/>

<input onChange={(event)=>{ getInputValue(event, dispatch, 'userName')}}
 className={`${styles.modal__input} ${styles.first_name}`} 
 type="text" 
 name="first-name" 
 id="first-name" 
 placeholder="Имя (необязательно)"/>

<input onChange={(event)=>{ getInputValue(event, dispatch, 'userSurName')}}
 className={`${styles.modal__input} ${styles.first_last}`} 
 type="text" name="first-last" 
 id="first-last" 
 placeholder="Фамилия (необязательно)"/>


<input onChange={(event)=>{ getInputValue(event, dispatch, 'userCity')}}
className={`${styles.modal__input} ${styles.city}`} 
type="text" 
name="city" 
id="city" 
placeholder="Город (необязательно)"/>
{error&&<div style={{color:'red', position:'absolute', bottom:'17%', marginBottom:'8px'}}>{error}</div>}
<button 
onClick={()=>{

    if(!userMail){''}
    else{
  
    userPassword!==userPassword2?
    dispatch(setError('Пароли не совпадают')):
    registration(
    userMail,
    userPassword,     
    userName,
    userSurName,
    userCity,
    userId
    )
    .then((data)=>{
        
        localStorage.removeItem('userData');
        dispatch(setUserData(data));
        dispatch(setError(''))})
    
    .then((data)=>{
        getTokens(userMail,userPassword)
        .then((tokens)=>{
            dispatch(setTokenAccess(tokens.access_token))
            dispatch(setTokenRefresh(tokens.refresh_token));
            return tokens
        }) .then((d)=>{navigate('/profile') 
        return d})
        .catch((errorData)=>{    
            dispatch(setError(errorData.message))
    })
    return data    
    }).catch((errorData)=>{
        dispatch(setError(errorData.message))})
    }
   

}
} 
    type='button' 
    className={styles.modal__btn_signup_ent} 
    id="SignUpEnter">
    Зарегистрироваться </button>
</form>

)}