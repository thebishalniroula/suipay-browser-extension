import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '../client/axios'

type Response = {
  accessToken: string
  user: {
    id: string
    email: string
    wallet: string
  }
}

type LoginParams = {
  id: string
  password: string
}
const loginUser = async (params: LoginParams) => {
  const res = await axiosInstance.post<Response>('/user/login', {
    ...params,
  })
  return res.data
}

const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  })
}

export default useLogin
