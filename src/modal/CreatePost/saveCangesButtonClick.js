import { refreshTokens } from "../../api";
import { setCreateAddStatus, setNewPostLoadSuccess, setNewPostReady } from "../../store/reducers/sliceAdds";
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
    userRefreshTokenRedux
    )
    {
    e.stopPropagation()
            
    dispatch(setNewPostReady(false));
    refreshTokens(userAssessTokenRedux, userRefreshTokenRedux)
        .then((tokens)=>{ 
          dispatch(setNewPostLoadSuccess(false));
          changeTxt(tokens.access_token,title,description,price,postId)
           .then((txtData)=>{
           uploadImg(tokens.access_token,file,txtData.id,imgUploadForms,dispatch)
          
          }
              ).catch((errTxt)=>{console.log(errTxt)})})
              .then(()=>{
              dispatch(setNewPostLoadSuccess(true));
              dispatch(setCreateAddStatus(false))})
              .then(()=>{navigate('/profile')})
              .catch((errTokens)=>{console.log(errTokens)})
  }