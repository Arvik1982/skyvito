
import { localHost } from "../../vars/vars"
import getUserAddsByToken from "../../functions/getUserAddsByToken"


export default  function uploadImg(token,file,id,imgUploadForms,
   dispatch
   ){
 
  const data1 = new FormData()
  const data2 = new FormData()
  const data3 = new FormData()
  const data4 = new FormData()
  const data5 = new FormData()
  
  data1.append('file', imgUploadForms[0].img)
  data2.append('file', imgUploadForms[1].img)
  data3.append('file', imgUploadForms[2].img)
  data4.append('file', imgUploadForms[3].img)
  data5.append('file', imgUploadForms[4].img)

 function sendImg(data){
  return fetch (`${localHost}ads/${id}/image`, {
  
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

imgUploadForms[0].img?sendImg(data1).catch((er)=>{console.log(er.message)}):''

imgUploadForms[1].img?sendImg(data2).catch((er)=>{console.log(er.message)}):''

imgUploadForms[2].img?sendImg(data3).catch((er)=>{console.log(er.message)}):''

imgUploadForms[3].img?sendImg(data4).catch((er)=>{console.log(er.message)}):''

imgUploadForms[4].img?sendImg(data5).catch((er)=>{console.log(er.message)}):''

getUserAddsByToken(dispatch)


}