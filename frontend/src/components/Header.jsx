import {Link} from "react-router";

const Header = () => {
    return (
        <div className="bg-cyan-100">
            <div className="justify-between flex p-4">
                <Link to="/">
                    <p className="text-4xl font-semibold p-2 m-2">EZSurveys</p>
                </Link>
                <Link to="/create">
                    <button className="m-2 p-4 bg-cyan-500 rounded-2xl">Create +</button>
                </Link>
            </div>
        </div>
    )
}

export default Header;