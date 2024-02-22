
import { localHost } from "../../vars/vars"


 export default function deleteImg(addId,imgRef,token){

  return fetch (`${localHost}ads/${addId}/image/?file_url=${imgRef}`, {
  
    method: 'DELETE',
    
    
    headers: {
      
      Authorization: `Bearer ${token}`
    },

  })
  .then((response)=>{
      if(!response.ok){throw new Error('Недопустимый формат файла')
    };

    return response.json()

  }).catch((er)=>{throw new Error(er)})

 }

