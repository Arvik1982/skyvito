import { setNoMainImg } from '../../store/reducers/sliceAdds'
import { localHost } from '../../vars/vars'

export default async function deleteImg(
  addId,
  imgRef,
  token,
  imgDeleteForms,
  imgUploadForms,
  dispatch,
) {
  async function deleteAllSelectedImg(newRef) {
    const deleteRef = newRef

    try {
      const response = await fetch(
        `${localHost}ads/${addId}/image/?file_url=${deleteRef}`,
        {
          method: 'DELETE',

          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (!response.ok) {
        const dataErr = await response.json()

        if (dataErr.detail !== 'No content') {
          throw new Error(response)
        }

        if (dataErr.detail === 'No content') {
          return dataErr.detail
        }
        if (dataErr.detail !== 'No content' && response.status === 400) {
          throw new Error('Ошибка обработки файла')
        }
      }

      const data = await response.json()
      return data
    } catch (er) {
      throw new Error(er)
    }
  }
  if (imgDeleteForms[0].deleted === true) {
    imgDeleteForms[0].src ? deleteAllSelectedImg(imgDeleteForms[0].src) : ''
  }

  if (imgDeleteForms[1].deleted === true) {
    imgDeleteForms[1].src ? deleteAllSelectedImg(imgDeleteForms[1].src) : ''
  }

  if (imgDeleteForms[2].deleted === true) {
    imgDeleteForms[2].src ? deleteAllSelectedImg(imgDeleteForms[2].src) : ''
  }

  if (imgDeleteForms[3].deleted === true) {
    imgDeleteForms[3].src ? deleteAllSelectedImg(imgDeleteForms[3].src) : ''
  }

  if (imgDeleteForms[4].deleted === true) {
    imgDeleteForms[4].src ? deleteAllSelectedImg(imgDeleteForms[4].src) : ''
  }

  imgDeleteForms[0]?.deleted === true ? dispatch(setNoMainImg(true)) : ''
}
