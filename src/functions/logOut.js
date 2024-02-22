import { setEnterMode, setUserData } from '../store/reducers/sliceReg'
import { setCurrentAdd, setCurrentUserAdds } from '../store/reducers/sliceAdds'

export default function logout(dispatch, navigate){
    dispatch(setEnterMode('login'))
    navigate('/')
    localStorage.removeItem('userUID')
    localStorage.removeItem('userData')
    localStorage.removeItem('user_token')
    dispatch(setUserData(''))
    dispatch(setCurrentAdd(''))
    dispatch(setCurrentUserAdds([]))
   
}