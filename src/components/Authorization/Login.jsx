import { useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from'./authorization.module.css'
import logoModal from '../../img/logo_modal.png'
import InputMail from './inputMail'
import InputPass from './inputPass'
import { setEnterMode, setTokenAccess, setUserData} from '../../store/reducers/sliceReg'
import { getUserByToken, getTokens } from '../../api'
import { setError } from '../../store/reducers/sliceError'


export default function Login(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loginName=useSelector(state=>state.authRedux.userMail)
    const password=useSelector(state=>state.authRedux.password)
    const error = useSelector(state=>state.errorRedux.error)
    useEffect(()=>{
        dispatch(setEnterMode('login'))
        dispatch(setError(''))
    },[])

return(

<form className={styles.modal__form_login} id="formLogIn" action="#">
                <div className={styles.modal__logo}>
                    <img src={logoModal} alt="logo"/>
                </div>
                <InputMail/>
                <InputPass/>
                {error&&<div style={{color:'red', position:'absolute', bottom:'45%', marginTop:'8px', marginBottom:'5px'}}>{error}</div>}
                <button 
                onClick={()=>{getTokens(loginName, password)
                    
                    .then((tokens)=>{
                        
                        dispatch(setTokenAccess(tokens.access_token))
                        getUserByToken(tokens.access_token)
                        .then((data)=>{
                            localStorage.removeItem('userData');
                            console.log(data)
                            console.log('setUserData')
                            dispatch(setUserData(data));
                            
                             navigate('/profile')})
                        .catch((newError)=>{dispatch(setError(newError.message))})

                    }).catch((newError)=>{dispatch(setError(newError.message))})
            }}
                type='button' 
                className={styles.modal__btn_enter} 
                id="btnEnter">Войти
                </button>
             
                <button
                onClick={()=>{
                    dispatch(setError(''));
                    dispatch(setEnterMode('registration'));
                    navigate('/login')
                }}
                type='button' 
                className={styles.modal__btn_signup} 
                id="btnSignUp">
                Зарегистрироваться
                </button>
            
            </form>
)}