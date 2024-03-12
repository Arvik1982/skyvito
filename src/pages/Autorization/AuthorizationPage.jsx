import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoginWrapper from '../../components/Authorization/LoginWrapper'
import Login from '../../components/Authorization/Login'
import Register from '../../components/Authorization/Register'
import { setError } from '../../store/reducers/sliceError'

export default function AuthorizationPage() {
  const dispatch = useDispatch()
  const enterMode = useSelector((state) => state.authRedux.enterMode)
  const [authMode, setAuthMode] = useState('login')

  useEffect(() => {
    dispatch(setError(''))
    setAuthMode(enterMode)
  }, [enterMode])

  const loginMode = <LoginWrapper page={<Login />} />
  const regMode = <LoginWrapper page={<Register />} />

  return authMode === 'login' ? loginMode : regMode
}
