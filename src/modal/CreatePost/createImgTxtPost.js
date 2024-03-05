
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
 console.log(imgUploadForms) 

for (let i=0;i<5; i+=1){
    if(!imgUploadForms[i].deleted){
     imgUploadForms[i].img? data1.append('files', imgUploadForms[i].img):''
}
}
 function sendImgTxt(data){
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




sendImgTxt(data1).catch((er)=>{console.log(er.message)})



getUserAddsByToken(dispatch)


}