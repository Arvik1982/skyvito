import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import LoginWrapper from "../../components/Authorization/LoginWrapper"
import Login from "../../components/Authorization/Login"
import Register from "../../components/Authorization/Register"



export default function AuthorizationPage(){

const enterMode =useSelector(state=>state.authRedux.enterMode)
console.log(enterMode)
const [authMode, setAuthMode]= useState('login')

useEffect(()=>{
 setAuthMode(enterMode)   
},[enterMode])

const loginMode = <LoginWrapper page={<Login/>}/>
const regMode = <LoginWrapper page={<Register/>}/>

return(  (authMode==='login')?loginMode:regMode)}