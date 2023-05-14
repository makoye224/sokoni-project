import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    userType: ''
  })

  const { name, email, password, password2, userType} = formData

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
     // Perform form validation
     const form = e.currentTarget
     if (!form.checkValidity()) {
       e.stopPropagation()
       form.classList.add('was-validated')
       return
     }

    if (password !== password2) {
      toast.error("passwords do not match", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      const userData = {
        name,
        email,
        password,
        userType: "buyer"
      }
      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='container' style={{backgroundColor: "white"}}>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      <form onSubmit={onSubmit} className="needs-validation" noValidate>
  <div className="form-group">
    <input
      type="text"
      className="form-control"
      id="name"
      name="name"
      value={name}
      placeholder="Enter your name"
      onChange={onChange}
      required
    />
    <div className="invalid-feedback">Please enter your name.</div>
  </div>
  <div className="form-group">
    <input
      type="email"
      className="form-control"
      id="email"
      name="email"
      value={email}
      placeholder="Enter your email"
      onChange={onChange}
      required
    />
    <div className="invalid-feedback">Please enter a valid email address.</div>
  </div>
  <div className="form-group">
    <input
      type="password"
      className="form-control"
      id="password"
      name="password"
      value={password}
      placeholder="Enter password"
      onChange={onChange}
      minLength="4"
      required
    />
    <div className="invalid-feedback">Please enter a password with at least 4 characters.</div>
  </div>
  <div className="form-group">
    <input
      type="password"
      className="form-control"
      id="password2"
      name="password2"
      value={password2}
      placeholder="Confirm password"
      onChange={onChange}
      minLength="4"
      required
    />
    <div className="invalid-feedback">Please confirm your password.</div>
  </div>
  <div className="form-group">
    <button type="submit" className="btn btn-block btn-primary">Submit</button>
  </div>
  <hr/>
</form>

      </section>
     
    </>
  )
}

export default Register