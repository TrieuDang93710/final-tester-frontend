/* eslint-disable react/prop-types */
import LoadingSpinner from '@/components/LoadingSpinner'
import { AuthContext } from '@/contexts/AuthProvider'
import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function PrivateRouter({ children }) {
  const { user, loading } = useContext(AuthContext)
  const location = useLocation()

  if (loading) {
    return (
      <LoadingSpinner />
    )
  }
  if (user)
    return children


  return (
    <Navigate to={"/signup"} state={{ from: location }}></Navigate>
  )
}

export default PrivateRouter