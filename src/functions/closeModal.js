import { setCreateAddStatus } from '../store/reducers/sliceAdds'

export default function closeModal(dispatch, createAddStatus){
  
if(createAddStatus)

dispatch(setCreateAddStatus(false))

}