import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://hn.algolia.com/api/v1/'
})

instance.interceptors.request.use(request => {
  return request
})

export default instance