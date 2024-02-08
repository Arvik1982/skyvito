import {setPass, setPass2 ,setUserMail, setUserCity, setUserName, setUserSurName, } from "../store/reducers/sliceReg"
import { setError } from "../store/reducers/sliceError";

export default function getInputValue(event, dispatch,type){
    dispatch(setError(''));
    type==='email'?dispatch(setUserMail(event.target.value)):
    type==='password'?dispatch(setPass(event.target.value)):
    type==='password2'?dispatch(setPass2(event.target.value)):
    type==='userName'?dispatch(setUserName(event.target.value)):
    type==='userSurName'?dispatch(setUserSurName(event.target.value)):
    type==='userCity'?dispatch(setUserCity(event.target.value)):''
}
