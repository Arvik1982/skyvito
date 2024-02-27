
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../../pages/Profile/profile.module.css'
import { changeUser, refreshTokens } from '../../api'
import { accessToken } from '../../vars/vars'
import { setUserData } from '../../store/reducers/sliceReg'
import { setError } from '../../store/reducers/sliceError'


export default function SaveUserData(){

    const dispatch = useDispatch()
    const userTmpName = useSelector(state=>state.authRedux.userTmpName)
    const userTmpSurName = useSelector(state=>state.authRedux.userTmpSurName)
    const userTmpCity = useSelector(state=>state.authRedux.userTmpCity)
    const userTmpPhone = useSelector(state=>state.authRedux.userTmpPhone)
    const accessTokenRedux = useSelector((state) => state.authRedux.access_token)
    const userRefreshTokenRedux = useSelector((state) => state.authRedux.access_refresh);
    const userMail = useSelector((state) => state.authRedux.userMail)
    const [accessTokenNew,setAccessTokenNew]=useState(accessTokenRedux)
    const [processOn,setProcessOn]=useState(false)

    useEffect(()=>{
      accessTokenRedux? setAccessTokenNew(accessTokenRedux):setAccessTokenNew(accessToken)
     },[])

    function saveDataChanges(){
    let email;
    userMail?email=String(userMail):email=String(localStorage.getItem('userMail'))
    
    const toSend = {
    city:String(userTmpCity),
    email:email,
    name: String(userTmpName),
    phone: String(userTmpPhone),
    role:"string",
    surname:String(userTmpSurName)
    }

  
      accessTokenRedux? setAccessTokenNew(accessTokenRedux):setAccessTokenNew(accessToken)

   
if(toSend){
    changeUser(accessTokenNew,toSend)
    .then((data)=>{dispatch(setError(''));
    setProcessOn(false);
    localStorage.removeItem('userData');
       dispatch(setUserData(data))})
    .catch(()=>{
      refreshTokens(accessTokenRedux,userRefreshTokenRedux)
      .then((tokens)=>{
        dispatch(setError(''));
       
        changeUser(tokens.access_token,toSend)
        .then((data)=>{
          localStorage.removeItem('userData');
           dispatch(setUserData(data));setProcessOn(false)
        }).catch((newError)=>{console.log(newError);setProcessOn(false);
          dispatch(setError('3_save_data_changes_Сессия истекла. Перезайдите в приложение'))})
      })
        .catch((newErr)=>{console.log(newErr); setProcessOn(false);   
         dispatch(setError('2_save_data_changes_Сессия истекла. Перезайдите в приложение'))})
    })
  }}


    return(
        <button
        onClick={()=>{setProcessOn(true);saveDataChanges()}}
        type="button"
        className={`${styles.settings__btn} ${styles.btn_hov02}`}
        id="settings-btn"
      >
        {processOn?'Сохраняем...':'Сохранить'}
      </button>
    )
}