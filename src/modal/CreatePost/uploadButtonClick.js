
import { 
  
  refreshTokens } from "../../api";
import { setCreateAddStatus, setNewAddId, setNewPostLoadSuccess, setNewPostReady } from "../../store/reducers/sliceAdds";
import uploadImg from "./createImgPost_api";
import uploadTxt from "./createTxtPost_api";

// const currentAddLocal = JSON.parse(localStorage.getItem('currentAdd'))

let newPostId;

export default function uploadButtonClick(
    e,dispatch, navigate,title,description,price, file, imgUploadForms,
    userAssessTokenRedux, userRefreshTokenRedux,
    // articleId
    )
{
    e.stopPropagation()
    
    
    
    
    refreshTokens(userAssessTokenRedux, userRefreshTokenRedux)
        .then((tokens)=>{ 
          dispatch(setNewPostLoadSuccess(false));
             uploadTxt(tokens.access_token,title,description,price)  
             .then((txtData)=>{
              localStorage.setItem('currentAdd',JSON.stringify(txtData))
              uploadImg(tokens.access_token,file,txtData.id,imgUploadForms,dispatch);
              dispatch(setNewAddId(txtData.id))
              navigate(`/article/${txtData.id}`)
              
            })
              .catch((errTxt)=>{console.log(errTxt)})
            
            })
              .then(()=>{
                dispatch(setNewPostLoadSuccess(true));
                dispatch(setCreateAddStatus(false))})
              .then(()=>{

                
                console.log(newPostId)
                // navigate(`/article/${currentAddLocal.id}`)
                
                ;dispatch(setNewPostReady(false))})
              .catch((errTokens)=>{console.log(errTokens)})
  }