import {
  
    //  getAllAds, 
    refreshTokens } from "../../api";
import {
    //  setAdds, 
     setCreateAddStatus, setCurrentAdd, setNewPostLoadSuccess, setNewPostReady } from "../../store/reducers/sliceAdds";
import changeTxt from "./changePostTxt_api";
import uploadImg from "./createImgPost_api";



export default function saveUploadButtonClick(
    e,
    dispatch,
    navigate,
    title,
    description,
    price,
    file,
    imgUploadForms,
    postId,
    userAssessTokenRedux,
    userRefreshTokenRedux,
    
    )
    {
    e.stopPropagation()
            
    dispatch(setNewPostReady(false));
    refreshTokens(userAssessTokenRedux, userRefreshTokenRedux)
        .then((tokens)=>{ 
          dispatch(setNewPostLoadSuccess(false));
          changeTxt(tokens.access_token,title,description,price,postId)
           .then((txtData)=>{
            dispatch(setCurrentAdd(txtData))
           uploadImg(tokens.access_token,file,txtData.id,imgUploadForms,dispatch)
           
           
           return txtData
          }
              )
              .catch((errTxt)=>{console.log(errTxt)})
            
            })
              .then(()=>{
                
                // получить каррент адд и записать в локал стор localStorage.setItem('currentAdd', currentAdd)
                dispatch(setNewPostLoadSuccess(true));
                dispatch(setCreateAddStatus(false))
                      
            })
              .then(()=>{

               
                navigate(`/article/${postId}`)
            
            })
              .catch((errTokens)=>{console.log(errTokens)})
  }