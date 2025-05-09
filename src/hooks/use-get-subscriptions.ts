import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { QUERY_KEYS } from '../config/query-keys'

const getSubscriptions = () => {}

const useGetSubscriptions = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SUBSCRIPTIONS],
    queryFn: async () => {},
  })
}

export default useGetSubscriptions
