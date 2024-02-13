import { 
  useEffect,
   useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../../pages/Profile/profile.module.css'

import checkLoginStatus from '../../functions/checkLoginStatus'
import { setUserTmpCity, setUserTmpName,setUserTmpSurName } from '../../store/reducers/sliceReg'

export default function ProfileTextInput({value, placeholder,name}){

  const [inputValue, setInputValue]=useState(value)
  const userDataRedux = useSelector(state=>state.authRedux.userData)
  const userData = checkLoginStatus(userDataRedux)
  const newUserData=userData
  const dispatch= useDispatch()

 useEffect(()=>{
  console.log(name)
  name==='name'? dispatch(setUserTmpName(inputValue)):
  name==='surname'?dispatch(setUserTmpSurName(inputValue)):
  name==='city'?dispatch(setUserTmpCity(inputValue)):''
 

  console.log(newUserData)
 },[inputValue])

  

    return(
        <input 
        onChange={(event)=>setInputValue(event.target.value)}
        className={styles.settings__f_name}
        id="fname"
        name="userInput"
        type="text"
        value={inputValue}
        placeholder={placeholder}
      />
    
    )
}