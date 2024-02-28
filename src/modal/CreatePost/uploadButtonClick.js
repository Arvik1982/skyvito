
import { refreshTokens } from "../../api";
import { setCreateAddStatus, setNewPostLoadSuccess, setNewPostReady } from "../../store/reducers/sliceAdds";
// import uploadImg from "./createImgPost_api";
import uploadImgTxt from "./createImgTxtPost";
// import uploadTxt from "./createTxtPost_api";




export default function uploadButtonClick(
    e,dispatch, navigate,title,description,price, file, imgUploadForms,
    userAssessTokenRedux, userRefreshTokenRedux)
{
    e.stopPropagation()
           
    // dispatch(setNewPostReady(false));
    refreshTokens(userAssessTokenRedux, userRefreshTokenRedux)
        .then((tokens)=>{ 
          dispatch(setNewPostLoadSuccess(false));
            //  uploadTxt(tokens.access_token,title,description,price)  
            //  .then((txtData)=>{
              // uploadImg(tokens.access_token,file,txtData.id,imgUploadForms,dispatch);
              uploadImgTxt(tokens.access_token,file,
                // txtData.id,
                imgUploadForms,dispatch, title,description,price)
            // })
              // .catch((errTxt)=>{console.log(errTxt)})
            
            })
              .then(()=>{
                dispatch(setNewPostLoadSuccess(true));
                dispatch(setCreateAddStatus(false))})
              .then(()=>{navigate('/profile');dispatch(setNewPostReady(false))})
              .catch((errTokens)=>{console.log(errTokens)})
  }