

export async function getAllAds() {
  const response = await fetch('http://localhost:8090/ads', {
    method: 'GET',
  })
  if (!response.ok) {
    throw new Error('Ошибка сервера')
  }
  const newData = await response.json()

  return newData
}

export async function getCurrentComment(id) {
  const response = await fetch(`http://localhost:8090/ads/${id}/comments`, {
    method: 'GET',
  })
  if (!response.ok) {
    throw new Error('Ошибка сервера')
  }
  const newData = await response.json()

  return newData
}

export async function getSellersAdds(id) {
  const response = await fetch(`http://localhost:8090/ads/${id}`, {
    method: 'GET',
  })
  if (!response.ok) {
    throw new Error('Ошибка сервера')
  }
  const newData = await response.json()

  return newData
}

export async function registration(email, password, name, surname, city, id) {
  try {
    const response = await fetch('http://localhost:8090/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
        name: `${name}`,
        surname: `${surname}`,
        city: `${city}`,
        id: `${id}`,
      }),
      headers: { 'content-type': 'application/json' },
    })
    if (!response.ok) {
      const answer = await response.json()

      let err
      String(answer.details).includes('UNIQUE constraint failed: user.email')
        ? (err = ' Почта занята')
        : (err = 'WTF Error')

      throw new Error(err)
    }
    const newUser = await response.json()
    
    return newUser
  } catch (error) {
    throw new Error(error.message)
  }
}
export async function getTokens(email, password) {
  const newTokens = await fetch(
    'http://localhost:8090/auth/login',

    {
      method: 'POST',
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
      }),
      headers: {
        'content-type': 'application/json',
      },
    },
  )
  if (!newTokens.ok) {
    const answer = await newTokens.json()
    let err
    answer?.detail === 'Incorrect password'
      ? (err = 'Неверный пароль')
      : answer?.detail === 'Incorrect email'
        ? (err = 'Логин не зарегистрирован')
        : answer?.detail[0].msg === 'value is not a valid email address'
          ? (err = 'Логин не в формате email ')
          : (err = answer?.detail[0].msg)

    throw new Error(err)
  }
  const newTokensResponse = await newTokens.json()

  localStorage.setItem('user_token', newTokensResponse.access_token)
  localStorage.setItem('user_token_refresh', newTokensResponse.refresh_token)

  return newTokensResponse
}

export async function getUserByToken(token) {
  const userByToken = await fetch('http://localhost:8090/user', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!userByToken.ok) {
    throw new Error(Error.message)
  }
  const newUserByToken = await userByToken.json()

  return newUserByToken
}

export async function refreshTokens() {
  try {
    
    const token = localStorage.getItem('user_token')
    const refresh = localStorage.getItem('user_token_refresh')
    
    const responseRefresh = await fetch('http://localhost:8090/auth/login', {
      method: 'PUT',
      body: JSON.stringify({
        access_token: `${token}`,
        refresh_token: `${refresh}`,
      }),
      headers: {
        'content-type': 'application/json',
      },
    })
    
    
      if (!responseRefresh.ok && responseRefresh.status!==401 ) {
        const errResponse = await responseRefresh.json()
        throw new Error(errResponse?.detail)
  
      }

      if (!responseRefresh.ok && responseRefresh.status===401 ) {
        console.log('токены не требуют обновления')
      }
    


    const dataRefresh = await responseRefresh.json()

    if (dataRefresh.access_token && dataRefresh.access_token) {
      
      localStorage.setItem('user_token', dataRefresh.access_token)
      localStorage.setItem('user_token_refresh', dataRefresh.refresh_token)
    }
   
    return dataRefresh

  } catch (error) {
    throw new Error(error)
  }
}

export async function getCurrentUserAdds(accessTokenNew) {

  try{
  const currentUserAddsResp = await fetch('http://127.0.0.1:8090/ads/me', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessTokenNew}`,
    },
  })
  if (!currentUserAddsResp.ok) {

  const currentUserAdds= await currentUserAddsResp.json()
  throw new Error(currentUserAdds?.detail)

  }
  const userAdds = await currentUserAddsResp.json()
  
  return userAdds
}
catch(error){
  
  throw new Error(error)
}
}

export async function changeUser(accessTokenNew, userNewData) {

  try{
  const currentUserAddsResp = await fetch('http://127.0.0.1:8090/user', {
    method: 'PATCH',
    body: JSON.stringify({
      ...userNewData
    }),
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessTokenNew}`,
    },
  })
  if (!currentUserAddsResp.ok) {
  const currentUserAdds= await currentUserAddsResp.json()

 
  throw new Error(currentUserAdds?.detail)

  }
  const userAdds = await currentUserAddsResp.json()
  
  return userAdds
}
catch(error){
  
  throw new Error(error.message)
}
}
