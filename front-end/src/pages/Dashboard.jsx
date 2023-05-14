import { useState, useEffect } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import GoalForm from '../components/GoalForm';
import GoalItem from '../components/GoalItem';
import Spinner from '../components/Spinner';
import { getGoals, reset } from '../features/goals/goalSlice';
import { Row, Col, Container, Carousel, Pagination } from 'react-bootstrap';
import sokoniBackground from "../media/sokoniBackground.png"
import PriceSelection from '../components/PriceSelection';

function Dashboard() {
  const [goals, setGoals] = useState([]);
  const [uniqueGoals, setUniqueGoals] = useState(new Set());
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productNames = ['iPhones', 'Samsungs', "tshirt"];

  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, message } = useSelector((state) => state.goals);

  const [currentPage, setCurrentPage] = useState(1);
  const [goalsPerPage] = useState(20);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getGoals());
  }, [user, navigate, isError, message, dispatch]);

  useEffect(() => {
    async function fetchGoals() {
      try {
        const response = await axios.get('/api/goals/all');
        const fetchedGoals = response.data;
        setGoals(fetchedGoals);
        // Create a Set of unique goals
        const unique = new Set();
        fetchedGoals.forEach((goal) => unique.add(goal.text));
        setUniqueGoals(unique);
      } catch (error) {
        console.error(error);
      }
    }
    fetchGoals();
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);


  if (isLoading) {
    return <Spinner />;
  }

  // Get current goals
  const indexOfLastGoal = currentPage  * goalsPerPage;
  const indexOfFirstGoal = indexOfLastGoal - goalsPerPage;
  const currentGoals = goals.slice(indexOfFirstGoal, indexOfLastGoal);

  // Change page
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const styles = {
    backgroundImage: `url(${sokoniBackground})`,
  };

  function chunkArray(array, size) {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      const chunk = array.slice(i, i + size);
      chunkedArray.push(chunk);
    }
    return chunkedArray;
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
        { user && user.userType !== "seller" && (
  <div className="col-lg-2 d-none d-lg-block">
    <form className="p-3 bg-light">
      <h6 className="mb-3">Price range</h6>
      <div className="mb-3">
        <label htmlFor="lowest" className="form-label">Lowest</label>
        <input type="text" className="form-control" id="lowest" placeholder="Enter lowest price" />
      </div>
      <div className="mb-3">
        <label htmlFor="highest" className="form-label">Highest</label>
        <input type="text" className="form-control" id="highest" placeholder="Enter highest price" />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-info">Apply</button>
      </div>
    </form>
  </div>
)}
          <div className="col-12 col-lg-10 container">
          <Container>
      {productNames.map((productName, index) => {
        const filteredGoals = goals.filter((goal) =>
          goal.name.slice(0, 3).toLowerCase().startsWith(productName.slice(0, 3).toLowerCase())
        );

        if (filteredGoals.length > 0) {
          let chunkSize;

          const isiPad = window.matchMedia("(min-width: 768px) and (min-height: 1024px)").matches;
          const isiPhone = window.matchMedia("(max-width: 390px) and (max-height: 896px)").matches;

          if (isiPad) {
            // For iPads
            chunkSize = 3;
          } else if (isiPhone) {
            // For iPhones
            chunkSize = 2;
          } else {
            // For laptops and other devices
            chunkSize = 4; // Adjusted chunkSize to 4 for consistency with the second section
          }

          const chunkedGoals = chunkArray(filteredGoals, chunkSize);

          return (
            <div key={index}>
              <h2>{productName}</h2>
              <Carousel interval={null}>
                {chunkedGoals.map((chunk, chunkIndex) => (
                  <Carousel.Item key={chunkIndex}>
                    <Container>
                      <Row xs={2} sm={2} md={3} lg={4} className="g-4">
                        {chunk.map((goal, goalIndex) => (
                          <Col key={goalIndex}>
                            <GoalItem goal={goal} />
                          </Col>
                        ))}
                      </Row>
                    </Container>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          );
        }

        return null;
      })}

      <h2>Other Products</h2>
      <Carousel interval={5000}>
        <Carousel.Item>
          <Container>
            <Row xs={2} sm={2} md={3} lg={4} className="g-4">
              {goals.map((goal, index) => {
                const productName = goal.name.slice(0, 3);

                if (!productNames.includes(productName)) {
                  return (
                    <Col key={goal.id}>
                      <GoalItem goal={goal} />
                    </Col>
                  );
                }

                return null;
              })}
            </Row>
          </Container>
        </Carousel.Item>
      </Carousel>
    </Container>
          </div>
        </div>
      </div>
    </>
  );
                    }  

export default Dashboard;    
                 
