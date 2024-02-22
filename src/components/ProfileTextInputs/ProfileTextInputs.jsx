import { useEffect,useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from '../../pages/Profile/profile.module.css'
import { setUserTmpCity, setUserTmpName,setUserTmpSurName } from '../../store/reducers/sliceReg'

export default function ProfileTextInput({value, placeholder,name}){

  const [inputValue, setInputValue]=useState(value)
  const dispatch= useDispatch()

  useEffect(()=>{
    
    name==='name'? dispatch(setUserTmpName(inputValue)):
    name==='surname'?dispatch(setUserTmpSurName(inputValue)):
    name==='city'?dispatch(setUserTmpCity(inputValue)):''
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