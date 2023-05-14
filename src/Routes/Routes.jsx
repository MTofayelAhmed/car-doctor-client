import {
  createBrowserRouter

} from "react-router-dom";
import Main from "../layOut/Main";
import Home from "../pages/home/home/Home";
import Login from "../pages/login/Login";
import SignUp from "../pages/signUp/SignUp";
import CheckOut from "../pages/checkOut/CheckOut";
import Booking from "../pages/checkOut/bookings/Booking";
import PrivateRoute from "./privateRoute/PrivateRoute";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'signup',
        element: <SignUp></SignUp>
      },
      {
        path: 'checkout/:id',
        element: <CheckOut></CheckOut>,
        loader: ({params})=> fetch(`http://localhost:5000/services/${params.id}`)
      },
      {
        path: 'bookings',
        element: <PrivateRoute><Booking></Booking></PrivateRoute>
      }
    ]
  },
]);

export default router;






