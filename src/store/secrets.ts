import { create } from 'zustand'

export const useDecryptSecretsStore = create<{
  privateKey: string
  setPrivateKey: (privateKey: string) => void
}>((set) => {
  return {
    privateKey: '',
    setPrivateKey: (privateKey: string) => set({ privateKey }),
  }
})
