import { createSlice } from "@reduxjs/toolkit";


const regSlice = createSlice({
    name: 'registration',
    initialState:{
        userData:'',
        userMail:'',
        password:'',
        password2:'',
        userToken:'',
        userName:'',
        userSurName:'',
        userCity:'',
        enterMode:'login',
       

    },
    reducers:{
        setUserMail(state,action){
            state.userMail=action.payload
            
        },
        setPass(state,action){
            state.password=action.payload
            
        },
        setPass2(state,action){
            state.password2=action.payload
            
        },
        setUserToken(state,action){
            state.userToken=action.payload
            
        },
        setUserName(state,action){
            state.userName=action.payload
            
        },
        setUserSurName(state,action){
            state.userSurName=action.payload
            
        },
        setUserCity(state,action){
            state.userCity=action.payload
            
        },
        setUserData(state,action){
            state.userData=action.payload
            let userUid; 
            action.payload!==null? userUid = action.payload.id:userUid = ''
            localStorage.setItem('userUID', userUid)
            localStorage.setItem('userData', JSON.stringify(action.payload))
                
        },
        setEnterMode(state,action){
            state.enterMode=action.payload
            
        },
    }
})

export const{ 
    setUserMail, 
    setPass,
    setPass2,
    setUserToken,
    setUserCity,
    setUserName,
    setUserSurName,
    setUserData,
    setEnterMode
 }=regSlice.actions
export default regSlice.reducer