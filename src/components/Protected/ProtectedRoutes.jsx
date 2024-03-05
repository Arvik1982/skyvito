import { Outlet, Navigate } from 'react-router-dom'

export default function ProtectedRoute({ redirectPath = '/login', isAllowed }) {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace={Boolean(true)} />
  }
  return <Outlet />
}
