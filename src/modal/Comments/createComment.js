import { localHost } from '../../vars/vars'

export default function createComment(token, commentText) {
  const currentAddLocal = JSON.parse(localStorage.getItem('currentAdd'))

  return fetch(`${localHost}ads/${currentAddLocal.id}/comments`, {
    method: 'POST',
    body: JSON.stringify({ text: `${String(commentText)}` }),

    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .catch((er) => {
      throw new Error(er)
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Недопустимый формат файла')
      }

      return response.json()
    })
}
