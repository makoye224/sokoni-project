import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import ForgotPassword from "./components/ForgotPassword";
import CheckEmail from "./components/CheckEmail";
import NavBar from "./components/NavBar";
import ShoppingCart from "./components/ShoppingCart";
import Footer from "./components/Footer";
import Message from "./components/Message";
import Orders from "./components/Orders";
import Search from "./components/Search";
import EveryGoalModal from "./components/EveryGoalModal";
import DeleteAllGoals from "./components/DeleteAllGoals";
import RegisterSeller from "./pages/RegisterSeller";
import UserInfo from "./components/UserInfo";
import ProductDetails from "./components/ProductDetails";


function App() {
  return (
    <>
        <Router>
        <div className="container-fluid" style={{backgroundColor: "	#212529"}}>
        <NavBar/>
       
        </div>
        <div className="container-fluid" style={{ backgroundColor: '#13000A' }}>
        <Search/>
      
        <hr style={{ height: '5px', backgroundColor: '#0096FF', border: 'none' }} />
      
        </div>
        <Routes>
       
          <Route path = "/" element = {<Dashboard/>} />
          <Route path = "/login" element = {<Login/>} />
          <Route path = "/register" element = {<Register/>} />
          <Route path = "/reset" element = {<ForgotPassword/>} />
          <Route path = "/cart" element = {<ShoppingCart/>} />
          <Route path = "/reset/checkemail" element = {<CheckEmail/>} />
          <Route path = "/message" element = {<Message/>} />
          <Route path = "/orders" element = {<Orders/>} />
          <Route path = "/product" element = {<EveryGoalModal/>} />
          <Route path = "/delete" element = {<DeleteAllGoals/>} />
          <Route path = "/register-seller" element = {<RegisterSeller/>} />
          <Route path = "/user-info" element = {<UserInfo/>} />
          <Route path = "/product-details" element = {<ProductDetails/>} />
        </Routes>
      
      
    </Router>
    <Footer/>
    <ToastContainer/>
   
    </>
  );
}


export default App;
