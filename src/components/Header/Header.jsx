import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from'./header.module.css'
import checkLoginStatus from '../../functions/checkLoginStatus'
import { setUserData } from '../../store/reducers/sliceReg'

export default function Header ({noDisplay, page}){

const navigate= useNavigate() 
const dispatch = useDispatch()
const userData = useSelector(state=>state.authRedux.userData)
const loginStatus = checkLoginStatus(userData)
const [isLogin, setIsLogin]=useState('')

useEffect(()=>{
  loginStatus.name!=='No_Data'? setIsLogin(true):setIsLogin(false)
},[])

return(

<header className={styles.header}>
<nav className={styles.header__nav}>
  <button type='button'  className={`${styles.header__btn_putAd} ${noDisplay?styles.el_display:''}`}>Разместить объявление</button>
  
  {isLogin&& 
  <button
  onClick={()=>{
  navigate('/')
  localStorage.removeItem('userUID');
  localStorage.removeItem('userData');
  dispatch(setUserData(null))

  }} 

  type='button'
  className={`${styles.header__btn_putAd} ${noDisplay?styles.el_display:''}`}>Log out
  </button>
  }

  {
  page!=='profile'&& 
  <button 
  onClick={()=>{navigate('/profile')}}
  type='button' 
  className={`${styles.header__btn_main_enter} ${styles.btn_hov01}`} 
  id="btnMainEnter">Вход в личный кабинет
  </button>
  }

 
</nav>
</header>

)}