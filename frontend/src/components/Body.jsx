import Header from "./Header";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const Body = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <ToastContainer />
        </div>
    )
}

export default Body;