import { localHost } from '../../vars/vars'

export default async function uploadTxt(token, title, description, price) {
  try {
    const sendFileResponse = await fetch(`${localHost}adstext`, {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        description: description,
        price: price,
      }),
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (!sendFileResponse.ok) {
      throw new Error('ulpoad_TXT_Oшибка сервера')
    }
    const sendFile = await sendFileResponse.json()
    return sendFile
  } catch (error) {
    console.log('ulpoad_TXT_Oшибка сервера')
    throw new Error(error.message)
  }
}
