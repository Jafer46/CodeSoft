import { baseURL } from '@/intercepter'
import axios from 'axios'

export const createProject = (data: any, token: string) => {
  return axios
    .post(`${baseURL}/project`, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.data)
    .catch(err => {
      throw err
    })
}
