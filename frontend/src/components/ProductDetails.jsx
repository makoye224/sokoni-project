import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { reset } from '../features/goals/goalSlice';
import axios from 'axios';
import GoalItem from './GoalItem';
import { Row, Col, Container, Carousel, Pagination } from 'react-bootstrap';
import { setCart } from "../features/goals/goalSlice";
import { useNavigate, Link } from 'react-router-dom';


const ProductDetails = () => {
  const [goals, setGoals] = useState([]);
  const cart = useSelector((state) => state.goals.cart);
  const selectedGoal = useSelector((state) => state.goals.selectedGoal);
  const [selectedImage, setSelectedImage] = useState("https://rb.gy/p8qbb");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor luctus sapien id congue. Nulla facilisi. Nunc efficitur nunc ac bibendum vestibulum. Suspendisse potenti. Sed vel ante ut magna fringilla eleifend. In hac habitasse platea dictumst. Duis viverra ex eu velit fermentum aliquet. Cras consectetur nisl eu nunc blandit, id hendrerit dolor gravida. Vestibulum lacinia cursus turpis, eget pulvinar turpis aliquet ac. Nullam convallis consequat massa, nec congue elit eleifend et. Quisque tincidunt erat at dolor dignissim consectetur. Aliquam erat volutpat. Sed in elit odio. Nam malesuada dapibus diam at gravida. Nulla facilisi.";
  const [showFullText, setShowFullText] = useState(false);
  const truncatedText = showFullText ? text : text.split(' ').slice(0, 20).join(' ');
  const [similarActiveIndex, setSimilarActiveIndex] = useState(0);
  const [otherActiveIndex, setOtherActiveIndex] = useState(0);

  const handleSimilarSelect = (selectedIndex) => {
    setSimilarActiveIndex(selectedIndex);
  };

  const handleOtherSelect = (selectedIndex) => {
    setOtherActiveIndex(selectedIndex);
  };

  useEffect(() => {
    async function fetchGoals() {
      try {
        const response = await axios.get('/api/goals/all');
        const fetchedGoals = response.data;
        setGoals(fetchedGoals);
      } catch (error) {
        console.error(error);
      }
    }
    fetchGoals();
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleToggleText = () => {
    setShowFullText(!showFullText);
  };

  if (!selectedGoal) {
    // Render a loading state or placeholder while waiting for selectedGoal to be updated
    return <Spinner animation="border" role="status" />;
  }

  const similarProducts = goals.filter((goal) => {
    return goal.name.slice(0, 4).toLowerCase() === selectedGoal.name.slice(0, 4).toLowerCase();
  });
  
  const otherProducts = goals.filter((goal) => {
    return goal.name.slice(0, 4).toLowerCase() !== selectedGoal.name.slice(0, 4).toLowerCase();
  });
  

  const handleClick = (imageSrc) => {
    console.log(otherProducts)
    setSelectedImage(imageSrc);
  };

  const handleCart = ()=>{
    dispatch(setCart(selectedGoal));
    console.log("cart", cart)
  }
  
  

  return (
    <>
      <hr />
      <div className='container-fluid'>
        
        <div className='row'>
        <h5>{selectedGoal.description}</h5>
        <div className='col-md-1'>
        <div className='d-flex flex-wrap justify-content-between'>
          <button className="image-button side-p-media mb-2" onClick={() => handleClick("https://rb.gy/p8qbb")}>
            <img src="https://rb.gy/p8qbb" alt='product-photo' className="img-fluid" />
          </button>
          <button className="image-button side-p-media mb-2" onClick={() => handleClick("https://shorturl.at/ctLNT")}>
            <img src="https://shorturl.at/ctLNT" alt='product-photo' className="img-fluid" />
          </button>
          <button className="image-button side-p-media mb-2" onClick={() => handleClick("https://shorturl.at/tzDL9")}>
            <img src="https://shorturl.at/tzDL9" alt='product-photo' className="img-fluid" />
          </button>
          <button className="image-button side-p-media mb-2" onClick={() => handleClick("https://rb.gy/oi1tk")}>
            <img src="https://rb.gy/oi1tk" alt='product-photo' className="img-fluid" />
          </button>
          <button className="image-button side-p-media mb-2" onClick={() => handleClick("https://rb.gy/uza7m")}>
            <img src="https://rb.gy/uza7m" alt='product-photo' className="img-fluid" />
          </button>
        </div>
      </div>
      <div className='col-md-5'>
            <div style={{ maxHeight: '600px', overflow: '' }}>
              <img src={selectedImage} alt='product-photo' style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
            </div>
          </div>
          <div className='col-md-4'>
            <hr/>
            <span style={{marginRight: "10px", color: "blue"}}><a style={{color: "purple"}} href='#'>visit store</a></span><span style={{marginRight: "10px"}}><a style={{color: "green"}} href='#'>rating</a></span> 
            <span style={{marginRight: "10px"}}><a style={{color: "green"}} href ="#">reviews</a></span> <span><a style={{color: "purple"}} href = "#" >FAQ</a></span>
            <hr/>
            <div><p style= {{fontWeight: "bold"}}>Tshs. {selectedGoal.price}</p> 
            <span><a href ="/message" style={{color: "purple"}}>bargain price</a></span></div> 
            <br/>
            <span >Can be returned after purchase:</span> <span style={{color: "green"}}>yes</span>
            <br/>
            <br/>
            <p style={{fontWeight:"bold"}}>Product Details</p>
            <div>
               details go here
            </div>
            <br/>
            <br/>
            <div>
            <p style={{fontWeight:'bold'}}>About this Product</p>
            <div>
                {showFullText ? (
                     <p style={{ fontStyle: "italic" }}>{text}</p>
                     ) : (
                     <p style={{ fontStyle: "italic" }}>{text.split(' ').slice(0, 20).join(' ')}</p>
                     )}
                     <a onClick={handleToggleText} style={{ color: "blue", cursor: "pointer" }}>
                        {showFullText ? 'Read Less' : 'Read More'}
                        </a>
                        </div>
                        </div>
                        </div>
            <div className='col-md-2'>
            <p style={{fontWeight: "bold", color: "#660066"}}> {selectedGoal.name}</p>
            <p style={{fontWeight: "bold"}}> Tshs. {selectedGoal.price}</p>
            <p style={{color: "green"}}>In Stock</p>
            <p>Choose quantity</p>
            <select name="productTotal" className="form-control" id="product">
                  <option value="1">1</option>
                  <option value="1">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
                <br/>
                <button className='btn btn-warning btn-block' onClick={handleCart}>Add to Cart</button>
                <button className='btn btn-danger btn-block' style={{backgroundColor: "green"}}>Buy now</button>
          </div>
        </div>
        <hr/>
        
        <Container fluid>
      <h5 className='container'>Similar Products</h5>
      <Carousel activeIndex={similarActiveIndex} onSelect={handleSimilarSelect} indicators={false}>
        <Carousel.Item>
          <Row xs={2} sm={2} md={3} lg={4} className="g-4">
            {similarProducts.slice(0, 4).map((product, index) => (
              <Col key={product.id}>
                <GoalItem goal={product} />
              </Col>
            ))}
          </Row>
        </Carousel.Item>
        {/* Add more Carousel.Items for additional sets of similar products */}
      </Carousel>

      <hr />
      <h5>Other Products</h5>
      <Carousel activeIndex={otherActiveIndex} onSelect={handleOtherSelect} indicators={false}>
        <Carousel.Item>
          <Row xs={2} sm={2} md={3} lg={4} className="g-4">
            {otherProducts.slice(0, 4).map((product, index) => (
              <Col key={product.id}>
                <GoalItem goal={product} />
              </Col>
            ))}
          </Row>
        </Carousel.Item>
        {/* Add more Carousel.Items for additional sets of other products */}
      </Carousel>
      
      <hr />
      <h5>Reviews</h5>
    </Container>
      </div>
    </>
  );
};

export default ProductDetails;
