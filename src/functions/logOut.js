import { setEnterMode, setPass, setPass2, setTokenAccess, setTokenRefresh, setUserData, setUserMail } from '../store/reducers/sliceReg'
import { setCurrentAdd, setCurrentUserAdds } from '../store/reducers/sliceAdds'

export default function logout(dispatch, navigate){
    dispatch(setEnterMode('login'))
    navigate('/')
    localStorage.removeItem('userUID')
    localStorage.removeItem('userData')
    localStorage.removeItem('user_token')
    localStorage.removeItem('user_token_refresh')
    localStorage.removeItem('currentAdd')
    dispatch(setUserData(''))
    dispatch(setCurrentAdd(''))
    dispatch(setCurrentUserAdds([]))
    dispatch(setUserMail(''))
    dispatch(setPass(''))
    dispatch(setPass2(''))
    dispatch(setTokenAccess(''))
    dispatch(setTokenRefresh(''))
    
   
}