import { 
  getCurrentUserAdds,
  refreshTokens 
} from '../api'
import { setError } from '../store/reducers/sliceError'
import { setCurrentUserAdds } from '../store/reducers/sliceAdds';
import { setTokenAccess, setTokenRefresh } from '../store/reducers/sliceReg';

export default function getUserAddsByToken (dispatch, userAssessTokenRedux, userRefreshTokenRedux){
  
    dispatch(setError(''));
      
    refreshTokens(userAssessTokenRedux, userRefreshTokenRedux)

      .then((dataRefresh)=>{dispatch(setError(''));
       
        dispatch(setTokenAccess(dataRefresh.access_token));
        dispatch(setTokenRefresh(dataRefresh.refresh_token));
        return dataRefresh 
        })
        .then((dataRefresh)=>{
          getCurrentUserAdds(dataRefresh.access_token)        
          .then((data)=>{
            dispatch(setCurrentUserAdds(data))})
          .catch((er)=>{
            console.log(er.message)
            console.log('getCurrentUserAdds_1. Перезайдите в приложение')
            dispatch(setError('Сессия истекла, обновите страницу'))})
        })
                
        .catch((err)=>{
         
           err.access_token?getCurrentUserAdds(err.access_token)
           .then((data)=>{dispatch(setCurrentUserAdds(data))})
           .catch((er)=>{
            console.log(er.message)
            dispatch(setError('getCurrentUserAdds_2. Перезайдите в приложение'))})
           
           :
            console.log(err.message)
          dispatch(setError('refreshTokens. Перезайдите в приложение'))
        })
        
}