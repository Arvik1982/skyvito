import { localHost } from '../../vars/vars'

export default async function deletePost(token, id) {
  try {
    const delResponse = await fetch(`${localHost}ads/${id}`, {
      method: 'DELETE',

      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (!delResponse.ok) {
      throw new Error('ulpoad_TXT_Oшибка сервера')
    }
    const del = await delResponse.json()

    return del
  } catch (error) {
    console.log('ulpoad_TXT_Oшибка сервера')
    throw new Error(error.message)
  }
}
