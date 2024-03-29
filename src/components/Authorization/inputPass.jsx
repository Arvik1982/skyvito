
import { useDispatch } from 'react-redux'
import getInputValue from '../../functions/getInputValue'
import { setError } from '../../store/reducers/sliceError'
import styles from'./register.module.css'

export default function InputPass (){
    const dispatch = useDispatch()
    return(

<input onChange={(event)=>{dispatch(setError('')); getInputValue(event, dispatch, 'password')}}
className={`${styles.modal__input} ${styles.password_first}`} 
type="password" 
name="password" 
id="passwordFirst" 
placeholder="Пароль"/>

    )}