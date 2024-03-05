import { createSlice } from "@reduxjs/toolkit";

const sliceAdds = createSlice({
    name:'adds',
    initialState:{
        adds:[],
        currentAdd:[],
        searchString:'',
        searchResult:[],
        currentUserAdds:[],
        createAdd:false,
        newPostReady:false,
        newPostLoadSuccess:false,
        editMode:false,
        searchButtonClick:false,
        imageRef:'',
        imageRefId:'',
        imgDeleted:false,
        dataChanged:false,
        newAddId:'',
        noMainImg:false
       
        
    },
    reducers:{

      setNewAddId(state,action){
         
         state.newAddId=action.payload
         
         
     },

      setDataChanged(state,action){
         
         state.dataChanged=action.payload
         
         
     },

     
     setNoMainImg(state,action){
         
      state.noMainImg=action.payload
      
      
  },

      setImgDeleted(state,action){
         
         state.imgDeleted=action.payload
         
         
     },
       

        setEditMode(state,action){
            
            state.editMode=action.payload
             
         },

        setNewPostLoadSuccess(state,action){
            
            state.newPostLoadSuccess=action.payload
             
         },


        setNewPostReady(state,action){
            
            state.newPostReady=action.payload
             
         },

        setCreateAddStatus(state,action){

            state.createAdd=action.payload
             
         },

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
           },
            

         setSearchData(state,action){
            state.searchString=action.payload
            const searchBaseArr=JSON.parse(localStorage.getItem('allAdds'))
            const searchStr=state.searchString
            const resultArray= 
            searchBaseArr.filter((el)=>{
                
                return (
                  String(el.title).toLowerCase()
                .includes(searchStr.toLowerCase())


               //  String(el.title).split(' ').join('').toLowerCase()
               //  .includes(searchStr.split(' ').join('').toLowerCase())

               //  ||String(searchStr).split(' ').join('').toLowerCase()
               //  .includes(el.title.split(' ').join('').toLowerCase())

               //  ||String(el.title).split(' ').join('').toLowerCase()
               //  .includes(searchStr.split(' ').reverse().join(' ').toLowerCase())

               //  ||String(searchStr).split(' ').reverse().join('').toLowerCase()
               //  .includes(el.title.split(' ').join('').toLowerCase())

               //  || String(el.title).split(' ').reverse().join('').includes(searchStr.split(' ').join('').toLowerCase())

               //  ||String(el.title).split(' ').join('').toLowerCase()
               //  .includes(searchStr.toLowerCase())

               //  ||String(searchStr).toLowerCase()
               //  .includes(String(el.title).split(' ').join('').toLowerCase())
                )         
        
            })
            
            resultArray?state.searchResult=resultArray:state.searchResult=JSON.parse(localStorage.getItem('allAdds'))
         },

         setSearchButtonClick(state,action){
            
            
            state.searchButtonClick=action.payload
             
         },

         setImageRef(state,action){
            state.imageRef=action.payload
             
         },
         setImageRefId(state,action){
            state.imageRefId=action.payload
             
         }

        }
})

export const{setAdds,
     setCurrentAdd,
      setSearchData,
       setCurrentUserAdds,
       setCreateAddStatus,
       setNewPostImg,
       setNewPostReady,
       setNewPostLoadSuccess,
    setEditMode, 
    setSearchButtonClick,
    setImageRef,
    setImageRefId,
    setImgDeleted,
    setDataChanged,
    setNewAddId,
    setNoMainImg
}=sliceAdds.actions;
export default sliceAdds.reducer