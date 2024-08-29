import axios from 'axios'
import { baseURL } from '@/intercepter'
export const createTask = (data: any, token: String) =>
  axios
    .post(`${baseURL}/task`, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.data)
    .catch(err => {
      throw err
    })

export const getPorjectTasks = (projectId: string, token: string) =>
  axios
    .get(`${baseURL}/project/${projectId}/task`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.data)
    .catch(err => {
      throw err
    })
