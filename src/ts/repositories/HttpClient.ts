import axios from 'axios'

const HttpClient = axios.create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

export default HttpClient
