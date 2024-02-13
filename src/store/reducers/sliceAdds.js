import { createSlice } from "@reduxjs/toolkit";

const sliceAdds = createSlice({
    name:'adds',
    initialState:{
        adds:[],
        currentAdd:[],
        searchString:'',
        searchResult:[],
        currentUserAdds:[],
    },
    reducers:{
        setAdds(state,action){
           state.adds=action.payload
           localStorage.setItem('allAdds',JSON.stringify(action.payload))  
        },
        setCurrentAdd(state,action){
            state.currentAdd=action.payload
            localStorage.setItem('currentAdd',JSON.stringify(action.payload))
  
         },

         setCurrentUserAdds(state,action){
            state.currentUserAdds=action.payload
            console.log(state.currentUserAdds)},
            

         setSearchData(state,action){
            state.searchString=action.payload
            const searchBaseArr=JSON.parse(localStorage.getItem('allAdds'))
            const searchStr=state.searchString
            const resultArray= 
            searchBaseArr.filter((el)=>{
                
                return (
                String(el.title).split(' ').join('').toLowerCase()
                .includes(searchStr.split(' ').join('').toLowerCase())

                ||String(searchStr).split(' ').join('').toLowerCase()
                .includes(el.title.split(' ').join('').toLowerCase())

                ||String(el.title).split(' ').join('').toLowerCase()
                .includes(searchStr.split(' ').reverse().join(' ').toLowerCase())

                ||String(searchStr).split(' ').reverse().join('').toLowerCase()
                .includes(el.title.split(' ').join('').toLowerCase())

                || String(el.title).split(' ').reverse().join('').includes(searchStr.split(' ').join('').toLowerCase())

                ||String(el.title).split(' ').join('').toLowerCase()
                .includes(searchStr.toLowerCase())

                ||String(searchStr).toLowerCase()
                .includes(String(el.title).split(' ').join('').toLowerCase())
                )
            })
            
            resultArray?state.searchResult=resultArray:state.searchResult=JSON.parse(localStorage.getItem('allAdds'))
         }
        }
})

export const{setAdds, setCurrentAdd, setSearchData, setCurrentUserAdds}=sliceAdds.actions;
export default sliceAdds.reducer