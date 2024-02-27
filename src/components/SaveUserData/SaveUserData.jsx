
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../../pages/Profile/profile.module.css'
// import { changeUser, refreshTokens } from '../../api'
import { accessToken } from '../../vars/vars'
// import { setUserData } from '../../store/reducers/sliceReg'
// import { setError } from '../../store/reducers/sliceError'
import saveDataChanges from './saveUserChangesClick'


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

    return(
        <button
        onClick={()=>{
          setProcessOn(true);
          saveDataChanges(
            userRefreshTokenRedux, 
            accessTokenRedux,
            setAccessTokenNew,
            accessToken,
            accessTokenNew,
            setProcessOn,
            dispatch,
            userTmpCity,
            userTmpName,
            userTmpPhone,
            userTmpSurName,
            userMail
            )}}
        type="button"
        className={`${styles.settings__btn} ${styles.btn_hov02}`}
        id="settings-btn"
      >
        {processOn?'Сохраняем...':'Сохранить'}
      </button>
    )
}