import { changeUser, refreshTokens } from "../../api";
import { setError } from "../../store/reducers/sliceError";
import { setUserData } from "../../store/reducers/sliceReg";



export default function saveDataChanges(
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
    
    ){
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