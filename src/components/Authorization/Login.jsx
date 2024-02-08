import { useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from'./authorization.module.css'
import logoModal from '../../img/logo_modal.png'
import InputMail from './inputMail'
import InputPass from './inputPass'
import { setEnterMode, setUserData } from '../../store/reducers/sliceReg'
import { getUserByToken, getTokens } from '../../api'

export default function Login(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loginName=useSelector(state=>state.authRedux.userMail)
    const password=useSelector(state=>state.authRedux.password)


return(

<form className={styles.modal__form_login} id="formLogIn" action="#">
                <div className={styles.modal__logo}>
                    <img src={logoModal} alt="logo"/>
                </div>
                <InputMail/>
                <InputPass/>
                {/* <input className={`${styles.modal__input} ${styles.login}`} type="text" name="login" id="formlogin" placeholder="email"/>
                <input className={`${styles.modal__input} ${styles.password}`} type="password" name="password" id="formpassword" placeholder="Пароль"/> */}
                
                <button 
                onClick={()=>{getTokens(loginName, password)
                    
                    .then((tokens)=>{
                        console.log(tokens);
                        console.log(tokens.access_token);
                        getUserByToken(tokens.access_token)
                        .then((data)=>{dispatch(setUserData(data)); navigate('/profile')})

                })
            }}
                type='button' 
                className={styles.modal__btn_enter} 
                id="btnEnter">Войти
                </button>
             
                <button
                onClick={()=>{dispatch(setEnterMode('registration')); navigate('/login')}}
                type='button' 
                className={styles.modal__btn_signup} 
                id="btnSignUp">
                Зарегистрироваться
                </button>
            
            </form>
)}