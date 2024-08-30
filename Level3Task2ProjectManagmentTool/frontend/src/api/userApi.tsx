import axios from 'axios'

const conString = 'http://localhost:3000/api'

interface User {
  username: string
  email: string
  avatar: string
  _id: string
}

interface Data {
  user: User
  accessToken: string
}

export const loginUser = (data: any) =>
  axios
    .post<Data>(`${conString}/login`, data)
    .then(res => res.data)
    .catch(err => {
      throw err
    })

export const signup = (data: any) =>
  axios
    .post<Data>(`${conString}/register`, data)
    .then(res => res.data)
    .catch(err => {
      throw err
    })

export const search = (query: string) =>
  axios
    .get<User>(`${conString}/user/search?query=${query}`)
    .then(res => res.data)
    .catch(err => {
      throw err
    })

export const updateUser = (userData: User) =>
  axios
    .put<User>(`${conString}/user/${userData}`, userData)
    .then(res => res.data)
    .catch(err => {
      throw err
    })
export const getDashboard = (token: string) =>
  axios
    .get(`${conString}/user/dashboerd`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.data)
    .catch(err => {
      throw err
    })
