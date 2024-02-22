import { createSlice } from "@reduxjs/toolkit";


const regSlice = createSlice({
    name: 'registration',
    initialState:{
        userData:'',
        userMail:'',
        password:'',
        password2:'',
        userName:'',
        userSurName:'',
        userCity:'',
        enterMode:'login',
        access_token:'',
        access_refresh:'',
        userTmpName:'',
        userTmpSurName:'',
        userTmpCity:'',
        userTmpPhone:'',

       

    },
    reducers:{
        setUserTmpPhone(state,action){
            state.userTmpPhone=action.payload
            console.log(state.userTmpPhone)
            
        },
        setUserTmpCity(state,action){
            state.userTmpCity=action.payload
            console.log(state.userTmpCity)
            
        },
        setUserTmpName(state,action){
            state.userTmpName=action.payload
            console.log(state.userTmpName)
            
        },
        setUserTmpSurName(state,action){
            state.userTmpSurName=action.payload
            
            console.log(state.userTmpSurName)
        },
        setUserMail(state,action){
            localStorage.setItem('userMail',action.payload)
            state.userMail=action.payload
            
        },
        setPass(state,action){
            state.password=action.payload
            
        },
        setPass2(state,action){
            state.password2=action.payload
            
        },
        // setUserToken(state,action){
        //     state.userToken=action.payload
            
        // },
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
        setTokenAccess(state,action){
            console.log(state.access_token)
            state.access_token=action.payload
            
        },
        setTokenRefresh(state,action){
            state.access_refresh=action.payload
            
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
    setEnterMode,
    setTokenAccess,
    setTokenRefresh,
    setUserTmpName,
    setUserTmpSurName,
    setUserTmpPhone,
    setUserTmpCity
 }=regSlice.actions
export default regSlice.reducer