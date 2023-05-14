import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { createGoal } from '../features/goals/goalSlice'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Row, Col, Container, Carousel, Spinner} from 'react-bootstrap';
import GoalItem from './GoalItem';

function EveryGoalModal() {
  const [show, setShow] = useState(false);
  const [goals, setGoals] = useState([]);
  const [uniqueGoals, setUniqueGoals] = useState([]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState('');
  const [video, setVideo] = useState('');
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, message } = useSelector((state) => state.goals);

  const onSubmit = (e) => {
    e.preventDefault();

    try {
      dispatch(createGoal({ name, description, price, photo, video }));
      setName('');
      setDescription('');
      setPrice('');
      setPhoto('');
      setVideo('');
      toast.success('Plan Added successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setShow(false);
   
  }

  const handleShow = async () => {
    setShow(true);
  };

  useEffect(() => {
    async function fetchGoals() {
      try {
        if (user) {
          const response = await axios.get(`/api/goals/all?userId=${user._id}`);
          const fetchedGoals = response.data;
          setGoals(fetchedGoals);
          // Filter goals based on the specific user
          const unique = fetchedGoals.filter((goal, index, self) => {
            return (
              index ===
              self.findIndex((g) => g._id === goal._id && g.user === user._id)
            );
          });
          setUniqueGoals(unique);
          
          // Console log each goal in uniqueGoals
          uniqueGoals.forEach((goal) => {
            console.log(goal);
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchGoals();
  }, [dispatch, user]);
  
  

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
    <div className='container-fluid'>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Button variant="success" onClick={handleShow}>Add a product</Button>
      </div>
      <br/>
      <div>
  <h2 style={{ display: 'flex', justifyContent: 'center' }}>My Products</h2>
  <Container>
    <Row xs={2} sm={3} md={5} lg={6} className="g-4">
      {uniqueGoals.map((goal) => (
        <Col key={goal._id}>
          <GoalItem goal={goal} />
        </Col>
      ))}
    </Row>
  </Container>
</div>

      </div>
      <br/>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "20px" }}>Please Add your Product Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <section className='form container'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            id='name'
            placeholder='eg. Iphone 14 pro max'
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
            placeholder=' eg. a brand new product'
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
            placeholder='eg. 35000'
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
            type='text'
            name='photo'
            id='photo'
            value = {photo}
            placeholder=''
            onChange={(e) => setPhoto(e.target.value)}
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
            type='text'
            name='video'
            value = {video}
            placeholder=''
            id='video'
            onChange={(e) => setVideo(e.target.value)}
            className='form-control'
          />
          <div className='invalid-feedback'>
            Please provide a valid video.
          </div>
        </div>
        <div className='form-group'>
          <button className='btn btn-block btn-primary' type='submit'>Add a product
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EveryGoalModal;