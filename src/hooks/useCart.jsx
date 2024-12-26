import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'

function useCart() {
  const { user } = useContext(AuthContext)
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ['carts', user?.email],
    queryFn: async () => {
      const rs = await fetch(`http://localhost:8080/cart?email=${user?.email}`)
      return rs.json()
    },
  })
  return [cart, refetch]
}

export default useCart