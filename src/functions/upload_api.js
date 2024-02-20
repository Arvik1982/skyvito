import { accessToken, localHost } from '../vars/vars'

export default function uploadImage(file, token, route) {
 
  
  let actualToken
  token ? (actualToken = token) : (actualToken = accessToken)
  const data = new FormData()
  data.append('file', file)




  return fetch(`${localHost}${route}`, {
    method: 'POST',
    body:  data, 
    
    headers: {
     
      Authorization: `Bearer ${actualToken}`
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('ulpoad_image_Oшибка сервера')
      }
      const resp = response.json()

      return resp
    })
    .catch((error) => {
      throw new Error(error)
    })
}
