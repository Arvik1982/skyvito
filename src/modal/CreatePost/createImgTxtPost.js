
import { localHost } from "../../vars/vars"
import getUserAddsByToken from "../../functions/getUserAddsByToken"


export default  function uploadImgTxt(
    token,
    file,
    // id,
    imgUploadForms,
    dispatch,
    title,
    description,
    price
   ){
 
  const data1 = new FormData()

imgUploadForms[0].img? data1.append('files', imgUploadForms[0].img):''
imgUploadForms[1].img? data1.append('files', imgUploadForms[1].img):''
imgUploadForms[2].img? data1.append('files', imgUploadForms[2].img):''
imgUploadForms[3].img? data1.append('files', imgUploadForms[3].img):''
imgUploadForms[4].img? data1.append('files', imgUploadForms[4].img):''

 function sendImg(data){
  return fetch (`${localHost}ads?title=${title}&description=${description}&price=${price}`, {
  
    method: 'POST',
    body:  data, 
    
    headers: {
      
      Authorization: `Bearer ${token}`
    },
  }).catch((er)=>{throw new Error(er)})
    .then((response)=>
    {if(!response.ok){throw new Error('Недопустимый формат файла')};
    return response.json()
  })
 }

if(!imgUploadForms[0].deleted){
  
imgUploadForms[0].img?sendImg(data1).catch((er)=>{console.log(er.message)}):''
imgUploadForms[1].img?sendImg(data1).catch((er)=>{console.log(er.message)}):''
imgUploadForms[2].img?sendImg(data1).catch((er)=>{console.log(er.message)}):''
imgUploadForms[3].img?sendImg(data1).catch((er)=>{console.log(er.message)}):''
imgUploadForms[4].img?sendImg(data1).catch((er)=>{console.log(er.message)}):''
}

getUserAddsByToken(dispatch)


}