import { createSlice } from "@reduxjs/toolkit";

const sliceAdds = createSlice({
    name:'adds',
    initialState:{
        adds:[],
        currentAdd:[]
    },
    reducers:{
        setAdds(state,action){
           state.adds=action.payload
           localStorage.setItem('allAdds',JSON.stringify(action.payload))  
        },
        setCurrentAdd(state,action){
            state.currentAdd=action.payload
            localStorage.setItem('currentAdd',JSON.stringify(action.payload))
            

         }
    }
})

export const{setAdds, setCurrentAdd}=sliceAdds.actions;
export default sliceAdds.reducer