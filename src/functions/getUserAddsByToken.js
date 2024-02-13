import { 
  getCurrentUserAdds,
  refreshTokens 
} from '../api'
import { setError } from '../store/reducers/sliceError'
import { setCurrentUserAdds } from '../store/reducers/sliceAdds';

export default function getUserAddsByToken (dispatch){
  console.log('get')
    dispatch(setError(''));
    getCurrentUserAdds(String(localStorage.getItem('user_token')))
    .then((data)=>{console.log(data);dispatch(setCurrentUserAdds(data))})
    .catch(()=>{
      
      refreshTokens()
      .then((dataRefresh)=>{dispatch(setError(''));

        getCurrentUserAdds(dataRefresh.access_token?
          dataRefresh.access_token:
          String(localStorage.getItem('user_token')))
          .then((data)=>{console.log(data);dispatch(setCurrentUserAdds(data))})
          .catch(()=>{dispatch(setError('Перезайдите в приложение'))})
        
        }).catch(()=>{
          dispatch(setError('Перезайдите в приложение'))})})
}