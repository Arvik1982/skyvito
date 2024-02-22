import { baseData } from "../vars/vars";

export default function checkLoginStatus(userDataRedux){
    let userData;

    userDataRedux?
    userData=userDataRedux: 
    JSON.parse(localStorage.getItem('userData'))?
    userData = JSON.parse(localStorage.getItem('userData')):
    userData=baseData


    return userData
}