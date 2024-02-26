
import { localHost } from "../../vars/vars"


 export default async function deleteImg(addId,imgRef,token){
try{
 const response = await fetch (`${localHost}ads/${addId}/image/?file_url=${imgRef}`, {
  
    method: 'DELETE',
    
    
    headers: {
      
      Authorization: `Bearer ${token}`
    },

  })
  if (!response.ok){

    const dataErr = await response.json()

    if(dataErr.detail!=='No content'){
    
    throw new Error(response)
  }

  if(dataErr.detail==='No content'){
    
  return dataErr.detail 
          
  }
if (dataErr.detail!=='No content'&& response.status===400){
  throw new Error('Ошибка обработки файла')
}

  }

const data = await response.json()
return data


 }catch(er){
 
  throw new Error(er)
  }

}

