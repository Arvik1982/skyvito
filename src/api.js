

export async function getAllAds(){
    const response = await fetch(
        'http://localhost:8090/ads',
        {
          method: 'GET',
        },
      )
      if (!response.ok) {
        throw new Error('Ошибка сервера')
      }
      const newData = await response.json()
    
      return newData
}

export async function getCurrentComment(id){
  const response = await fetch(
      `http://localhost:8090/ads/${id}/comments`,
      {
        method: 'GET',
      },
    )
    if (!response.ok) {
      throw new Error('Ошибка сервера')
    }
    const newData = await response.json()

  
    return newData
}

export async function getSellersAdds(id){
  const response = await fetch(
      `http://localhost:8090/ads/${id}`,
      {
        method: 'GET',
      },
    )
    if (!response.ok) {
      throw new Error('Ошибка сервера')
    }
    const newData = await response.json()

  
    return newData
}


export async function registration(email, password, name,surname,city,id) {

try{
const response = await fetch(
  'http://localhost:8090/auth/register',
  {
    method:'POST',
    body:JSON.stringify({
      email: `${email}`,
      password: `${password}`,
      // role: `${role}`,
      name: `${name}`,
      surname: `${surname}`,
      // phone: `${phone}`,
      city: `${city}`,
      id:`${id}`,
    }),
    headers: {"content-type": "application/json"},
  }
)
if (!response.ok) {
  
  throw new Error(Error.message)
}
const newUser = await response.json()
console.log(newUser)
return newUser

}catch(error){
  return error.message
}

}
export async function getTokens(email, password) {
const newTokens = await fetch (
  'http://localhost:8090/auth/login',
  
 { method:'POST',
    body:JSON.stringify({
      email: `${email}`,
      password: `${password}`, 
     
    }),
    headers: {
      "content-type": "application/json",
    }, 
   
 }
)
if (!newTokens.ok) {
  console.log(newTokens)
  throw new Error(Error.message)
}
const newTokensResponse = await newTokens.json()

localStorage.setItem('user_token',newTokensResponse.access_token)
localStorage.setItem('user_token_refresh',newTokensResponse.refresh_token)
return newTokensResponse
}

export async function getUserByToken(token) {

const userByToken = await fetch(
  'http://localhost:8090/user',
  {
    method:'GET',
    headers:{
      "content-type": "application/json",
      Authorization:`Bearer ${token}`,
    }
  },
)

if (!userByToken.ok) {
  
  throw new Error(Error.message)
}
const newUserByToken= await userByToken.json()

return newUserByToken
}

export async function refreshTokens() {
const token = localStorage.getItem('user_token')
const refresh = localStorage.getItem('user_token_refresh')


  const responseRefresh = await fetch(
    'http://localhost:8090/auth/login',
    {
      method: 'PUT',
      body:JSON.stringify({
        "access_token": `${token}`,
        "refresh_token": `${refresh}`, 
       
      }),
      headers: {
        
        "content-type": "application/json",
      },
    }
  )
  if (!responseRefresh.ok) {
    console.log(responseRefresh)
    throw new Error(Error.message)
  }

const dataRefresh = await responseRefresh.json()
console.log(dataRefresh)
localStorage.setItem('user_token',dataRefresh.access_token)
localStorage.setItem('user_token_refresh',dataRefresh.refresh_token)
console.log(localStorage.getItem('user_token_refresh'))
console.log(localStorage.getItem('user_token'))
return dataRefresh
}


export function getCurrentUserAdds() {
  refreshTokens().then((data)=>{
    return fetch(
      'http://127.0.0.1:8090/ads/me?sorting=new&page=1' ,
      {
        method:'GET',
  
        headers:{
          "content-type": "application/json",
          Authorization:`Bearer ${data.access_token}`,
        }
      },
    )

  }).then((response)=>{
    const resp =response.json()
    console.log (resp)
    return resp})
    .then((data)=>{return data
      
    }).then((data)=>{console.log(data)})

}