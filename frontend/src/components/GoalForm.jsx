import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGoal } from '../features/goals/goalSlice'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function GoalForm() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [photo, setPhoto] = useState('')
  const [video, setVideo] = useState('')
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createGoal({ name, description, price, photo, video }))
    setName('')
    setDescription('')
    setPrice('')
    setPhoto('')
    setVideo('')
    toast.success("Plan Added succesfully!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  return (
    <section className='form container'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            id='name'
            value={name}
            maxLength={20}
            onChange={(e) => setName(e.target.value)}
            required
            className='form-control'
          />
          <div className='invalid-feedback'>
            Please provide a valid name.
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <input
            type='text'
            name='description'
            id='description'
            value={description}
            maxLength={50}
            onChange={(e) => setDescription(e.target.value)}
            required
            className='form-control'
          />
          <div className='invalid-feedback'>
            Please provide a valid description.
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='price'>Price</label>
          <input
            type='number'
            name='price'
            id='price'
            value={price}
            min={0}
            onChange={(e) => setPrice(e.target.value)}
            required
            className='form-control'
          />
          <div className='invalid-feedback'>
            Please provide a valid price.
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='photo'>Photo</label>
          <input
            type='file'
            name='photo'
            id='photo'
            onChange={(e) => setPhoto(e.target.files[0])}
            className='form-control'
            required
          />
          <div className='invalid-feedback'>
            Please provide a valid photo.
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='video'>Video</label>
          <input
            type='file'
            name='video'
            id='video'
            onChange={(e) => setVideo(e.target.files[0])}
            className='form-control'
          />
          <div className='invalid-feedback'>
            Please provide a valid video.
          </div>
        </div>
        <div className='form-group'>
          <button className='btn btn-block btn-primary' type='submit'>Add Plan
          </button>
          {name === '' && description === '' && price === '' && photo === '' && video === '' && (
            <div className="invalid-feedback d-block">
              Please fill in all fields.
            </div>
          )}
          {price !== '' && price < 0 && (
            <div className="invalid-feedback d-block">
              Price cannot be negative.
            </div>
          )}
        </div>
      </form>
    </section>
  )
}

export default GoalForm
