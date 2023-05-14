import axios from 'axios'

const API_URL = '/api/sellers/'

// Register user
const register = async (sellerData) => {
  const response = await axios.post(API_URL, sellerData)
  
  if (response.data) {
    localStorage.setItem('seller', JSON.stringify(response.data))
  }

  return response.data
}


// forgot password
const forgotpassword = async (sellerData) => {
  console.log(`check point 3 ${sellerData}`)
  const mail = `${sellerData}`
  const response = await axios.post(API_URL + 'forgot-password', {email: mail})
  console.log(`check point 4.... ${mail}`)

  if (response.data) {
    localStorage.setItem('seller', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (sellerData) => {
  const response = await axios.post(API_URL + 'login', sellerData)

  if (response.data) {
    localStorage.setItem('seller', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('seller')
}

const sellerService = {
  register,
  logout,
  login,
  forgotpassword,
}

export default sellerService