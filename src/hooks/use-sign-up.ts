import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '../client/axios'

type SignUpParams = {
  id: string
  email: string
  password: string
}

type Response = {
  accessToken: string
  user: {
    id: string
    email: string
    wallet: string
  }
}
const signUp = (params: SignUpParams) => {
  return axiosInstance.post<Response>('/user/signUp', params)
}

const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
  })
}

export default useSignUp
