import { 
  getCurrentUserAdds,
  refreshTokens 
} from '../api'
import { setError } from '../store/reducers/sliceError'
import { setCurrentUserAdds } from '../store/reducers/sliceAdds';
import { setTokenAccess } from '../store/reducers/sliceReg';

export default function getUserAddsByToken (dispatch){
  
    dispatch(setError(''));
    getCurrentUserAdds(String(localStorage.getItem('user_token')))
    .then((data)=>{dispatch(setCurrentUserAdds(data))})
    .catch(()=>{
      
      refreshTokens()
      .then((dataRefresh)=>{dispatch(setError(''));
        dispatch(setTokenAccess(dataRefresh.access_token));
        getCurrentUserAdds(dataRefresh.access_token?
          dataRefresh.access_token:
          String(localStorage.getItem('user_token')))
          .then((data)=>{dispatch(setCurrentUserAdds(data))})
          .catch(()=>{dispatch(setError('1_Сессия истекла.Перезайдите в приложение'))})
        
        }).catch(()=>{
          dispatch(setError('2_Сессия истекла.Перезайдите в приложение'))})})
}