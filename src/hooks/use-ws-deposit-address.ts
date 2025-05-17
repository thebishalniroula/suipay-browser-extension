import React, { useEffect, useRef, useState } from 'react'
import { baseApi } from '../const/api'
import { useStorage } from './use-storage'
import { STORAGE_KEYS } from '../config/storage-keys'
import { WalletEssentials } from '../popup/App'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../config/query-keys'

const SERVER_URL = `ws://${baseApi}/api/wallet/userDepositAddress`

const useWSDepositAddress = () => {
  const socketRef = useRef<WebSocket>()
  const [messages, setMessages] = useState<any[]>([])
  const [walletData] = useStorage<WalletEssentials | null>(STORAGE_KEYS.WALLET_ESSENTIALS, null)

  const queryClient = useQueryClient()

  useEffect(() => {
    if (!walletData?.plain.accessToken) {
      return
    }
    socketRef.current = new WebSocket(`${SERVER_URL}?token=${walletData?.plain.accessToken}`)

    socketRef.current.onopen = () => {
      console.log('WebSocket connection established')
    }

    socketRef.current.onmessage = (event) => {
      console.log('Received message:', event.data)
      setMessages((prev) => [...prev, JSON.parse(event.data ?? '{}')])
    }

    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    socketRef.current.onclose = () => {
      console.log('WebSocket connection closed')
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_TRANSACTION_HISTORY] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_BALANCE] })
      // setMessages((prev) => [...prev, { status: 'Disconnected' }])
    }

    // Cleanup on unmount
    return () => {
      socketRef.current?.close()
    }
  }, [walletData?.plain.accessToken])

  return { messages }
}

export default useWSDepositAddress
