import { createRoot } from "react-dom/client";
import App from './App'
import Signup from "./Signup";
import Login from "./Login";
import Data from "./Data";
import User from "./User";
import './App.css'
import './Signup.css'
import './user.css'
import { createBrowserRouter,RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
   
    {
        path:'/',
        element:<Signup/>
    },

    {
        path:'/App',
        element:<App/>
    },
    {
        path:'/Login',
        element:<Login/>
    },
    {
        path:'/App/:User',
        element:<User/>
    }

])

const r = createRoot(document.querySelector('#root'))
r.render(
    <Data>
        <RouterProvider router={router}/>
    </Data>


)