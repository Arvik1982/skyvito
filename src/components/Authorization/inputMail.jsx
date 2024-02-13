import { useDispatch } from 'react-redux'
import getInputValue from '../../functions/getInputValue'
import { setError } from '../../store/reducers/sliceError'
import styles from'./register.module.css'

export default function InputMail (){
    const dispatch = useDispatch()
    return(
        <input 
onChange={(event)=>{ dispatch(setError('')); getInputValue(event, dispatch, 'email')}}
className={`${styles.modal__input} ${styles.login}`} 
type="text" 
name="email" 
id="loginReg" 
placeholder="email"/>
    )
}