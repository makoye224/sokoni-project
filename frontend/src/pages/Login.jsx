import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }

    if (isSuccess || user) {
      console.log(`user.name ${user.userType}`)
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  
  }

  if (isLoading) {
    return <Spinner />
  }

  const handleClick = () => {
    navigate('/reset')
  }

  return (
    <>
    <div >
      <section className='container' style={{backgroundColor: "white"}}>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start shopping</p>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-primary btn-block'>
              Submit
            </button>
            <span>
              <p
                className='text-primary'
                onClick={handleClick}
                style={{
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                Forgot Password?
              </p>
            </span>
          </div>
        </form>
        <div className='text-center' style={{backgroundColor: "white"}}>
          <p>
            Don't have an account?{' '}
            <Link to='/register' className='text-primary' style={{backgroundColor: "white"}}>
              Register
            </Link>
          </p>
        </div>
        <div className='text-center' style={{backgroundColor: "white"}}>
          <p>
          Are you a business owner looking to market and sell your products?{' '}
            <Link to='/register-seller' className='text-primary' style={{backgroundColor: "white"}}>
              sell
            </Link>
          </p>
        </div>
        <hr/>
        <div >
          <p>
            
          </p>
        </div>
      </section>
      </div>
    </>
  )
}

export default Login
