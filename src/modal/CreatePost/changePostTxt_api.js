import { localHost } from "../../vars/vars"


export default async function changeTxt(token,title,description,price,id){
  try{
  const changeResponse = await fetch(`${localHost}ads/${id}`, {
    method: 'PATCH',
    body:  JSON.stringify({
        title: title,
        description: description,
        price: price
    }),
    headers: {
    'content-type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  })
      if (!changeResponse.ok) {
        throw new Error('ulpoad_TXT_Oшибка сервера')
      }
      const change = await changeResponse.json()
      return change
  }catch (error)  {
         console.log ('ulpoad_TXT_Oшибка сервера') 
         throw new Error(error.message)}
}