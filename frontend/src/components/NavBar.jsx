import { Navbar, Container, Nav, NavDropdown, Form, Button } from 'react-bootstrap';
import sokoni_logo from '../media/sokoni-logo.png';
import { FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaUser, FaPowerOff, FaEnvelope,FaShoppingBasket,FaCartArrowDown, FaCartPlus} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { logout, reset } from '../features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'

const NavBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  const onOrders = () => {
    navigate('/orders')
  }

  const onMessage = () => {
    navigate('/message')
  }
  return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">
        <img src={sokoni_logo} alt="sokoni-logo" style={{ width: '80px', height: '80px' }} />
      </Navbar.Brand>
      <Navbar.Brand href="/" style={{ fontFamily: 'boldblaster' }}>
        <h3>KARIBU SOKONI</h3>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#">Apple</Nav.Link>
          <Nav.Link href="#features">Samsung</Nav.Link>
          <Nav.Link href="#features">Tecno</Nav.Link>
          <Nav.Link href="#features">Puma</Nav.Link>
          <Nav.Link href="#features">Vunjabei</Nav.Link>
          <Nav.Link href="#features">Sports</Nav.Link>
          <Nav.Link href="#features">Nike</Nav.Link>
          {user && user.userType === 'seller' ? (
          <Nav.Link href="/product">My Products</Nav.Link>) : null}
          <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Men Clothing</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Women Clothing</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Children Clothing</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">All Products</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        
        <Nav>
        <Nav.Link eventKey={2} href="/user-info">
           <h4 style={{color: "#00FFFF"}}>{user && user.name}</h4>
          </Nav.Link>
        
        {user ? (
        <NavDropdown title={<FaUser size={33} />} id="basic-nav-dropdown">
        <NavDropdown.Item onClick={onLogout}>
        <FaSignOutAlt /> Logout
        </NavDropdown.Item>
        <NavDropdown.Item onClick={onOrders}>
        <FaShoppingBasket /> Orders
        </NavDropdown.Item>
        <NavDropdown.Item onClick={onMessage}>
        <FaEnvelope /> Message
        </NavDropdown.Item>
        </NavDropdown>
      ) : (
       
        <Nav.Link as={Link} to="/login">
          <FaSignInAlt size={33} /> Login
        </Nav.Link>
      )}
          <Nav.Link eventKey={2} href="/cart">
            <FaShoppingCart size={33} />
          </Nav.Link>
        </Nav>
        
      </Navbar.Collapse>
    </Navbar>
    </>
  );
};

export default NavBar;
