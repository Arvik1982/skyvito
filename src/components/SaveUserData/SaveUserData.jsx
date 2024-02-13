

import { useDispatch, useSelector } from 'react-redux'
import styles from '../../pages/Profile/profile.module.css'
// import checkLoginStatus from '../../functions/checkLoginStatus'
import { changeUser } from '../../api'
import { accessToken } from '../../vars/vars'
import { setUserData } from '../../store/reducers/sliceReg'
import checkLoginStatus from '../../functions/checkLoginStatus'

export default function SaveUserData(){

    const dispatch = useDispatch()
    const userTmpName = useSelector(state=>state.authRedux.userTmpName)
    const userTmpSurName = useSelector(state=>state.authRedux.userTmpSurName)
    const userTmpCity = useSelector(state=>state.authRedux.userTmpCity)
    const userTmpPhone = useSelector(state=>state.authRedux.userTmpPhone)
    const userDataRedux = useSelector(state=>state.authRedux.userData) 
    const userData = checkLoginStatus(userDataRedux)

    function saveDataChanges(){
 
    
    const toSend = {
    city:String(userTmpCity),
    email:userData.email,
    name: String(userTmpName),
    phone: String(userTmpPhone),
    role:"string",
    surname:String(userTmpSurName)
    }
    const accessTokenNew = accessToken
    changeUser(accessTokenNew,toSend).then((data)=>{dispatch(setUserData(data))}).catch((err)=>{console.log(err)})

    }


    return(
        <button
        onClick={()=>{saveDataChanges()}}
        type="button"
        className={`${styles.settings__btn} ${styles.btn_hov02}`}
        id="settings-btn"
      >
        Сохранить
      </button>
    )
}